"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ButtonCopyIcon from "../common/coyp-button-icon";
import StatusBar from "../common/status-bar";
import CustomLoader from "../common/loader";
import QrCodeGenerator from "../common/qr-generator";
import { useExchange } from "@/app/providers/ExchangeProvider";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/app/utils";
import TokenIcon from "../common/token-icon";

const AddressesCard = () => {
  const { rateData, txData, withdrawalAddress, setWithdrawalAddress, currencyFrom, currencyTo } = useExchange();

  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  async function pasteWithdrawalAddressFromClipboard() {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();
        setWithdrawalAddress(clipboardText);
      } else {
        console.error('Clipboard API not supported.');
      }
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
    }
  }

  const txDataMemo = useMemo(() =>
    ({ txData }),
    [txData]
  );

  useEffect(() => {
    if (!txData) return
    if (txData.status === "confirmation") {
      setCurrentStep(0);
      setSteps(['confirmation', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, 'Sending'])
      return
    }
    if (txData.status === "confirmed" || txData.status === "exchanging") {
      setCurrentStep(1);
      setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, 'Sending'])
      return
    }
    if (txData.status === "sending") {
      setCurrentStep(2);
      setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, `${txData.status}`])
      return
    }
    if (txData.status === "success" || txData.status === "refunded") {
      setCurrentStep(3);
      setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, `${txData.status}`])
      return
    }
  }, [txDataMemo, txData])

  return (
    <Card className="max-w-[650px] md:min-h-[540px] w-full h-full md:bg-modal/5 bg-primary/10 border border-[#AAA]/20 backdrop-blur-lg md:p-6 md:rounded-[2rem] rounded-[20px] shadow-lg text-white">
      <CardHeader className="md:p-4 md:pt-0 px-4 pt-6">
        <CardTitle className="md:text-2xl text-lg font-semibold">
          {txData ? <span className="text-primary uppercase">Confirming Transaction</span> : "Addresses"}
        </CardTitle>
      </CardHeader>
      <Separator className="bg-[#AAA]/20 md:block hidden" />
      <CardContent className="flex flex-col justify-around md:p-6 md:pb-0 p-4">
        <div className="flex w-full md:justify-center items-center gap-3 md:my-4 mb-6 md:text-lg text-sm font-bold md:bg-transparent bg-primary/30 rounded-lg px-3 py-2 overflow-hidden">
          {currencyFrom && (
            <>
              <TokenIcon
                token={{
                  image: currencyFrom.icon,
                  alt: currencyFrom.code,
                  className: "md:size-12 size-[27px]",
                }}
              />
              <div className="flex items-center gap-1 md:gap-2 ">
                <span>{txData?.amount || rateData?.fromAmount}</span>
                <span>{currencyFrom.code}</span>
                <span className="text-opacity-80 md:block hidden">
                  [{currencyFrom.network.network}]
                </span>
              </div>
            </>
          )}
          <Image src={"/assets/icons/circleArrow.png"} width={0} height={0} alt="circleAddress" className="md:block hidden size-8" />
          <Image src={"/assets/icons/circleArrow.svg"} width={0} height={0} alt="circleAddress" className="md:hidden size-5"/>
          {currencyTo && (
            <>
              <TokenIcon
                token={{
                  image: currencyTo.icon,
                  alt: currencyTo.code,
                  className: "md:size-12 size-[27px]",
                }}
              />
              <div className="flex items-center gap-1 md:gap-2">
                <span>{txData?.amountTo || rateData?.toAmount}</span>
                <span>{currencyTo.code}</span>
                <span className="text-opacity-80 md:block hidden">
                  [{currencyTo.network.network}]
                </span>
              </div>
            </>
          )}
        </div>
        <div>
          <Label htmlFor='withdrawal' className="md:text-lg text-sm md:capitalize uppercase md:text-white text-primary">Recipient <span className="text-primary">{currencyTo?.network.name} {currencyTo?.code}</span> address</Label>
          <div id="withdrawal" className={`${withdrawalAddress ? "border-[#695F5F]" : "border-primary"} md:border flex items-center justify-between rounded-lg md:p-3 p-2 shadow-md max-h-[3.3125rem] my-3 md:bg-[#000]/30 bg-primary/30 backdrop-blur-lg`}>
            <Input
              type='text'
              value={withdrawalAddress}
              onChange={(e) => setWithdrawalAddress(e.target.value)}
              placeholder='Enter recipient address'
              className="md:text-base text-xs placeholder:text-white/50 md:px-3 px-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={!!txData}
            />
            <Button
              className="border border-primary text-primary rounded-lg p-1 md:text-base text-xs h-full bg-transparent md:lowercase uppercase"
              disabled={!!txData}
              onClick={pasteWithdrawalAddressFromClipboard}
            >
              paste
            </Button>
          </div>

          {!withdrawalAddress && <span className="text-primary md:block hidden">Enter the Recipient Address first !</span>}
          {txData && <div className="flex md:justify-center mb-3 md:text-lg text-xs md:my-0 my-3">
            <div className="flex flex-col gap-2">
              <div className="flex md:items-center">
                <div><Image src={"/assets/icons/clock.png"} width={20} height={20} alt="clock" className="md:block hidden" /></div>
                <span className="text-primary uppercase md:w-auto w-32">Created Time : &nbsp;</span>
                <span>{formatReadableDate(txData.createdAt)}</span>
              </div>
              <div className="flex md:items-center">
                <div><Image src={"/assets/icons/id.png"} width={20} height={20} alt="id" className="md:block hidden" /></div>
                <span className="text-primary uppercase md:w-auto w-32">Transaction ID : &nbsp;</span>
                <span className="pr-2">{txData.id}</span>
                <ButtonCopyIcon text={txData.id || ""} />
              </div>
              <div className="flex md:items-center">
                <div><Image src={"/assets/icons/state.png"} width={23} height={23} alt="state" className="md:block hidden" /></div>
                <span className="text-primary uppercase md:w-auto w-32">Status : &nbsp;</span>
                <span>{txData.status}</span>
              </div>
            </div>
          </div>}
        </div>
        <div className="my-2">
          {txData && <div>
            <Label htmlFor="deposit" className="md:text-lg text-sm md:capitalize uppercase md:text-white text-primary">Deposit <span className="text-primary">{currencyFrom?.network.name} <span className="md:hidden">{'('}</span>{currencyFrom?.code}<span className="md:hidden">{')'}</span></span> address</Label>
            <div id="deposit" className={`${txData.depositAddress ? "border-primary/40" : "border-[#695F5F]"} border flex items-center justify-between rounded-lg md:p-3 p-2 shadow-md max-h-[3.3125rem] md:my-3 mt-1 mb-3 bg-transparent`}>
              <Input
                type='text'
                value={txData.depositAddress || ""}
                className="md:text-primary text-white md:text-base text-xs bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:px-3 px-1"
                readOnly={true}
              />
              {txData.depositAddress && <><QrCodeGenerator text={txData.depositAddress} /> <ButtonCopyIcon text={txData.depositAddress} /></>}
            </div>
            {txData.status === "wait" ? <div className="flex flex-col items-center text-primary"><CustomLoader /><span className="md:text-primary text-white">Waiting to receive funds</span></div> :
              txData.status === "success" ? <div className="flex flex-col items-center text-primary"><StatusBar steps={steps} currentStep={currentStep} /><span>Transaction is completed and funds are received</span></div> :
                txData.status === "overdue" ? <div className="flex justify-center"><span >Transation is overdue</span></div> :
                  <StatusBar steps={steps} currentStep={currentStep} />}
          </div>
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressesCard;
