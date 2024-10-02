"use client";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux_slice/provider";
import { useDispatch } from "react-redux";
import { updateAddressError, updateRecipientAddress, updateTransactionData } from "@/redux_slice/slice/noWalletSlice/transactionSlice";
import ButtonCopyIcon from "../common/coypButtonIcon";
import { formatReadableDate } from "@/app/utils/catch-data";
import StatusBar from "../common/statusBar";
import ImageWrapper from "../common/imageWrapper";
import CustomLoader from "../common/loader";
import QrCodeGenerator from "../common/qrGenerator";

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
    <div className="relative bg-modal w-full min-h-[570px] pb-2 pt-[1.8125rem] px-[1.1875rem] rounded-3xl border border-seperator bg-black bg-opacity-5 backdrop-filter backdrop-blur-lg shadow-lg">

      <div className="z-0 w-full">
        <div
          id="__controls"
          className="border-b-[0.1px] border-[#333] border-solid"
        >
          <h1 className="text-2xl mb-4 px-4">{isConfirming ? "Confirmation" : (isHistoryLoading ? "History" : "Addresses")}</h1>
        </div >
        <div className="relative">
          {/* <ShadowDecoration /> */}
          <div className="p-3 min-h-[430px] flex flex-col justify-around">
            {rateResult && <div className="flex justify-center pt-6">
              <div className="flex items-center gap-2 m-auto">
                <div
                  className="bg-transparent flex items-center justify-center gap-[.5625rem] text-sm"
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
                    <div className="flex items-center gap-2 ">
                      <span>{transactionData?.amount || rateResult.fromAmount}</span>
                      <span>{fromCurrency.code}</span>

                      <span className="text opacity-80">
                        [{fromCurrency.network?.network}]
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <Image src={"/assets/icons/circleArrow.png"} width={30} height={30} alt="circleAddress" />
                </div>

                <div
                  className="bg-transparent flex items-center justify-center gap-[.5625rem] text-sm"
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
                    <div className="flex items-center gap-2 ">
                      <span>{transactionData?.amountTo || rateResult.toAmount}</span>
                      <span>{toCurrency.code}</span>

                      <span className="text opacity-80">
                        [{toCurrency.network?.network}]
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            }
            <div>
              <span className="text-lg mb-1">Recipient <span className="text-primary">{toCurrency?.network?.name} {toCurrency.code}</span> address</span>
              <div className={`${recipientAddress === "" ? "border-primary" : recipientAddressError.isError || false ? "border-error" : "border-[#695F5F]"} flex items-center justify-between bg-[#000]/30  backdrop-filter backdrop-blur-lg border  border-opacity-40 rounded-lg p-2 shadow-md max-h-[3.3125rem] my-3`}>
                <Input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => recipientInputChangeHandler(e)}
                  placeholder={"Enter recipient address"}
                  className="flex-1 text-md border-none bg-transparent focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
                  style={{ outline: "none" }}
                  disabled={isConfirming}
                />
                <button className="border border-primary text-primary rounded-lg p-1 disabled:cursor-not-allowed disabled:opacity-80" disabled={isConfirming} onClick={pasteFromClipboard}>paste</button>
              </div>

              {recipientAddress === "" ? <span className="text-primary text-sm">Enter the Recipient Address first !</span>
                : (recipientAddressError && <span className="text-error">{recipientAddressError?.error || ""}</span>)}
              {transactionData && <div className="flex flex-col items-center justify-center mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <div><Image src={"/assets/icons/clock.png"} width={20} height={20} alt="clock" /></div>
                    <span className="text-primary text-lg">Created Time : &nbsp;</span>
                    <span>{formatReadableDate(transactionData.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div><Image src={"/assets/icons/id.png"} width={20} height={20} alt="id" /></div>
                    <span className="text-primary text-lg">Transaction ID : &nbsp;</span>
                    <span className="pr-2">{transactionData.id}</span>
                    <ButtonCopyIcon text={transactionData.id || ""} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div><Image src={"/assets/icons/state.png"} width={23} height={23} alt="state" /></div>
                    <span className="text-primary text-lg">Status : &nbsp;</span>
                    <span>{transactionData.status}</span>
                  </div>
                </div>
              </div>
              }
            </div>

            <div>
              {transactionData && <div>
                <span className="text-lg mb-1">Deposit <span className="text-primary">{fromCurrency?.network?.name} {fromCurrency.code}</span> address</span>
                <div className={`${depositAddress === undefined || depositAddress === "" ? "border-[#695F5F]" : "border-primary"} flex items-center justify-between bg-[#000]/30  backdrop-filter backdrop-blur-lg border  border-opacity-40 rounded-lg p-2 shadow-md max-h-[3.3125rem] my-3`}>
                  <Input
                    type="text"
                    value={depositAddress || ""}
                    placeholder={""}
                    className="text-primary text-md flex-1 border-none bg-transparent focus-visible:ring-0 disabled:cursor-not-allowed focus-visible:outline-0 focus-visible:ring-offset-0"
                    style={{ outline: "none" }}
                    readOnly={true}
                    disabled={false}
                  />
                  {depositAddress && <QrCodeGenerator text={depositAddress} />}
                  <ButtonCopyIcon text={depositAddress || ""} />
                </div>
                {
                  transactionData.status === "wait" ?
                    (isConfirming && <div className="flex flex-col items-center text-primary"><CustomLoader /><span>Waiting to receive funds</span></div>) :
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
