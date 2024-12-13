"use client";
import React, { DO_NOT_USE_OR_YOU_WILL_BE_FIRED_CALLBACK_REF_RETURN_VALUES, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/redux_slice/provider";
import { useWalletList } from "../wallet/useWalletList";
import { WALLET } from "../types/interface";
import Modal from 'react-modal';
import { X } from "lucide-react";
import { getWalletBalance } from "../api/rango";
import CustomLoader from "./common/loader";
import { getAbbrAddress } from "../utils/catch-data";
import TooltipTemplate from "./common/tooltip-template";
import ButtonCopyIcon from "./common/coyp-button-icon";
import ShadowDecoration from "./common/shadow-decoration";
import Search from "./common/search";
import { updateRequiredChain, updateWallets } from "@/redux_slice/slice/browserSlice/walletSlice";
import { useDispatch } from "react-redux";
import { WalletSelector, BlockchainSelector, HideFilterSelector } from "./common/multi-select";
import { updateFilterChain, updateFilterEmptyWallet, updateFilterLoading, updateFilterSmallBalance, updateFilterUnsupportedToken, updateFilterWallet } from "@/redux_slice/slice/browserSlice/filterSlice";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { Amount, Asset, AssetAndAmount, WalletDetail, WalletDetailsResponse } from "rango-types/mainApi";

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

// Example navigation links
const navLinks = [
  { text: "Support", path: "/support" },
  { text: "Docs", path: "https://docs.dexifier.com/" },
  { text: "About Us", path: "/about" },
];

const filterOptions = [
  "Hide small balances",
  "Hide empty wallets",
  "Hide unsupported tokens"
];

const MainNavbar = () => {

  Modal.setAppElement('#root');

  const pathname = usePathname();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [search, setSearch] = useState<string>("");
  const [totalUSDAmount, setTotalUSDAmount] = useState<number>(0)

  const { connectedWallets, refOfConnectButton, wallets } = useAppSelector((state) => state.wallet);
  const { filterWalletList, filterChainList } = useAppSelector((state) => state.filter)
  const { isHideSmallBalance, isHideEmptyWallet, isHideUnsupportedToken, filterLoading } = useAppSelector((state) => state.filter);
  const { blockchains } = useAppSelector((state) => state.blockchains)
  const { tokens } = useAppSelector((state) => state.allToken);
  const { wallet } = useAppSelector((state) => state.settings);

  const [modalIsOpen, setIsModalOpen] = React.useState(false);
  const [filteredWallet, setFilteredWallet] = useState<WalletDetail[]>([]);

  const { list } = useWalletList({})

  const connectedWalletsMemo = useMemo(() => connectedWallets, [connectedWallets]);

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

  useEffect(() => {

    if (pathname === "/" && wallet === WALLET.BROWSE) {
      setActiveLink(true);
    } else {
      setActiveLink(false);
    }

  }, [pathname, wallet]);

  useEffect(() => {
    setFilteredWallet(structuredClone(wallets).filter((wallet) => {
      const walletBalance = getWalletBalanceInUSD([wallet]);
      const walletType = connectedWallets.find(connectedWallet => connectedWallet.address === wallet.address && connectedWallet.chain === wallet.blockChain)?.walletType || '';
      // Exclude wallets with zero balance if 'isHideEmptyWallet' is true
      if (isHideEmptyWallet && !walletBalance) return false;
      // Exclude wallets with unselected chains and wallet types
      if (!filterChainList.includes(wallet.blockChain) || !filterWalletList.includes(walletType)) return false;
      // Filter wallets with search term
      if (!wallet.blockChain.toLowerCase().includes(search.toLowerCase())) return false;
      // Exclude unsupported tokens in the wallet if 'isHideUnsupportedToken' is true
      if (isHideUnsupportedToken && wallet.balances) {
        wallet.balances = wallet.balances.filter(balance => getTokenData(balance.asset))
      }
      // Exclude tokens with small balance in the wallet if 'isHideSmallBalance' is true
      if (isHideSmallBalance && wallet.balances) {
        wallet.balances = wallet.balances.filter(balance => getTokenBalanceInUSD(balance) > 0.1)
      }
      return true;
    }).sort((a, b) => getWalletBalanceInUSD([b]) - getWalletBalanceInUSD([a])));
  }, [
    search,
    filterWalletList,
    filterChainList,
    wallets,
    isHideSmallBalance,
    isHideEmptyWallet,
    isHideUnsupportedToken
  ]);

  useEffect(() => {

    const filterWalletList = mappedWallets.map((wallet) => ({ ...wallet, selected: true })).filter((updatedWallet) => updatedWallet.selected).map((wallet) => wallet.walletType)
    dispatch(updateFilterWallet({ filterWalletList: filterWalletList }));
    const filterChainList = blockchains.filter((updatedBlockchain) => updatedBlockchain.enabled).map((chain) => chain.name)
    dispatch(updateFilterChain({ filterChainList: filterChainList }));

    fetchWalletsDetails()
  }, [connectedWalletsMemo])

  async function openModal() {
    setLoading(true);
    // const filterWalletList = mappedWallets.map((wallet) => ({ ...wallet, selected: true })).filter((updatedWallet) => updatedWallet.selected).map((wallet) => wallet.walletType)
    // dispatch(updateFilterWallet({ filterWalletList: filterWalletList }));
    // const filterChainList = blockchains.filter((updatedBlockchain) => updatedBlockchain.enabled).map((chain) => chain.name)
    // dispatch(updateFilterChain({ filterChainList: filterChainList }));

    dispatch(updateFilterSmallBalance({ isHideSmallBalance: true }));
    dispatch(updateFilterEmptyWallet({ isHideEmptyWallet: false }));
    dispatch(updateFilterUnsupportedToken({ isHideUnsupportedToken: true }));

    setIsModalOpen(true);
    setLoading(false);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const getTokenData = (ast: Asset) => {
    return tokens.find(token => token.blockchain === ast.blockchain && token.address === ast.address);
  }

  const calcAmount = (amt: Amount) => {
    return Number(amt.amount) / Number(10 ** amt.decimals)
  }

  const getTokenBalanceInUSD = (token: AssetAndAmount) => {
    const tokenData = getTokenData(token.asset);
    return calcAmount(token.amount) * (tokenData?.usdPrice || 0);
  }

  const getWalletBalanceInUSD = (wallets: WalletDetail[]) => {
    const walletBalanceInUSD = wallets.map(wallet => {
      if (!wallet.balances) return 0;
      return wallet.balances?.map(balance => {
        return getTokenBalanceInUSD(balance);
      }).reduce((acc, cur) => acc + cur, 0);
    }).reduce((acc, cur) => acc + cur, 0);

    return walletBalanceInUSD;
  };

  const fetchWalletsDetails = async () => {
    setLoading(true);
    dispatch(updateFilterLoading({ filterLoading: true }));
    try {
      dispatch(updateTokenValue({ isFromToken: true, value: "0" }));

      const wallets = await getWalletBalance(
        connectedWallets.map(connectedWallet => `${connectedWallet.chain}.${connectedWallet.address}`)
      );
      setTotalUSDAmount(getWalletBalanceInUSD(wallets));
      dispatch(updateWallets({ wallets: wallets }));
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    } finally {
      setLoading(false);
      dispatch(updateFilterLoading({ filterLoading: false }));
      dispatch(updateFilterWallet({ filterWalletList: connectedWallets.map((connectedWallet) => connectedWallet.walletType) }));
    }
  };

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

  const handleWalletConnect = () => {
    if (refOfConnectButton) {
      dispatch(updateRequiredChain({ requiredChain: "" }));
      refOfConnectButton.click()
    }
  }

  const getWalletIcon = (blockchain: string, address: string) => {
    const walletType = connectedWallets.find(connectdWallet => connectdWallet.chain === blockchain && connectdWallet.address === address)?.walletType || "";
    return list.find(detail => detail.type === walletType)?.image;
  }

  const SubWallet: React.FC<any> = ({ wallet }: { wallet: WalletDetail }) => {
    const [isOpen, SetIsOpen] = useState<boolean>(wallet.balances === null);
    const balanceInUSD = getWalletBalanceInUSD([wallet]);
    return (
      <div className="pr-2">
        <button className="flex justify-between items-center text-sm border border-primary hover:opacity-80 p-3 rounded-lg mt-2 w-full bg-[#13f1871f]"
          onClick={() => SetIsOpen(!isOpen)}
        >
          <div className="flex text-lg font-bold items-center" >
            <div className="mr-2">
              <Image src={"/assets/icons/arrow.png"}
                className={`transition-transform duration-500 ease-in-out ${!isOpen ? 'rotate-0' : 'rotate-180'}`}
                width={20}
                height={20}
                alt={"arrow"}
              />
            </div>
            <Image src={getWalletIcon(wallet.blockChain, wallet.address) || "/assets/wallet/default"} width={28} height={28} alt={wallet.blockChain} className="mr-2" />
            {wallet.blockChain}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span>{getAbbrAddress(wallet.address)}</span>
              <ButtonCopyIcon text={wallet.address} />
              <TooltipTemplate content={"link to wallet"} className="px-2 py-1">
                <Link href={wallet.explorerUrl} target="_black">
                  <Image src={"/assets/icons/link.png"} width={18} height={18} alt="link" />
                </Link>
              </TooltipTemplate>
            </div>
            <span className="text-primary">{balanceInUSD && balanceInUSD.toFixed(3) + "$" || ""}</span>
          </div>
        </button>
        <div className="p-2 text-[#e5e7ebc9]">
          {wallet && wallet.balances && isOpen && (wallet.balances.length === 0 ? <div className="text-sm text-center "> No tokens found</div> : wallet.balances.map((balance: AssetAndAmount, index: number) => {
            return (
              <div key={index} className="flex justify-between items-center border-b border-b-[#13F18738] py-2">
                <div className="flex items-center">
                  <div className="p-3">
                    <Image src={getTokenData(balance.asset)?.image || "/assets/tokens/default.png"} width={34} height={34} alt={"token Icon"} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-md text-[#FFFFFF]">{balance.asset.symbol}</span>
                    <span className="text-xs  text-[#717171] font-bold">{balance.asset.blockchain}</span>
                  </div>
                </div>
                <div className="flex flex-col mr-3">
                  <span>{calcAmount(balance.amount)}</span>
                  <span className="text-xs">{getTokenBalanceInUSD(balance).toFixed(2)} $</span>
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
          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="w-[200px] h-[45px]">
                  <Image
                    className="block md:hidden "
                    src="/assets/logo.png"
                    alt="Logo"
                    width={200}
                    height={80}
                  />
                </div>
                <div className="">
                  <Image
                    className="hidden md:block "
                    src="/assets/logo.png"
                    alt="Logo"
                    width={285}
                    height={64}
                  />
                </div>
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
              {activeLink && (!connectedWallets.length ?
                <button className="flex text-[1.075rem] bg-primary rounded-full p-2 pr-3 items-center justify-center hover:opacity-80"
                  onClick={handleWalletConnect}>
                  <div className="mx-2">
                    <Image
                      src={"/assets/icons/wallet.png"}
                      alt="button-icon"
                      width={22}
                      height={22}
                    />
                  </div>
                  <span>Connect Wallet</span>
                </button>
                : <div className="flex">
                  <button className="flex relative text-[1.075rem] min-h-[35px] border border-primary rounded-l-full rounded p-2 items-center justify-center hover:opacity-80"
                    style={{ backgroundColor: `${loading ? "" : "#13f187"}` }}
                    onClick={openModal}>
                    {loading ? <div className="w-[35px] absolute left-[8px] z-1"><CustomLoader /></div> :
                      mappedWallets && mappedWallets.map((walletData, index) => (
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
                      style={{ paddingLeft: `${(1 + 0.6 * mappedWallets.length) * 25}px` }}>
                      {!loading && <span>{totalUSDAmount} $</span>}
                    </span>
                  </button>
                  <button
                    className="rounded-r-full color-[#141414] bg-primary p-2 pr-3 border-l hover:opacity-80" onClick={handleWalletConnect}>Add wallets</button>
                </div>
              )
              }
            </div>
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
          {navLinks.map((link, index) => (
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customStyles}
        className="bg-gradient-to-b to-[#002f19] from-[#01150c] border-l border-seperator z-30 p-4"
      >

        <div className="flex justify-end p-2">
          <div className="w-full flex justify-center">
            <span className="text-xl text-primary">{getWalletBalanceInUSD(filteredWallet).toFixed(4)}$</span>
          </div>
          <button onClick={closeModal}>
            <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </button>
        </div>
        <div className="text-2xl font-bold border-b border-[#5f5f5f] p-2 mb-4 flex items-center justify-between">
          <span>Your Wallet</span>
          <button onClick={fetchWalletsDetails}>
            <Image src={"/assets/icons/reset-icon.png"} width={20} height={20} alt="refresh" />
          </button>
        </div>

        <Search search={search} setSearch={setSearch} />
        <div className="flex justify-between pb-2">
          <div className="w-[40%]">
            <WalletSelector walletOptions={mappedWallets} />
          </div>
          <div className="w-[45%]">
            <BlockchainSelector blockchainOptions={blockchains} />
          </div>
          <div className="w-[10%]">
            <HideFilterSelector filterOptions={filterOptions} />
          </div>
        </div>
        <div className="relative h-[calc(100%-220px)] ">
          <ShadowDecoration />
          <div className="overflow-auto h-full">
            {filteredWallet.map((wallet, index) => (
              <SubWallet key={index} wallet={wallet} />
            ))}
          </div>
        </div>
      </Modal>
    </nav >
  );
};

export default MainNavbar;
