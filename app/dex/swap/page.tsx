"use client";

import SwapCard from "@/app/_components/exchange-card/SwapCard";
import HistoryPopup from "@/app/_components/settings-popup/history-popup";
import SettingsPopup from "@/app/_components/settings-popup/settings-popup";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SwapPage() {
  return (
    <section className="md:flex hidden flex-wrap gap-5 justify-center items-center m-4 mt-32">
      <div defaultValue="exchange" className='max-w-[650px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg'>
        <div className="h-auto bg-transparent flex w-full justify-between p-4">
          <div className="flex gap-4 items-center">
            <Link href={'exchange'} className='border border-primary rounded-full py-1 px-4 text-white'>
              No Wallet
            </Link>
            <Link href={'swap'} className='border border-primary rounded-full py-1 px-4 text-white bg-primary'>
              Browser Wallet
            </Link>
          </div>
          <div className="flex items-center">
            <SettingsPopup />
            <HistoryPopup />
          </div>
        </div>
        <Separator className="bg-separator" />
        <SwapCard />
      </div>
    </section>
  );
}
