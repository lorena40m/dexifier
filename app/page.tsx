"use client";

import { DEXIFIER_STATE, useDexifier } from "./providers/DexifierProvider";
import DexifierCard from "./_components/dexifier/DexifierCard";
import RouteCard from "./_components/dexifier/RouteCard";
import DexifierDetailRango from "./_components/dexifier/DexifierDetail(Rango)";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AddressesCard from "./_components/dexifier/AddressCard";
import { Loader2 } from "lucide-react";

export default function SwapPage() {
  const {
    state,
    swapData,
    tokenFrom,
    tokenTo,
    amountFrom,
    selectedRoute,
    isMobile,
    setState,
    createSwap,
    initialize,
  } = useDexifier();

  return (
    <main
      className={cn(
        "relative min-h-screen pt-32 md:bg-[url('/assets/background.jpg')] bg-cover",
        isMobile ? "px-8" : "px-4"
      )}
    >
      <div className="fixed inset-0 w-screen h-screen md:hidden -z-50">
        <div className="absolute w-full aspect-square bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-[#097441] to-transparent to-60% backdrop-blur-sm"></div>
      </div>
      <section
        className={cn(
          "flex justify-center",
          isMobile
            ? "h-full flex-col gap-8"
            : "flex-row flex-wrap gap-5 h-[560px] items-stretch m-4 mt-32"
        )}
      >
        <DexifierCard />

        {state === DEXIFIER_STATE.FETCHING_ROUTES ||
        state === DEXIFIER_STATE.ROUTES ? (
          <AnimatePresence>
            {tokenFrom && tokenTo && amountFrom ? (
              <motion.div
                key="route-card"
                initial={
                  isMobile
                    ? { height: 0, opacity: 0 }
                    : { width: 0, opacity: 0 }
                }
                animate={
                  isMobile
                    ? { height: "100%", opacity: 1 }
                    : { width: 650, opacity: 1 }
                }
                exit={
                  isMobile
                    ? { height: 0, opacity: 0 }
                    : { width: 0, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  damping: 100,
                  stiffness: 800,
                  mass: 1,
                }}
                className="h-full"
              >
                <RouteCard />
              </motion.div>
            ) : null}
          </AnimatePresence>
        ) : state >= DEXIFIER_STATE.WITHDRAWAL_ADDRESS ? (
          <AddressesCard />
        ) : swapData ? (
          // "depositChannelId" in swapData ? (
          //   <DexifierDetailChainflip />
          // ) : "traceId" in swapData ? (
          <DexifierDetailRango />
        ) : (
          // ) : (
          //   "id" in swapData && <DexifierDetailExolix />
          // )
          <></>
        )}
      </section>
      {isMobile && (
        <div className="flex-1 py-12">
          <Button
            className={`text-black w-full font-semibold h-12 rounded-[10px]`}
            variant={state === DEXIFIER_STATE.PENDING ? 'outline' : 'primary'}
            disabled={!selectedRoute || state === DEXIFIER_STATE.PENDING}
            onClick={() => {
              if (state === DEXIFIER_STATE.WITHDRAWAL_ADDRESS) {
                createSwap();
              } else if (state >= DEXIFIER_STATE.PROCESSING) {
                initialize();
              } else {
                setState(DEXIFIER_STATE.WITHDRAWAL_ADDRESS);
              }
            }}
          >
            {state === DEXIFIER_STATE.WITHDRAWAL_ADDRESS ? (
              "Start"
            ) : state === DEXIFIER_STATE.PENDING ? (
              <Loader2 className="animate-spin text-primary" />
            ) : state === DEXIFIER_STATE.PROCESSING ? (
              "Cancel"
            ) : state === DEXIFIER_STATE.FAILED || state === DEXIFIER_STATE.SUCCESS ? (
              "Swap Again"
            ) : "Swap Now"}
          </Button>
        </div>
      )}
    </main>
  );
}
