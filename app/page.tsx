"use client";

import { DEXIFIER_STATE, useDexifier } from "./providers/DexifireProvider";
import DexifierCard from "./_components/dexifier/DexifierCard";
import RouteCard from "./_components/dexifier/RouteCard";
import DexifierDetailRango from "./_components/dexifier/DexifierDetail(Rango)";
import DexifierDetailChainflip from "./_components/dexifier/DexifierDetail(Chainflip)";
import DexifierDetailExolix from "./_components/dexifier/DexifierDetail(Exolix)";

export default function SwapPage() {
  const { state, swapData } = useDexifier();

  return (
    <main className="relative min-h-screen p-4 pt-32 md:bg-[url('/assets/background.jpg')] bg-cover">
      <section className="md:flex hidden flex-wrap gap-5 justify-center items-center m-4 mt-32">
        <DexifierCard />
        {state === DEXIFIER_STATE.ROUTES ? <RouteCard />
          : state === DEXIFIER_STATE.PENDING && swapData ?
            'depositChannelId' in swapData ? <DexifierDetailChainflip /> :
              'traceId' in swapData ? <DexifierDetailRango /> :
                'id' in swapData && <DexifierDetailExolix /> : <></>
        }
      </section>
    </main>
  );
}
