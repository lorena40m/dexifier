"use client";

import Image from "next/image";
import CustomCryptoField from "../common/input-field";
import SettingsPopup from "../settings-popup/settings-popup";
import HistoryPopup from "../settings-popup/history-popup";
import CustomLoader from "../common/loader";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Blockchain, RouteData, Token, Result } from "@/app/types/interface";
import {
  getBestRoutes,
  getBlockchains,
} from "@/app/api/rango-api";
import { toastError } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import {
  getRoutes,
  resetRoute,
  setError,
  setExchangeMode,
  setRouteProcess,
  setSelectedRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/browserSlice/routeSlice";
import {
  resetSwap,
  updateSwapStatus,
} from "@/redux_slice/slice/browserSlice/swapSlice";
import { updateFromBlockchain, updateToBlockchain } from "@/redux_slice/slice/browserSlice/blockchainSlice";
import { updateToken, updateTokenValue } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { sortQuotesBy } from "@/app/utils/catch-data";
import WalletSourcePopup from "./wallet-popup";
import { setButtonRef, updateRequiredChain } from "@/redux_slice/slice/browserSlice/walletSlice";
import ConfirmModal from "./ConfirmModal";
import {
  BestRouteResponse,
} from "rango-types/mainApi";
import { useManager } from "@rango-dev/queue-manager-react";
import { calculatePendingSwap, cancelSwap } from "@rango-dev/queue-manager-rango-preset";
import { getWalletsForNewSwap } from "@/app/manager/QueueManager";
import { PendingSwapSettings } from "@/app/wallet/types/swap";
import { getPendingSwaps } from "@/app/utils/queue";
import { updateManner } from "@/redux_slice/slice/settingsSlice";

export enum WALLET {
  NONE,
  BROWSE,
}

interface ExchangeCardProps {
  isWalletConnected: boolean;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({ isWalletConnected }) => {
  const walletSourcePopupRef = useRef<HTMLButtonElement>(null);
  const { manager } = useManager();

  // redux hook
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const selectedBlockchains = useAppSelector((state) => state.blockchains);
  const { toToken, fromToken } = useAppSelector((state) => state?.tokens);
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const { confirmResponse } = useAppSelector((state) => state.swap);
  const pendingSwaps = getPendingSwaps(manager);

  // react state
  const [blockchains, setBlockChains] = useState<Blockchain[]>([]);
  const [isSelectionsComplete, setIsSelectionsComplete] =
    useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)

  const { isError } = useAppSelector((state) => state.routes);
  const { wallet } = useAppSelector((state) => state.settings);
  const selectedToken = useAppSelector((state) => state?.tokens?.fromToken
  );
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const savedRouteData = useAppSelector((state) => state.quoteData);
  const { isRouteProcess, isRoutesFetched } = useAppSelector(
    (state) => state.routes
  );
  const { selectedWallets } = useAppSelector((state) => state.wallet)
  const { tokens } = useAppSelector((state) => state.allToken);

  console.log("selectedRoute", selectedRoute);

  async function initializeBlockchains() {
    const meta = await getBlockchains() as Blockchain[];
    setBlockChains(meta);
  }

  function closeConfirmModal() {
    setIsConfirmModalOpen(false);
    dispatch(updateSwapStatus({ isInProcess: false }));
  }

  const onCancel = () => {
    const selectedSwap = confirmResponse?.result?.requestId
      ? pendingSwaps.find(({ swap }) => swap.requestId === confirmResponse?.result?.requestId)
      : undefined;
    if (selectedSwap?.id) {
      const swap = manager?.get(selectedSwap.id);
      if (swap) {
        cancelSwap(swap);
      }
    }
  };

  async function closeModalAndContinue() {
    setIsConfirmModalOpen(false);
    if (selectedRoute === undefined) {
      console.log("Error while create transaction");
      return
    }

    // const userSettings: UserSettings = {
    //   slippage: settings.slippage.toString(),
    //   infiniteApprove: false
    // }

    const swapSettings: PendingSwapSettings = {
      slippage: settings.slippage.toString(),
      disabledSwappersGroups: undefined,
    };

    const proceedAnyway = true;

    // const validations: CreateTransactionValidation = {
    //   balance: false,
    //   fee: false,
    //   approve: false
    // }

    // const swapRequest: CreateTransactionRequest = {
    //   requestId: selectedRoute?.requestId,
    //   step: 1,
    //   userSettings: userSettings,
    //   validations: validations,
    // };

    const inputAmount = fromToken.value;

    if (confirmResponse) {
      const confirmSwapResult = confirmResponse?.result as BestRouteResponse;
      const swap = calculatePendingSwap(
        inputAmount === undefined ? "0" : inputAmount.toString(),
        confirmSwapResult,
        getWalletsForNewSwap(selectedWallets),
        swapSettings,
        proceedAnyway ? false : true,
        { blockchains, tokens },
      );

      await manager?.create(
        "swap",
        { swapDetails: swap },
        { id: confirmSwapResult.requestId }
      );
    }

    // const createResponse = await createMultiStepTransaction(swapRequest);
    // console.log("create swap response", createResponse);
    // if (createResponse.transaction && createResponse.transaction.type === TransactionType.EVM && !createResponse.transaction.isApprovalTx) {
    //   const approveResponse = await checkApproval(selectedRoute?.requestId);
    //   console.log("approve", approveResponse);
    //   const reCreateResponse = await createMultiStepTransaction(swapRequest);
    //   console.log("reCreate swap response", reCreateResponse);
    // }

    // const checkRequest: CheckTxStatusRequest = {
    //   requestId: selectedRoute?.requestId || "",
    //   step: 1,
    //   txId: "",
    // }
    // const checkStatusResponse = await checkStatus(checkRequest);
    // console.log("check status response", checkStatusResponse);

    // .finally(() =>
    //   dispatch(updateSwapStatus({ isInProcess: false }))
    // );
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
      dispatch(updateRequiredChain({ requiredChain: "" }));
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
      routeData.amount == undefined
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
    let tempFromToken, tempToToken
    dispatch(setExchangeMode({ isExchangeButtonClicked: true }));
    if (
      fromToken.value === "" ||
      fromToken.value === "0" ||
      fromToken.value === 0 ||
      fromToken.value === undefined ||
      selectedRoute === undefined) {
      tempFromToken = { ...fromToken, value: 0 };
      tempToToken = { ...toToken, value: 0 };
    } else {
      const output = parseFloat(selectedRoute?.outputAmount || "0").toFixed(2);
      tempFromToken = fromToken;
      tempToToken = { ...toToken, value: output };
    }
    const fromBlockchain = selectedBlockchains.fromBlockchain;
    const toBlockchain = selectedBlockchains.toBlockchain;
    dispatch(updateToken({ isFromToken: true, token: tempToToken }));
    dispatch(updateFromBlockchain({ blockchain: toBlockchain }));
    dispatch(updateToBlockchain({ blockchain: fromBlockchain }));
    dispatch(updateToken({ isFromToken: false, token: tempFromToken }));
    await refetchRoutes(tempToToken, tempFromToken);
    dispatch(setExchangeMode({ isExchangeButtonClicked: false }));
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
        } font-semibold h-[3.125rem] mx-auto mt-[55px] text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {isRouteProcess || isInProcess ? loadingContent : content}
    </Button>
  );

  return (
    <div
      className={`w-full h-full bg-modal bg-opacity-5 border-[#AAA] backdrop-filter backdrop-blur-lg border-opacity-20 px-6 py-2 border-[0.15px] border-solid rounded-[2rem] shadow-lg`}
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
              className={`border-primary disabled:cursor-not-allowed rounded-full ${isRoutesFetched ? "md:px-4" : "md:px-10"
                }`}
              style={wallet === WALLET.NONE
                ? { backgroundColor: "#13F187", color: "#000" }
                : { backgroundColor: "transparent" }
              }
              onClick={() => dispatch(updateManner({ wallet: WALLET.NONE }))}
              disabled={isInProcess || isSwapMade || isRouteProcess}
            >
              No Wallet
            </Button>
            <Button
              size={"sm"}
              variant="outline"
              className={`border-primary rounded-full ${isRoutesFetched ? "md:px-4" : "md:px-10"
                }`}
              style={wallet === WALLET.BROWSE
                ? { backgroundColor: "#13F187", color: "#000" }
                : { backgroundColor: "transparent" }
              }
              onClick={() => dispatch(updateManner({ wallet: WALLET.BROWSE }))}
              disabled={isInProcess || isSwapMade || isRouteProcess}
            >
              Browser Wallet
            </Button>
          </div>

          <div className="flex items-center">
            <SettingsPopup />

            <HistoryPopup />

            <WalletSourcePopup ref={walletSourcePopupRef} />
          </div>
        </div>
      </div>


      <div
        className={`${"mx-auto max-w-[95%] p-4"
          } my-6 flex flex-col gap-3 justify-evenly`}
      >
        <CustomCryptoField
          blockchains={blockchains}
          label="From"
          isFromToken={true}
          isWalletConnected={isWalletConnected} />

        <Button
          variant={"outline"}
          className="bg-transparent self-center disabled:cursor-not-allowed cursor-default border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1 cursor-pointer"
          disabled={fromToken.blockchain === "" ||
            toToken.blockchain === "" ||
            fromToken.symbol === "" ||
            toToken.symbol === "" ||
            selectedToken === undefined
          }
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
                  : "Swap",
                <>
                  <span className="pe-2.5">
                    {isRouteProcess || !isRoutesFetched ? "" : "Swapping"}
                  </span>
                  <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
                </>,
                isInProcess || !isRoutesFetched,
                () => {
                  dispatch(updateSwapStatus({ isInProcess: true }));
                  setIsConfirmModalOpen(true);
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
                  onCancel();
                  dispatch(updateTokenValue({ isFromToken: true, value: "0" }))
                  dispatch(updateSwapStatus({ isInProcess: false }))
                  dispatch(resetRoute());
                  dispatch(resetSwap());
                }
              )
          : buttonTemplate("Connect Wallet", <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />, isInProcess, handleConnectButtonClick)}
      </div>

      <ConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        closeModalAndContinue={closeModalAndContinue} />
    </div>
  );
};

export default ExchangeCard;
