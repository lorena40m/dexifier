"use client";

import Image from "next/image";
import PopupTemplate from "@/app/_components/common/popup-template";
import Search from "@/app/_components/common/search";
import React, { ReactNode, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { Blockchain } from "@/app/types/interface";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import {
  updateFromBlockchain,
  updateToBlockchain,
} from "@/redux_slice/slice/blockchainSlice";
import { toastSuccess } from "@/lib/utils";
import { resetToken } from "@/redux_slice/slice/tokenSlice";
import {
  resetRoute,
  updateRouteFetched,
} from "@/redux_slice/slice/routeSlice";
import { resetSwap } from "@/redux_slice/slice/swapSlice";
import { resetQutoteData } from "@/redux_slice/slice/quoteDataSlice";
import ShadowDecoration from "@/app/_components/common/shadowDecoration";

const AllBlockchainsPopup = ({
  data,
  children,
  isFromBlockchain,
}: {
  data?: Blockchain[];
  children: ReactNode;
  isFromBlockchain: boolean;
}) => {
  const dispatch = useAppDispatch();
  const { isRoutesFetched } = useAppSelector(
    (state) => state.routes
  );

  const selectedBlockchain = useAppSelector((state) =>
    isFromBlockchain
      ? state.blockchains.fromBlockchain
      : state.blockchains.toBlockchain
  );
  const [search, setSearch] = useState<string>("");

  const handleItemClick = (blockchain: Blockchain) => {
    if (isFromBlockchain) {
      dispatch(updateFromBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: true }));
    } else {
      dispatch(updateToBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: false }));
    }
    // if (!isRoutesFetched) {
    //   dispatch(resetRoute());
    //   dispatch(resetSwap());
    // }
    dispatch(updateRouteFetched({ isRouteFetched: false }));
    toastSuccess(`${blockchain.name}'s selected as the blockchain`);
  };

  const filteredBlockchains = (data ?? []).filter((item) =>
    item.name != null
      ? item?.name?.toLowerCase().includes(search.toLowerCase())
      : false
  );

  return (
    <PopupTemplate
      title={"Blockchains"}
      triggerButton={children}
      topButton={
        <DialogClose className="flex items-center justify-center">
          <FaArrowLeft className="w-8 h-8 p-1.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </DialogClose>
      }
    >
      <>
        <Search search={search} setSearch={setSearch} />
        <div className="relative w-full">
          <ShadowDecoration />
          <DialogClose className="ml-2 overflow-y-auto max-h-[50vh] w-full pe-6">
            <div>
              {filteredBlockchains.map((item) => {
                const isSelected = selectedBlockchain?.chainId?.includes(
                  item.chainId
                );

                return (
                  <div
                    key={`${item.chainId}-${item.name}`}
                    className="pb-[.875rem] mb-6 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                    onClick={() => handleItemClick(item)}
                  >
                    <div className="flex gap-[.875rem]">
                      <Image
                        src={item.logo}
                        alt={`${item.name}'s icon`}
                        width={26}
                        height={26}
                        className="!w-[26px] !h-[26px]"
                        loading="lazy"
                      />

                      <h2 className="text-base sm:text-lg">{item.displayName}</h2>
                    </div>

                    <div
                      className={`w-5 h-5 ${isSelected
                        ? "bg-primary text-black"
                        : "bg-transparent border border-seperator"
                        } rounded-full flex items-center justify-center  `}
                    >
                      {isSelected && <FaCheck size={12.5} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogClose>
        </div>
      </>
    </PopupTemplate>
  );
};

export default AllBlockchainsPopup;
