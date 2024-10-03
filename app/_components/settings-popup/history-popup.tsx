"use client";
import Image from "next/image";
import PopupTemplate from "../common/popup-template";
import Search from "../common/search";
import TooltipTemplate from "../common/tooltip-template";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux_slice/provider";
import { PendingSwap, SwapStatus } from "rango-types";
import { getPendingSwaps } from "@/app/utils/queue";
import { useManager } from "@rango-dev/queue-manager-react";
import { getSwapDate } from "@/app/utils/catch-data";
import Link from "next/link";

interface TokenData {
  symbol: string;
  blockchain: string;
  amount: string;
  imageSrc: string;
}

interface HistoryDataType {
  date: string;
  status: SwapStatus;
  fromToken: TokenData;
  toToken: TokenData;
  requestId: string;
}

const HistoryPopup = () => {
  const { manager } = useManager();
  const list: PendingSwap[] = getPendingSwaps(manager).map(({ swap }) => swap);

  const createDummyData = (list: PendingSwap[]) => {
    return list.map((historyData) => {
      const date = getSwapDate(historyData);
      const lastIndex = historyData.steps.length - 1;
      const status = historyData.status;
      const fromToken: TokenData = {
        symbol: `${historyData.steps[0].fromSymbol}`,
        blockchain: `${historyData.steps[0].fromBlockchain}`,
        amount: parseFloat(historyData.inputAmount).toFixed(2),
        imageSrc: historyData.steps[0].fromLogo,
      };
      const toToken: TokenData = {
        symbol: `${historyData.steps[lastIndex].toSymbol}`,
        blockchain: `${historyData.steps[lastIndex].toBlockchain}`,
        amount: parseFloat(historyData.simulationResult.outputAmount).toFixed(2),
        imageSrc: historyData.steps[lastIndex].toLogo,
      };
      const requestId = historyData.requestId;
      return { date, status, fromToken, toToken, requestId };
    });
  };

  const dummyData = useMemo(() => createDummyData(list), [list]);

  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState(dummyData);

  useEffect(() => {

    const filterData = (data: HistoryDataType[]) =>
      data.filter(
        (transaction) =>
          transaction.date.toLowerCase().includes(search.toLowerCase()) ||
          transaction.fromToken.symbol
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.toToken.symbol
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.fromToken.blockchain
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          transaction.toToken.blockchain
            .toLowerCase()
            .includes(search.toLowerCase())
      );

    if (search === "") {
      setFilteredData(dummyData);
    } else {
      setFilteredData(filterData(dummyData));
    }
  }, [search]);

  const triggerButton = (
    <Button
      className="px-2 disabled:cursor-not-allowed bg-transparent hover:bg-transparent"
      disabled={isInProcess || isSwapMade}
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
    date: string,
    status: SwapStatus,
    fromToken: TokenData,
    toToken: TokenData,
    requestId: string,
  ) => (
    <Link href={`${process.env.NEXT_PUBLIC_DEXIFIER_EXPLORER}/swap/${requestId}`} target="_blank">
      <div className="mb-6 p-4 border border-seperator rounded-3xl hover:opacity-70 bg-[#1dc17317] text-sm">
        <div className="mb-4 flex items-center justify-between capitalize">
          <h3>{date}</h3>
          <h3
            className={`font-bold ${status.toLowerCase() === "success"
              ? "text-primary"
              : status.toLowerCase() === "failed"
                ? "text-red-700"
                : "text-white"
              }`}
          >
            {status}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          {tokenContainer(fromToken.symbol, fromToken.blockchain, fromToken.imageSrc)}
          <div className="flex flex-col items-center ">
            <h3>
              {fromToken.amount}
            </h3>
            <div
              className="my-3.5 border border-seperator rounded-full w-[2.8975rem] h-[2.8975rem] flex items-center justify-center">
              <Image
                src={"/assets/icons/arrow-right.png"}
                alt="swap icon"
                width={26}
                height={19}
              />
            </div>
            <h3>{toToken.amount}</h3>
          </div>
          {tokenContainer(toToken.symbol, toToken.blockchain, toToken.imageSrc)}
        </div>
      </div>
    </Link>
  );

  return (
    <PopupTemplate title={"History"} triggerButton={triggerButton}>
      <>
        <Search search={search} setSearch={setSearch} />
        <div className="max-h-[55vh] overflow-y-auto pe-3">

          {filteredData.length !== 0 && filteredData.map((transaction, index) => (
            <React.Fragment key={index}>
              {transactionContainer(
                transaction.date,
                transaction.status,
                transaction.fromToken,
                transaction.toToken,
                transaction.requestId
              )}
            </React.Fragment>
          ))}

          {dummyData.length !== 0 && filteredData.length === 0 && dummyData.map((transaction, index) => (
            <React.Fragment key={index}>
              {transactionContainer(
                transaction.date,
                transaction.status,
                transaction.fromToken,
                transaction.toToken,
                transaction.requestId
              )}
            </React.Fragment>
          ))}

        </div>
      </>
    </PopupTemplate>
  );
};

export default HistoryPopup;
