import TooltipTemplate from "../../common/tooltip-template";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { cn, toastSuccess } from "@/lib/utils";
import { useWidget } from "@rango-dev/widget-embedded";
import { BlockchainMeta } from "rango-types/mainApi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlockchainModal from "./BlockchainModal";
import _ from "lodash";

interface BlockchainsProps {
  selectedBlockchain?: BlockchainMeta;
  setSelectedBlockchain: Dispatch<SetStateAction<BlockchainMeta | undefined>>;
}

const Blockchains: React.FC<BlockchainsProps> = ({ selectedBlockchain, setSelectedBlockchain }) => {
  const { meta } = useWidget();
  const { blockchains } = meta;

  return (
    <section className="mb-4">
      <div className="grid grid-cols-4 gap-x-6 gap-y-5 px-6">
        {_.sortBy(blockchains, (blockchain: BlockchainMeta) => (blockchain.chainId === selectedBlockchain?.chainId ? 0 : 1))
          .slice(0, 7).map((blockchain: BlockchainMeta, index: number) => (
            <TooltipTemplate
              content={blockchain.displayName}
              className="!-mb-3"
              key={index}
            >
              <div
                className={cn('px-1 py-2.5 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer',
                  selectedBlockchain?.chainId === blockchain.chainId ? "border-primary" : "border-seperator"
                )}
                onClick={() => setSelectedBlockchain(blockchain)}
              >
                <Avatar className="size-10">
                  <AvatarImage src={blockchain.logo} />
                  <AvatarFallback>{blockchain.shortName}</AvatarFallback>
                </Avatar>
              </div>
            </TooltipTemplate>
          ))
        }
        <BlockchainModal
          selectedBlockchain={selectedBlockchain}
          setSelectedBlockchain={setSelectedBlockchain}
        >
          <div className="px-1 py-2.5 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer border-seperator">
            <h3 className="text-sm text-center">View More</h3>
          </div>
        </BlockchainModal>
      </div>
    </section>
  );
};

export default Blockchains;