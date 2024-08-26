"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/redux_slice/provider";
import { useWalletList } from "../wallet/useWalletList";
import { ConnectedWallet, walletAssetsBalance } from "../types/interface";
import Modal from 'react-modal';
import { Divide, X } from "lucide-react";
import { getBananceOfWallet } from "../api/rango-api";
import CustomLoader from "./common/loader";
// import logo from "@/public/assets/logo.png";

const customStyles = {
  overlay: {
    backgroundColor: '#000000cc',
    zIndex: '30'
  },
  content: {
    width: '450px',
    height: '100%',
    top: '0',
    right: '0',
    transform: `translate(calc(100vw - 450px), 0)`,
  },
};

const MainNavbar = () => {

  Modal.setAppElement('#root');

  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  const { connectedWallets, refOfConnectButton } = useAppSelector((state) => state.wallet)
  const { tokens } = useAppSelector((state) => state.allToken);

  const [modalIsOpen, setIsModalOpen] = React.useState(false);

  const [walletBalance, setWalletBalance] = useState<walletAssetsBalance[]>();

  const { list } = useWalletList({})

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Example navigation links
  const navLinks = [
    { text: "Support", path: "/support" },
    { text: "Docs", path: "https://docs.dexifier.com/" },
    { text: "About Us", path: "/about" },
  ];

  useEffect(() => { }, []);

  async function openModal() {
    await setWalletBalanceData();
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const getAmountFromString = (amount: string, decimals: number) => {
    if (amount == null) {
      return "0";
    } else {
      if (amount === "0") {
        return amount;
      }
      const num = BigInt(amount);
      const divisor = BigInt(10 ** decimals);
      const integerPart = num / divisor;
      const remainder = num % divisor;
      let fractionalPart = remainder.toString().padStart(decimals, "0");
      fractionalPart = fractionalPart.slice(0, 3);
      let tokenPrice = integerPart.toString() + "." + fractionalPart;
      tokenPrice = tokenPrice.replace(/\.?0+$/, "");
      return tokenPrice;
    }
  }

  const setWalletBalanceData = async () => {
    setLoading(true);
    const getBalanceQuery = connectedWallets.map((connectedWallet) => {
      return connectedWallet.chain + "." + connectedWallet.address
    });
    const walletBalanceData = await getBananceOfWallet(getBalanceQuery);
    const sortedWalletBalance = walletBalanceData.sort((a, b) => { return b.balances?.length - a.balances?.length })
    setWalletBalance(sortedWalletBalance);
    setLoading(false);
  }

  const mappedWallets = connectedWallets.filter((connectedWallets, index, self) =>
    index === self.findIndex((w) => (
      w.walletType === connectedWallets.walletType
    ))
  ).map(wallet => {
    const detail = list.find(detail => detail.type === wallet.walletType);
    return {
      ...wallet,
      title: detail ? detail.title : 'Unknown',
      image: detail ? detail.image : null,
      link: detail ? detail.link : null
    };
  });

  const onClickWalletButton = () => {
    if (refOfConnectButton) {
      refOfConnectButton.click()
    }
  }
  const getAbbrAddress = (address: string) => {
    if (address == null) {
      return "null"
    }
    return address.slice(0, 4) + "..." + address.slice(-4)
  }

  const getWalletIcon = (blockchain: string, address: string) => {
    const walletType = connectedWallets.find(connectdWallet => connectdWallet.chain === blockchain && connectdWallet.address === address)?.walletType || "";
    return list.find(detail => detail.type === walletType)?.image;
  }

  const getTokeData = (blockchian: string, address: string) => {
    console.log("tokens ==>", tokens);

    const tokenData = tokens.find(token => token.blockchain === blockchian && token.address === address);
    if (tokenData) {
      return { usedPrice: tokenData.usdPrice || 0, image: tokenData.image }
    } else {
      return { usedPrice: 0, image: "/assets/tokens/default.png" }
    }
  }

  const SubWallet: React.FC<any> = ({ walletBalance }) => {
    console.log("walletBalance==>", walletBalance);
    return (
      <div className="pr-2">
        <button className="flex justify-between items-center text-sm border border-[#13f187] p-3 rounded-lg mt-2 w-full bg-[#13f18712] hover:opacity-80"
        >
          <div className="flex text-lg font-bold" >
            <Image src={getWalletIcon(walletBalance.blockChain, walletBalance.address) || "/assets/wallet/default"} width={28} height={28} alt={walletBalance.blockChain} className="mr-2" />
            {walletBalance.blockChain}
          </div>
          <span>{getAbbrAddress(walletBalance.address)}</span>
        </button>
        <div className="p-2 text-[#e5e7ebc9]">
          {walletBalance && walletBalance.balances && (walletBalance.balances.length === 0 ? <div className="text-sm"> No tokens found</div> : walletBalance.balances.map((balance: any, index: number) => {
            const { usedPrice, image } = getTokeData(balance?.asset.blockchain, balance?.asset.address);
            const amount = getAmountFromString(balance?.amount.amount, balance?.amount.decimals);
            return (
              <div key={index} className="flex justify-between items-center border-b border-b-[#13f18738] py-2">
                <div className="flex items-center">
                  <div className="p-3">
                    <Image src={image || "/assets/tokens/default.png"} width={34} height={34} alt={"token Icon"} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-md text-[#FFFFFF]">{balance?.asset.symbol}</span>
                    <span className="text-xs  text-[#717171] font-bold">{balance?.asset.blockchain}</span>
                  </div>
                </div>
                <div className="flex flex-col mr-3">
                  <span>{amount}</span>
                  <span className="text-xs">{(parseFloat(amount) * usedPrice).toFixed(3)} $</span>
                </div>
              </div>
            )
          }))}
        </div>
      </div>)
  }

  return (
    <nav
      className={`w-screen fixed z-20 transition ${isScrolled ? "bg-black" : ""
        }`}
      style={{ transitionDuration: "250ms" }}
    >
      <div className={`max-w-[86rem] mx-auto px-2 sm:px-6 lg:px-8 pt-12 pb-4 `}>
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {/* Logo (hidden on small screens) */}
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="block md:hidden "
                  src="/assets/logo.png"
                  alt="Logo"
                  width={142.5}
                  height={32}
                />
                <Image
                  className="hidden md:block "
                  src="/assets/logo.png"
                  alt="Logo"
                  width={285}
                  height={64}
                />
              </Link>
            </div>
          </div>
          {/* Navigation links */}
          <div className={`hidden md:flex md:space-x-5`}>
            <div className="flex space-x-5">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  target={link.text === "Docs" ? "_blank" : ""}
                  className={`${pathname === link.path
                    ? "text-primary font-bold"
                    : "text-white hover:text-primary"
                    } block px-3 py-2 rounded-md text-[1.375rem] transition-colors duration-300`}
                >
                  {link.text}
                </Link>
              ))}
              {!connectedWallets.length ?
                <button className="flex text-[1.075rem] bg-[#13f187] rounded-full p-2 pr-3 items-center justify-center hover:opacity-80"
                  onClick={onClickWalletButton}>
                  <div className="mx-2">
                    <Image
                      src={"/assets/icons/wallet.png"}
                      alt="button-icon"
                      width={22}
                      height={22}
                    />
                  </div>
                  <span>connect wallet</span>
                </button>
                : <div className="flex">
                  <button className="flex relative text-[1.075rem] min-h-[35px] border border-[#13f187] rounded-l-full rounded p-2 items-center justify-center hover:opacity-80"
                    style={{ backgroundColor: `${loading ? "" : "#13f187"}` }}
                    onClick={openModal}>
                    {loading ? <div className="w-[35px] absolute left-[8px] z-1"><CustomLoader /></div> : mappedWallets && mappedWallets.map((walletData, index) => (
                      <div key={index} style={{ position: 'absolute', left: '8px', zIndex: 1 }}>
                        <Image
                          src={walletData.image || ""}
                          alt="button-icon"
                          width={32}
                          height={32}
                          style={{ translate: `${1 + 0.6 * index * 25}px` }} // slightly increase size
                        />
                      </div>
                    ))
                    }
                    <span
                      style={{ paddingLeft: `${(1 + 0.6 * mappedWallets.length) * 25}px` }}></span>
                  </button>
                  <button
                    className="rounded-r-full color-[#141414] bg-[#13f187] p-2 pr-3 border-l hover:opacity-80" onClick={onClickWalletButton}> more wallet</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Mobile dropdown animation */}
      <div
        className={`${isOpen ? "block" : "hidden"
          } md:hidden absolute top-[6rem] bg-black inset-x-0 bg-gray-100 z-10`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="main-menu"
      >
        <div className="flex flex-col space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className={`${pathname === link.path
                ? "bg-blue-50 text-primary font-bold"
                : "hover:bg-blue-50 hover:text-blue-500 text-gray-900"
                } block px-3 py-2 rounded-md text-[22px] font-medium`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        className="bg-gradient-to-b from-black to-[#042214] border-l border-seperator z-30 p-4"
      >
        <div className="flex justify-end p-2">
          <button onClick={closeModal}>
            <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </button>
        </div>
        <div className="text-2xl font-bold border-b border-[#5f5f5f] p-2">Your wallet</div>
        <div className="overflow-auto h-full pb-[100px] pt-[20px]">
          {walletBalance && walletBalance.map((walletBalance, index) => (
            <SubWallet key={index} walletBalance={walletBalance} />
          ))}
        </div>
      </Modal>
    </nav >
  );
};

export default MainNavbar;
