"use client";
import Image from "next/image";
import PopupTemplate from "../common/popup-template";
import Search from "../common/search";
import TooltipTemplate from "../common/tooltip-template";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux_slice/provider";
import { SwapStatus } from "rango-types";
import { TransactionCoin, TransactionData } from "@/app/types/noWalletInterface";
import { formatReadableDate } from "@/app/utils/catch-data";
import { useDispatch } from "react-redux";
import { updateConfirming } from "@/redux_slice/slice/noWalletSlice/rateSlice";
import { fetchConfirm } from "@/app/api/noWallet-api";
import { updateTransactionData } from "@/redux_slice/slice/noWalletSlice/transactionSlice";
import { deleteHistory } from "@/redux_slice/slice/noWalletSlice/historySlice";

interface HistoryPopProps {
  startConfirming: (transactionId: string, isHistory: boolean) => Promise<void>;
}

const NoWalletHistoryPopup: React.FC<HistoryPopProps> = ({ startConfirming }) => {
  const dispatch = useDispatch();
  const { history } = useAppSelector((state) => state.history);
  const { isConfirming } = useAppSelector((state) => state.rate)
  const [filteredData, setFilteredData] = useState<TransactionData[]>([]);
  const confirmIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [search, setSearch] = useState<string>("");


  const startHistoryConfirming = async (transactionId: string) => {

    // Start polling for confirmation
    console.log("start confirming with transactionId", transactionId);

    dispatch(updateConfirming({ isConfirming: true }));

    // Clear any existing interval before starting a new one
    if (confirmIntervalRef.current) {
      clearInterval(confirmIntervalRef.current);
    }

    confirmIntervalRef.current = setInterval(async () => {
      const ConfirmedData = await fetchConfirm(transactionId);
      dispatch(updateTransactionData({ transactionData: ConfirmedData }));

      if (ConfirmedData?.status === "success" || ConfirmedData?.status === "overdue" || ConfirmedData?.status === "refunded") {
        clearInterval(confirmIntervalRef.current!);
        dispatch(updateConfirming({ isConfirming: false }));
        confirmIntervalRef.current = null;
      }
    }, 5000); // Poll every 5 seconds (adjust as needed)
  };

  useEffect(() => {
    const tempTransactionData = history.filter((historyData) =>
      historyData.id.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredData(tempTransactionData);
  }, [search, history])

  const triggerButton = (
    <Button
      className="px-2 disabled:cursor-not-allowed bg-transparent hover:bg-transparent"
      disabled={false}
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
  );

  const tokenContainer = (symbol: string, blockchain: string, imageSrc: string) => (
    <div className="w-[100px]">
      <div className="p-3 flex flex-col items-center justify-center border border-seperator rounded-[.9375rem]">
        <Image
          src={imageSrc}
          width={57}
          height={57}
          alt={`${symbol}'s icon`} />
        <h3 className="pt-[.3125rem] text-sm uppercase text-center">
          {symbol}
        </h3>
        <h3 className="pt-[.3125rem] text-sm uppercase text-center">
          {blockchain}
        </h3>
      </div>
    </div>
  );

  const transactionContainer = (
    historyData: TransactionData,
    amountFrom: number,
    amountTo: number,
    date: string,
    status: string,
    fromCoin: TransactionCoin,
    toCoin: TransactionCoin,
    requestId: string,
  ) => (
    <div className="w-full" key={`${requestId}`} >
      <div className="mb-6 p-4 border border-seperator rounded-3xl bg-[#1dc17317] text-sm">
        <div className="mb-4 flex items-center justify-between capitalize">
          <h3>{formatReadableDate(date)}</h3>

          <button
            className={`font-bold text-red-700 hover:opcity-80`}
            onClick={() => dispatch(deleteHistory({ deleteHistory: historyData }))}
          >
            {"Delete"}
          </button>
        </div>
        <button
          onClick={() => startConfirming(requestId, true)}
          className="flex w-full items-center justify-between disabled:opcity-80 hover:opacity-80"
          disabled={isConfirming}>
          {tokenContainer(fromCoin.coinCode, fromCoin.network, fromCoin.icon)}
          <div className="flex flex-col items-center ">
            <h3 className="text-primary py-2">{requestId}</h3>
            <h3>
              {amountFrom}
            </h3>
            <div
              className="my-1.5 border border-seperator rounded-full w-[2.8975rem] h-[2.8975rem] flex items-center justify-center">
              <Image
                src={"/assets/icons/arrow-right.png"}
                alt="swap icon"
                width={26}
                height={19}
              />
            </div>
            <h3>{amountTo}</h3>
          </div>
          {tokenContainer(toCoin.coinCode, toCoin.network, toCoin.icon)}
        </button>
      </div>
    </div>
  );

  return (
    <PopupTemplate title={"History"} triggerButton={triggerButton}>
      <>
        <Search search={search} setSearch={setSearch} />
        <div className="max-h-[55vh] overflow-y-auto pe-3">
          {filteredData.map((historyData) => {
            return (
              transactionContainer(
                historyData,
                historyData.amount,
                historyData.amountTo,
                historyData.createdAt,
                historyData.status,
                historyData.coinFrom,
                historyData.coinTo,
                historyData.id
              )
            )
          })}
        </div>
      </>
    </PopupTemplate>
  );
};

export default NoWalletHistoryPopup;
