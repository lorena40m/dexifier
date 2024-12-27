"use client";

import Image from "next/image";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { Switch } from "@/components/ui/switch";
import { useSwap } from "@/app/providers/SwapProvider";
import { useWidget } from "@rango-dev/widget-embedded";
import { SwapperMeta, SwapperType } from "rango-types/mainApi";
import SwapperModal from "./SwapperModal";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TooltipTemplate from "../../common/tooltip-template";

const PERCENTAGES = ['0.5', '1', '3']

const SettingModal: React.FC<PropsWithChildren> = ({ children, ...props }) => {
  const { settings, setSettings } = useSwap();
  const { meta } = useWidget();
  const { swappers } = meta;

  function countSwappersByType(swappers: SwapperMeta[], type: SwapperType): number {
    return swappers.filter((swapper: SwapperMeta) => swapper.types.includes(type)).length
  }

  const optionsDiv = (
    image: ReactNode,
    title: string | ReactNode,
    endingContent: ReactNode
  ) => (
    <div className="py-4 flex items-center justify-between hover:bg-black/30 hover:border-primary border-b border-separator text-lg cursor-pointer transition-colors duration-300">
      <div className="flex items-center gap-2.5">
        {image}
        <span>{title}</span>
      </div>
      {endingContent}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          {/* Dialog header with title and close button */}
          <DialogTitle className="text-2xl">Settings</DialogTitle>
          <DialogClose>
            <X className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <div>
          <Label htmlFor="slippage" className="text-lg capitalize flex items-center gap-1">
            slippage tolerance per swap
            <TooltipTemplate disabled duration={0} className="text-white" content={<>
              Your transaction will be reverted if the price changes unfavorably<br />
              by more than this percentage<br />
              <br />
              <strong>Warning: </strong>This setting is applied per step (e.g.
              1Inch, Thorchain, etc)<br />which means only the step will be reverted,
              not the whole transaction.
            </>}>
              <CiCircleInfo
                size={20}
                className="hover:text-primary transition-colors duration-300"
              />
            </TooltipTemplate>
          </Label>
          <div id="slippage" className="flex flex-wrap items-center justify-between my-4 gap-3">
            {PERCENTAGES.map((percentage, index) => (
              <Button key={index} variant="outline"
                className={cn(settings.slippage === percentage ? "border-primary text-primary" : "border-separator text-white",
                  "border hover:bg-inherit hover:border-primary-dark hover:text-primary-dark h-[3.375rem] w-1/6 text-base rounded-[.5625rem]"
                )}
                onClick={() => {
                  setSettings(prev => ({
                    ...prev,
                    slippage: percentage,
                  }))
                }}
              >
                {percentage}%
              </Button>
            ))}
            <Input
              type="number"
              className={cn(PERCENTAGES.includes(settings.slippage) ? "border-separator text-white" : "border-primary text-primary",
                "text-center border hover:border-primary-dark focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent rounded-[.5625rem] w-1/4 h-[3.375rem] transition-colors duration-300")}
              value={settings.slippage}
              placeholder="custom"
              step={0.1}
              min={0.1}
              max={100}
              onChange={(e) => {
                setSettings(prev => ({
                  ...prev,
                  slippage: e.target.value,
                }))
              }}
            />
          </div>

          <SwapperModal
            title={"Bridges"}
            type={"BRIDGE"}
          >
            {optionsDiv(
              <Image
                src={"/assets/settings/bridges.png"}
                width={25.68}
                height={18}
                alt="bridge icon"
              />,

              "Bridges",

              <div className="flex items-center gap-2.5">
                <span>
                  {countSwappersByType(settings.swappers, 'BRIDGE')}/
                  {countSwappersByType(swappers, 'BRIDGE')}
                </span>
                <IoIosArrowForward size={22} />
              </div>
            )}
          </SwapperModal>

          <SwapperModal
            title={"Exchanges"}
            type={'DEX'}
          >
            {optionsDiv(
              <Image
                src={"/assets/settings/exchange.png"}
                width={26}
                height={15.6}
                alt="exchange icon"
              />,

              "Exchanges",

              <div className="flex items-center gap-2.5">
                <span>
                  {countSwappersByType(settings.swappers, 'DEX')}/
                  {countSwappersByType(swappers, 'DEX')}
                </span>
                <IoIosArrowForward size={22} />
              </div>
            )}
          </SwapperModal>

          {optionsDiv(
            <Image
              src={"/assets/settings/infinite-approval.png"}
              width={24}
              height={11}
              alt="infinite approval icon"
            />,

            <div className="relative flex items-center gap-x-1.5">
              Infinite Approval
              <TooltipTemplate disabled duration={0} className="text-white" content={<>
                Enabling the &apos;Infinite approval&apos; mode grants<br />
                unrestricted access to smart contracts of DEXs/Bridges,<br />
                allowing them to utilize the approved token amount without<br />
                limitations.
              </>}>
                <CiCircleInfo
                  size={20}
                  className="cursor-default mt-0.5 hover:text-primary transition-colors duration-300"
                />
              </TooltipTemplate>
            </div>,

            <Switch
              id="infinite-approval"
              checked={settings.infiniteApproval}
              onCheckedChange={(value) => {
                setSettings(prev => ({
                  ...prev,
                  infiniteApproval: value,
                }))
              }}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;