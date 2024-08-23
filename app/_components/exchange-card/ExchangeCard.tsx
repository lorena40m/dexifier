"use client";

import Image from "next/image";
import CustomCryptoField from "../common/InputField";
import SettingsPopup from "../settings-popup/settings-popup";
import HistoryPopup from "../settings-popup/history-popup";
import TooltipTemplate from "../common/tooltip-template";
import CustomLoader from "../common/loader";
import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Blockchain, TxSwapRequest, RouteData, Token, Result } from "@/app/types/interface";
import {
  createTransaction,
  getBestRoutes,
  getBlockchains,
} from "@/app/api/rango-api";
import { useWeb3Modal, useWeb3ModalEvents } from "@web3modal/wagmi/react";
import { RiZzzFill } from "react-icons/ri";
import { toastError, toastSuccess } from "@/lib/utils";
import { useAccount } from "wagmi";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import {
  getRoutes,
  resetRoute,
  setError,
  setExchangeMode,
  setRouteProcess,
  setSelectedRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/routeSlice";
import {
  resetSwap,
  updateSwapMade,
  updateSwapResponse,
  updateSwapStatus,
} from "@/redux_slice/slice/swapSlice";
import { resetBlockchain, updateFromBlockchain, updateToBlockchain } from "@/redux_slice/slice/blockchainSlice";
import { resetToken, updateToken, updateTokenValue } from "@/redux_slice/slice/tokenSlice";
import { setQuotedata } from "@/redux_slice/slice/quoteDataSlice";
import { sortQuotesBy } from "@/app/utils/catch-data";
import WalletSourcePopup from "./wallet-popup";

import { setButtonRef } from "@/redux_slice/slice/walletSlice";

import { useWalletList } from "@/app/wallet/useWalletList";


enum WALLET {
  NONE,
  BROWSE,
}

interface ExchangeCardProps {
  isWalletConnected: boolean;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ isWalletConnected }) => {
  const walletSourcePopupRef = useRef<HTMLButtonElement>(null);

  // const events = useWeb3ModalEvents();
  // const account = useAccount();
  const account = { isConnected: true }
  // const { open } = useWeb3Modal();
  // const { address } = useAccount();
  const address = "0x123243456787"

  // redux hook
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const selectedBlockchains = useAppSelector((state) => state.blockchains);
  const selectedTokens = useAppSelector((state) => state.tokens);
  const { toToken, fromToken } = useAppSelector((state) => state?.tokens);
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  // use Memo
  // const eventMemo = useMemo(() => {
  //   events;
  // }, [events]);

  // react state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<WALLET>(WALLET.BROWSE);
  const [blockchains, setBlockChains] = useState<Blockchain[]>([]);
  const [isSelectionsComplete, setIsSelectionsComplete] =
    useState<boolean>(false);
  const { isError } = useAppSelector((state) => state.routes);
  const selectedTokenData = useAppSelector((state) => state?.tokens);
  const selectedToken = useAppSelector((state) => state?.tokens?.fromToken
  );
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const savedRouteData = useAppSelector((state) => state.quoteData);
  const { isRouteProcess, isRoutesFetched, isExchangeButtonClicked } = useAppSelector(
    (state) => state.routes
  );

  async function initializeBlockchains() {
    const meta = await getBlockchains();
    setBlockChains(meta);
  }

  //use Effect
  useEffect(() => {
    if (
      toToken?.symbol !== "" &&
      fromToken?.symbol !== "" &&
      fromToken?.value !== 0 &&
      fromToken?.value !== undefined &&
      fromToken?.value !== ""
    )
      setIsSelectionsComplete(true);
    else setIsSelectionsComplete(false);
  }, [toToken, fromToken]);

  // useEffect(() => {
  //   if (events.data.event == "CONNECT_SUCCESS") {
  //     toastSuccess("Wallet connected! ");
  //   }
  // }, [eventMemo]);

  useEffect(() => {
    initializeBlockchains();
  }, []);


  useEffect(() => {
    if (walletSourcePopupRef.current) {
      dispatch(setButtonRef({ refButton: walletSourcePopupRef.current }))
    }
  }, [walletSourcePopupRef.current])

  const handleConnectButtonClick = () => {
    if (walletSourcePopupRef.current) {
      walletSourcePopupRef.current.click();
    }
  };

  const refetchRoutes = async (tempToToken: Token, tempFromToken: Token) => {
    const routeData: RouteData = {
      ...savedRouteData,
      amount: tempToToken.value,
      from: tempToToken,
      to: tempFromToken,
    };
    if (
      routeData.from.blockchain == "" ||
      routeData.to.blockchain == "" ||
      routeData.amount == "" ||
      routeData.amount == 0 ||
      routeData.amount == undefined ||
      !account.isConnected
    ) {
      return;
    }
    console.log("newRouteFromInput:", routeData);
    dispatch(setRouteProcess({ isRouteProcess: true }));
    await getBestRoutes(routeData)
      .then((data) => {
        const sortedResults = sortQuotesBy(
          "RECOMMENDED",
          data.results as Result[]
        );
        dispatch(setSelectedRoute({ route: sortedResults[0] }));
        dispatch(getRoutes({ routes: sortedResults }));
        dispatch(updateRouteFetched({ isRouteFetched: true }));
      })
      .catch((error) => {
        toastError("No routes found!");
        dispatch(setError({ isError: true }));
        dispatch(updateRouteFetched({ isRouteFetched: false }));
      })
      .finally(() => {
        dispatch(setRouteProcess({ isRouteProcess: false }));
        dispatch(setExchangeMode({ isExchangeButtonClicked: false }));
      });
  };

  const exchangeFromAndToTokens = async () => {
    dispatch(setExchangeMode({ isExchangeButtonClicked: true }));
    if (selectedRoute?.outputAmount === "0") return
    const output = parseFloat(selectedRoute?.outputAmount || "0").toFixed(3);
    const tempFromToken = fromToken;
    const tempToToken = { ...toToken, value: output };
    const fromBlockchain = selectedBlockchains.fromBlockchain;
    const toBlockchain = selectedBlockchains.toBlockchain;
    dispatch(updateToken({ isFromToken: true, token: tempToToken }));
    dispatch(updateFromBlockchain({ blockchain: toBlockchain }));
    dispatch(updateToBlockchain({ blockchain: fromBlockchain }));
    dispatch(updateToken({ isFromToken: false, token: tempFromToken }));
    await refetchRoutes(tempToToken, tempFromToken);
  }

  // single components
  const buttonTemplate = (
    content: string | ReactNode,
    loadingContent: string | ReactNode = "",
    disabled: boolean = false,
    onClick: Function
  ) => (
    <Button
      className={`${isRouteProcess || isInProcess || isSwapMade
        ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
        : "bg-primary hover:bg-primary-dark text-black"
        } ${isRoutesFetched ? "w-full" : "w-full md:max-w-[75%] lg:max-w-[67%]"
        } font-semibold h-[3.125rem] mx-auto mt-5 text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {isRouteProcess || isInProcess ? loadingContent : content}
    </Button>
  );

  return (
    <div
      className={`w-full bg-[#fff] bg-opacity-5 border-[#AAA] backdrop-filter backdrop-blur-lg border-opacity-20 px-6 py-2 border-[0.15px] border-solid rounded-[2rem] shadow-lg`}
    >
      <div
        id="__controls"
        className="border-b-[0.1px] border-[#333] border-solid"
      >
        <div className="flex flex-wrap justify-between items-center gap-4 p-4">
          <div className="flex gap-4 justify-center md:justify-start items-center">
            <Button
              variant="outline"
              size={"sm"}
              className={`border-primary rounded-full ${isRoutesFetched ? "md:px-4" : "md:px-10"
                }  ${wallet === WALLET.NONE
                  ? "bg-primary text-[#000]"
                  : " bg-transparent"
                }`}
              onClick={() => setWallet(WALLET.NONE)}
              disabled={isInProcess || isSwapMade || isRouteProcess}
            >
              No Wallet
            </Button>
            <Button
              size={"sm"}
              variant="outline"
              className={`border-primary rounded-full ${isRoutesFetched ? "md:px-4" : "md:px-10"
                } ${wallet === WALLET.BROWSE
                  ? "bg-primary text-[#000]"
                  : " bg-transparent"
                }`}
              onClick={() => setWallet(WALLET.BROWSE)}
              disabled={isInProcess || isSwapMade || isRouteProcess}
            >
              Browser Wallet
            </Button>
          </div>

          {wallet === WALLET.BROWSE && (
            <div className="flex items-center">
              <SettingsPopup />

              <HistoryPopup />

              <WalletSourcePopup ref={walletSourcePopupRef} />
            </div>
          )}
        </div>
      </div>

      {wallet === WALLET.BROWSE ? (
        <div
          className={`${isRoutesFetched ? "py-4" : "mx-auto md:max-w-[85%] p-4"
            } my-6 flex flex-col gap-3 justify-evenly`}
        >
          <CustomCryptoField
            blockchains={blockchains}
            label="From"
            isFromToken={true}
            isWalletConnected={isWalletConnected} />

          <Button
            variant={"outline"}
            className="bg-transparent self-center cursor-default border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1 cursor-pointer"
            disabled={fromToken.blockchain === "" ||
              toToken.blockchain === "" ||
              fromToken.symbol === "" ||
              toToken.symbol === "" ||
              selectedToken === undefined ||
              fromToken.value === "" ||
              fromToken.value === undefined ||
              selectedRoute === undefined}
            onClick={exchangeFromAndToTokens}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="swap icon"
              height={28}
              width={28}
            />
          </Button>

          <CustomCryptoField blockchains={blockchains} label="To" />

          {isWalletConnected
            ? selectedRoute == undefined
              ? buttonTemplate(
                fromToken.value == undefined &&
                  fromToken.value == "" &&
                  fromToken.value == 0
                  ? "please choose amount"
                  : isError
                    ? "Routes not found"
                    : "Please Select tokens",
                <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />,
                true,
                () => {
                  // setIsLoading(true);
                }
              )
              : !isSwapMade
                ? buttonTemplate(
                  isInProcess || !isRoutesFetched
                    ? fromToken.value == undefined &&
                      fromToken.value == "" &&
                      fromToken.value == 0
                      ? "please choose amount"
                      : isError
                        ? "Routes not found"
                        : "Please Select tokens"
                    : "swap",
                  <>
                    <span className="pe-2.5">
                      {isRouteProcess || !isRoutesFetched ? "" : "Swaping"}
                    </span>
                    <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
                  </>,
                  isInProcess || !isRoutesFetched,
                  () => {
                    dispatch(updateSwapStatus({ isInProcess: true }));

                    const swapData: TxSwapRequest = {
                      amount: fromToken.value || 0,
                      to: `${toToken.blockchain}.${toToken.symbol}`,
                      from: `${fromToken.blockchain}.${fromToken.symbol}`,
                      toAddress: address ?? "",
                      fromAddress: address ?? "",
                      slippage: 8,
                    };

                    console.log("swap data=>", swapData);
                    const inputAmount = fromToken.value;

                    createTransaction(swapData)
                      .then((data) => {

                        dispatch(
                          updateSwapResponse({
                            swapResponse: { ...data, inputAmount },
                          })
                        );
                        dispatch(updateSwapMade({ isSwapMade: true }));
                      })
                      .catch((e) => console.log(e))
                      .finally(() =>
                        dispatch(updateSwapStatus({ isInProcess: false }))
                      );
                  }
                )
                : buttonTemplate(
                  <>
                    <Image
                      src={"/assets/icons/reset-icon.png"}
                      width={21.39}
                      height={25}
                      alt="Reset icon"
                      className="me-3"
                    />
                    Swap again
                  </>,
                  "",
                  false,
                  () => {
                    dispatch(resetBlockchain({ isFromBlockchain: true }));
                    dispatch(resetBlockchain({ isFromBlockchain: false }));
                    dispatch(resetToken({ isFromToken: true }));
                    dispatch(resetToken({ isFromToken: false }));
                    dispatch(resetRoute());
                    dispatch(resetSwap());
                  }
                )
            : buttonTemplate("Connect Wallet", "", false, handleConnectButtonClick)}
        </div>
      ) : (
        <div className="flex items-center justify-center h-[50vh] md:max-w-[85%] mx-auto ">
          Coming Soon...
          <RiZzzFill className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default ExchangeCard;
