import { Button } from "@/components/ui/button";
import Link from "next/link";

const CustomerSection = () => {
  return (
    <section className="relative z-10 overflow-hidden rounded-2xl text-center md:px-24 md:py-14 p-8">
      <p className="font-semibold text-[2.25rem] md:text-[3rem] xl:text-[4.5rem] text-primary leading-tight">
        24/7 Customer Support
      </p>
      <p className="text-xl md:text-[2rem] xl:text-[34px] leading-relaxed py-6">
        Having trouble with a swap? Head to our Discord, open a ticket or ask
        a question. Our international team & community are ready to help,
        around the clock.
      </p>
      <Link href={"https://discord.com/invite/phGmRdw6ku"} target="_blank">
        <Button
          variant={"primary"}
          className="h-[3rem] max-w-[13.5rem] mx-auto rounded-md"
        >
          Join Discord
        </Button>
      </Link>
      <div
        className="absolute z-[-2] left-[-25%] top-[-150%] w-[150%] h-auto aspect-square bg-[#04100c] bg-no-repeat"
        style={{
          backgroundImage: "conic-gradient(transparent, white)",
          animation: "l15 4s linear infinite",
        }}
      />
      <div className="absolute z-[-1] left-[2px] top-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)] rounded-2xl bg-[#04100c]" />
    </section>
  );
};

export default CustomerSection;
