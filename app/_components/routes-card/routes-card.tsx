"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux_slice/provider";
import { setSelectedRoute } from "@/redux_slice/slice/browserSlice/routeSlice";
import {
  Result,
  Swap,
  Tag,
  NewPreferenceType,
  Token,
} from "@/app/types/interface";
import {
  catchDataFromQuote,
  customStrategy,
  sortQuotesBy,
} from "@/app/utils/catch-data";
import TooltipTemplate from "../common/tooltip-template";
import ShadowDecoration from "../common/shadow-decoration";
import ImageWrapper from "../common/image-wrapper";

interface TagPanelProps {
  tags: Tag[];
  className: string;
  info: { totalTime: string; fee: string | undefined };
}

const RoutesCard = ({ isWalletConnected }: { isWalletConnected: boolean }) => {

  // redux hooks
  const routes = useAppSelector((state) => state.routes);
  const dispatch = useAppDispatch();
  const { isInProcess, isSwapMade } = useAppSelector((state) => state.swap);
  const { tokens } = useAppSelector((state) => state.allToken);

  // react state
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [sortedRoutes, setSortedRoutes] = useState<Result[]>(routes.routes);

  // use Memo

  // useEffect
  useEffect(() => {
    const changedStrategy = customStrategy("Recommended");
    const sortedResult = sortQuotesBy(
      changedStrategy,
      routes.routes as Result[]
    );
    setSortedRoutes(sortedResult);
  }, []);

  // single components
  const optionsButton = (text: string, id: number) => (
    <button
      className={`px-3.5 py-1.5 border border-primary rounded-full text-xs font-medium leading-[.9rem] transition-colors duration-300 ${selectedOption === id
        ? "bg-primary text-black cursor-default"
        : "bg-transparent text-white hover:bg-white/10 "
        } disabled:cursor-not-allowed `}
      onClick={() => {
        const changedStrategy = customStrategy(text as NewPreferenceType);
        const sortedResult = sortQuotesBy(
          changedStrategy,
          routes.routes as Result[]
        );
        setSortedRoutes(sortedResult);
        setSelectedOption(id);
      }}
      disabled={isInProcess || isSwapMade}
    >
      {text}
    </button>
  );

  const singleNodeTemplate = (
    logo: string,
    symbol: string,
    amount: string,
    blockchainLogo?: string
  ) => (
    <>
      <div className="w-[3.125rem] h-[3.125rem] p-3 border border-white border-dashed rounded-full">
        <div className="relative">
          <ImageWrapper>
            <Image src={logo} width={26} height={26} alt={`${symbol}'s icon`} />
          </ImageWrapper>
          <Image
            className="absolute bottom-[-6px] left-[15px]"
            src={blockchainLogo || ""}
            width={15}
            height={15}
            alt={`${symbol}'s blockchainIcon`}
          />
        </div>
      </div>

      <h1 className="w-[50px] text-[.625rem] text-white ">
        {amount} {symbol}
      </h1>
    </>
  );

  const TagPanel: React.FC<TagPanelProps> = ({ tags, className, info }) => {
    return (
      <div className={className}>
        <div className="flex flex-row justify-center text-sm mx-3 min-w-[107px] mb-1 text-primary">
          <div>
            {info.fee}$
          </div>
          <span className="mx-1"> | </span>
          <div>
            {info.totalTime}
          </div>
        </div>
        {tags.map((tag: Tag, index: number) => {
          return (
            tag.label != "Recommended" && (
              <div
                key={"tag" + index}
                className="bg-black opacity-60 flex px-2 py-1 mb-1 border rounded-md border-primary mx-3 text-xs font-medium min-w-[107px] justify-center"
              >
                <span
                  className={`${tag.label == "High Impact" ? "text-rose-500" : ""} text-center`}
                >
                  {tag.label}
                </span>
              </div>
            )
          );
        })}
      </div>
    );
  };

  const singleRouteContainer = (route: Result, tokens: Token[]) => {
    const calculatedInfo = catchDataFromQuote(route, tokens);
    return (
      <button
        className={`relative w-full mb-3.5 flex max-w-full overflow-x-auto pt-6 pb-1.5 ps-3 bg-[#459b7612] border rounded-xl ${routes.selectedRoute?.requestId !== route.requestId
          ? "border-seperator"
          : "border-primary"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        onClick={() => dispatch(setSelectedRoute({ route: route }))}
        key={route.requestId}
        disabled={isInProcess || isSwapMade}
        style={{ clipPath: "border-box" }}
      >
        {route.swaps.map((singleNode: Swap, index: number) => {
          const isEven = index % 2 == 0;
          const containerClasses =
            "min-w-fit flex flex-col items-center justify-start gap-y-1.5";

          return (
            <div key={index} className="flex items-start">
              <div
                className={`relative ${!isEven && "mt-[3.125rem] ml-[24px]"} ${index != 0 && isEven ? "ml-[40px]" : ""
                  } ${containerClasses}`}
              >
                {singleNodeTemplate(
                  singleNode.from.logo as string,
                  singleNode.from.symbol,
                  parseFloat(singleNode.fromAmount).toFixed(2),
                  singleNode.from.blockchainLogo
                )}

                {isEven ? (
                  <div>
                    <Image
                      src="/assets/icons/arrow-down.svg"
                      width={59}
                      height={21}
                      alt="Arrow down"
                      className={`absolute ${index != 0 ? "-right-[3.5625rem]" : "-right-[3.0625rem]"
                        } top-6`}
                    />
                    <TooltipTemplate content={`${singleNode.swapperId}`}>
                      <Image
                        src={singleNode.swapperLogo || ""}
                        width={20}
                        height={20}
                        alt={`${singleNode.swapperId}`}
                        className={`absolute ${index != 0 ? "-right-[2.425rem]" : "-right-[2.125rem]"
                          } top-4`}
                      />
                    </TooltipTemplate>
                  </div>
                ) : (
                  <div className="mx-2">
                    <div>
                      <Image
                        src="/assets/icons/arrow-up.svg"
                        width={28.5}
                        height={59}
                        alt="Arrow up"
                        className="absolute -right-[2.1625rem] -top-[1.875rem]"
                      />
                      <TooltipTemplate content={`${singleNode.swapperId}`}>
                        <Image
                          src={singleNode.swapperLogo || ""}
                          width={20}
                          height={20}
                          alt={`${singleNode.swapperId}`}
                          className="absolute -right-[1.9rem] -top-3"
                        />
                      </TooltipTemplate>
                    </div>
                  </div>
                )}
              </div>

              {route.swaps.length === index + 1 && (
                <div
                  className={`
                  ${isEven ? "mt-[3.125rem] ms-[22px]" : "ms-[42px]"}
                  ${containerClasses}`}
                >
                  {singleNodeTemplate(
                    singleNode.to.logo as string,
                    singleNode.to.symbol,
                    parseFloat(singleNode.toAmount).toFixed(2),
                    singleNode.to.blockchainLogo
                  )}
                </div>
              )}
            </div>
          );
        })}
        <TagPanel
          className="flex flex-col absolute right-0 top-1"
          tags={route.tags}
          info={calculatedInfo}
        />
      </button>
    );
  };

  // render part

  return ((
    <div className="relative bg-modal w-full min-h-[570px] pb-2 pt-6 md:pt-[1.8125rem] px-4 md:px-[1.1875rem] rounded-3xl border border-seperator backdrop-filter backdrop-blur-lg shadow-lg">

      <div className="z-0 w-full">
        <h1 className="text-2xl mb-2 md:mb-4">Routes</h1>

        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          {optionsButton("Recommended", 0)}
          {optionsButton("Fastest", 1)}
          {optionsButton("Cheapest", 2)}
          {optionsButton("Smart", 3)}
        </div>
        <div className="relative">
          <ShadowDecoration />
          <div className="overflow-y-auto lg:h-[26.5rem] pe-2">
            {sortedRoutes.map((item) => singleRouteContainer(item, tokens))}
          </div>
        </div>
      </div>
      <div className="absolute lg:h-[32.875rem] lg:max-w-[23.875rem] bg-gradient-to-b from-black/0 to-[#050F0F] z-10" />
    </div>
  )
  );
};

export default RoutesCard;
