"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/redux_slice/provider";
import { useWalletList } from "../wallet/useWalletList";
import { WALLET, WalletAssetsBalance } from "../types/interface";
import Modal from 'react-modal';
import { X } from "lucide-react";
import { getBananceOfWallet } from "../api/rango-api";
import CustomLoader from "./common/loader";
import { getAbbrAddress } from "../utils/catch-data";
import TooltipTemplate from "./common/tooltip-template";
import ButtonCopyIcon from "./common/coyp-button-icon";
import ShadowDecoration from "./common/shadow-decoration";
import Search from "./common/search";
import { updateRequiredChain, updateWalletBalances } from "@/redux_slice/slice/browserSlice/walletSlice";
import { useDispatch } from "react-redux";
import { WalletSelector, BlockchainSelector, HideFilterSelector } from "./common/multi-select";
import { updateFilterChain, updateFilterEmptyWallet, updateFilterLoading, updateFilterSmallBalance, updateFilterUnsupportedToken, updateFilterWallet } from "@/redux_slice/slice/browserSlice/filterSlice";
import { updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";

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
  const [totalUSDAmount, setTotalUSDAmount] = useState<string>("0")

  const { connectedWallets, refOfConnectButton, walletBalances } = useAppSelector((state) => state.wallet);
  const { filterWalletList, filterChainList } = useAppSelector((state) => state.filter)
  const { isHideSmallBalance, isHideEmptyWallet, isHideUnsupportedToken, filterLoading } = useAppSelector((state) => state.filter);
  const { blockchains } = useAppSelector((state) => state.blockchains)
  const { tokens } = useAppSelector((state) => state.allToken);
  const { wallet } = useAppSelector((state) => state.settings);

  const [modalIsOpen, setIsModalOpen] = React.useState(false);
  const [filteredBalanceData, setFilteredBalanceData] = useState<WalletAssetsBalance[]>();

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
    const filterFunction = async () => {
      let filteredBalances = [];
      const tempFilteredBalances = walletBalances && walletBalances.filter((balance) => {
        const walletBalance = getWalletUSDBalance(balance);
        const walletType = connectedWallets.find((connectedWallet) => connectedWallet.address === balance.address && connectedWallet.chain === balance.blockChain)?.walletType;
        return (isHideEmptyWallet ? walletBalance > 0 : true) &&
          (filterChainList === undefined ? false : filterChainList.includes(balance.blockChain)) &&
          (walletType === undefined ? false : filterWalletList.includes(walletType)) &&
          (balance.blockChain != null
            ? balance.blockChain.toLowerCase().includes(search.toLowerCase())
            : false)
      }
      );

      if (isHideUnsupportedToken) {
        const tempBalancesWithSupportedChain = tempFilteredBalances && tempFilteredBalances.map((balances) => {
          const newBalances = balances.balances.filter((balance) => {
            const matchToken = tokens.find((token) => token.blockchain === balance.asset.blockchain && token.address === balance.asset.address);
            if (matchToken) {
              return true
            } else {
              return false
            }
          })
          return { ...balances, balances: newBalances }
        })
        filteredBalances = tempBalancesWithSupportedChain;
      } else {
        filteredBalances = tempFilteredBalances;
      }

      if (isHideSmallBalance) {
        filteredBalances = filteredBalances && filteredBalances.map((balances) => {
          const newBalances = balances.balances.filter((balance) =>
            (balance.usdAmount || 0) > 0.1
          )
          return { ...balances, balances: newBalances }
        })
      }

      const sortBalance = async (filteredBalances: WalletAssetsBalance[]) => (filteredBalances.sort((a, b) => getWalletUSDBalance(b) - getWalletUSDBalance(a)));
      filteredBalances = await sortBalance(filteredBalances);
      setFilteredBalanceData(filteredBalances || []);
    }

    filterFunction();
  }, [search,
    filterWalletList,
    filterChainList,
    walletBalances,
    isHideSmallBalance,
    isHideEmptyWallet,
    isHideUnsupportedToken]);

  useEffect(() => {

    const filterWalletList = mappedWallets.map((wallet) => ({ ...wallet, selected: true })).filter((updatedWallet) => updatedWallet.selected).map((wallet) => wallet.walletType)
    dispatch(updateFilterWallet({ filterWalletList: filterWalletList }));
    const filterChainList = blockchains.filter((updatedBlockchain) => updatedBlockchain.enabled).map((chain) => chain.name)
    dispatch(updateFilterChain({ filterChainList: filterChainList }));

    setWalletBalanceData()
      .then(() => {
        console.log("get balance data success");
      }).catch(() => {
        console.log("get balance data error");
      });
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

  const getWalletUSDBalance = (balance: WalletAssetsBalance) => {
    let walletBalance = 0;
    if (balance.balances.length === 0) {
      return 0;
    }
    balance.balances.forEach((balance) => {
      walletBalance += balance.usdAmount || 0
    })
    return walletBalance;
  }

  const getFilteredWalletUSDBalance = (filteredBalanceDatas: WalletAssetsBalance[]) => {
    let filterWalletBalance = 0;
    filteredBalanceDatas.forEach((filteredBalanceData) => {
      filterWalletBalance += getWalletUSDBalance(filteredBalanceData);
    })
    return filterWalletBalance;
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

  const getWalletBalanceWithUSD = async (sortedWalletBalance: WalletAssetsBalance[]) => {
    setTotalUSDAmount("0");
    let totalUSDAmount = 0;
    const walletBalanceWithUSD = await Promise.all(
      sortedWalletBalance && sortedWalletBalance.map(async (walletData) => {
        const balance = walletData.balances && walletData.balances.length !== 0
          ? await Promise.all(walletData.balances.map(async (balance) => {
            if (!balance || !balance.amount) return balance; // Check if balance or balance.amount is null/undefined

            const { usedPrice } = getTokeData(balance?.asset.blockchain, balance?.asset.address);
            const amount = getAmountFromString(balance?.amount?.amount, balance?.amount?.decimals);

            const usdAmount = parseFloat(amount) * (usedPrice || 0); // Add fallback for usedPrice
            totalUSDAmount += usdAmount;
            return { ...balance, usdAmount: usdAmount };
          }))
          : [];

        return {
          ...walletData,
          balances: balance,
        };
      })
    );

    if (totalUSDAmount > 0) {
      setTotalUSDAmount(totalUSDAmount.toFixed(2));
    }

    return walletBalanceWithUSD;
  };

  const setWalletBalanceData = async () => {
    setLoading(true);
    dispatch(updateFilterLoading({ filterLoading: true }));

    try {
      dispatch(updateTokenValue({ isFromToken: true, value: "0" }));

      const getBalanceQuery = async () => connectedWallets.map((connectedWallet) =>
        connectedWallet.chain + "." + connectedWallet.address
      );

      const balanceQuery = await getBalanceQuery();
      const walletBalanceData = await getBananceOfWallet(balanceQuery);

      if (!walletBalanceData) throw new Error("No wallet balance data found"); // Added null check for walletBalanceData
      const walletBalanceWithUSD = await getWalletBalanceWithUSD(walletBalanceData);
      dispatch(updateWalletBalances({ walletBalances: walletBalanceWithUSD }));
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    } finally {
      setLoading(false);
      dispatch(updateFilterLoading({ filterLoading: false }));
      dispatch(updateFilterWallet({ filterWalletList: connectedWallets.map((connectedWallet) => connectedWallet.walletType) }));
    }
  };


  const refreshWalletBalance = async () => {
    setIsModalOpen(false);
    await setWalletBalanceData()
    setIsModalOpen(true);
  }

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

  const onClickWalletButton = () => {
    if (refOfConnectButton) {
      dispatch(updateRequiredChain({ requiredChain: "" }));
      refOfConnectButton.click()
    }
  }

  const getWalletIcon = (blockchain: string, address: string) => {
    const walletType = connectedWallets.find(connectdWallet => connectdWallet.chain === blockchain && connectdWallet.address === address)?.walletType || "";
    return list.find(detail => detail.type === walletType)?.image;
  }

  const getTokeData = (blockchian: string, address: string | null) => {

    const tokenData = tokens.find(token => token.blockchain === blockchian && token.address === address);
    if (tokenData) {
      return { usedPrice: tokenData.usdPrice || 0, image: tokenData.image }
    } else {
      return { usedPrice: 0, image: "/assets/tokens/default.png" }
    }
  }

  const SubWallet: React.FC<any> = ({ walletBalance, index }) => {
    const [isOpen, SetIsOpen] = useState<boolean>(walletBalance.balances.length === 0 ? false : true);
    const totalAmount = getWalletUSDBalance(walletBalance);
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
            <Image src={getWalletIcon(walletBalance.blockChain, walletBalance.address) || "/assets/wallet/default"} width={28} height={28} alt={walletBalance.blockChain} className="mr-2" />
            {walletBalance.blockChain}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span>{getAbbrAddress(walletBalance.address)}</span>
              <ButtonCopyIcon text={walletBalance.address} />
              <TooltipTemplate content={"link to wallet"} className="px-2 py-1">
                <Link href={walletBalance.explorerUrl} target="_black">
                  <Image src={"/assets/icons/link.png"} width={18} height={18} alt="link" />
                </Link>
              </TooltipTemplate>
            </div>
            <span className="text-primary">{totalAmount === 0 ? "" : totalAmount.toFixed(3) + "$"}</span>
          </div>
        </button>
        <div className="p-2 text-[#e5e7ebc9]">
          {walletBalance && walletBalance.balances && isOpen && (walletBalance.balances.length === 0 ? <div className="text-sm text-center "> No tokens found</div> : walletBalance.balances.map((balance: any, index: number) => {
            const { image } = getTokeData(balance?.asset.blockchain, balance?.asset.address);
            const amount = getAmountFromString(balance?.amount.amount, balance?.amount.decimals);
            return (
              <div key={index} className="flex justify-between items-center border-b border-b-[#13F18738] py-2">
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
                  <span className="text-xs">{parseFloat(balance.usdAmount).toFixed(2)} $</span>
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
                  onClick={onClickWalletButton}>
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
                    className="rounded-r-full color-[#141414] bg-primary p-2 pr-3 border-l hover:opacity-80" onClick={onClickWalletButton}> more wallet</button>
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
            <span className="text-xl text-primary">{getFilteredWalletUSDBalance(filteredBalanceData || []).toFixed(4)}$</span>
          </div>
          <button onClick={closeModal}>
            <X className="w-7 h-7 p-0.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </button>
        </div>
        <div className="text-2xl font-bold border-b border-[#5f5f5f] p-2 mb-4 flex items-center justify-between">
          <span>Your Wallet</span>
          <button onClick={() => refreshWalletBalance()}>
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
            {filteredBalanceData && filteredBalanceData.map((walletBalance, index) => (
              <SubWallet key={index} walletBalance={walletBalance} index={index} />
            ))}
          </div>
        </div>
      </Modal>
    </nav >
  );
};

export default MainNavbar;
