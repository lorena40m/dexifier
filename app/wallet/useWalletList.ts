// import type { WalletInfo } from "@/embedded/ui";
import type { InstallObjects, Namespace, WalletType } from "@rango-dev/wallets-shared";
import { isCosmosBlockchain, TransactionType, type BlockchainMeta } from "rango-types";

import { WalletState, WalletState as WalletStatus } from "./ui";
import { useWallets } from "@rango-dev/wallets-react";
import {
  detectInstallLink,
  detectMobileScreens,
  getCosmosExperimentalChainInfo,
  KEPLR_COMPATIBLE_WALLETS,
  WalletTypes,
} from "@rango-dev/wallets-shared";
import { useCallback, useEffect, useState } from "react";

// import { useAppStore } from "./store/AppStore";
// import { useWalletsStore } from "./store/wallets";
import { configWalletsToWalletName } from "./utils/providers";
import { WalletInfoWithNamespaces } from "./types";
import { useAppSelector } from "@/redux_slice/provider";

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
  console.log("getWalletInfo", getWalletInfo);


  const blockchains: BlockchainMeta[] = [];

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
  console.log("wallets", wallets, listAvailableWalletTypes, chain);

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

  const handleClick = async (type: WalletType, namespaces?: Namespace[]) => {
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
