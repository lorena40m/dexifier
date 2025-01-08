"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";  // Importing React hooks
import { catchDataFromQuote, sortQuotesBy } from "@/app/utils/swap";  // Import utility functions for catching data and sorting quotes
import TooltipTemplate from "../common/tooltip-template";  // Import TooltipTemplate component for displaying tooltips
import { useWidget } from "@rango-dev/widget-embedded";  // Importing hook from the Rango widget
import { useSwap } from "@/app/providers/SwapProvider";  // Importing context provider for swap-related data
import { MultiRouteSimulationResult, PreferenceType, RouteTag, SwapResult } from "rango-types/mainApi";  // Import types for the swap logic
import TokenIcon from "../common/token-icon";
import { cn } from "@/lib/utils";

// Enum for different sorting preferences
enum PREFERENCE {
  RECOMMENDED = 'Recommended',
  FASTEST = 'Fasted',
  CHEAPEST = 'Cheapest',
  SMART = 'Smart',
}

// Mapping strategy for each preference type
const STRATEGY: { [key: string]: PreferenceType } = {
  [PREFERENCE.RECOMMENDED]: "PRICE",
  [PREFERENCE.FASTEST]: "SPEED",
  [PREFERENCE.CHEAPEST]: "FEE",
  [PREFERENCE.SMART]: "SMART",
}

