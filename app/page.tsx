"use client";
import FlexExchangeCard from "./_components/exchange-card/FlexExchangeCard";
import SwapMobileView from "./_components/mobile";
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
    <main className="relative min-h-screen p-4 pt-32 md:bg-[url('/assets/background.png')] bg-cover">

      <div className="fixed inset-0 w-screen h-screen md:hidden -z-50">
        <div className="absolute w-full aspect-square bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#097441] to-transparent to-60% backdrop-blur-sm"></div>
      </div>

      <div className="md:flex hidden flex-wrap gap-5 justify-center items-center m-4 mt-32">
        <FlexSwapCard isWalletConnected={isWalletConnected} />

        <FlexExchangeCard isWalletConnected={isWalletConnected} />

        <FlexRoutesCard isWalletConnected={isWalletConnected} />
      </div>

      <div className="md:hidden mt-8">
        <SwapMobileView />
      </div>
    </main>
    
  );
}

