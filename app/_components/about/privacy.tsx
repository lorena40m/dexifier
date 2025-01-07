"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

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
      <p className="font-semibold text-[2.25rem] md:text-[3rem] xl:text-[4.5rem] text-primary pt-10">
        Privacy comes first
      </p>
      <TextGenerateEffect
        className="text-xl md:text-[2rem] xl:text-[34px] leading-relaxed py-4"
        words={`At Dexifier, we believe in the unalienable right to privacy and
freedom in the financial world. In a landscape cluttered with
mandatory sign-ups and invasive KYC checks, we stand apart. Dexifier
is your gateway to a decentralized exchange experience that fiercely
protects your anonimity and financial privacy.`}
      />
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-16">
        {FEATURES.map((feature, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1, transition: { type: "spring", duration: 2 } }}
            viewport={{ amount: 0.4, once: true }}
            key={index}
            className="bg-primary aspect-square rounded-2xl overflow-hidden"
          >
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
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PrivacySection;