const RouteCard = () => {
  const { meta } = useWidget();  // Getting metadata
  const { tokens } = meta;  // Extracting tokens from the metadata
  const { routeData, selectedRoute, setSelectedRoute } = useSwap();  // Getting route data from SwapProvider context
  const routes: MultiRouteSimulationResult[] = useMemo(() => routeData ? routeData.results : [], [routeData]);  // Memoizing the routes to avoid recalculating unless routeData changes

  const [preference, setPreference] = useState<PREFERENCE>(PREFERENCE.RECOMMENDED);  // State to store the current sorting preference
  const [sortedRoutes, setSortedRoutes] = useState<MultiRouteSimulationResult[]>(routes);  // State to store sorted routes

  // useEffect to sort routes by the default preference when component mounts
  useEffect(() => {
    const sortedResult = sortQuotesBy(STRATEGY[PREFERENCE.RECOMMENDED], routes);
    setSortedRoutes(sortedResult);
    setSelectedRoute(sortedResult[0]);
  }, [routes]);

  // Helper function to render a single node with logo, symbol, and amount
  const singleNodeTemplate = (logo: string, symbol: string, amount: string, blockchainLogo?: string) => (
    <>
      <div className="w-[3.125rem] h-[3.125rem] p-2 border border-white border-dashed rounded-full">
        <TokenIcon
          token={{
            image: logo,
            alt: symbol,
            className: "size-8",
          }}
          blockchain={{
            image: blockchainLogo,
            alt: symbol,
            className: "size-4",
          }}
        />
      </div>
      <h1 className="w-[50px] text-[.625rem] text-white ">{amount} {symbol}</h1>
    </>
  );

  // Function to render each route with relevant information
  const singleRouteContainer = (route: MultiRouteSimulationResult) => {
    const calculatedInfo = catchDataFromQuote(route, tokens);  // Get the fee and total time info for the route
    return (
      <button
        className={`relative w-full mb-3.5 flex max-w-full overflow-x-auto pt-6 pb-1.5 ps-3 bg-[#459b7612] border rounded-xl ${selectedRoute?.requestId !== route.requestId ? "border-separator" : "border-2 border-primary"} disabled:opacity-40 disabled:cursor-not-allowed`}
        onClick={() => setSelectedRoute(route)}  // Set the selected route when clicked
        key={route.requestId}
        style={{ clipPath: "border-box" }}
      >
        {route.swaps.map((singleNode: SwapResult, index: number) => {
          const isEven = index % 2 === 0;
          const containerClasses = "min-w-fit flex flex-col items-center justify-start gap-y-1.5";

          return (
            <div key={index} className="flex items-start">
              <div className={`relative ${!isEven && "mt-[3.125rem] ml-[24px]"} ${index !== 0 && isEven ? "ml-[40px]" : ""} ${containerClasses}`}>
                {singleNodeTemplate(singleNode.from.logo as string, singleNode.from.symbol, parseFloat(singleNode.fromAmount).toFixed(2), singleNode.from.blockchainLogo)}
                {isEven ? (
                  <div>
                    <Image src="/assets/icons/arrow-down.svg" width={59} height={21} alt="Arrow down" className={`absolute ${index !== 0 ? "-right-[3.5625rem]" : "-right-[3.0625rem]"} top-6`} />
                    <TooltipTemplate content={`${singleNode.swapperId}`}>
                      <TokenIcon
                        token={{
                          image: singleNode.swapperLogo,
                          alt: singleNode.swapperId,
                          className: "size-5"
                        }}
                        className={`absolute ${index !== 0 ? "-right-[2.425rem]" : "-right-[2.125rem]"} top-4`}
                      />
                    </TooltipTemplate>
                  </div>
                ) : (
                  <div className="mx-2">
                    <Image src="/assets/icons/arrow-up.svg" width={28.5} height={59} alt="Arrow up" className="absolute -right-[2.1625rem] -top-[1.875rem]" />
                    <TooltipTemplate content={`${singleNode.swapperId}`}>
                      <TokenIcon
                        token={{
                          image: singleNode.swapperLogo,
                          alt: singleNode.swapperId,
                          className: "size-5"
                        }}
                        className={`absolute -right-[1.9rem] -top-3`}
                      />
                    </TooltipTemplate>
                  </div>
                )}
              </div>

              {route.swaps.length === index + 1 && (
                <div className={`${isEven ? "mt-[3.125rem] ms-[22px]" : "ms-[42px]"} ${containerClasses}`}>
                  {singleNodeTemplate(singleNode.to.logo as string, singleNode.to.symbol, parseFloat(singleNode.toAmount).toFixed(2), singleNode.to.blockchainLogo)}
                </div>
              )}
            </div>
          );
        })}
        <div className="flex flex-col absolute right-0 top-1">
          <div className="flex flex-row justify-center text-sm mx-3 min-w-[107px] mb-1 text-primary">
            <div>{calculatedInfo.fee}$</div>
            <span className="mx-1"> | </span>
            <div>{calculatedInfo.totalTime}</div>
          </div>
          {route.tags.map((tag: RouteTag, index: number) => tag.label !== "Recommended" && (
            <div key={"tag" + index} className="bg-black opacity-60 flex px-2 py-1 mb-1 border rounded-md border-primary mx-3 text-xs font-medium min-w-[107px] justify-center">
              <span className={`${tag.label === "High Impact" ? "text-rose-500" : ""} text-center`}>{tag.label}</span>
            </div>
          ))}
        </div>
      </button>
    );
  };

  return (
    <div className="relative max-w-[650px] min-h-[540px] w-full h-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg flex flex-col gap-4">
      <h1 className="text-2xl">Routes</h1>
      <div className="flex flex-wrap items-center gap-x-3">
        {Object.values(PREFERENCE).map((value, index) => (
          <button
            key={index}
            className={cn("px-3.5 py-1.5 border border-primary rounded-full text-xs font-medium leading-[.9rem] transition-colors duration-300",
              preference === value ? "bg-primary text-black" : "bg-transparent text-white hover:bg-white/10"
            )}
            onClick={() => {
              const sortedResult = sortQuotesBy(STRATEGY[value], routes as MultiRouteSimulationResult[]);  // Sort routes based on selected preference
              setSortedRoutes(sortedResult);  // Update sorted routes state
              setPreference(value);  // Update preference state
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="overflow-y-auto h-[28rem] pe-1">
        {sortedRoutes.map((route) => singleRouteContainer(route))}
      </div>
    </div>
  );
};

export default RouteCard;