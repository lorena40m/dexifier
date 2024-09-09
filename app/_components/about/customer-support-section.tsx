"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CustomerSupportSection = () => {
  return (
    <section className="pt-[8.75rem] md:grid  grid-cols-12 lg:flex-row gap-10 lg:gap-8 xl:gap-[3.25rem]">
      <div className="flex flex-col gap-10 lg:gap-20 md:col-span-7">
        <div>
          <h1 className="font-bold text-xl sm:text-4xl lg:text-[2.5rem] text-center md:text-left leading-10 sm:leading-[3.75rem]">
            <span className="text-primary">24/7</span> Customer <br /> Support
          </h1>

          <p className="text-center md:text-start sm:leading-[1.5rem]">
            Having trouble with a swap? Head to our Discord, open a ticket or ask
            a question. Our international team & community are ready to help,
            around the clock.
          </p>
        </div>

        <Button
          variant={"secondary"}
          className="h-[3.5rem] max-w-[10.875rem] mx-auto md:mx-0 rounded-xl"
          onClick={() => {
            window.location.href = "https://discord.com/invite/phGmRdw6ku";
          }}
        >
          Join Discord
        </Button>
      </div>

      <Image
        src={"/assets/about-us/customer-support.png"}
        width={1000}
        height={1000}
        alt="customer support"
        className="self-center w-full h-auto  md:col-span-5 "
      />
    </section>
  );
};

export default CustomerSupportSection;
