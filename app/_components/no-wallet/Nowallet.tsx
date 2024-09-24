import { RiZzzFill } from "react-icons/ri"
import NoWalletInput from "../common/noWalletInput"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Blockchain } from "@/app/types/interface"
import { FC, ReactNode, useEffect, useMemo, useRef, useState } from "react"
import { createTransaction, fetchConfirm, getCurrencies } from "@/app/api/noWallet-api"
import { useAppSelector } from "@/redux_slice/provider"
import CustomLoader from "../common/loader"
import { updateTransactionData, updateAddressError, updateTransactionLoading } from "@/redux_slice/slice/noWalletSlice/transactionSlice"
import { useDispatch } from "react-redux"
import { log } from "console"
import ToggleButton from "../common/toggleButton"
import { toastError } from "@/lib/utils"
import { CurrencyResponse } from "@/app/types/noWalletInterface"

interface NoWalletProps {
  blockchains: Blockchain[],
  isWalletConnected: boolean,
}

const NoWallet: FC<NoWalletProps> = () => {
  const dispatch = useDispatch();

  const [currencies, setCurrencies] = useState<CurrencyResponse>({ count: 0, data: [] })
  const { rateResult, isLoading } = useAppSelector((state) => state.rate);
  const { fromCurrency, toCurrency, isFixed } = useAppSelector((state) => state.currency);
  const { recipientAddress, transactionData, recipientAddressError, isTransactionLoading } = useAppSelector((state) => state.transaction);

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmIntervalId, setConfirmIntervalId] = useState<NodeJS.Timeout | null>(null);
  const transactionIdRef = useRef<string>(""); // To store transaction ID for confirming

  const transactionDataMemo = useMemo(
    () => ({ transactionData }),
    [transactionData]
  );

  useEffect(() => {
    getCurrencies().then((result) => {
      setCurrencies(result)
      console.log("currencies", result);
    })
  }, [])

  useEffect(() => {
    if (transactionData === undefined || rateResult === undefined) {
      stopConfirming()
    }
  }, [transactionDataMemo])

  const startConfirming = (transactionId: string) => {
    // Start polling for confirmation
    setIsConfirming(true);
    const intervalId = setInterval(async () => {
      const ConfirmedData = await fetchConfirm(transactionId);
      if (ConfirmedData?.status === "success" || ConfirmedData?.status === "overdue" || ConfirmedData?.status === "refunded") {
        clearInterval(intervalId);
        setIsConfirming(false);
        // Optionally dispatch a success action or update state here
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
    setConfirmIntervalId(intervalId);
  };

  const stopConfirming = () => {
    // Stop polling for confirmation
    if (confirmIntervalId) {
      clearInterval(confirmIntervalId);
      setConfirmIntervalId(null);
    }
    setIsConfirming(false);
  };

  const createTransactionHandler = async () => {
    const transactionRequest = {
      coinFrom: fromCurrency.code,
      networkFrom: fromCurrency.network?.network,
      coinTo: toCurrency.code,
      networkTo: toCurrency.network?.network,
      amount: parseFloat(fromCurrency.value),
      withdrawalAmount: rateResult?.toAmount,
      withdrawalAddress: recipientAddress,
      withdrawalExtralId: "",
      rateType: isFixed ? "fixed" : "floating",
      refundAddress: undefined,
      refundExtraId: ""
    }
    dispatch(updateTransactionLoading({ isTransactionLoading: true }))
    await createTransaction(transactionRequest)
      .then((result) => {
        dispatch(updateTransactionData({ transactionData: result }));
        transactionIdRef.current = result.id; // Store the transaction ID for confirmation
        startConfirming(result.id); // Start confirming process
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
      .then(() => dispatch(updateTransactionLoading({ isTransactionLoading: false })))
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
        } ${false ? "w-full" : "w-full md:max-w-[75%] lg:max-w-[67%]"
        } font-semibold h-[3.125rem] mx-auto mt-5 text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
      variant={"default"}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {isLoading ? loadingContent : content}
    </Button>
  );


  return (
    <div className="flex flex-col justify-evenly p-4 my-6 gap-3 md:max-w-[85%] mx-auto ">

      <NoWalletInput
        currencies={currencies}
        label="You send"
        isFromCurrency={true} />

      <Button
        variant={"outline"}
        className="bg-transparent self-center cursor-default border-[#333] mt-6 rounded-full h-[54px] w-[54px] p-1 cursor-pointer"
        disabled={true}
        onClick={() => { }}
      >
        <Image
          src={"/assets/icons/swap.png"}
          alt="swap icon"
          height={28}
          width={28}
        />
      </Button>

      <NoWalletInput currencies={currencies} isFixed={isFixed} label="You get" />
      <div className="flex justify-center">
        <ToggleButton />
      </div>
      {rateResult && <div className="flex justify-center"><span className="text-error text-sm">{rateResult.message || ""}</span></div>}
      {buttonTemplate(
        (isConfirming) ? "Stop Confirmation" : "Exchange Now",
        <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />,
        isLoading || isTransactionLoading,
        isLoading ||
        rateResult === undefined ||
        rateResult?.message !== null ||
        recipientAddress === undefined ||
        recipientAddress === "" ||
        recipientAddressError.isError,
        (isConfirming) ? stopConfirming : createTransactionHandler
      )}
    </div>
  )
}
export default NoWallet

