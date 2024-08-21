"use client";
import { useEffect } from "react";
import FlexExchangeCard from "./_components/exchange-card/FlexExchangeCard";
import FlexRoutesCard from "./_components/routes-card/FlexRoutesCard";
import FlexSwapCard from "./_components/swap-details-card/FlexSwapCard";
import Web3ModalProvider from "./providers/Web3ModalProvider";
import { useAppDispatch } from "@/redux_slice/provider";
import { getCompactBlockchainTokens } from "./api/rango-api";
import { setAllToken } from "@/redux_slice/slice/allToken";
import { Provider } from "@rango-dev/wallets-react"
import { matchAndGenerateProviders } from "./wallet/utils/providers";
import { useWalletList } from "./wallet/useWalletList";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCompactBlockchainTokens().then((tokens) => {
      dispatch(setAllToken({ allToken: tokens }));
    });
  }, [dispatch]);

  const walletOptions = { walletConnectProjectId: "1810ec8721bc30ad15dcbf39facc2939" }
  const providers = matchAndGenerateProviders(undefined, walletOptions);


  return (
    <Web3ModalProvider>
      <Provider providers={providers}>
        <FlexPage />
      </Provider>
    </Web3ModalProvider>
  );
}

const FlexPage = () => {
  const { list, handleClick, error, disconnectConnectingWallets } = useWalletList({})
  const connectedWallets = list.filter(
    (wallet) => wallet.state === "connected",
  );
  const isWalletConnected = connectedWallets.length === 0 ? false : true;
  return (
    <main className="h-screen p-4 pt-32 w-full flex flex-wrap gap-y-5 justify-center items-center gap-x-5 bg-[url('/assets/background.png')] bg-cover">
      <FlexSwapCard isWalletConnected={isWalletConnected} />

      <FlexExchangeCard isWalletConnected={isWalletConnected} />

      <FlexRoutesCard isWalletConnected={isWalletConnected} />
    </main>
  )
}

