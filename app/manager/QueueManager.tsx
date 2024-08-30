import type { SwapQueueContext } from "@rango-dev/queue-manager-rango-preset";
import type { Network, WalletType } from "@rango-dev/wallets-shared";
import type { PropsWithChildren } from "react";

import {
  checkWaitingForNetworkChange,
  makeQueueDefinition,
} from "@rango-dev/queue-manager-rango-preset";
import { Provider as ManagerProvider } from "@rango-dev/queue-manager-react";
import { useWallets } from "@rango-dev/wallets-react";
import { convertEvmBlockchainMetaToEvmChainInfo } from "@rango-dev/wallets-shared";
import { BlockchainMeta, isEvmBlockchain } from "rango-types";
import React, { useMemo } from "react";
import { useAppSelector } from "@/redux_slice/provider";
import { getConfig } from "../utils/configs";
import { Wallet } from "../wallet/types/wallets";

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

export function getWalletsForNewSwap(selectedWallets: Wallet[]) {
  const wallets = selectedWallets.reduce(
    (
      selectedWalletsMap: {
        [p: string]: { address: string; walletType: WalletType };
      },
      selectedWallet,
    ) => (
      (selectedWalletsMap[selectedWallet.chain] = {
        address: selectedWallet.address,
        walletType: selectedWallet.walletType,
      }),
      selectedWalletsMap
    ),
    {},
  );

  return wallets;
}

function QueueManager(props: PropsWithChildren<{ apiKey?: string }>) {
  const {
    providers,
    getSigners,
    state,
    connect,
    canSwitchNetworkTo,
    getWalletInfo,
  } = useWallets();

  const swapQueueDef = useMemo(() => {
    return makeQueueDefinition({
      API_KEY: props.apiKey || getConfig("API_KEY"),
      BASE_URL: getConfig("BASE_URL"),
    });
  }, [props.apiKey]);

  const { blockchains } = useAppSelector((state) => state.blockchains)
  const { connectedWallets } = useAppSelector((state) => state.wallet);

  const wallets = {
    blockchains: connectedWallets.map((wallet) => ({
      accounts: [wallet],
      name: wallet.chain,
    })),
  };

  const switchNetwork = async (wallet: WalletType, network: Network) => {
    if (!canSwitchNetworkTo(wallet, network)) {
      return undefined;
    }
    return connect(wallet, network);
  };

  const isMobileWallet = (walletType: WalletType): boolean =>
    !!getWalletInfo(walletType).mobileWallet;

  // TODO: this code copy & pasted from rango, should be refactored.
  const allBlockchains = blockchains
    .filter((blockchain) => blockchain.enabled)
    .reduce(
      (blockchainsObj: any, blockchain) => (
        (blockchainsObj[blockchain.name] = blockchain), blockchainsObj
      ),
      {},
    );
  const evmBasedChains = blockchains.filter(isEvmBlockchain);
  const getSupportedChainNames = (type: WalletType) => {
    const { supportedChains } = getWalletInfo(type);
    return walletAndSupportedChainsNames(supportedChains);
  };
  const allProviders = providers();

  const context: SwapQueueContext = {
    meta: {
      blockchains: allBlockchains,
      evmBasedChains: evmBasedChains,
      evmNetworkChainInfo:
        convertEvmBlockchainMetaToEvmChainInfo(evmBasedChains),
      getSupportedChainNames,
    },
    getSigners,
    wallets,
    providers: allProviders,
    switchNetwork,
    canSwitchNetworkTo,
    connect,
    state,
    isMobileWallet,
  };

  const isActiveTab = true

  return (
    <ManagerProvider
      queuesDefs={[swapQueueDef]}
      context={context}
      onPersistedDataLoaded={(manager) => {
        checkWaitingForNetworkChange(manager);
      }}
      isPaused={!isActiveTab}
    >
      {props.children}
    </ManagerProvider>
  );
}

export default QueueManager;
