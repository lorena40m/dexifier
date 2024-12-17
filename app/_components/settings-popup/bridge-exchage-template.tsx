"use client";

import Image from "next/image";
import PopupTemplate from "../common/popup-template";
import Search from "../common/search";
import React, { ReactNode, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { Bridge, BridgeEnum, Exchange } from "@/app/types/interface";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import {
  toggleSelectAllBridges,
  toggleSelectAllExchanges,
  updateBridges,
  updateExchanges,
} from "@/redux_slice/slice/settingsSlice";

const BridgeExchangeTemplate = ({
  title,
  data,
  exhangeData,
  children,
  type,
}: {
  title: string;
  data?: Bridge[];
  type: BridgeEnum;
  exhangeData?: Exchange[];
  children: ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const [search, setSearch] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleItemClick = (itemId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  // const toggleSelectAllBridges = () => {
  //   selectedItems.length === data!.length
  //     ? setSelectedItems([])
  //     : setSelectedItems(data!.map((item) => item.id));
  // };

  // const toggleSelectAllExchanges = () => {
  //   selectedItems.length === exhangeData!.length
  //     ? setSelectedItems([])
  //     : setSelectedItems(exhangeData!.map((item) => item.id));
  // };

  const filteredItemsBridges = (data ?? []).filter((item) => {
    if (item.title != null) {
      return item.title.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });

  const filteredItemsExchanges = (exhangeData ?? []).filter((item) => {
    if (item.title != null) {
      return item.title.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });

  return type == BridgeEnum.BRIDGE ? (
    <PopupTemplate
      title={title}
      triggerButton={children}
      topButton={
        <DialogClose className="flex items-center justify-center">
          <FaArrowLeft className="w-8 h-8 p-1.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </DialogClose>
      }
    >
      <>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="mb-6 pe-[.2188rem] flex justify-end items-center">
          <button
            className="bg-transparent border-none text-sm hover:text-primary transition-colors duration-300"
            onClick={() =>
              dispatch(toggleSelectAllBridges({ bridges: data as Bridge[] }))
            }
          >
            {settings.selectedBridgesCounter === settings.totalBridges
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        <div className="sm:mx-[.5813rem] overflow-y-auto max-h-[50vh] pe-6">
          <div>
            {filteredItemsBridges.map((item) => {
              const isSelected = settings.bridges.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="pb-[.875rem] mb-6 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                  onClick={() => dispatch(updateBridges({ bridgeID: item.id }))}
                >
                  <div className="flex gap-[.875rem]">
                    <Image
                      src={item.logo}
                      alt={`${item.title}'s icon`}
                      width={26}
                      height={26}
                      className="!w-[26px] !h-[26px]"
                    />

                    <h2 className="text-base sm:text-lg">{item.title}</h2>
                  </div>

                  <div
                    className={`w-4 h-4 ${isSelected
                      ? "bg-primary text-black"
                      : "bg-transparent border border-seperator"
                      } rounded-[.25rem] flex items-center justify-center  `}
                  >
                    {isSelected && <FaCheck size={10} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </PopupTemplate>
  ) : (
    <PopupTemplate
      title={title}
      triggerButton={children}
      topButton={
        <DialogClose className="flex items-center justify-center">
          <FaArrowLeft className="w-8 h-8 p-1.5 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
        </DialogClose>
      }
    >
      <>
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="mb-6 pe-[.2188rem] flex justify-end items-center">
          <button
            className="bg-transparent border-none text-sm hover:text-primary transition-colors duration-300"
            onClick={() =>
              dispatch(
                toggleSelectAllExchanges({
                  exchanges: exhangeData as Exchange[],
                })
              )
            }
          >
            {settings.selectedExchangesCounter === settings.totalExchanges
              ? "Deselect All"
              : "Select All"}
          </button>
        </div>

        <div className="sm:mx-[.5813rem] overflow-y-auto max-h-[50vh] pe-6">
          <div>
            {filteredItemsExchanges.map((item) => {
              const isSelected = settings.exchanges.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="pb-[.875rem] mb-6 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                  onClick={() =>
                    dispatch(updateExchanges({ exchangeId: item.id }))
                  }
                >
                  <div className="flex gap-[.875rem]">
                    <Image
                      src={item.logo}
                      alt={`${item.title}'s icon`}
                      width={26}
                      height={26}
                      className="!w-[26px] !h-[26px]"
                    />

                    <h2 className="text-base sm:text-lg">{item.title}
                      <span className="text-sm text-border">({item.id})</span></h2>
                  </div>

                  <div
                    className={`w-4 h-4 ${isSelected
                      ? "bg-primary text-black"
                      : "bg-transparent border border-seperator"
                      } rounded-[.25rem] flex items-center justify-center  `}
                  >
                    {isSelected && <FaCheck size={10} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </PopupTemplate>
  );
};

export default BridgeExchangeTemplate;
