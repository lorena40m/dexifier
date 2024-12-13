import NoWalletInput from "../common/no-wallet-input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { createTransaction, getTxInfo, getCurrencies, getRate } from "@/app/api/exolix"
import { useAppSelector } from "@/redux_slice/provider"
import CustomLoader from "../common/loader"
import { updateTransactionData, updateAddressError, updateTransactionLoading, updateHistoryLoading } from "@/redux_slice/slice/noWalletSlice/transactionSlice"
import { useDispatch } from "react-redux"
import { toastError } from "@/lib/utils"
import { CurrencyResponse, RateRequest, TxRequest } from "@/app/types/noWalletInterface"
import { updateConfirming, updateLoadingState, updateRateResult } from "@/redux_slice/slice/noWalletSlice/rateSlice"
import { setExchangeMode } from "@/redux_slice/slice/browserSlice/routeSlice"
import { Currency, updateCurrency } from "@/redux_slice/slice/noWalletSlice/currencySlice"
import { addHistory } from "@/redux_slice/slice/noWalletSlice/historySlice"
import FlexRoutesCard from "../routes-card/FlexRoutesCard"


const SwapMobileView: React.FC = () => {
  const dispatch = useDispatch();

  const [currencies, setCurrencies] = useState<CurrencyResponse>({ count: 0, data: [] })
  const { rateResult, isLoading, isConfirming } = useAppSelector((state) => state.rate);
  const { fromCurrency, toCurrency, isFixed } = useAppSelector((state) => state.currency);
  const {
    recipientAddress,
    transactionData,
    recipientAddressError,
    isTransactionLoading,
    isHistoryLoading
  } = useAppSelector((state) => state.transaction);
  const transactionIdRef = useRef<string>(""); // To store transaction ID for confirming
  const confirmIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const transactionDataMemo = useMemo(
    () => ({ transactionData }),
    [transactionData]
  );

  useEffect(() => {
    getCurrencies().then((result) => {
      setCurrencies(result)
    })
  }, [])

  useEffect(() => {
    if (isConfirming && transactionData !== undefined) {
      if (confirmIntervalRef.current) {
        clearInterval(confirmIntervalRef.current);  // Clear the existing interval if any
      }
      startConfirming(transactionData.id).catch(console.log);
    } else {
      stopConfirming().catch(console.log);
    }

    // Clean up function to clear the interval on component unmount or refresh
    return () => {
      if (confirmIntervalRef.current) {
        clearInterval(confirmIntervalRef.current);
      }
    };
  }, []);


  useEffect(() => {
    if (transactionData === undefined || rateResult === undefined) {
      stopConfirming()
        .then()
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [transactionDataMemo])

  const startConfirming = async (transactionId: string, isHistory = false) => {

    // Start polling for confirmation
    console.log("start confirming with transactionId", transactionId);

    dispatch(updateConfirming({ isConfirming: true }));

    // Clear any existing interval before starting a new one
    if (confirmIntervalRef.current) {
      clearInterval(confirmIntervalRef.current);
    }
    if (isHistory) {
      const ConfirmedData = await getTxInfo(transactionId);
      dispatch(updateTransactionData({ transactionData: ConfirmedData }));
      dispatch(updateHistoryLoading({ isHistoryLoading: true }));

      if (ConfirmedData?.status === "success" || ConfirmedData?.status === "overdue" || ConfirmedData?.status === "refunded") {
        clearInterval(confirmIntervalRef.current!);
        dispatch(updateConfirming({ isConfirming: false }));
        confirmIntervalRef.current = null;
        return
      }
    } else {
      dispatch(updateHistoryLoading({ isHistoryLoading: false }));
    }

    confirmIntervalRef.current = setInterval(async () => {
      const ConfirmedData = await getTxInfo(transactionId);
      dispatch(updateTransactionData({ transactionData: ConfirmedData }));

      if (ConfirmedData?.status === "success" || ConfirmedData?.status === "overdue" || ConfirmedData?.status === "refunded") {
        clearInterval(confirmIntervalRef.current!);
        dispatch(updateConfirming({ isConfirming: false }));
        confirmIntervalRef.current = null;
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  const stopConfirming = async () => {
    if (confirmIntervalRef.current) {
      clearInterval(confirmIntervalRef.current);  // Clear the interval stored in the ref
      confirmIntervalRef.current = null;
    }
    dispatch(updateConfirming({ isConfirming: false }));
  };

  const handleButtonClick = () => {
    if (isConfirming) {
      stopConfirming().catch(console.log);
    } else {
      if (isHistoryLoading) {
        dispatch(updateTransactionData({ transactionData: undefined }));
        dispatch(updateAddressError({ recipientAddressError: { isError: false, error: "" } }));
        dispatch(updateHistoryLoading({ isHistoryLoading: false }));
      } else {
        createTransactionHandler().catch(console.log);
      }
    }
  };

  const exchangeFromAndToCurrencies = async () => {
    let tempFromCurrency: Currency, tempToCurrency: Currency;
    dispatch(setExchangeMode({ isExchangeButtonClicked: true }));
    if (
      fromCurrency.value === "" ||
      fromCurrency.value === "0" ||
      fromCurrency.value === undefined) {
      tempFromCurrency = { ...fromCurrency, value: "0" };
      tempToCurrency = { ...toCurrency, value: "0" };
    } else {
      const output = (rateResult?.toAmount || 0).toString();
      tempFromCurrency = fromCurrency;
      tempToCurrency = { ...toCurrency, value: output };
    }
    dispatch(updateCurrency({ isFromCurrency: true, currency: tempToCurrency }));
    dispatch(updateCurrency({ isFromCurrency: false, currency: tempFromCurrency }));
    await refetchRates(tempToCurrency, tempFromCurrency);
    dispatch(setExchangeMode({ isExchangeButtonClicked: false }));
  }

  const refetchRates = (tempToCurrency: Currency, tempFromCurrency: Currency) => {
    const rateData: RateRequest = {
      coinFrom: tempToCurrency.code,
      networkFrom: tempToCurrency.network?.network || "",
      coinTo: tempFromCurrency.code,
      networkTo: tempFromCurrency.network?.network || "",
      amount: tempToCurrency.value,
      rateType: isFixed ? 'fixed' : 'float'

    }
    if (rateData.coinFrom === "" || rateData.coinTo === "" || rateData.amount === "0" || rateData.amount === "") {
      return
    }
    dispatch(updateLoadingState({ isLoading: true }));
    getRate(rateData).then((result) => {
      dispatch(updateRateResult({ rateResult: result }))
    }).catch((error) => {
      if (error.response && error.response.status === 422) {
        const result = error.response.data
        dispatch(updateRateResult({ rateResult: result }))
      } else {
        toastError("errors while fetching rate data")
      }
    }).finally(() => {
      dispatch(updateTransactionData({ transactionData: undefined }));
      dispatch(updateAddressError({ recipientAddressError: { isError: false, error: "" } }));
      dispatch(updateLoadingState({ isLoading: false }));

    })
  };

  const createTransactionHandler = async () => {
    const txRequest: TxRequest = {
      coinFrom: fromCurrency.code,
      networkFrom: fromCurrency.network?.network,
      coinTo: toCurrency.code,
      networkTo: toCurrency.network?.network,
      amount: parseFloat(fromCurrency.value),
      withdrawalAmount: rateResult?.toAmount,
      withdrawalAddress: recipientAddress,
      withdrawalExtraId: "",
      rateType: isFixed ? 'fixed' : 'float',
      refundAddress: undefined,
      refundExtraId: ""
    }
    dispatch(updateTransactionLoading({ isTransactionLoading: true }))
    createTransaction(txRequest)
      .then((result) => {

        try {
          dispatch(addHistory({ newHistory: result }));
          console.log("Added to History");
        } catch (error) {
          console.error("Error adding history:", error);
        }
        // Update transaction data
        dispatch(updateTransactionData({ transactionData: result }));

        transactionIdRef.current = result.id; // Store the transaction ID for confirmation
        startConfirming(result.id).catch(console.log); // Start confirming process
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          const errorResult = error.response.data
          if (errorResult?.error || errorResult?.message) {
            toastError(errorResult?.error || errorResult?.message)
          }
          dispatch(updateAddressError({ recipientAddressError: { isError: true, error: errorResult.error } }))
        }
      })
      .finally(() => dispatch(updateTransactionLoading({ isTransactionLoading: false })))
  }

  const buttonTemplate = (
    content: string | ReactNode,
    loadingContent: string | ReactNode = "",
    isLoading: boolean = false,
    disabled: boolean = false,
    onClick: Function
  ) => (
    <Button
      className={`${isLoading
        ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
        : "bg-primary hover:bg-primary-dark text-black"
        } ${false ? "w-full" : "w-full lg:max-w-[67%]"
        } font-semibold h-[3.125rem] mx-auto my-12 text-base disabled:cursor-not-allowed cursor-pointer transition-colors duration-300 rounded-[10px]`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {isLoading ? loadingContent : content}
    </Button>
  );

  return (
    <>
      <div
        className={`w-full h-full bg-primary/10 border-[#AAA] backdrop-filter backdrop-blur-lg border-opacity-20 px-4 py-2 pt-6 border-[0.15px] border-solid rounded-[2rem] shadow-lg mb-5`}
      >
        <div className="flex flex-col justify-evenly my-6 gap-1 w-[95%] mx-auto">
          <NoWalletInput
            currencies={currencies}
            label="You send"
            isFromCurrency={true}
          />
          <Button
            variant={"outline"}
            className="bg-transparent self-center border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1"
            disabled={fromCurrency.code === "" ||
              toCurrency.code === "" ||
              fromCurrency.network?.network === "" ||
              fromCurrency.network?.network === undefined ||
              toCurrency.network?.network === "" ||
              toCurrency.network?.network === undefined
            }
            onClick={exchangeFromAndToCurrencies}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="swap icon"
              height={28}
              width={28}
              className="md:block hidden"
            />
            <Image
              src={"/assets/icons/swap.svg"}
              alt="swap icon"
              height={28}
              width={28}
              className="md:hidden"
            />
          </Button>
          <NoWalletInput currencies={currencies} isFixed={isFixed} label="You get" />
          {rateResult && <div className="flex justify-center"><span className="text-error text-sm">{rateResult.message || ""}</span></div>}
        </div>
      </div>
      <FlexRoutesCard isWalletConnected={false} />
      {buttonTemplate(
        isConfirming ? "Stop Confirmation" : isHistoryLoading ? "Return to Swap" : "Exchange Now",
        <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />,
        isLoading || isTransactionLoading,
        isLoading ||
        rateResult === undefined ||
        rateResult?.message !== null ||
        recipientAddress === undefined ||
        recipientAddress === "" ||
        recipientAddressError.isError,
        handleButtonClick
      )}
    </>
  )
};

export default SwapMobileView;
