import Image from "next/image";
import React, { ReactNode } from "react";
import { FaYoutube, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const CommunitySection = () => {
  const socialLink = (icon: ReactNode, href: string) => (
    <a
      href={href}
      target="_blank"
      className="bg-primary hover:bg-primary-dark rounded-full text-black text-xl lg:text-3xl w-10 lg:w-[3.9375rem] h-10 lg:h-[3.9375rem] flex items-center justify-center transition-colors duration-300"
    >
      {icon}
    </a>
  );
  return (
    <section className="pt-[8.75rem] grid grid-cols-12 items-start lg:items-center gap-10 lg:gap-8 xl:gap-[3.25rem]">
      <div className="col-span-6  xl:w-auto xl:max-w-[34.6875rem]">
        <h1 className="pb-5 md:pb-10 lg:pb-[3.75rem] font-bold text-xl sm:text-4xl lg:text-4xl text-center lg:text-left leading-10 sm:leading-[3.5rem]">
          <span className="text-primary">Join</span> Our Community!
        </h1>

        <p className="pb-6 lg:pb-12 text-sm sm:text-base lg:text-xl sm:leading-[1.5rem]">
          Discover the latest insights on Discord, engage with fellow crypto
          enthusiasts on Telegram, follow our pulse on Twitter, catch our
          informative and entertaining videos on YouTube.
        </p>

        <div className="flex gap-x-4">
          {socialLink(<FaXTwitter />, "https://twitter.com/DexifierX")}
          {socialLink(<FaDiscord />, "https://discord.com/invite/phGmRdw6ku")}
          {socialLink(
            <FaYoutube />,
            "https://www.youtube.com/@Dexifier?themeRefresh=1"
          )}
          {/* {socialLink(<FaFacebookF />, "https://www.facebook.com/")}
          {socialLink(<FaLinkedinIn />, "https://www.linkedin.com/")} */}
        </div>
      </div>

      <Image
        src={"/assets/about-us/community.png"}
        width={635}
        height={635}
        alt="Community"
        className="self-center col-span-6"
      />
    </section>
  );
};

export default CommunitySection;
