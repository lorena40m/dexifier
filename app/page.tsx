"use client";
import FlexExchangeCard from "./_components/exchange-card/FlexExchangeCard";
import FlexRoutesCard from "./_components/routes-card/FlexRoutesCard";
import FlexSwapCard from "./_components/swap-details-card/FlexSwapCard";
import { useWalletList } from "./wallet/useWalletList";


export default function Home() {
  const { list } = useWalletList({})
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
  );
}

