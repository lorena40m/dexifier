// import type { WalletInfo } from "@/embedded/ui";
import type { InstallObjects, Namespace, NamespaceData, Network, WalletType } from "@rango-dev/wallets-shared";
import { isCosmosBlockchain, isEvmBlockchain, TransactionType, type BlockchainMeta } from "rango-types";
import { WalletState, WalletState as WalletStatus } from "./ui";
import { EventHandler, Events, readAccountAddress, useWallets } from "@rango-dev/wallets-react";

import {
  detectInstallLink,
  detectMobileScreens,
  getCosmosExperimentalChainInfo,
  isEvmAddress,
  KEPLR_COMPATIBLE_WALLETS,
  Networks,
  WalletTypes,
} from "@rango-dev/wallets-shared";
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";

// import { useAppStore } from "./store/AppStore";
// import { useWalletsStore } from "./store/wallets";
import { configWalletsToWalletName } from "./utils/providers";
import { Wallet, WalletInfoWithNamespaces } from "./types";
import { useAppSelector } from "@/redux_slice/provider";
import { disconnectedWallet, updateConnectedWallet } from "@/redux_slice/slice/walletSlice";

export type OnWalletConnectionChange = (key: string) => void;

const ALL_SUPPORTED_WALLETS = Object.values(WalletTypes);
type WalletState = {
  connected: boolean;
  connecting: boolean;
  reachable: boolean;
  installed: boolean;
  accounts: string[] | null;
  network: string | null;
}

type WalletInfo = {
  name: string;
  img: string;
  installLink: InstallObjects | string;
  color: string;
  supportedChains: BlockchainMeta[];
  showOnMobile?: boolean;
  isContractWallet?: boolean;
  mobileWallet?: boolean;
  namespaces?: Namespace[];
  singleNamespace?: boolean;
};

type WalletsInfo = {
  state: WalletState;
  link: InstallObjects | string;
  title: string;
  image: string;
  type: string;
  showOnMobile?: boolean;
  blockchainTypes: TransactionType[];
};

interface Params {
  chain?: string;
  onBeforeConnect?: (walletType: string) => void;
  onConnect?: (walletType: string) => void;
}

function removeDuplicateFrom<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

function hashWalletsState(walletsInfo: WalletsInfo[]) {
  return walletsInfo.map((w) => w.state).join("-");
}

function mapStatusToWalletState(state: WalletState): any {
  switch (true) {
    case state.connected:
      return WalletStatus.CONNECTED;
    case state.connecting:
      return WalletStatus.CONNECTING;
    case !state.installed:
      return WalletStatus.NOT_INSTALLED;
    default:
      return WalletStatus.DISCONNECTED;
  }
}

export const isExperimentalChain = (
  blockchains: BlockchainMeta[],
  wallet: string,
): boolean => {
  const cosmosExperimentalChainInfo = getCosmosExperimentalChainInfo(
    Object.entries(blockchains)
      .map(([, blockchainMeta]) => blockchainMeta)
      .filter(isCosmosBlockchain),
  );
  return (
    cosmosExperimentalChainInfo &&
    cosmosExperimentalChainInfo[wallet]?.experimental
  );
};
const EXCLUDED_WALLETS = [WalletTypes.LEAP];

function mapWalletTypesToWalletInfo(
  getState: (type: WalletType) => WalletState,
  getWalletInfo: (type: WalletType) => WalletInfo,
  list: WalletType[],
  chain?: string,
): WalletInfoWithNamespaces[] {
  return list
    .filter((wallet) => !EXCLUDED_WALLETS.includes(wallet as WalletTypes))
    .filter((wallet) => {
      const { supportedChains, isContractWallet } = getWalletInfo(wallet);
      const { installed, network } = getState(wallet);
      const filterContractWallets =
        isContractWallet && (!installed || (!!chain && network !== chain));
      if (filterContractWallets) {
        return false;
      }
      if (chain) {
        return !!supportedChains.find(
          (supportedChain) => supportedChain.name === chain,
        );
      }
      return true;
    })
    .map((type) => {
      const {
        name,
        img: image,
        installLink,
        showOnMobile,
        namespaces,
        singleNamespace,
        supportedChains,
      } = getWalletInfo(type);
      const blockchainTypes = removeDuplicateFrom(
        supportedChains.map((item) => item.type),
      );

      const state = mapStatusToWalletState(getState(type));
      return {
        title: name,
        image,
        link: detectInstallLink(installLink),
        state,
        type,
        showOnMobile,
        namespaces,
        singleNamespace,
        blockchainTypes,
      };
    });
}

function sortWalletsBasedOnConnectionState(
  wallets: WalletInfoWithNamespaces[],
): WalletInfoWithNamespaces[] {
  return wallets.sort(
    (a, b) =>
      Number(b.state === WalletStatus.CONNECTED) -
      Number(a.state === WalletStatus.CONNECTED) ||
      Number(
        b.state === WalletStatus.DISCONNECTED ||
        b.state === WalletStatus.CONNECTING,
      ) -
      Number(
        a.state === WalletStatus.DISCONNECTED ||
        a.state === WalletStatus.CONNECTING,
      ),
  );
}
/**
 * gets list of wallets with their information and an action for handling click callback fo UI
 * we need to share the logic of rendering list of wallets and handle clicking on them in different places
 * you can use this list whenever you need to show the list of wallets and needed callbacks
 */
