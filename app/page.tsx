"use client";
import { useEffect } from "react";
import FlexExchangeCard from "./_components/exchange-card/FlexExchangeCard";
import FlexRoutesCard from "./_components/routes-card/FlexRoutesCard";
import FlexSwapCard from "./_components/swap-details-card/FlexSwapCard";
import Web3ModalProvider from "./providers/Web3ModalProvider";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { getCompactBlockchainTokens } from "./api/rango-api";
import { setAllToken } from "@/redux_slice/slice/allToken";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCompactBlockchainTokens().then((tokens) => {
      dispatch(setAllToken({ allToken: tokens }));
    });
  }, [dispatch]);

  return (
    <Web3ModalProvider>
      <main className="h-screen p-4 pt-32 w-full flex flex-wrap gap-y-5 justify-center items-center gap-x-5 bg-[url('/assets/background.png')] bg-cover">
        <FlexSwapCard />

        <FlexExchangeCard />

        <FlexRoutesCard />
      </main>
    </Web3ModalProvider>
  );
}
