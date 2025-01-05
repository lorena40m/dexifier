"use client";

import Link from "next/link";
import React from "react";
import { AiOutlineDiscord } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";
import { RiMediumLine } from "react-icons/ri";
import { PiYoutubeLogo } from "react-icons/pi";
import { VscGithub } from "react-icons/vsc";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

interface Social {
  icon: IconType;
  link: string;
}

const SOCIALS: Social[] = [
  {
    icon: AiOutlineDiscord,
    link: "https://discord.com/invite/phGmRdw6ku",
  },
  {
    icon: TbBrandTelegram,
    link: "https://t.me/dexifier",
  },
  {
    icon: FaXTwitter,
    link: "https://twitter.com/DexifierX",
  },
  {
    icon: RiMediumLine,
    link: "https://medium.com/dexifier",
  },
  {
    icon: PiYoutubeLogo,
    link: "https://www.youtube.com/@Dexifier",
  },
  {
    icon: VscGithub,
    link: "https://github.com/dexifier",
  },
]

const CommunitySection = () => {
  return (
    <section className="w-full max-w-[67rem] mx-auto flex flex-col items-center">
      <p className="font-semibold text-[2.25rem] md:text-[3rem] xl:text-[4.5rem] text-primary leading-tight">
        Join Our Community
      </p>
      <p className="text-xl md:text-[2rem] xl:text-[34px] leading-relaxed py-6 text-center">
        Discover the latest insights on Discord, engage with fellow
        crypto enthusiasts on Telegram, follow our pulse on Twitter,
        catch our informative and entertaining videos on YouTube.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 125 }}
        whileInView={{ opacity: 1, y: 0, transition: { type: "spring", duration: 2 } }}
        viewport={{ amount: 0.4, once: true }}
        className="grid grid-cols-3 md:grid-cols-6 gap-8 pt-8"
      >
        {SOCIALS.map((social, index) => (
          <Link href={social.link} target="_blank" key={index}>
            <social.icon className="text-primary size-8 md:size-10 lg:size-12 xl:size-14" />
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default CommunitySection;
