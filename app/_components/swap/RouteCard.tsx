"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import {
  catchDataFromQuote,
  sortQuotesBy,
} from "@/app/utils/swap";
import TooltipTemplate from "../common/tooltip-template";
import ImageWrapper from "../common/image-wrapper";
import { useWidget } from "@rango-dev/widget-embedded";
import { useSwap } from "@/app/providers/SwapProvider";
import { MultiRouteSimulationResult, PreferenceType, RouteTag, SwapResult } from "rango-types/mainApi";

interface TagPanelProps {
  tags: RouteTag[];
  className: string;
  info: { totalTime: string; fee: string | undefined };
}

enum PREFERENCE {
  RECOMMENDED = 'Recommended',
  FASTEST = 'Fasted',
  CHEAPEST = 'Cheapest',
  SMART = 'Smart',
}

const STRATEGY: {
  [key: string]: PreferenceType;
} = {
  [PREFERENCE.RECOMMENDED]: "PRICE",
  [PREFERENCE.FASTEST]: "SPEED",
  [PREFERENCE.CHEAPEST]: "FEE",
  [PREFERENCE.SMART]: "SMART",
}

const RouteCard = () => {
  const { meta } = useWidget();
  const { tokens } = meta;
  const { routeData, selectedRoute, setSelectedRoute } = useSwap();
  const routes: MultiRouteSimulationResult[] = useMemo(() =>
    routeData ? routeData.results : []
    , []);

  const [preference, setPreference] = useState<PREFERENCE>(PREFERENCE.RECOMMENDED);
  const [sortedRoutes, setSortedRoutes] = useState<MultiRouteSimulationResult[]>(routes);

  // useEffect
  useEffect(() => {
    const sortedResult = sortQuotesBy(
      STRATEGY[PREFERENCE.RECOMMENDED],
      routes,
    );
    setSortedRoutes(sortedResult);
  }, []);

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
        {tags.map((tag: RouteTag, index: number) => {
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

  const singleRouteContainer = (route: MultiRouteSimulationResult) => {
    const calculatedInfo = catchDataFromQuote(route, tokens);
    return (
      <button
        className={`relative w-full mb-3.5 flex max-w-full overflow-x-auto pt-6 pb-1.5 ps-3 bg-[#459b7612] border rounded-xl ${selectedRoute?.requestId !== route.requestId
          ? "border-separator"
          : "border-2 border-primary"
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        onClick={() => setSelectedRoute(route)}
        key={route.requestId}
        style={{ clipPath: "border-box" }}
      >
        {route.swaps.map((singleNode: SwapResult, index: number) => {
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

  return ((
    <div className="relative max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg flex flex-col gap-4">
      <h1 className="text-2xl">Routes</h1>
      <div className="flex flex-wrap items-center gap-x-3">
        {Object.values(PREFERENCE).map((value, index) => (
          <button
            key={index}
            className={`px-3.5 py-1.5 border border-primary rounded-full text-xs font-medium leading-[.9rem] transition-colors duration-300 ${preference === value
              ? "bg-primary text-black"
              : "bg-transparent text-white hover:bg-white/10 "
              } disabled:cursor-not-allowed `}
            onClick={() => {
              const sortedResult = sortQuotesBy(
                STRATEGY[value],
                routes as MultiRouteSimulationResult[]
              );
              setSortedRoutes(sortedResult);
              setPreference(value);
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto lg:h-[28rem] pe-1">
        {sortedRoutes.map((route) => singleRouteContainer(route))}
      </div>
    </div>
  )
  );
};

export default RouteCard;
