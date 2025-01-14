"use client";

import RouteCard from "@/app/_components/swap/RouteCard";
import SwapCard from "@/app/_components/swap/SwapCard";
import SwapDetailsCard from "@/app/_components/swap/SwapDetailsCard";
import SwapDetailsCardChainflip from "@/app/_components/swap/SwapDetailsCard(Chainflip)";
import { useQuote } from "@/app/providers/QuoteProvider";
import { useSwap } from "@/app/providers/SwapProvider";

export default function SwapPage() {
  const { routeData, confirmData } = useSwap();
  const { quoteData, depositData } = useQuote();

  return (
    <section className="md:flex hidden flex-wrap gap-5 justify-center items-center m-4 mt-32">
      {confirmData ?
        <SwapDetailsCard />
        :
        depositData ?
          <SwapDetailsCardChainflip />
          :
          <></>
      }
      <SwapCard />
      {(!(confirmData || depositData) && (routeData?.results.length && quoteData?.quotes.length)) &&
        <RouteCard />
      }
    </section>
  );
}
