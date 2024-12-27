"use client";
import Image from "next/image";
import Search from "../../common/search";
import React, { useState, useEffect, useMemo, PropsWithChildren } from "react";
import { PendingSwap } from "rango-types";
import { getPendingSwaps } from "@/app/utils/queue";
import { useManager } from "@rango-dev/queue-manager-react";
import Link from "next/link";
import { getSwapDate } from "@/app/utils/swap";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

interface TokenData {
  symbol: string;
  blockchain: string;
  amount: string;
  imageSrc: string;
}

const HistoryModal: React.FC<PropsWithChildren> = ({ children, ...props }) => {
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

  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState(dummyData);

  useEffect(() => {
    setFilteredData(
      dummyData.filter((transaction) =>
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
      )
    );
  }, [search]);

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          {/* Dialog header with title and close button */}
          <DialogTitle className="text-2xl">History</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="max-h-[55vh] overflow-y-auto pe-3">
          {filteredData.length !== 0 && filteredData.map((tx, index) => (
            <React.Fragment key={index}>
              <Link href={`${process.env.NEXT_PUBLIC_DEXIFIER_EXPLORER}/swap/${tx.requestId}`} target="_blank">
                <div className="mb-6 p-4 border border-seperator rounded-3xl hover:opacity-70 bg-[#1dc17317] text-sm">
                  <div className="mb-4 flex items-center justify-between capitalize">
                    <h3>{tx.date}</h3>
                    <h3
                      className={`font-bold ${tx.status.toLowerCase() === "success"
                        ? "text-primary"
                        : tx.status.toLowerCase() === "failed"
                          ? "text-red-700"
                          : "text-white"
                        }`}
                    >
                      {tx.status}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between">
                    {tokenContainer(tx.fromToken.symbol, tx.fromToken.blockchain, tx.fromToken.imageSrc)}
                    <div className="flex flex-col items-center ">
                      <h3>
                        {tx.fromToken.amount}
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
                      <h3>{tx.toToken.amount}</h3>
                    </div>
                    {tokenContainer(tx.toToken.symbol, tx.toToken.blockchain, tx.toToken.imageSrc)}
                  </div>
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
