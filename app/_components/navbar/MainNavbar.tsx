"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useWalletList, useWidget } from "@rango-dev/widget-embedded";
import CustomLoader from "../common/loader";
import WalletConnectModal from "../swap/WalletConnectModal";
import WalletDetails from "./WalletDetails";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import TokenIcon from "../common/token-icon";

// All navigation details
const NAVIGATIONS = [
  {
    text: "Support",
    path: "/support",
  },
  {
    text: "Docs",
    path: "https://docs.dexifier.com/",
    target: "_blank",
  },
  {
    text: "About Us",
    path: "/about",
  },
];

const MainNavbar = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const { details: connectedWallets, totalBalance, isLoading } = useWidget().wallets;
  const { list } = useWalletList({})

  const mappedWallets = connectedWallets.filter((connectedWallets, index, self) =>
    index === self.findIndex((w) => (
      w.walletType === connectedWallets.walletType
    ))
  ).map(wallet => {
    const detail = list.find(detail => detail.type === wallet.walletType);
    return {
      ...wallet,
      title: detail !== undefined ? detail.title : 'Unknown',
      image: detail !== undefined ? detail.image : null,
      link: detail !== undefined ? detail.link : null
    };
  });


  return (
    <header
      className={`w-screen fixed z-20 transition`}
      style={{ transitionDuration: "250ms" }}
    >
      <div className={`max-w-[86rem] mx-auto px-2 sm:px-6 lg:px-8 pt-12 pb-4`}>
        <div className="relative flex items-center justify-center md:justify-between">
          {/* Logo */}
          <div className="absolute inset-0 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-8 w-8`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Logo (hidden on small screens) */}
          <Link href="/">
            <Image
              className="md:w-64 w-44"
              src="/assets/logo.png"
              alt="Logo"
              width={258}
              height={64}
            />
          </Link>
          {/* Navigations */}
          <div className={`hidden md:flex space-x-5`}>
            {NAVIGATIONS.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                target={link.target}
                className={cn(pathname === link.path ? 'text-primary' : 'text-white', 'px-3 py-2 text-[1.375rem] transition-colors duration-300 hover:text-primary')}
              >
                {link.text}
              </Link>
            ))}
            {pathname === '/dex/swap' && (!connectedWallets.length ?
              <WalletConnectModal>
                <button className="flex text-[1.075rem] bg-primary rounded-full py-2 px-4 gap-2 items-center justify-center hover:opacity-80">
                  <Image
                    src={"/assets/icons/wallet.png"}
                    alt="Wallet Icon"
                    width={22}
                    height={22}
                  />
                  <span>Connect Wallet</span>
                </button>
              </WalletConnectModal>
              :
              <div className="flex">
                <WalletDetails>
                  <button className={cn(isLoading ? '' : 'bg-[#13f187]', 'text-[1.075rem] min-h-[35px] border border-primary rounded-l-full p-2 items-center justify-center hover:bg-opacity-80')}>
                    {isLoading ?
                      <CustomLoader className="w-full" />
                      :
                      <div className="flex space-x-1">
                        <div className="flex -space-x-5">
                          {mappedWallets && mappedWallets.map((wallet, index) => (
                            <TokenIcon
                              key={index}
                              token={{
                                image: wallet.image!,
                                alt: wallet.title,
                                className: "size-8",
                              }}
                            />
                          ))}
                        </div>
                        <span className="flex items-center">{totalBalance} $</span>
                      </div>
                    }
                  </button>
                </WalletDetails>
                <Separator orientation="vertical" />
                <WalletConnectModal>
                  <button className="rounded-r-full bg-primary p-2 pe-3 hover:bg-opacity-80">Add wallets</button>
                </WalletConnectModal>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile dropdown animation */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } md:hidden absolute top-[6rem] inset-x-0 bg-modal backdrop-filter backdrop-blur-sm z-10`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="main-menu"
      >
        <div className="flex flex-col space-y-2">
          {NAVIGATIONS.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`${pathname === link.path
                ? "text-primary font-bold"
                : "hover:bg-blue-50 hover:text-blue-500 text-white"
                } block px-3 py-2 rounded-md text-[22px] font-medium`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </header >
  );
};

export default MainNavbar;