export function useWalletList(params: Params) {
  const { chain, onBeforeConnect, onConnect } = params;
  const { config } = useAppSelector((state) => state.wallet);
  const { state, disconnect, getWalletInfo, connect } = useWallets();

  const blockchains: BlockchainMeta[] = useAppSelector((state) => state.blockchains.blockchains);
  const { connectedWallets } = useAppSelector((state) => state.wallet);

  /** It can be what has been set by widget config or as a fallback we use all the supported wallets by our library */
  const listAvailableWalletTypes =
    configWalletsToWalletName(config?.wallets, {
      walletConnectProjectId: config?.walletConnectProjectId,
    }) ||
    ALL_SUPPORTED_WALLETS;

  let wallets = mapWalletTypesToWalletInfo(
    state,
    getWalletInfo,
    listAvailableWalletTypes,
    chain,
  );
  console.log("wallets, listAvailableWallet, Chain", wallets, listAvailableWalletTypes, chain);

  wallets = detectMobileScreens()
    ? wallets.filter(
      (wallet) => wallet.showOnMobile || state(wallet.type).installed,
    )
    : wallets;

  const sortedWallets = sortWalletsBasedOnConnectionState(wallets);
  const [error, setError] = useState("");

  const isExperimentalChainNotAdded = (walletType: string) =>
    !connectedWallets.find(
      (connectedWallet) =>
        connectedWallet.walletType === walletType &&
        connectedWallet.chain === chain,
    );

  const handleClick = async (type: WalletType, namespaces?: NamespaceData[]) => {
    const wallet = state(type);
    try {
      if (error) {
        setError("");
      }
      if (wallet.connected) {
        await disconnect(type);
      } else {
        const atLeastOneWalletIsConnected = !!wallets.find(
          (w) => w.state === WalletState.CONNECTED,
        );
        if (config?.multiWallets === false && atLeastOneWalletIsConnected) {
          return;
        }
        onBeforeConnect?.(type);
        await connect(type, undefined, namespaces);
        onConnect?.(type);
      }
    } catch (e) {
      setError("Error: " + (e as any)?.message);
    }
  };

  const disconnectConnectingWallets = useCallback(() => {
    const connectingWallets =
      wallets?.filter((wallet) => wallet.state === WalletState.CONNECTING) ||
      [];
    for (const wallet of connectingWallets) {
      void disconnect(wallet.type);
    }
  }, [hashWalletsState(wallets as unknown as WalletsInfo[])]);

  const disconnectWallet = async (type: WalletType) => {
    const wallet = state(type);
    if (wallet.connected) {
      await disconnect(type);
    }
  };

  useEffect(() => {
    return () => {
      disconnectConnectingWallets();
    };
  }, []);

  /*
   * Atm, we only support default injected wallet for the EVM
   * so we show default wallet when there is no other evm wallet installed
   * but we have ethereum injected
   */
  const shouldShowDefaultInjectedWallet = (wallets: WalletsInfo[]) => {
    // don't show default injected wallet when it's not installed
    const defaultWallet = wallets.find(
      (wallet) => wallet.type === WalletTypes.DEFAULT,
    );
    if (!defaultWallet || defaultWallet.state === WalletState.NOT_INSTALLED) {
      return false;
    }

    /*
     * if we have another evm wallet installed (except wallet connect),
     * there is no need to show default injected wallet anymore
     */
    const isEvmWalletInstalledExceptDefault = wallets.filter(
      (wallet) =>
        wallet.state != WalletState.NOT_INSTALLED &&
        ![WalletTypes.DEFAULT, WalletTypes.WALLET_CONNECT_2].includes(
          wallet.type as WalletTypes,
        ) &&
        getWalletInfo(wallet.type).supportedChains.filter(
          (blockchain) => blockchain.type == "EVM",
        ).length > 0,
    );
    return isEvmWalletInstalledExceptDefault.length == 0;
  };

  const shouldExcludeWallet = (
    walletType: string,
    chain: string,
    blockchains: BlockchainMeta[],
  ) => {
    return (
      (isExperimentalChain(blockchains, chain) &&
        isExperimentalChainNotAdded(walletType) &&
        !KEPLR_COMPATIBLE_WALLETS.includes(walletType)) ||
      (walletType == WalletTypes.DEFAULT &&
        !shouldShowDefaultInjectedWallet(wallets as unknown as WalletsInfo[]))
    );
  };

  return {
    list: sortedWallets.filter(
      (wallet) => !shouldExcludeWallet(wallet.type, chain ?? "", blockchains),
    ),
    error,
    handleClick,
    disconnectConnectingWallets,
    disconnectWallet,
  };
}

