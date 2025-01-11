import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChangeEvent, Dispatch, FC, forwardRef, useEffect, useMemo, useRef, useState, useTransition } from "react"
import { createTransaction, getRate, getTxInfo } from "@/app/api/exolix"
import { RateRequest, TxRequest } from "@/app/types/exolix"
import { Label } from "@/components/ui/label"
import CurrencyInput from "./CurrencyInput"
import debounce from "lodash/debounce";
import { useExchange } from "@/app/providers/ExchangeProvider"
import { swapSDK, toastError } from "@/lib/utils"
import CustomLoader from "../common/loader"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import React from "react"
import TooltipTemplate from "../common/tooltip-template"
import HistoryModal from "../swap/SettingModal/HistoryModal"
import { formatChainName } from "@/app/utils/chainflip"
import { Chain, DepositAddressRequestV2, QuoteRequest } from "@chainflip/sdk/swap"
import { useQuote } from "@/app/providers/QuoteProvider"

interface ExchangeCardProps {
  setLoading: Dispatch<React.SetStateAction<boolean>>;
};

const ExchangeCard = forwardRef<HTMLButtonElement, ExchangeCardProps>((props, ref) => {
  const { rateData, setRateData, txData, setTxData, withdrawalAddress, currencyFrom, setCurrencyFrom, currencyTo, setCurrencyTo } = useExchange();
  const [amountFrom, setAmountFrom] = useState<string>('0');
  const [isFetchingRate, fetchRate] = useTransition();
  const [isCreatingTx, createTx] = useTransition();
  const confirmIntervalRef = useRef<NodeJS.Timeout>();
  const { depositData, setDepositData, selectedQuote, setSelectedQuote, setSrcAsset, destAsset, setDestAsset } = useQuote();
  const [isFinished, setIsFinished] = useState<boolean>();
  const [isCreatingChannel, setIsCreatingChannel] = useState<boolean>();

  const stopConfirming = () => {
    clearInterval(confirmIntervalRef.current);
    confirmIntervalRef.current = undefined;
  }

  // Start polling for transaction confirmation (Exolix)
  const startConfirming = async (txId: string) => {
    // Clear any existing interval before starting a new one
    stopConfirming();

    confirmIntervalRef.current = setInterval(async () => {
      const txInfo = await getTxInfo(txId);
      setTxData(txInfo);

      if (txInfo.status === "success" || txInfo.status === "overdue" || txInfo.status === "refunded") {
        setIsFinished(true);
        stopConfirming();
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  // Create transaction (Exolix)
  const createTransactionHandler = () => {
    createTx(async () => {
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

  // Start polling for transaction confirmation (Chainflip)
  const startChanneling = async (channelId: string) => {
    // Clear any existing interval before starting a new one
    stopConfirming();

    confirmIntervalRef.current = setInterval(async () => {
      try {
        const statusData = await swapSDK.getStatusV2({
          id: channelId
        });
        setDepositData(statusData);
        setIsCreatingChannel(false);
        if (statusData.state === "COMPLETED" || statusData.state === "FAILED") {
          setIsFinished(true);
          stopConfirming();
        }
      } catch (error) { }
    }, 10000); // Poll every 10 seconds (adjust as needed)
  }

  const handleAction = async () => {
    if (isFinished) {
      setIsFinished(false)
      setTxData(undefined)
      setRateData(undefined)
      setSelectedQuote(undefined)
      setDepositData(undefined)
    }
    if (selectedQuote) {
      if (depositData) {
        stopConfirming();
        setDepositData(undefined);
      }
      else {
        /** Create transaction (Chainflip) */
        setIsCreatingChannel(true);
        const depositAddressRequest: DepositAddressRequestV2 = {
          quote: selectedQuote,
          destAddress: withdrawalAddress,
        }
        const depositAddressResponse: any = await swapSDK.requestDepositAddressV2(depositAddressRequest)
        startChanneling(depositAddressResponse.depositChannelId);
      }
    }
    else if (txData) {
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
    setSelectedQuote(undefined)
    setDepositData(undefined)
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
        /** First request rate to the Exolix */
        const rateRequest: RateRequest = {
          coinFrom: currencyFrom.code,
          networkFrom: currencyFrom.network.network,
          coinTo: currencyTo.code,
          networkTo: currencyTo.network.network,
          amount: amount,
          rateType: 'float'
        }
        const rateResponse = await getRate(rateRequest)

        /** Then we request quote to the Chainflip */
        const srcChain = formatChainName(currencyFrom.network.network) as Chain;
        const destChain = formatChainName(currencyTo.network.network) as Chain;
        if (srcChain && destChain && rateResponse) {
          const srcAsset = (await swapSDK.getAssets(srcChain)).find(asset => asset.symbol === currencyFrom.code)
          const destAsset = (await swapSDK.getAssets(destChain)).find(asset => asset.symbol === currencyTo.code)
          if (srcAsset && destAsset) {
            setSrcAsset(srcAsset);
            setDestAsset(destAsset);
            const quoteRequest: QuoteRequest = {
              srcChain: srcChain,
              destChain: destChain,
              srcAsset: srcAsset.asset,
              destAsset: destAsset.asset,
              amount: (parseFloat(amount) * (10 ** srcAsset.decimals)).toString(),
              brokerCommissionBps: 100, // 100 basis point = 1%
              affiliateBrokers: [
                { account: process.env.NEXT_PUBLIC_CHAINFLIP_ACCOUNT_ID || '', commissionBps: 50 }
              ],
            };
            try {
              const quoteResponse = await swapSDK.getQuoteV2(quoteRequest);
              const bestQuote = quoteResponse.quotes
                .reduce((maxQuote, currentQuote) => {
                  const currentEgressAmount = Number(currentQuote.egressAmount);
                  const maxEgressAmount = Number(maxQuote.egressAmount);
                  return currentEgressAmount > maxEgressAmount ? currentQuote : maxQuote;
                });

              /** Pick up the best route among the result from Exolix & Chainflip */
              if (bestQuote && (Number(bestQuote.egressAmount) / (10 ** destAsset.decimals)) > rateResponse.toAmount) {
                setSelectedQuote(bestQuote);
                return;
              }
            } catch (error) { }
          }
        }
        /** */

        // Use the route by Exolix
        setRateData(rateResponse)
      })
    }, 1000), // 1s delay
    [currencyFrom, currencyTo]
  );

  return (
    <Card className="max-w-[650px] md:min-h-[540px] w-full h-full md:bg-modal/5 bg-primary/10 border border-[#AAA]/20 backdrop-blur-lg md:p-6 md:rounded-[2rem] rounded-[20px] shadow-lg text-white">
      <CardHeader className="p-4 md:flex hidden">
        <div className="h-auto bg-transparent w-full justify-between flex">
          <div className="flex gap-4 items-center">
            <Link href={'exchange'} className='border border-primary rounded-full text-sm font-semibold py-[7px] px-10 transition-colors duration-300 text-black bg-primary'>
              No Wallet
            </Link>
            <Link href={'swap'} className='border border-primary rounded-full text-sm font-semibold py-[7px] px-10 transition-colors duration-300 hover:text-primary'>
              Browser Wallet
            </Link>
          </div>
          <div className="flex items-center">
            <HistoryModal>
              <Button
                className="px-2 disabled:cursor-not-allowed bg-transparent hover:bg-transparent"
              >
                <TooltipTemplate content="History" className="!mb-1">
                  <Image
                    src={"/assets/icons/option.png"}
                    alt="button-icon"
                    width={18}
                    height={18}
                  />
                </TooltipTemplate>
              </Button>
            </HistoryModal>
          </div>
        </div>
      </CardHeader>
      <Separator className="bg-[#AAA]/20 md:block hidden" />
      <CardContent className="md:px-[31px] md:py-10 flex flex-col justify-around px-4 py-8">
        <div className="w-full flex flex-col justify-evenly gap-2">
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
            className="bg-transparent self-center border-separator mt-7 mb-1 rounded-full h-[54px] w-[54px] p-1 hover:bg-primary-dark"
            onClick={reverseCurrencyPair}
          >
            <Image
              src={"/assets/icons/swap.png"}
              alt="Swap Icon"
              height={28}
              width={28}
            />
          </Button>

          <Label htmlFor="currencyTo" className="md:text-lg text-base">You get</Label>
          <CurrencyInput
            type="number"
            id="currencyTo"
            value={rateData?.toAmount || (selectedQuote && destAsset && (Number(selectedQuote.egressAmount) / (10 ** destAsset.decimals))) || 0}
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
          ${isFetchingRate || isCreatingTx || isCreatingChannel
              ? "bg-transparent text-primary border border-seperator hover:bg-black/30"
              : "bg-primary hover:bg-primary-dark text-black"
            } w-full md:max-w-[75%] lg:max-w-[67%] font-semibold h-[3.125rem] mx-auto mt-[20px] md:mt-[10px] text-xl disabled:cursor-not-allowed cursor-pointer transition-colors duration-300`}
          onClick={handleAction}
          disabled={isFetchingRate || isCreatingTx || isCreatingChannel || !(rateData || selectedQuote) || !withdrawalAddress}
        >
          {isFetchingRate || isCreatingTx || isCreatingChannel ?
            <CustomLoader className="!w-[1.875rem] !h-[1.875rem]" />
            :
            txData || depositData ? isFinished ? 'Exchange Again' : 'Stop Confirmation' : 'Exchange Now'
          }
        </Button>
      </CardFooter>
    </Card>
  )
})

ExchangeCard.displayName = "ExchangeCard"

export default ExchangeCard