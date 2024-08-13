import Image from "next/image";
import React from "react";

const EasyAndInfiniteSection = () => {
  return (
    <section className="pt-36 md:pt-44 lg:pt-52 xl:pt-[15.4375rem] pb-16 lg:pb-[6.375rem]">
      <h1 className="mb-12 lg:mb-[3.75rem] text-center font-bold text-xl sm:text-4xl xl:text-5xl">
        <span className="text-primary">Easy</span> & Infinite Exchange routes
      </h1>

      <div className="grid md:grid-cols-12 lg:flex-row gap-12 lg:gap-[3.75rem] items-center">
        <Image
          src="/assets/about-us/exchange.png"
          width={1000}
          height={1000}
          alt="exchange"
          className="w-full h-auto md:col-span-4 lg:col-span-6"
        />

        <div className="text-base md:text-2xl lg:text-3xl xl:text-[2.0919rem] text-paragraph md:col-span-8 lg:col-span-6">
          <p>
            We automatically find the fastest & cheapest trade routes for you.
          </p>

          <p className="mt-5 lg:mt-[3.375rem]">
            With 50+ Blockchains supported, and 1000s of coins, there are no
            limits to what you can trade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EasyAndInfiniteSection;
