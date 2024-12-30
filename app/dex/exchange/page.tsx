"use client";

import CustomLoader from "@/app/_components/common/loader";
import AddressesCard from "@/app/_components/exchange/AddressCard";
import ExchangeCard from "@/app/_components/exchange/ExchangeCard";
import { useExchange } from "@/app/providers/ExchangeProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { useRef } from "react";


export default function ExchangePage() {
  const { rateData, txData, withdrawalAddress } = useExchange();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className="flex md:flex-row flex-col flex-wrap gap-5 justify-center items-center md:m-4 md:mt-32 mt-8">
      <ExchangeCard ref={buttonRef} setLoading={setLoading} />
      {rateData && !rateData.message &&
        <AddressesCard />
      }
      <Button
        className={cn(loading
          ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
          : "bg-primary hover:bg-primary-dark text-black",
          'w-full md:hidden font-bold h-[3.125rem] my-8 text-base z-50 rounded-[10px]')}
        onClick={() => buttonRef.current?.click()}
        disabled={loading || !rateData || !withdrawalAddress}
      >
        {loading ?
          <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
          :
          txData ? 'Stop Confirmation' : 'Exchange Now'
        }
      </Button>
    </section>
  );
}
