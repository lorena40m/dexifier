// This file defines a `BlockchainModal` component that renders a modal to display and select a blockchain from a list.
// It uses React state and effects to manage the modal's behavior and the search/filtering functionality.
// The component relies on various UI elements like Dialog, ScrollArea, and Avatar from a custom UI library and external dependencies.

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
import _ from 'lodash';
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { useWidget } from "@rango-dev/widget-embedded";
import { BlockchainMeta } from "rango-types/mainApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import Search from "@/app/_components/common/search";
import TokenIcon from "../../common/token-icon";

// Define props for the BlockchainModal component
interface BlockchainModalProps {
  selectedBlockchain?: BlockchainMeta; // Currently selected blockchain
  setSelectedBlockchain: Dispatch<SetStateAction<BlockchainMeta | undefined>>; // Function to update the selected blockchain
}

const BlockchainModal: React.FC<PropsWithChildren<BlockchainModalProps>> = ({ children, selectedBlockchain, setSelectedBlockchain }) => {
  const { meta } = useWidget(); // Access metadata using custom hook
  const { blockchains } = meta; // Extract blockchains from the metadata

  const [search, setSearch] = useState<string>(''); // Search query state
  const [filteredBlockchains, setFilteredBlockchains] = useState<BlockchainMeta[]>([]); // Filtered list of blockchains

  // Effect to initialize the filtered blockchains when the blockchains data changes
  useEffect(() => {
    setFilteredBlockchains(blockchains)
  }, [blockchains])

  // Effect to filter the blockchain list based on the search query
  useEffect(() => {
    setFilteredBlockchains(blockchains.filter((blockchain: BlockchainMeta) => blockchain.displayName.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  return (
    <Dialog>
      {/* Trigger for the modal */}
      <DialogTrigger asChild>{children}</DialogTrigger>

      {/* Modal content */}
      <DialogContent className="sm:max-w-md bg-transparent max-h-[90vh] max-w-[90vw] p-4 md:p-6 bg-gradient-to-b from-black to-[#042214] border border-separator !rounded-3xl">
        <DialogHeader className="flex flex-row justify-between">
          <DialogTitle className="text-2xl">Blockchains</DialogTitle>
          <DialogClose>
            {/* Close button with an arrow icon */}
            <FaArrowLeft className="w-7 h-7 p-1 bg-primary rounded-full font-bold text-black hover:bg-primary-dark transition-colors duration-300" />
          </DialogClose>
        </DialogHeader>
        <Separator className="bg-separator" />

        {/* Search input to filter blockchains */}
        <Search onChange={(e) => setSearch(e.target.value)} />

        {/* Scrollable list of blockchains */}
        <ScrollArea className="h-96">
          {filteredBlockchains.map((blockchain, index) => {
            const isSelected = isEqual(blockchain, selectedBlockchain); // Check if the blockchain is selected

            return (
              <DialogClose className="ml-2 overflow-y-auto max-h-[50vh] w-full pe-3" key={index}>
                <div>
                  <div
                    key={index}
                    className="pb-[.875rem] mt-4 flex items-center justify-between border-b border-seperator cursor-pointer transition-all duration-300"
                    onClick={() => setSelectedBlockchain(blockchain)} // Set selected blockchain on click
                  >
                    {/* Avatar and display name for the blockchain */}
                    <div className="flex gap-[.875rem]">
                      <TokenIcon  
                        token={{
                          image: blockchain.logo,
                          alt: blockchain.shortName,
                        }}
                      />  {/* Blockchain logo */}
                      <h2 className="text-base sm:text-lg">{blockchain.displayName}</h2>
                    </div>

                    {/* Indicator to show if the blockchain is selected */}
                    <div
                      className={`w-5 h-5 ${isSelected
                          ? "bg-primary text-black"
                          : "bg-transparent border border-seperator"
                        } rounded-full flex items-center justify-center`}
                    >
                      {isSelected && <FaCheck size={12.5} />} {/* Checkmark icon for selected blockchain */}
                    </div>
                  </div>
                </div>
              </DialogClose>
            );
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlockchainModal;
