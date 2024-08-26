"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { getBlockchains, getCompactBlockchainTokens } from "@/app/api/rango-api";
import { setAllToken } from "./slice/allToken";
import { matchAndGenerateProviders, ProvidersOptions } from "@/app/wallet/utils/providers";
import { Provider as WalletProvider } from "@rango-dev/wallets-react"
import { BlockchainMeta } from "rango-types";
import { getOnUpdateState, OnWalletConnectionChange } from "@/app/wallet/useWalletList";
import { setBlockchains } from "./slice/blockchainSlice";
import { useWalletProviders } from "@/app/wallet/useWalletProviders";
import { WidgetConfig } from "@/app/wallet/types";

type ProviderProps = {
  children: ReactNode;
};

const WalletStateProvider: FC<ProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { blockchains } = useAppSelector((state) => state.blockchains)
  console.log("blockchains=>", blockchains);


  useEffect(() => {
    getCompactBlockchainTokens().then((tokens) => {
      dispatch(setAllToken({ allToken: tokens }));
    });
  }, [dispatch]);

  const config: WidgetConfig = {
    apiKey: "30a7dc74-0886-4c5d-bc18-dc04e6280a96",
    title: "Dexifier_alpha",
    allowedDomains: [
      "http://localhost:3000"
    ],
    walletConnectProjectId: "489c5034628c45947388bc9a0ef2ea03",
    enableCentralizedSwappers: true,
    externalWallets: false,
  };

  const walletOptions: ProvidersOptions = {
    walletConnectProjectId: config?.walletConnectProjectId,
  };
  // "489c5034628c45947388bc9a0ef2ea03"
  const { providers } = useWalletProviders(config.wallets, walletOptions);

  useEffect(() => {
    getBlockchains().then((result) => { dispatch(setBlockchains({ blockchain: result })) }).catch((err) => {
      console.log("error while fetching blockchain data :", err);
    });
  }, [])
  const onConnectWalletHandler = useRef<OnWalletConnectionChange>();
  const onDisconnectWalletHandler = useRef<OnWalletConnectionChange>();
  const onUpdateState = blockchains && getOnUpdateState(blockchains, onConnectWalletHandler, onDisconnectWalletHandler, dispatch);
  return (
    <WalletProvider
      providers={providers}
      allBlockChains={blockchains}
      onUpdateState={onUpdateState}
      autoConnect={true}>
      {children}
    </WalletProvider>
  )
}

export const StateProvider: FC<ProviderProps> = ({ children }) => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WalletStateProvider>
          {children}
        </WalletStateProvider>
      </PersistGate>
    </Provider>
  );
};
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
