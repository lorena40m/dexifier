import Image from "next/image";
import React from "react";

const ExchangeSection = () => {
  return (
    <section className="pt-36 md:pt-44 lg:pt-52 xl:pt-[15.4375rem] px-[34px]">

      <div className="flex flex-col md:flex-row justify-center items-center gap-[2rem] md:gap-[76px]">
        <Image
          src="/assets/about-us/exchange.png"
          width={1000}
          height={1000}
          alt="exchange"
          className="md:col-span-4 md:w-1/2"
        />

        <div className="text-center md:text-left">
          <p className="font-semibold text-[2.25rem] md:text-[3rem] xl:text-[4.5rem] text-primary leading-tight">
            Easy & Infinite Exchange routes
          </p>

          <p className="mt-5 text-xl sm:text-[1.5rem] md:text-[2rem] xl:mt-[3.5rem] leading-normal">
            We automatically find the fastest & cheapest trade routes for you.
            <br/><br/>
            With 50+ Blockchains supported, and 1000s of coins, there are no
            limits to what you can trade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExchangeSection;
