"use client";

import AddressesCard from "@/app/_components/exchange/AddressCard";
import ExchangeCard from "@/app/_components/exchange/ExchangeCard";
import { useExchange } from "@/app/providers/ExchangeProvider";

export default function ExchangePage() {
  const { rateData } = useExchange();
  return (
    <section className="md:flex hidden flex-wrap gap-5 justify-center items-center m-4 mt-32">
      <ExchangeCard />
      {rateData && !rateData.message &&
        <AddressesCard />
      }
    </section>
  );
}
