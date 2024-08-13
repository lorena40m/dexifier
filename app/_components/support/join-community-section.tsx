import React, { ReactNode } from "react";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";

const JoinCommunitySection = () => {
  const socialLink = (icon: ReactNode, href: string) => (
    <a
      href={href}
      target="_blank"
      className="bg-primary hover:bg-primary-dark rounded-full text-black text-xl lg:text-[2.5rem] w-10 lg:w-[3.9375rem] h-10 lg:h-[3.9375rem] flex items-center justify-center transition-colors duration-300"
    >
      {icon}
    </a>
  );

  return (
    <section className="lg:h-2/5 py-10 lg:py-[3.1875rem] px-5 sm:px-8 lg:px-5 border border-seperator backdrop-filter backdrop-blur-lg bg-opacity-20 bg-[#333] rounded-3xl flex flex-col items-center justify-center gap-8 lg:gap-9">
      <h1 className="text-base sm:text-xl md:text-2xl text-center">
        Join Our Community
      </h1>

      <div className="flex gap-[1.125rem]">
        {socialLink(<FaDiscord />, "https://discord.com/invite/phGmRdw6ku")}
      </div>
    </section>
  );
};

export default JoinCommunitySection;
