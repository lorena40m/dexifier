import React from "react";
import { Readex_Pro } from "next/font/google";
import { ReactNode } from "react";
import { FaDiscord, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const readexPro = Readex_Pro({ subsets: ["latin"] });

const FooterSection = () => {
  const socialLink = (icon: ReactNode, href: string) => (
    <a
      href={href}
      target="_blank"
      className="bg-black hover:bg-black/60 rounded-full text-white text-xs sm:text-sm md:text-base lg:text-xl w-5 sm:w-6 md:w-8 lg:w-[2.375rem] h-5 sm:h-6 md:h-8 lg:h-[2.375rem] flex items-center justify-center transition-colors duration-300"
    >
      {icon}
    </a>
  );
  return (
    <section className="mt-16 px-4 sm:px-8 md:px-16 lg:px-[7rem] py-[1.125rem] bg-primary flex justify-between items-center">
      <p
        className={`text-black font-light ${readexPro.className} text-xs sm:text-sm md:text-base`}
      >
        Copyright © 2024, Dexifier
      </p>

      <div className="flex gap-x-2 lg:gap-x-4">
        {socialLink(<FaXTwitter />, "https://twitter.com/DexifierX")}
        {socialLink(<FaDiscord />, "https://discord.com/invite/phGmRdw6ku")}
        {socialLink(
          <FaYoutube />,
          "https://www.youtube.com/@Dexifier?themeRefresh=1"
        )}
        {/* {socialLink(<FaFacebookF />, "https://www.facebook.com/")} */}
        {/* {socialLink(<FaLinkedinIn />, "https://www.linkedin.com/")} */}
      </div>
    </section>
  );
};

export default FooterSection;
