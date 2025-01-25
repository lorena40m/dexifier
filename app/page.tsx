"use client";

import { DEXIFIER_STATE, useDexifier } from "./providers/DexifireProvider";
import DexifierCard from "./_components/dexifier/DexifierCard";
import RouteCard from "./_components/dexifier/RouteCard";
import DexifierDetailRango from "./_components/dexifier/DexifierDetail(Rango)";
import DexifierDetailChainflip from "./_components/dexifier/DexifierDetail(Chainflip)";
import DexifierDetailExolix from "./_components/dexifier/DexifierDetail(Exolix)";
import { AnimatePresence, motion } from "framer-motion";

export default function SwapPage() {
  const { state, swapData, tokenFrom, tokenTo, amountFrom } = useDexifier();

  return (
    <main className="relative min-h-screen p-4 pt-32 md:bg-[url('/assets/background.jpg')] bg-cover">
      <section className="md:flex hidden flex-wrap gap-5 justify-center items-stretch h-[560px] m-4 mt-32">
        <DexifierCard />

        {state === DEXIFIER_STATE.FETCHING_ROUTES || state === DEXIFIER_STATE.ROUTES ?
          <AnimatePresence>
            {tokenFrom && tokenTo && amountFrom ?
              <motion.div
                key="route-card"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 650, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 100, stiffness: 800, mass: 1 }}
                className="h-full"
              >
                <RouteCard />
              </motion.div>
              :
              null
            }
          </AnimatePresence>
          : swapData ?
            'depositChannelId' in swapData ? <DexifierDetailChainflip /> :
              'traceId' in swapData ? <DexifierDetailRango /> :
                'id' in swapData && <DexifierDetailExolix /> : <></>
        }
      </section>
    </main>
  );
}
