import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChangeEvent, Dispatch, FC, forwardRef, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { createTransaction, getRate, getTxInfo } from "@/app/api/exolix"
import { RateRequest, TxRequest } from "@/app/types/exolix"
import { Label } from "@/components/ui/label"
import CurrencyInput from "./CurrencyInput"
import debounce from "lodash/debounce";
import { useExchange } from "@/app/providers/ExchangeProvider"
import { toastError } from "@/lib/utils"
import CustomLoader from "../common/loader"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import HistoryPopup from "../settings-popup/history-popup"
import React from "react"

interface ExchangeCardProps {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

const ExchangeCard = forwardRef<HTMLButtonElement, ExchangeCardProps>((props, ref) => {
  const { rateData, setRateData, txData, setTxData, withdrawalAddress, currencyFrom, setCurrencyFrom, currencyTo, setCurrencyTo } = useExchange();
  const [amountFrom, setAmountFrom] = useState<string>('0');
  const [isFetchingRate, fetchRate] = useTransition();
  const [isCreatingTx, craeteTx] = useTransition();
  const confirmIntervalRef = useRef<NodeJS.Timeout>();

  const stopConfirming = () => {
    clearInterval(confirmIntervalRef.current);
    confirmIntervalRef.current = undefined;
  }

  // Start polling for transaction confirmation
  const startConfirming = async (txId: string) => {
    // Clear any existing interval before starting a new one
    stopConfirming();

    confirmIntervalRef.current = setInterval(async () => {
      const txInfo = await getTxInfo(txId);
      setTxData(txInfo);

      if (txInfo.status === "success" || txInfo.status === "overdue" || txInfo.status === "refunded") {
        stopConfirming();
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  const createTransactionHandler = () => {
    craeteTx(async () => {
      if (!(currencyFrom && currencyTo)) return;
      const txRequest: TxRequest = {
        coinFrom: currencyFrom.code,
        networkFrom: currencyFrom.network.network,
        coinTo: currencyTo.code,
        networkTo: currencyTo.network.network,
        amount: parseFloat(amountFrom),
        withdrawalAddress: withdrawalAddress,
        rateType: 'float',
      }
      try {
        const txResponse = await createTransaction(txRequest);
        startConfirming(txResponse.id)
        setTxData(txResponse)
      } catch (error: any) {
        if (error.response.data.error) {
          toastError(error.response.data.error)
        }
      }
    })
  }

  const handleAction = () => {
    if (txData) {
      stopConfirming();
      setTxData(undefined);
    } else if (rateData) {
      createTransactionHandler();
    }
  }

  const reverseCurrencyPair = () => {
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFrom);
    setAmountFrom(rateData?.toAmount.toString() || '0')
  }

  useEffect(() => {
    stopConfirming()
    setTxData(undefined)
    setRateData(undefined)
    if (parseFloat(amountFrom)) fetchRateDebounceHandler(amountFrom)
  }, [currencyTo, currencyFrom, amountFrom])

  useEffect(() => {
    clearInterval(confirmIntervalRef.current);  // Clear the existing interval if any

    if (txData) {
      startConfirming(txData.id);
    }
    // Clean up function to clear the interval on component unmount or refresh
    return () => {
      clearInterval(confirmIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    props.setLoading(isFetchingRate || isCreatingTx)
  }, [isFetchingRate, isCreatingTx])

  const fetchRateDebounceHandler = useMemo(() =>
    debounce((amount: string) => {
      fetchRate(async () => {
        if (!(currencyFrom && currencyTo)) return;
        const rateRequest: RateRequest = {
          coinFrom: currencyFrom.code,
          networkFrom: currencyFrom.network.network,
          coinTo: currencyTo.code,
          networkTo: currencyTo.network.network,
          amount: amount,
          rateType: 'float'
        }
        setRateData(await getRate(rateRequest))
      })
    }, 1000), // 1s delay
    [currencyFrom, currencyTo]
  );

  return (
    <Card className="max-w-[650px] md:min-h-[540px] w-full h-full md:bg-modal/5 bg-primary/10 border border-[#AAA]/20 backdrop-blur-lg md:p-6 md:rounded-[2rem] rounded-[20px] shadow-lg text-white">
      <CardHeader className="p-4 md:flex hidden">
        <div className="h-auto bg-transparent w-full justify-between flex">
          <div className="flex gap-4 items-center">
            <Link href={'exchange'} className='border border-primary rounded-full py-1 px-4 text-black bg-primary'>
              No Wallet
            </Link>
            <Link href={'swap'} className='border border-primary rounded-full py-1 px-4 hover:text-primary'>
              Browser Wallet
            </Link>
          </div>
          <div className="flex items-center">
            <HistoryPopup />
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-[#AAA]/20 md:block hidden" />
      <CardContent className="md:p-6 flex flex-col justify-around px-4 py-8">
        <div className="w-full flex flex-col justify-evenly gap-3">
          <div className="flex justify-between items-end">
            <Label htmlFor="currencyFrom" className="md:text-lg text-base">You send</Label>
            {rateData && <Label className="text-sm md:block hidden">
              {rateData.minAmount && `Min: ${rateData.minAmount}`}
              {rateData.minAmount && rateData.maxAmount && ', '}
              {rateData.maxAmount && `Max: ${rateData.maxAmount}`}
            </Label>}
          </div>
          <CurrencyInput
            type="number"
            id="currencyFrom"
            min={rateData?.minAmount}
            max={rateData?.maxAmount}
            value={amountFrom}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAmountFrom(e.target.value)}
            placeholder={`Please enter ${rateData?.minAmount || 1} - ${rateData?.maxAmount || 42000000}`}
            currency={currencyFrom}
            excludedCurrency={currencyTo}
            setCurrency={setCurrencyFrom}
            className="placeholder:text-white/50 flex-1 border-none bg-transparent bg-opacity-0 focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
          />

          <Button
            variant={"outline"}
            className="bg-transparent self-center border-separator mt-6 rounded-full h-12 w-12 p-3"
            onClick={reverseCurrencyPair}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="Swap Icon"
              height={0}
              width={0}
              className="w-full aspect-square"
            />
          </Button>

          <Label htmlFor="currencyTo" className="md:text-lg text-base">You get</Label>
          <CurrencyInput
            type="number"
            id="currencyTo"
            value={rateData?.toAmount || 0}
            currency={currencyTo}
            excludedCurrency={currencyFrom}
            setCurrency={setCurrencyTo}
            disabled
            className="placeholder:text-white/50 flex-1 border-none bg-transparent bg-opacity-0 focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
          />
          {rateData?.message && <div className="w-full text-center"><span className="text-error text-sm">{rateData.message || ""}</span></div>}
        </div>
      </CardContent>
      <CardFooter className="md:flex hidden">
        <Button
          ref={ref}
          className={`
          ${isFetchingRate || isCreatingTx
              ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
              : "bg-primary hover:bg-primary-dark text-black"
            } w-full md:max-w-[75%] lg:max-w-[67%] font-semibold h-[3.125rem] mx-auto mt-[20px] md:mt-[10px] text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
          onClick={handleAction}
          disabled={isFetchingRate || isCreatingTx || !rateData || !withdrawalAddress}
        >
          {isFetchingRate || isCreatingTx ?
            <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
            :
            txData ? 'Stop Confirmation' : 'Exchange Now'
          }
        </Button>
      </CardFooter>
    </Card>
  )
})

ExchangeCard.displayName = "ExchangeCard"

export default ExchangeCard