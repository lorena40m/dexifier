import React from "react";

const PrivacySection = () => {
  const smallBox = (text: string) => (
    <div className="text-primary text-center flex items-center justify-center border border-dashed border-primary rounded-3xl w-full">
      {text}
    </div>
  );
  return (
    <section className="flex flex-col lg:flex-row gap-16 lg:gap-8 xl:gap-[4.25rem]">
      <div className="flex flex-col gap-6 lg:gap-10 lg:w-3/6">
        <h1 className="font-bold text-xl sm:text-4xl lg:text-5xl text-center lg:text-left">
          <span className="text-primary">Privacy</span> comes first
        </h1>

        <p className="md:text-[1.3313rem] sm:leading-[2rem]">
          At Dexifier, we believe in the unalienable right to privacy and
          freedom in the financial world. In a landscape cluttered with
          mandatory sign-ups and invasive KYC checks, we stand apart. Dexifier
          is your gateway to a decentralized exchange experience that fiercely
          protects your anonimity and financial privacy.
        </p>

        <p className="md:text-[1.3313rem] font-bold">
          No Logins, No Cookies, No KYC -- EVER.
        </p>
      </div>

      <div className="flex flex-col gap-7 text-xl sm:text-3xl md:text-[2.6688rem] font-bold lg:w-3/6">
        <div className="py-10 sm:py-16 md:py-[6.25rem] flex items-center justify-center bg-primary text-black rounded-3xl">
          NO logins/ signups
        </div>

        <div className="flex gap-5 w-full h-24 sm:h-[8.75rem] md:h-[10.6875rem]">
          {smallBox("No cookies")}
          {smallBox("NO kyc")}
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;
