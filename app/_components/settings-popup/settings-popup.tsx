"use client";

import PopupTemplate from "../common/popup-template";
import Image from "next/image";
import BridgesPopup from "./bridges-popup";
import ExchangePopup from "./exchange-popup";
import TooltipTemplate from "../common/tooltip-template";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import {
  updateInfiniteApproval,
  updateSlippage,
} from "@/redux_slice/slice/settingsSlice";

const SettingsPopup = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);

  const [isSlippageCustom, setIsSlippageCustom] = useState<boolean>(false);
  const [showSlippageDetails, setShowSlippageDetails] =
    useState<boolean>(false);
  const [showInfiniteApprovalDetails, setShowInfiniteApprovalDetails] =
    useState<boolean>(false);

  const triggerButton = (
    <Button
      className="px-2 disabled:cursor-not-allowed bg-transparent hover:bg-transparent"
      disabled={isInProcess || isSwapMade}
    >
      <TooltipTemplate content="Settings" className="!mb-1">
        <Image
          src={"/assets/icons/setting.png"}
          alt="button-icon"
          width={18}
          height={18}
        />
      </TooltipTemplate>
    </Button>
  );

  const percentageBox = (text: string, value: number, className = "") => (
    <button
      className={`${className} ${settings.slippage == value
        ? "border-primary text-primary"
        : "border-seperator text-white"
        } text-sm sm:text-base border hover:border-primary-dark hover:text-primary-dark rounded-[.5625rem] cursor-pointer flex items-center justify-center w-1/4 xs:w-[4.25rem] h-[3.375rem] transition-colors duration-300`}
      onClick={() => {
        dispatch(updateSlippage({ value }));
        setIsSlippageCustom(false);
      }}
    // onClick={() => setSlippageTolerance(value)}
    >
      {text}
    </button>
  );

  const handleChange = (value: string) => {
    let updatedValue = parseFloat(value);

    if (updatedValue < 0.1) updatedValue = 0.1;
    else if (updatedValue > 100) updatedValue = 100;

    if (updatedValue !== 0.5 && updatedValue !== 1 && updatedValue !== 3)
      setIsSlippageCustom(true);
    else setIsSlippageCustom(false);

    dispatch(updateSlippage({ value: updatedValue }));

    // setCustomSlippageTolerance(updatedValue);
    // setSlippageTolerance(null);
  };

  const optionsDiv = (
    image: ReactNode,
    title: string | ReactNode,
    endingContent: ReactNode
  ) => (
    <div className="py-4 w-full flex items-center justify-between hover:bg-black/30 hover:border-primary border-b border-seperator text-base sm:text-lg cursor-pointer transition-colors duration-300">
      <div className="flex items-center gap-2.5">
        {image}

        <h2>{title}</h2>
      </div>

      {endingContent}
    </div>
  );

  return (
    <PopupTemplate title="Settings" triggerButton={triggerButton}>
      <>
        <h1 className="capitalize text-base sm:text-lg mb-6 flex items-center gap-x-1.5">
          slippage tolerance per swap{" "}
          <CiCircleInfo
            size={20}
            className="relative mt-1 hover:text-primary transition-colors duration-300"
            onMouseEnter={() => setShowSlippageDetails(true)}
            onMouseLeave={() => setShowSlippageDetails(false)}
          />
          <div
            className={`absolute -top-0.5 p-3 bg-black normal-case border border-primary text-xs rounded-xl ${showSlippageDetails ? "block" : "hidden"
              }`}
          >
            Your transaction will be reverted if the price changes unfavorably
            by more than this percentage
            <br />
            <br />
            <strong>Warning: </strong>This setting is applied per step (e.g.
            1Inch, Thorchain, etc) which means only the step will be reverted,
            not the whole transaction.
          </div>
        </h1>

        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
          {percentageBox("0.5%", 0.5)}
          {percentageBox("1%", 1)}
          {percentageBox("3%", 3)}

          <input
            type="number"
            className={`${isSlippageCustom
              ? "border-primary text-primary"
              : "border-seperator text-white"
              } text-center px-[1.875rem] py-[1.1563rem] border hover:border-primary-dark outline-none  placeholder:text-slate-400 bg-transparent rounded-[.5625rem] cursor-pointer w-full xs:w-[7.5rem] h-[3.375rem] transition-colors duration-300`}
            value={settings.slippage}
            placeholder="custom"
            step={0.1}
            onChange={(e) => handleChange(e.target.value)}
            onClick={() => setIsSlippageCustom(true)}
          />
        </div>

        <div>
          <BridgesPopup>
            {optionsDiv(
              <Image
                src={"/assets/settings/bridges.png"}
                width={25.68}
                height={18}
                alt="bridge icon"
              />,

              "Bridges",

              <div className="flex items-center gap-2.5">
                <h2>
                  {settings.selectedBridgesCounter ?? 0}/
                  {settings.totalBridges ?? 0}
                </h2>
                <IoIosArrowForward size={22} />
              </div>
            )}
          </BridgesPopup>

          <ExchangePopup>
            {optionsDiv(
              <Image
                src={"/assets/settings/exchange.png"}
                width={26}
                height={15.6}
                alt="exchange icon"
              />,

              "Exchanges",

              <div className="flex items-center gap-2.5">
                <h2>
                  {settings.selectedExchangesCounter ?? 0}/
                  {settings.totalExchanges ?? 0}
                </h2>
                <IoIosArrowForward size={22} />
              </div>
            )}
          </ExchangePopup>

          {optionsDiv(
            <Image
              src={"/assets/settings/infinite-approval.png"}
              width={24}
              height={11}
              alt="infinite approval icon"
            />,

            <div className="relative flex items-center gap-x-1.5">
              Infinite Approval
              <CiCircleInfo
                size={20}
                className="cursor-default mt-0.5 hover:text-primary transition-colors duration-300"
                onMouseEnter={() => setShowInfiniteApprovalDetails(true)}
                onMouseLeave={() => setShowInfiniteApprovalDetails(false)}
              />
              <div
                className={`min-w-[400px] absolute -top-20 p-3 bg-black normal-case border border-primary text-xs rounded-xl ${showInfiniteApprovalDetails ? "block" : "hidden"
                  }`}
              >
                Enabling the &apos;Infinite approval&apos; mode grants
                unrestricted access to smart contracts of DEXs/Bridges,
                allowing them to utilize the approved token amount without
                limitations.
              </div>
            </div>,

            <Switch
              id="infinite-approval"
              checked={settings.infiniteApproval}
              onCheckedChange={(value) =>
                dispatch(updateInfiniteApproval({ value }))
              }
            />
          )}
        </div>
      </>
    </PopupTemplate>
  );
};

export default SettingsPopup;
