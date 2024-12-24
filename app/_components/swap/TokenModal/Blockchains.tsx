// This component displays a list of blockchain options with their logos and allows the user to select a blockchain from the grid. 
// It also provides a modal to view more blockchain options.

import TooltipTemplate from "../../common/tooltip-template";
import React, { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";
import { useWidget } from "@rango-dev/widget-embedded";
import { BlockchainMeta } from "rango-types/mainApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlockchainModal from "./BlockchainModal";
import _ from "lodash";

// Define props for the Blockchains component
interface BlockchainsProps {
  selectedBlockchain?: BlockchainMeta; // The currently selected blockchain
  setSelectedBlockchain: Dispatch<SetStateAction<BlockchainMeta | undefined>>; // Function to set the selected blockchain
}

const Blockchains: React.FC<BlockchainsProps> = ({ selectedBlockchain, setSelectedBlockchain }) => {
  const { meta } = useWidget(); // Fetch widget metadata using the custom hook
  const { blockchains } = meta; // Extract blockchains from the metadata

  return (
    <section className="mb-4">
      <div className="grid grid-cols-4 gap-x-6 gap-y-5 px-6">
        {/* Map over the blockchains and render the first 7 blockchains */}
        {_.sortBy(blockchains, (blockchain: BlockchainMeta) => (blockchain.chainId === selectedBlockchain?.chainId ? 0 : 1)) // Sort to show selected blockchain first
          .slice(0, 7) // Limit the displayed blockchains to the first 7
          .map((blockchain: BlockchainMeta, index: number) => (
            // Tooltip component to display the blockchain name when hovered
            <TooltipTemplate
              content={blockchain.displayName} // Content of the tooltip (blockchain name)
              className="!-mb-3"
              key={index}
            >
              <div
                className={cn(
                  'px-1 py-2.5 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer',
                  selectedBlockchain?.chainId === blockchain.chainId ? "border-primary" : "border-seperator" // Conditional border color for selected blockchain
                )}
                onClick={() => setSelectedBlockchain(blockchain)} // Set selected blockchain when clicked
              >
                {/* Avatar for displaying the blockchain logo */}
                <Avatar className="size-10">
                  <AvatarImage src={blockchain.logo} />
                  <AvatarFallback>{blockchain.shortName}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTemplate>
          ))}
        {/* View More button, triggers BlockchainModal to show more blockchains */}
        <BlockchainModal
          selectedBlockchain={selectedBlockchain}
          setSelectedBlockchain={setSelectedBlockchain}
        >
          <div className="px-1 py-2.5 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer border-seperator">
            <h3 className="text-sm text-center">View More</h3> {/* Text to show the View More option */}
          </div>
        </BlockchainModal>
      </div>
    </section>
  );
};

export default Blockchains;