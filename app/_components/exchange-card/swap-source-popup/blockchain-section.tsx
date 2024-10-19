import Image from "next/image";
import TooltipTemplate from "../../common/tooltip-template";
import React, { ReactNode } from "react";
import { Blockchain } from "@/app/types/interface";
import { toastSuccess } from "@/lib/utils";
import { useDispatch } from "react-redux";
import {
  updateFromBlockchain,
  updateToBlockchain,
} from "@/redux_slice/slice/browserSlice/blockchainSlice";
import AllBlockchainsPopup from "./all-blockchains-popup";
import { resetToken } from "@/redux_slice/slice/browserSlice/tokenSlice";
import { updateRouteFetched } from "@/redux_slice/slice/browserSlice/routeSlice";
import { useAppSelector } from "@/redux_slice/provider";

const BlockchainSection: React.FC<{
  blockchains: Blockchain[];
  selectedBlockchain: Blockchain;
  isFromBlockchain: boolean;
}> = ({ blockchains, selectedBlockchain, isFromBlockchain }) => {
  const dispatch = useDispatch();

  const updateBlockchain = (blockchain: Blockchain) => {
    if (isFromBlockchain) {
      dispatch(updateFromBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: true }));
    } else {
      dispatch(updateToBlockchain({ blockchain }));
      dispatch(resetToken({ isFromToken: false }));
    }
    dispatch(updateRouteFetched({ isRouteFetched: false }));
  };

  const blockchainTemplate = (
    id = "",
    name = "",
    onClick: Function,
    content: ReactNode
  ) => (
    <div
      className={`px-1 py-2.5 flex items-center justify-center border rounded-3xl bg-transparent hover:bg-white/5 transition-colors duration-300 cursor-pointer ${selectedBlockchain?.chainId === id
        ? "border-primary"
        : "border-seperator"
        }`}
      onClick={() => onClick()}
      key={`${id}-${name}`}
    >
      {content}
    </div>
  );

  const sortedBlockchains =
    selectedBlockchain.name !== ""
      ? [
        selectedBlockchain,
        ...blockchains.filter(
          (b) => b.chainId !== selectedBlockchain.chainId
        ),
      ]
      : blockchains;

  const totalBlockchains = sortedBlockchains.length;
  const firstSevenBlockchains = sortedBlockchains.slice(0, 7);
  const allBlockchains = sortedBlockchains.slice(0, 8);

  return (
    <section className="mb-4">
      <h1 className="capitalize text-base sm:text-lg mb-4">
        select blockchain
      </h1>

      <div className="grid grid-cols-4 gap-x-6 gap-y-5 px-6">
        {totalBlockchains <= 8
          ? allBlockchains.map((blockchain, index) => {
            const { chainId, displayName, logo } = blockchain;
            return (
              <TooltipTemplate
                content={displayName}
                className="!-mb-3"
                key={`${chainId}-${displayName}`}
              >
                {blockchainTemplate(
                  chainId,
                  displayName,
                  () => updateBlockchain(blockchain),
                  <Image
                    key={index}
                    src={logo}
                    width={38}
                    height={38}
                    alt={`${displayName}'s icon`}
                    className="!w-[2.625rem] !h-[2.625rem]"
                  />
                )}
              </TooltipTemplate>
            );
          })
          : firstSevenBlockchains.map((blockchain, index) => {
            const { chainId, displayName, logo } = blockchain;
            return (
              <TooltipTemplate
                content={displayName}
                className="!-mb-3"
                key={`${chainId}-${displayName}`}
              >
                {blockchainTemplate(
                  chainId,
                  displayName,
                  () => {
                    updateBlockchain(blockchain);
                    toastSuccess(
                      `${blockchain.displayName}'s selected as the blockchain`
                    );
                  },

                  <Image
                    key={index}
                    src={logo}
                    width={38}
                    height={38}
                    alt={`${displayName}'s icon`}
                    className="!w-[2.625rem] !h-[2.625rem]"
                  />
                )}
              </TooltipTemplate>
            );
          })}

        {totalBlockchains > 8 && (
          <AllBlockchainsPopup
            data={blockchains}
            isFromBlockchain={isFromBlockchain}
          >
            {blockchainTemplate(
              "",
              "",
              () => { },
              <h3 className="text-sm text-center">View More</h3>
            )}
          </AllBlockchainsPopup>
        )}
      </div>
    </section>
  );
};

export default BlockchainSection;
