"use client";
import Image from "next/image";
import PopupTemplate from "../common/popup-template";
import Search from "../common/search";
import TooltipTemplate from "../common/tooltip-template";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux_slice/provider";

interface TokenData {
  name: string;
  amount: number;
  imageSrc: string;
}

const dummyData = [
  {
    date: "July 3, 2024",
    status: "completed",
    fromToken: {
      name: "USDT",
      amount: 850,
      imageSrc: "/assets/settings/history/usdt.png",
    },
    toToken: {
      name: "USDT",
      amount: 848.109164,
      imageSrc: "/assets/settings/history/usdt.png",
    },
  },
  {
    date: "June 3, 2024",
    status: "completed",
    fromToken: {
      name: "Eth",
      amount: 0.02999,
      imageSrc: "/assets/settings/history/eth.png",
    },
    toToken: {
      name: "bnb",
      amount: 0.14639,
      imageSrc: "/assets/settings/history/bnb.png",
    },
  },
];

// Get current month and year
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

// Split data into this month and this year
const thisMonthData = dummyData.filter((item) => {
  const itemDate = new Date(item.date);
  return (
    itemDate.getMonth() === currentMonth &&
    itemDate.getFullYear() === currentYear
  );
});

const thisYearData = dummyData.filter((item) => {
  const itemDate = new Date(item.date);
  return (
    itemDate.getFullYear() === currentYear &&
    itemDate.getMonth() !== currentMonth
  );
});

const HistoryPopup = () => {
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const [search, setSearch] = useState<string>("");
  const [filteredMonthData, setFilteredMonthData] = useState(dummyData);
  const [filteredYearData, setFilteredYearData] = useState(dummyData);

  const triggerButton = (
    <Button
      className="p-2 bg-transparent hover:bg-transparent"
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

  const tokenContainer = (name: string, imageSrc: string) => (
    <div className="flex items-center justify-between">
      <div className="p-3 border border-seperator rounded-[.9375rem]">
        <Image src={imageSrc} width={57} height={57} alt={`${name}'s icon`} />
        <h3 className="pt-[.3125rem] text-sm uppercase text-center">{name}</h3>
      </div>
    </div>
  );

  const transactionContainer = (
    date: string,
    status: string,
    fromToken: TokenData,
    toToken: TokenData
  ) => (
    <div className="mb-6 p-4 border border-seperator rounded-3xl bg-transparent text-sm max-h-[10.875rem]">
      <div className="mb-4 flex items-center justify-between capitalize max-h-[1.0625rem]">
        <h3>{date}</h3>
        <h3
          className={`${
            status.toLowerCase() === "completed"
              ? "text-primary"
              : status.toLowerCase() === "rejected"
              ? "text-red-700"
              : "text-white"
          }`}
        >
          {status}
        </h3>
      </div>
      <div className="flex items-center justify-between max-h-[6.75rem]">
        {tokenContainer(fromToken.name, fromToken.imageSrc)}
        <div className="flex flex-col items-center ">
          <h3>{fromToken.amount}</h3>
          <div className="my-3.5 border border-seperator rounded-full w-[2.8975rem] h-[2.8975rem] flex items-center justify-center">
            <Image
              src={"/assets/icons/arrow-right.png"}
              alt="swap icon"
              width={26}
              height={19}
            />
          </div>
          <h3>{toToken.amount}</h3>
        </div>
        {tokenContainer(toToken.name, toToken.imageSrc)}
      </div>
    </div>
  );

  useEffect(() => {
    if (search === "") {
      setFilteredMonthData(thisMonthData);
      setFilteredYearData(thisYearData);
    } else {
      setFilteredMonthData(
        thisMonthData.filter(
          (transaction) =>
            transaction.date.toLowerCase().includes(search.toLowerCase()) ||
            transaction.fromToken.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            transaction.toToken.name
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      );
      setFilteredYearData(
        thisYearData.filter(
          (transaction) =>
            transaction.date.toLowerCase().includes(search.toLowerCase()) ||
            transaction.fromToken.name
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            transaction.toToken.name
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      );
    }
  }, [search, thisMonthData, thisYearData]);

  return (
    <PopupTemplate title={"History"} triggerButton={triggerButton}>
      <>
        <Search search={search} setSearch={setSearch} />
        <div className="max-h-[55vh] overflow-y-auto pe-3">
          {filteredMonthData.length > 0 && (
            <>
              <h2 className="text-sm mb-6">This Month</h2>
              {filteredMonthData.map((transaction, index) => (
                <React.Fragment key={index}>
                  {transactionContainer(
                    transaction.date,
                    transaction.status,
                    transaction.fromToken,
                    transaction.toToken
                  )}
                </React.Fragment>
              ))}
            </>
          )}
          {filteredYearData.length > 0 && (
            <>
              <h2 className="text-sm mb-6">This Year</h2>
              {filteredYearData.map((transaction, index) => (
                <React.Fragment key={index}>
                  {transactionContainer(
                    transaction.date,
                    transaction.status,
                    transaction.fromToken,
                    transaction.toToken
                  )}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </>
    </PopupTemplate>
  );
};

export default HistoryPopup;
