import React, { Dispatch, PropsWithChildren, SetStateAction, useEffect, useState } from "react";
import { isEqual } from "lodash";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import _ from 'lodash';
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useWidget } from "@rango-dev/widget-embedded";
import { BlockchainMeta } from "rango-types/mainApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import Search from "@/app/_components/common/search";

interface BlockchainModalProps {
  selectedBlockchain?: BlockchainMeta;
  setSelectedBlockchain: Dispatch<SetStateAction<BlockchainMeta | undefined>>;
}

const BlockchainModal: React.FC<PropsWithChildren<BlockchainModalProps>> = ({ children, selectedBlockchain, setSelectedBlockchain }) => {
  const { meta } = useWidget();
  const { blockchains } = meta;

  const [search, setSearch] = useState<string>('')
  const [filteredBlockchains, setFilteredBlockchains] = useState<BlockchainMeta[]>([]);

  useEffect(() => {
    setFilteredBlockchains(blockchains)
  }, [blockchains])

  useEffect(() => {
    setFilteredBlockchains(blockchains.filter((blockchain: BlockchainMeta) => blockchain.displayName.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Blockchains</DialogTitle>
          <DialogClose>
            <FaArrowLeft className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />
        <Search onChange={(e) => setSearch(e.target.value)} />
        <ScrollArea className="h-96">
          {filteredBlockchains.map((blockchain, index) => {
            const isSelected = isEqual(blockchain, selectedBlockchain);
            return (
              <DialogClose className="ml-2 overflow-y-auto max-h-[50vh] w-full pe-3" key={index}>
                <div>
                  <div
                    key={index}
                    className="pb-[.875rem] mt-4 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedBlockchain(blockchain)}
                  >
                    <div className="flex gap-[.875rem]">
                      <Avatar className="size-8">
                        <AvatarImage src={blockchain.logo} />
                        <AvatarFallback>{blockchain.shortName}</AvatarFallback>
                      </Avatar>

                      <h2 className="text-base sm:text-lg">{blockchain.displayName}</h2>
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
                </div>
              </DialogClose>
            )
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlockchainModal;
