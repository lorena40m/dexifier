import React, { ReactNode } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const FollowUsSection = () => {
  const socialLink = (icon: ReactNode, text: string, href: string) => (
    <a
      href={href}
      target="_blank"
      className="flex flex-col gap-6 items-center justify-center"
    >
      <div className="bg-primary hover:bg-primary-dark rounded-lg text-black text-xl lg:text-4xl w-10 lg:w-[2.9375rem] h-10 lg:h-[2.9375rem] flex items-center justify-center transition-colors duration-300">
        {icon}
      </div>

      <h2 className="text-sm sm:text-base">{text}</h2>
    </a>
  );

  return (
    <section className="h-3/5 py-10 lg:py-[3.75rem] px-5 sm:px-8 lg:px-5 border border-seperator backdrop-filter backdrop-blur-lg bg-opacity-20 bg-[#333] rounded-3xl flex flex-col items-center justify-center gap-8 lg:gap-[3.1875rem]">
      <h1 className="text-base sm:text-xl md:text-2xl text-center">
        Follow Us
      </h1>

      <div className="flex gap-6">
        {socialLink(
          <FaYoutube />,
          "Youtube",
          "https://www.youtube.com/@Dexifier?themeRefresh=1"
        )}
        {socialLink(<FaXTwitter />, "Twitter", "https://twitter.com/DexifierX")}
      </div>
    </section>
  );
};

export default FollowUsSection;
