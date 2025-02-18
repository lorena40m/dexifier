"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import ButtonCopyIcon from "../common/coyp-button-icon";
import StatusBar from "../common/status-bar";
import CustomLoader from "../common/loader";
import QrCodeGenerator from "../common/qr-generator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatReadableDate } from "@/app/utils";
import TokenIcon from "../common/token-icon";
import {
  useDexifier,
} from "@/app/providers/DexifierProvider";
import { ChainflipError, ChainflipSwapStatus } from "@/app/types/chainflip";
import { ExTxInfo, TxRequest } from "@/app/types/exolix";
import { toastError } from "@/lib/utils";
import { createTransaction } from "@/app/api/exolix";
import { createSwap } from "@/app/api/chainflip";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

const AddressesCard = () => {
  const {
    selectedRoute,
    setSwapData,
    swapData,
    swapStatus,
    tokenFrom,
    tokenTo,
    amountFrom,
    amountTo,
  } = useDexifier();
  // const { selectedQuote, srcAsset, destAsset, depositData } = useQuote();
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>();
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const status = useMemo(() => {
    if (swapStatus) {
      if ("state" in swapStatus) {
        return {
          id: swapStatus.swapId,
          amountFrom: amountFrom,
          amountTo: amountTo,
          createdAt: swapStatus.depositChannel?.createdAt,
          status: swapStatus.state,
          depositAddress: swapStatus.depositChannel?.depositAddress,
        };
      }
      if ("status" in swapStatus) {
        return {
          id: swapStatus.id,
          amountFrom: amountFrom,
          amountTo: amountTo,
          createdAt: swapStatus.createdAt,
          status: swapStatus.status,
          depositAddress: swapStatus.depositAddress,
        };
      }
    }
  }, [swapStatus]);

  async function pasteWithdrawalAddressFromClipboard() {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();
        setWithdrawalAddress(clipboardText);
      } else {
        console.error("Clipboard API not supported.");
      }
    } catch (error) {
      console.error("Failed to read from clipboard:", error);
    }
  }

  useEffect(() => {
    if (!swapStatus) setIsLoading(false);
  }, [swapStatus]);

  // useEffect(() => {
  //   if (!txData) return
  //   if (txData.status === "confirmation") {
  //     setCurrentStep(0);
  //     setSteps(['confirmation', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, 'Sending'])
  //     return
  //   }
  //   if (txData.status === "confirmed" || txData.status === "exchanging") {
  //     setCurrentStep(1);
  //     setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, 'Sending'])
  //     return
  //   }
  //   if (txData.status === "sending") {
  //     setCurrentStep(2);
  //     setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, `${txData.status}`])
  //     return
  //   }
  //   if (txData.status === "success" || txData.status === "refunded") {
  //     setCurrentStep(3);
  //     setSteps(['Confirmed', `${txData.coinFrom.coinCode} to ${txData.coinTo.coinCode}`, `${txData.status}`])
  //     return
  //   }
  // }, [txData])
  const renderExolixStatus = (state: ExTxInfo["status"]) => {
    const exolixStatus = swapStatus as ExTxInfo;
    switch (state) {
      case "wait":
        return (
          <div className="flex flex-col items-center text-primary">
            <CustomLoader />
            <span className="md:text-primary text-white">
              Waiting to receive funds
            </span>
          </div>
        );
      case "confirmation":
        return (
          <StatusBar
            steps={[
              "confirmation",
              `${exolixStatus.coinFrom.coinCode} to ${exolixStatus.coinTo.coinCode}`,
              "Sending",
            ]}
            currentStep={0}
          />
        );
      case "confirmed":
      case "exchanging":
        return (
          <StatusBar
            steps={[
              "Confirmed",
              `${exolixStatus.coinFrom.coinCode} to ${exolixStatus.coinTo.coinCode}`,
              "Sending",
            ]}
            currentStep={1}
          />
        );
      case "sending":
        return (
          <StatusBar
            steps={[
              "Confirmed",
              `${exolixStatus.coinFrom.coinCode} to ${exolixStatus.coinTo.coinCode}`,
              `${exolixStatus.status}`,
            ]}
            currentStep={2}
          />
        );
      case "success":
        return (
          <div className="flex flex-col items-center text-primary">
            <StatusBar steps={steps} currentStep={currentStep} />
            <span>Transaction is completed and funds are received</span>
          </div>
        );
      case "refunded":
        return;
      case "overdue":
        return <span>Transation is overdue</span>;
      default:
        return (
          <>
            <CustomLoader />
            <span className="md:text-primary text-white">
              Waiting to receive funds
            </span>
          </>
        );
    }
  };

  const renderChainflipStatus = (state: string) => {
    const chainflipStatus = swapStatus as ChainflipSwapStatus;
    switch (state) {
      case "RECEIVING":
        return (
          <>
            <StatusBar
              steps={[
                `Depositing ${chainflipStatus.sourceAsset}`,
                `${chainflipStatus.sourceAsset} to ${chainflipStatus.destinationAsset}`,
              ]}
              currentStep={0}
            />
            Receiving funds
          </>
        );
      case "SWAPPING":
        return (
          <>
            <StatusBar
              steps={[
                `${chainflipStatus.sourceAsset} to ${chainflipStatus.destinationAsset}`,
                `Withdrawing ${chainflipStatus.destinationAsset}`,
              ]}
              currentStep={0}
            />
            Swapping assets
          </>
        );
      case "SENDING":
        return (
          <>
            <StatusBar
              steps={[`Withdrawing ${chainflipStatus.destinationAsset}`, "Finishing"]}
              currentStep={0}
            />
            Withdrawing funds
          </>
        );
      case "SENT":
        return (
          <>
            <StatusBar
              steps={[`Withdrawing ${chainflipStatus.destinationAsset}`, "Finishing"]}
              currentStep={1}
            />
            Withdraw succeed
          </>
        );
      case "COMPLETED":
        return (
          <>
            <StatusBar
              steps={[`Withdrawing ${chainflipStatus.destinationAsset}`, "Finishing"]}
              currentStep={2}
            />
            Transaction is completed and funds are received
          </>
        );
      case "FAILED":
        return <span>Transaction is failed</span>;
      default:
        if (chainflipStatus.depositChannel?.isExpired === true) {
          return <span>Transation is overdue</span>;
        }
        return (
          <>
            <CustomLoader />
            <span className="md:text-primary text-white">
              Waiting to receive funds
            </span>
          </>
        );
    }
  };

  return (
    <Card className="flex flex-col max-w-[650px] md:min-h-[540px] w-full h-full md:bg-modal/5 bg-primary/10 border border-[#AAA]/20 backdrop-blur-lg md:p-6 md:rounded-[2rem] rounded-[20px] shadow-lg text-white">
      <CardHeader className="md:p-4 md:pt-0 px-4 pt-6">
        <CardTitle className="md:text-2xl text-lg font-semibold">
          {swapStatus ? (
            <span className="text-primary uppercase">
              Confirming Transaction
            </span>
          ) : (
            "Addresses"
          )}
        </CardTitle>
      </CardHeader>
      <Separator className="bg-[#AAA]/20 md:block hidden" />
      <CardContent className="flex flex-col md:px-6 md:pb-0 p-4 overflow-y-auto overflow-x-hidden flex-1">
        <div className="flex w-full md:justify-center items-center gap-3 md:my-4 mb-6 md:text-lg text-sm font-bold md:bg-transparent bg-primary/30 rounded-lg px-3 py-2">
          {tokenFrom && (
            <>
              <TokenIcon
                token={{
                  image: tokenFrom.image,
                  alt: tokenFrom.symbol,
                  className: "md:size-12 size-[27px]",
                }}
              />
              <div className="flex items-center gap-1 md:gap-2 ">
                <span>{Number(amountFrom).toFixed(2)}</span>
                <span>{tokenFrom.symbol}</span>
                <span className="text-opacity-80 md:block hidden">
                  [{tokenFrom.blockchain}]
                </span>
              </div>
            </>
          )}
          <Image
            src={"/assets/icons/circleArrow.png"}
            width={0}
            height={0}
            alt="circleAddress"
            className="md:block hidden size-8"
          />
          <Image
            src={"/assets/icons/circleArrow.svg"}
            width={0}
            height={0}
            alt="circleAddress"
            className="md:hidden size-5"
          />
          {tokenTo && (
            <>
              <TokenIcon
                token={{
                  image: tokenTo.image,
                  alt: tokenTo.symbol,
                  className: "md:size-12 size-[27px]",
                }}
              />
              <div className="flex items-center gap-1 md:gap-2">
                <span>{Number(amountTo).toFixed(2)}</span>
                <span>{tokenTo.symbol}</span>
                <span className="text-opacity-80 md:block hidden">
                  [{tokenTo.blockchain}]
                </span>
              </div>
            </>
          )}
        </div>
        <div>
          <Label
            htmlFor="withdrawal"
            className="md:text-lg text-sm md:capitalize uppercase md:text-white text-primary"
          >
            Recipient{" "}
            <span className="text-primary">
              {tokenTo?.blockchain} {tokenTo?.symbol}
            </span>{" "}
            address
          </Label>
          <div
            id="withdrawal"
            className={`${withdrawalAddress ? "border-[#695F5F]" : "border-primary"
              } md:border flex items-center justify-between rounded-lg md:p-3 p-2 shadow-md max-h-[3.3125rem] my-3 md:bg-[#000]/30 bg-primary/30 backdrop-blur-lg`}
          >
            <Input
              type="text"
              value={withdrawalAddress}
              onChange={(e) => setWithdrawalAddress(e.target.value)}
              placeholder="Enter recipient address"
              className="md:text-base text-xs placeholder:text-white/50 md:px-3 px-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={!!swapStatus}
            />
            <Button
              className="border border-primary text-primary rounded-lg p-1 md:text-base text-xs h-full bg-transparent md:lowercase uppercase"
              disabled={!!swapStatus}
              onClick={pasteWithdrawalAddressFromClipboard}
            >
              paste
            </Button>
          </div>

          {!withdrawalAddress && (
            <span className="text-primary md:block hidden">
              Enter the Recipient Address first !
            </span>
          )}
          {status && (
            <div className="flex md:justify-center mb-3 md:text-lg text-xs md:my-0 my-3">
              <div className="flex flex-col gap-2">
                <div className="flex md:items-center">
                  <div>
                    <Image
                      src={"/assets/icons/clock.png"}
                      width={20}
                      height={20}
                      alt="clock"
                      className="md:block hidden"
                    />
                  </div>
                  <span className="text-primary uppercase md:w-auto w-32">
                    Created Time : &nbsp;
                  </span>
                  <span>
                    {formatReadableDate(new Date(status.createdAt || 0))}
                  </span>
                </div>
                <div className="flex md:items-center">
                  <div>
                    <Image
                      src={"/assets/icons/id.png"}
                      width={20}
                      height={20}
                      alt="id"
                      className="md:block hidden"
                    />
                  </div>
                  <span className="text-primary uppercase md:w-auto w-32">
                    Transaction ID : &nbsp;
                  </span>
                  <span className="pr-2">{status.id}</span>
                  <ButtonCopyIcon text={status.id} />
                </div>
                <div className="flex md:items-center">
                  <div>
                    <Image
                      src={"/assets/icons/state.png"}
                      width={23}
                      height={23}
                      alt="state"
                      className="md:block hidden"
                    />
                  </div>
                  <span className="text-primary uppercase md:w-auto w-32">
                    Status : &nbsp;
                  </span>
                  <span>{status.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="my-2">
          {/* {txData && <div>
            <Label htmlFor="deposit" className="md:text-lg text-sm md:capitalize uppercase md:text-white text-primary">Deposit <span className="text-primary">{tokenFrom?.blockchain} <span className="md:hidden">{'('}</span>{tokenFrom?.symbol}<span className="md:hidden">{')'}</span></span> address</Label>
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
          </div>} */}
          {status && (
            <div>
              <Label
                htmlFor="deposit"
                className="md:text-lg text-sm md:capitalize uppercase md:text-white text-primary"
              >
                Deposit{" "}
                <span className="text-primary">
                  {tokenFrom?.blockchain}{" "}
                  <span className="md:hidden">{"("}</span>
                  {tokenFrom?.symbol}
                  <span className="md:hidden">{")"}</span>
                </span>{" "}
                address
              </Label>
              <div
                id="deposit"
                className={`${status.depositAddress
                  ? "border-primary/40"
                  : "border-[#695F5F]"
                  } border flex items-center justify-between rounded-lg md:p-3 p-2 shadow-md max-h-[3.3125rem] md:my-3 mt-1 mb-3 bg-transparent`}
              >
                <Input
                  type="text"
                  value={status.depositAddress}
                  className="md:text-primary text-white md:text-base text-xs bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 md:px-3 px-1"
                  readOnly={true}
                />
                {status.depositAddress && (
                  <>
                    <QrCodeGenerator text={status.depositAddress} />{" "}
                    <ButtonCopyIcon text={status.depositAddress} />
                  </>
                )}
              </div>
              {selectedRoute &&
                <div className="flex flex-col items-center text-primary">
                  {'egressAmount' in selectedRoute &&
                    renderChainflipStatus(
                      status.status as string
                    )}
                  {'toAmount' in selectedRoute &&
                    renderExolixStatus(status.status as ExTxInfo["status"])}
                </div>
              }
            </div>
          )}
        </div>
      </CardContent>
      {!swapStatus && selectedRoute && (
        <CardFooter>
          <Button
            disabled={isLoading || !withdrawalAddress}
            className={`w-full md:max-w-[50%] lg:max-w-[33%] font-semibold h-10 mx-auto text-xl disabled:cursor-not-allowed cursor-pointer transition duration-300 ease-out`}
            variant={"outline"}
            onClick={async () => {
              if (!withdrawalAddress || !tokenFrom || !tokenTo || !amountFrom)
                return;
              setIsLoading(true);
              if ('egressAmount' in selectedRoute) {
                // const depositAddressRequest: DepositAddressRequestV2 = {
                //   quote: selectedRoute as Quote,
                //   destAddress: withdrawalAddress,
                // };
                try {
                  // const depositAddressResponse: DepositAddressResponseV2 =
                  //   await chainflipSDK.requestDepositAddressV2(
                  //     depositAddressRequest
                  //   );
                  const depositAddressResponse = await createSwap({
                    sourceAsset: selectedRoute.ingressAsset,
                    destinationAsset: selectedRoute.egressAsset,
                    destinationAddress: withdrawalAddress,
                  })
                  setSwapData(depositAddressResponse);
                } catch (error) {
                  if (error instanceof AxiosError) {
                    return error.response?.data as ChainflipError;
                  }
                  console.error(error);
                }
              }
              if ('toAmount' in selectedRoute) {
                const txRequest: TxRequest = {
                  coinFrom: tokenFrom.symbol,
                  networkFrom: tokenFrom.blockchain,
                  coinTo: tokenTo.symbol,
                  networkTo: tokenTo.blockchain,
                  amount: parseFloat(amountFrom),
                  withdrawalAddress: withdrawalAddress,
                  rateType: "float",
                };
                try {
                  const txResponse = await createTransaction(txRequest);
                  setSwapData(txResponse);
                } catch (error: any) {
                  if (error.response.data.error) {
                    toastError(error.response.data.error);
                  }
                }
              }
            }}
          >
            {isLoading ? <Loader2 className="animate-spin text-primary" /> : 'Start'}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default AddressesCard;
