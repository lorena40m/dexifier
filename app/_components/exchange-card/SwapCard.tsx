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
  getBestMultiRoutes,
  getBlockchains,
} from "@/app/api/rango";
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
import { setButtonRef, updateRequiredChain } from "@/redux_slice/slice/browserSlice/walletSlice";
import ConfirmModal from "./ConfirmModal";
import {
  BestRouteRequest,
  BestRouteResponse,
  MultiRouteRequest,
  MultiRouteResponse,
  MultiRouteSimulationResult,
  SimulationResult,
} from "rango-types/mainApi";
import { useManager } from "@rango-dev/queue-manager-react";
import { calculatePendingSwap, cancelSwap } from "@rango-dev/queue-manager-rango-preset";
import { getWalletsForNewSwap } from "@/app/manager/QueueManager";
import { PendingSwapSettings } from "@/app/wallet/types/swap";
import { getPendingSwaps } from "@/app/utils/queue";
import { updateManner } from "@/redux_slice/slice/settingsSlice";
import { useMediaQuery } from "react-responsive"
import { useWalletList } from "@/app/wallet/useWalletList";

export enum WALLET {
  NONE,
  BROWSE,
}

const SwapCard: React.FC = () => {
  const { list } = useWalletList({})
  const connectedWallets = list.filter(
    (wallet) => wallet.state === "connected",
  );
  const isWalletConnected = connectedWallets.length === 0 ? false : true;
  
  const isMobileView = useMediaQuery ( { query: '(max-width: 767px)' });

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

    const swapSettings: PendingSwapSettings = {
      slippage: settings.slippage.toString(),
      disabledSwappersGroups: undefined,
    };

    const proceedAnyway = true;

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
    const routeData: MultiRouteRequest = {
      ...savedRouteData,
      amount: tempToToken.value?.toString() || '0',
      from: tempToToken,
      to: tempFromToken,
    };
    if (
      routeData.from.blockchain == "" ||
      routeData.to.blockchain == "" ||
      routeData.amount == "" ||
      routeData.amount == undefined
    ) {
      return;
    }
    console.log("newRouteFromInput:", routeData);
    dispatch(setRouteProcess({ isRouteProcess: true }));
    await getBestMultiRoutes(routeData)
      .then((data: MultiRouteResponse) => {
        const sortedResults = sortQuotesBy(
          "RECOMMENDED",
          data.results as MultiRouteSimulationResult[]
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
        } font-semibold h-[3.125rem] mx-auto md:mt-[54px] mt-[56px] text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {isRouteProcess || isInProcess ? loadingContent : content}
    </Button>
  );

  return (
    <>
      {isMobileView ? (
      <p style={{ color: 'white', fontSize: '25px', marginTop: '3rem' , textAlign: "center" , marginBottom: '3rem'}}>
        Browser wallet connections are not supported on mobile devices; only available on desktop.
      </p>
    ) : (
      <div
        className={`mx-auto max-w-[95%] md:p-4  my-6 flex flex-col md:gap-3 gap-1 justify-evenly`}
      >
        <CustomCryptoField
          blockchains={blockchains}
          label="From"
          isFromToken={true}
          isWalletConnected={isWalletConnected} />

        <Button
          variant={"outline"}
          className="bg-transparent self-center disabled:cursor-not-allowed border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1"
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
      )}
      <ConfirmModal
        isConfirmModalOpen={isConfirmModalOpen}
        closeConfirmModal={closeConfirmModal}
        closeModalAndContinue={closeModalAndContinue} />
    </>
  );
};

export default SwapCard;
