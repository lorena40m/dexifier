import React from "react";
import Image from "next/image";

const FEATURES = [
  {
    title: "No Login/Signups",
    image: "/assets/about-us/no-login.svg",
  },
  {
    title: "No Cookies",
    image: "/assets/about-us/no-cookies.svg",
  },
  {
    title: "No KYC",
    image: "/assets/about-us/no-kyc.svg",
  },
]

const PrivacySection = () => {
  return (
    <section className="gap-16 lg:gap-8 xl:gap-[4.25rem]">
      <p className="font-semibold text-[2.25rem] xl:text-[4.5rem] text-primary pt-10">
        Privacy comes first
      </p>
      <p className="text-xl md:text-[2rem] xl:text-[34px] leading-relaxed py-4">
        At Dexifier, we believe in the unalienable right to privacy and
        freedom in the financial world. In a landscape cluttered with
        mandatory sign-ups and invasive KYC checks, we stand apart. Dexifier
        is your gateway to a decentralized exchange experience that fiercely
        protects your anonimity and financial privacy.
      </p>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-16">
        {FEATURES.map((feature, index) => (
          <div className="bg-primary aspect-square rounded-2xl overflow-hidden" key={index}>
            <p className="px-5 xl:px-[34px] pt-10 sm:pt-4 xl:pt-10 pb-5 text-black text-3xl xl:text-4xl font-medium">{feature.title}</p>
            <div className="relative">
              <Image
                key={index}
                src={feature.image}
                alt={feature.title}
                width={500}
                height={500}
                className="absolute right-0 w-3/4"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PrivacySection;
