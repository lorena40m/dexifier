"use client";

import Search from "../../common/search";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSwap } from "@/app/providers/SwapProvider";
import { useWidget } from "@rango-dev/widget-embedded";
import { SwapperMeta, SwapperType } from "rango-types/mainApi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import TokenIcon from "../../common/token-icon";
import { cn } from "@/lib/utils";

interface SwapperModalProps {
  title: string,
  type: SwapperType,
}

const SwapperModal: React.FC<PropsWithChildren<SwapperModalProps>> = ({ children, ...props }) => {
  const { settings, setSettings } = useSwap();
  const { meta } = useWidget();
  const swappers = meta.swappers.filter((swapper: SwapperMeta) => swapper.types.includes(props.type))
  const [filteredSwappers, setFilteredSwappers] = useState<SwapperMeta[]>(swappers);
  const [search, setSearch] = useState<string>('');

  function toggleValueInArray<T>(array: T[], item: T): T[] {
    if (array.includes(item)) {
      // If the item exists, filter it out
      return array.filter(i => i !== item);
    } else {
      // If the item doesn't exist, add it
      array.push(item);
      return array;
    }
  }

  useEffect(() => {
    setFilteredSwappers(swappers.filter(swapper => swapper.title.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">{props.title}</DialogTitle>
          <DialogClose>
            <FaArrowLeft className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Search value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className="pe-[.2188rem] flex justify-end items-center">
          <button
            className="bg-transparent border-none text-sm hover:text-primary transition-colors duration-300 first-letter:uppercase"
            onClick={() => {
              setSettings(prev => ({ ...prev, swappers: settings.swappers.length === filteredSwappers.length ? [] : swappers }))
            }}
          >
            {settings.swappers.length === filteredSwappers.length && 'de'}select All
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto max-h-[50vh]">
          {filteredSwappers.map((swapper) => {
            const isSelected = settings.swappers.includes(swapper);
            return (
              <>
                <div
                  key={swapper.id}
                  className="flex items-center justify-between cursor-pointer transition-all duration-300 hover:opacity-50 px-2"
                  onClick={() => {
                    setSettings(prev => ({ ...prev, swappers: toggleValueInArray(prev.swappers, swapper) }))
                  }}
                >
                  <div className="flex gap-[.875rem]">
                    <TokenIcon
                      token={{
                        image: swapper.logo,
                        alt: swapper.title,
                        className: "size-8"
                      }}
                    />
                    <h2 className="text-base sm:text-lg">{swapper.title}
                      <span className="text-sm text-border">({swapper.id})</span>
                    </h2>
                  </div>
                  <div
                    className={cn("w-4 h-4 rounded-[.25rem] flex items-center justify-center",
                      isSelected ? "bg-primary text-black" : "bg-transparent border border-seperator",
                    )}
                  >
                    {isSelected && <FaCheck size={10} />}
                  </div>
                </div>
                <Separator className="bg-separator" />
              </>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SwapperModal;