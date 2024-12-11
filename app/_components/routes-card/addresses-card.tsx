"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux_slice/provider";
import { useDispatch } from "react-redux";
import { updateAddressError, updateRecipientAddress, updateTransactionData } from "@/redux_slice/slice/noWalletSlice/transactionSlice";
import ButtonCopyIcon from "../common/coyp-button-icon";
import { formatReadableDate } from "@/app/utils/catch-data";
import StatusBar from "../common/status-bar";
import ImageWrapper from "../common/image-wrapper";
import CustomLoader from "../common/loader";
import QrCodeGenerator from "../common/qr-generator";

const AddressesCard = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency } = useAppSelector((state) => state.currency);
  const { recipientAddress, recipientAddressError, transactionData, isHistoryLoading } = useAppSelector((state) => state.transaction);
  const { rateResult, isConfirming } = useAppSelector((state) => state.rate);
  const depositAddress = useAppSelector((state) => state.transaction.transactionData?.depositAddress);
  const [steps, setSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  //use Memo
  const transactionDataMemo = useMemo(
    () => ({ transactionData }),
    [transactionData]
  );

  async function pasteFromClipboard() {
    try {
      if (navigator.clipboard) {
        const clipboardText = await navigator.clipboard.readText();

        dispatch(updateRecipientAddress({ recipientAddress: clipboardText }));
      } else {
        console.error('Clipboard API not supported.');
      }
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
    }
  }

  useEffect(() => {
    if (transactionData?.status === "confirmation") {
      setCurrentStep(0);
      setSteps(['confirmation', `${transactionData?.coinFrom.coinCode} to ${transactionData?.coinTo.coinCode}`, 'Sending'])
      return
    }
    if (transactionData?.status === "confirmed" || transactionData?.status === "exchanging") {
      setCurrentStep(1);
      setSteps(['Confirmed', `${transactionData?.coinFrom.coinCode} to ${transactionData?.coinTo.coinCode}`, 'Sending'])
      return
    }
    if (transactionData?.status === "sending") {
      setCurrentStep(2);
      setSteps(['Confirmed', `${transactionData?.coinFrom.coinCode} to ${transactionData?.coinTo.coinCode}`, `${transactionData?.status}`])
      return
    }
    if (transactionData?.status === "success" || transactionData?.status === "refunded") {
      setCurrentStep(3);
      setSteps(['Confirmed', `${transactionData?.coinFrom.coinCode} to ${transactionData?.coinTo.coinCode}`, `${transactionData?.status}`])
      return
    }

  }, [transactionDataMemo, transactionData])

  //Event Function
  const recipientInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTransactionData({ transactionData: undefined }));
    dispatch(updateAddressError({ recipientAddressError: { isError: false, error: "" } }));
    dispatch(updateRecipientAddress({ recipientAddress: e.target.value }));
  };

  return ((
    <div className="relative md:bg-modal bg-primary/10 w-full md:min-h-[570px] pb-2 pt-[1.8125rem] px-2 md:px-[1.1875rem] rounded-3xl border md:border-seperator border-[#AAA]/20 bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">

      <div className="z-0 w-full">
        <div
          id="__controls"
          className="md:border-b-[0.1px] border-[#333] border-solid"
        >
          <h1 className="md:text-2xl text-base font-semibold md:mb-4 px-4">{isConfirming ? <span className="text-primary uppercase">Confirming Transaction</span> : (isHistoryLoading ? "History" : "Addresses")}</h1>
        </div >
        <div className="relative">
          {/* <ShadowDecoration /> */}
          <div className="p-3 md:min-h-[430px] flex flex-col justify-around">
            {rateResult && <div className="flex md:justify-center md:pt-6 md:text-base text-sm font-semibold md:bg-transparent bg-primary/30 p-3 rounded-[10px]">
              <div className="flex items-center gap-2 md:m-auto md:bg-transparent">
                <div
                  className="bg-transparent flex items-center justify-center md:gap-[.5625rem] gap-1"
                >
                  {fromCurrency.icon && (
                    <div className="relative">
                      <ImageWrapper>
                        <Image
                          className="relative"
                          src={transactionData?.coinFrom.icon || fromCurrency.icon}
                          width={30}
                          height={30}
                          alt={`${fromCurrency.icon}'s icon`}
                        />
                      </ImageWrapper>
                    </div>
                  )}

                  {fromCurrency.code !== "" && (
                    <div className="flex items-center gap-1 md:gap-2 ">
                      <span>{transactionData?.amount || rateResult.fromAmount}</span>
                      <span>{fromCurrency.code}</span>

                      <span className="text-opacity-80 md:block hidden">
                        [{fromCurrency.network?.network}]
                      </span>
                    </div>
                  )}
                </div>

                <Image src={"/assets/icons/circleArrow.png"} width={30} height={30} alt="circleAddress" className="md:block hidden" />
                <Image src={"/assets/icons/circleArrow.svg"} width={20} height={20} alt="circleAddress" className="md:hidden"/>

                <div
                  className="bg-transparent flex items-center justify-center md:gap-[.5625rem] gap-1"
                >
                  {toCurrency.icon && (
                    <div className="relative">
                      <ImageWrapper>
                        <Image
                          className="relative"
                          src={transactionData?.coinTo.icon || toCurrency.icon}
                          width={30}
                          height={30}
                          alt={`${toCurrency.icon}'s icon`}
                        />
                      </ImageWrapper>
                    </div>
                  )}

                  {toCurrency.code !== "" && (
                    <div className="flex items-center gap-1 md:gap-2 ">
                      <span>{transactionData?.amountTo || rateResult.toAmount}</span>
                      <span>{toCurrency.code}</span>

                      <span className="text-opacity-80 md:block hidden">
                        [{toCurrency.network?.network}]
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            }
            <div>
              <span className="md:block hidden text-lg mb-1">Recipient <span className="text-primary">{toCurrency?.network?.name} {toCurrency.code}</span> address</span>
              <span className="md:hidden block text-sm mt-6 mb-3 uppercase text-primary">Recipient {toCurrency.code}({toCurrency?.network?.shortName}) address</span>
              <div className={`${recipientAddress === "" ? "border-primary" : recipientAddressError.isError || false ? "border-error" : "border-[#695F5F]"} flex items-center justify-between md:bg-[#000]/30 bg-primary/30 backdrop-filter backdrop-blur-lg md:border border-opacity-40 rounded-lg p-3 shadow-md max-h-[3.3125rem] md:my-3`}>
                <Input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => recipientInputChangeHandler(e)}
                  placeholder={"Enter recipient address"}
                  className="placeholder:text-white/50 flex-1 md:px-3 px-0 text-md border-none bg-transparent focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
                  style={{ outline: "none" }}
                  disabled={isConfirming}
                />
                <button className="border border-primary text-primary rounded-lg p-1 disabled:cursor-not-allowed disabled:opacity-40 md:normal-case md:text-base uppercase text-[8px]" disabled={isConfirming} onClick={pasteFromClipboard}>paste</button>
              </div>

              {recipientAddress === "" ? <span className="text-primary text-sm md:block hidden">Enter the Recipient Address first !</span>
                : (recipientAddressError && <span className="text-error md:block hidden">{recipientAddressError?.error || ""}</span>)}
              {transactionData && isConfirming && <div className="flex md:justify-center mb-3 md:text-lg text-xs md:my-0 my-3">
                <div className="flex flex-col gap-2">
                  <div className="flex md:items-center">
                    <div><Image src={"/assets/icons/clock.png"} width={20} height={20} alt="clock" className="md:block hidden" /></div>
                    <span className="text-primary uppercase md:w-auto w-32">Created Time : &nbsp;</span>
                    <span>{formatReadableDate(transactionData.createdAt)}</span>
                  </div>
                  <div className="flex md:items-center">
                    <div><Image src={"/assets/icons/id.png"} width={20} height={20} alt="id" className="md:block hidden" /></div>
                    <span className="text-primary uppercase md:w-auto w-32">Transaction ID : &nbsp;</span>
                    <span className="pr-2">{transactionData.id}</span>
                    <ButtonCopyIcon text={transactionData.id || ""} />
                  </div>
                  <div className="flex md:items-center">
                    <div><Image src={"/assets/icons/state.png"} width={23} height={23} alt="state" className="md:block hidden" /></div>
                    <span className="text-primary uppercase md:w-auto w-32">Status : &nbsp;</span>
                    <span>{transactionData.status}</span>
                  </div>
                </div>
              </div>
              }
            </div>

            <div>
              {transactionData && isConfirming && <div>
                <span className="text-lg mb-1 md:block hidden">Deposit <span className="text-primary">{fromCurrency?.network?.name} {fromCurrency.code}</span> address</span>
                <span className="text-xs pt-1 md:hidden uppercase text-primary">Deposit {fromCurrency?.network?.name} ({fromCurrency.code}) address</span>
                <div className={`${depositAddress === undefined || depositAddress === "" ? "border-[#695F5F]" : "border-primary/30"} flex items-center justify-between bg-transparent md:border md:border-primary/40 border-[1.5px] md:rounded-lg rounded-[4px] p-2 shadow-md max-h-[3.3125rem] my-3`}>
                  <Input
                    type="text"
                    value={depositAddress || ""}
                    placeholder={""}
                    className="text-primary text-md flex-1 border-none bg-transparent focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
                    style={{ outline: "none" }}
                    readOnly={true}
                    disabled={false}
                  />
                  {depositAddress && <div className="md:block hidden"><QrCodeGenerator text={depositAddress} /></div>}
                  <ButtonCopyIcon text={depositAddress || ""} />
                </div>
                {
                  transactionData.status === "wait" ?
                    (isConfirming && <div className="flex flex-col items-center text-primary"><CustomLoader /><span className="md:text-primary text-white">Waiting to receive funds</span></div>) :
                    transactionData.status === "success" ? <div className="flex flex-col items-center text-primary"><StatusBar steps={steps} currentStep={currentStep} /><span>Transaction is completed and funds are received</span></div> :
                      transactionData.status === "overdue" ? <div className="flex justify-center"><span >Transation is overdue</span></div> :
                        (isConfirming && <StatusBar steps={steps} currentStep={currentStep} />)
                }
              </div>
              }
            </div>

          </div>
        </div>
      </div>
      <div className="absolute lg:h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-black/0 to-[#050F0F] z-10" />
    </div>
  )
  );
};

export default AddressesCard;