export function walletAndSupportedChainsNames(
  supportedBlockchains: BlockchainMeta[],
): Network[] | null {
  if (!supportedBlockchains) {
    return null;
  }
  let walletAndSupportedChainsNames: Network[] = [];
  walletAndSupportedChainsNames = supportedBlockchains.map(
    (blockchainMeta) => blockchainMeta.name,
  );

  return walletAndSupportedChainsNames;
}

export function prepareAccountsForWalletStore(
  wallet: WalletType,
  accounts: string[],
  evmBasedChains: string[],
  supportedChainNames: Network[] | null,
  isContractWallet: boolean,
): Wallet[] {
  const result: Wallet[] = [];

  function addAccount(network: Network, address: string) {
    const accountForChainAlreadyExists = !!result.find(
      (account) => account.chain === network,
    );
    if (!accountForChainAlreadyExists) {
      const newAccount: Wallet = {
        address,
        chain: network,
        walletType: wallet,
      };

      result.push(newAccount);
    }
  }

  const supportedBlockchains = supportedChainNames || [];

  accounts.forEach((account) => {
    const { address, network } = readAccountAddress(account);

    const hasLimitation = supportedBlockchains.length > 0;
    const isSupported = supportedBlockchains.includes(network);
    const isUnknown = network === Networks.Unknown;
    const notSupportedNetworkByWallet =
      hasLimitation && !isSupported && !isUnknown;

    /*
     * Here we check given `network` is not supported by wallet
     * And also the network is known.
     */
    if (notSupportedNetworkByWallet) {
      return;
    }

    /*
     * In some cases we can handle unknown network by checking its address
     * pattern and act on it.
     * Example: showing our evm compatible network when the unknown network is evm.
     * Otherwise, we stop executing this function.
     */
    const isUnknownAndEvmBased =
      network === Networks.Unknown && isEvmAddress(address);
    if (isUnknown && !isUnknownAndEvmBased) {
      return;
    }

    const isEvmBasedChain = evmBasedChains.includes(network);

    // If it's an evm network, we will add the address to all the evm chains.
    if (isEvmBasedChain || isUnknownAndEvmBased) {
      if (isContractWallet) {
        /*
         * for contract wallets like Safe wallet, we should add only account for the
         * current connected blockchain not all of the supported blockchains
         */
        addAccount(network, address.toLowerCase());
      } else {
        /*
         * all evm chains are not supported in wallets, so we are adding
         * only to those that are supported by wallet.
         */
        const evmChainsSupportedByWallet = supportedBlockchains.filter(
          (chain) => evmBasedChains.includes(chain),
        );

        evmChainsSupportedByWallet.forEach((network) => {
          /*
           * EVM addresses are not case sensitive.
           * Some wallets like Binance-chain return some letters in uppercase which produces bugs in our wallet state.
           */
          addAccount(network, address.toLowerCase());
        });
      }
    } else {
      addAccount(network, address);
    }
  });

  return result;
}

export const getOnUpdateState = (
  blockchains: BlockchainMeta[],
  onConnectWalletHandler: MutableRefObject<OnWalletConnectionChange | undefined>,
  onDisconnectWalletHandler: MutableRefObject<OnWalletConnectionChange | undefined>,
  dispatch: any) => {

  const onUpdateState: EventHandler = (type, event, value, state, meta) => {
    const evmBasedChainNames = blockchains
      .filter(isEvmBlockchain)
      .map((chain) => chain.name);

    if (event === Events.ACCOUNTS) {
      if (value) {
        const supportedChainNames: Network[] | null =
          walletAndSupportedChainsNames(meta.supportedBlockchains);
        const data = prepareAccountsForWalletStore(
          type,
          value,
          evmBasedChainNames,
          supportedChainNames,
          meta.isContractWallet,
        );

        if (data.length) {
          dispatch(updateConnectedWallet({ accounts: data }));
        }
      } else {
        dispatch(disconnectedWallet({ walletType: type }));
        if (onDisconnectWalletHandler?.current) {
          onDisconnectWalletHandler?.current(type);
        } else {
          console.warn(
            `onDisconnectWallet handler hasn't been set. Are you sure?`,
          );
        }
      }
    }
    if (event === Events.ACCOUNTS && state.connected) {
      const key = `${type}-${state.network}-${value}`;

      if (state.connected) {
        if (onConnectWalletHandler?.current) {
          onConnectWalletHandler?.current(key);
        } else {
          console.warn(
            `onConnectWallet handler hasn't been set. Are you sure?`,
          );
        }
      }
    }

    if (event === Events.NETWORK && state.network) {
      const key = `${type}-${state.network}`;
      if (onConnectWalletHandler?.current) {
        onConnectWalletHandler?.current(key);
      } else {
        console.warn(`onConnectWallet handler hasn't been set. Are you sure?`);
      }
    }

    // propagate updates for Dapps using external wallets

    // if (props.onUpdateState) {
    //   props.onUpdateState(type, event, value, state, meta);
    // }
  };
  return onUpdateState
}

