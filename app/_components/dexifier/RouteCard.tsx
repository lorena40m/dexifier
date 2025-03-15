"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react"; // Importing React hooks
import TooltipTemplate from "../common/tooltip-template"; // Import TooltipTemplate component for displaying tooltips
import { useWidget } from "@rango-dev/widget-embedded"; // Importing hook from the Rango widget
import {
  MultiRouteSimulationResult,
  SwapResult,
} from "rango-types/mainApi"; // Import types for the swap logic
import TokenIcon from "../common/token-icon";
import { ChainflipQuote } from "@/app/types/chainflip";
import {
  DEXIFIER_STATE,
  DexifierRoute,
  useDexifier,
} from "@/app/providers/DexifierProvider";
import { RateResponse } from "@/app/types/exolix";
import { RadioGroup } from "@/components/ui/radio-group";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import FloatingTooltip from "../common/floating-tooltip";
import { Blockchain, Token } from "@/app/types/dexifier";
import { MAP_BLOCKCHAIN_RANGO_2_EXOLIX } from "@/app/utils/exolix";

const FILTERS = ["Shortest", "Best rate", "Lowest fee", "Fastest"];

const RouteCard = () => {
  const { chains, coins, routes, setSelectedRoute, tokenFrom, tokenTo, state, isMobile } =
    useDexifier();
  const [filter, setFilter] = useState<string>("Shortest");

  // Helper function to render a single node with logo, symbol, and amount
  const singleNodeTemplate = (
    logo: string,
    symbol: string,
    amount: string,
    blockchainLogo?: string
  ) => (
    <div className="w-[50px]">
      <div className="h-[50px] p-2 border border-white border-dashed rounded-full">
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
      <div className="text-xs text-white flex flex-col">
        <span>{amount}</span>
        <span>{symbol}</span>
      </div>
    </div>
  );

  // Function to render each route with relevant information
  const rangoRoute = (route: MultiRouteSimulationResult) => {
    return (
      <div className={`relative w-full flex overflow-x-auto`}>
        {route.swaps.map((singleNode: SwapResult, index: number) => {
          const isEven = index % 2 === 0;
          const containerClasses =
            "min-w-fit flex flex-col items-center justify-start gap-y-1.5";

          return (
            <div key={index} className="flex items-start">
              <div
                className={`relative ${!isEven && "mt-[3.125rem] ml-[24px]"} ${index !== 0 && isEven ? "ml-[40px]" : ""
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
                      className={`absolute ${index !== 0
                        ? "-right-[3.5625rem]"
                        : "-right-[3.0625rem]"
                        } top-6`}
                    />
                    <TooltipTemplate content={`${singleNode.swapperId}`}>
                      <TokenIcon
                        token={{
                          image: singleNode.swapperLogo,
                          alt: singleNode.swapperId,
                          className: "size-5",
                        }}
                        className={`absolute ${index !== 0
                          ? "-right-[2.425rem]"
                          : "-right-[2.125rem]"
                          } top-4`}
                      />
                    </TooltipTemplate>
                  </div>
                ) : (
                  <div className="mx-2">
                    <Image
                      src="/assets/icons/arrow-up.svg"
                      width={28.5}
                      height={59}
                      alt="Arrow up"
                      className="absolute -right-[2.1625rem] -top-[1.875rem]"
                    />
                    <TooltipTemplate content={`${singleNode.swapperId}`}>
                      <TokenIcon
                        token={{
                          image: singleNode.swapperLogo,
                          alt: singleNode.swapperId,
                          className: "size-5",
                        }}
                        className={`absolute -right-[1.9rem] -top-3`}
                      />
                    </TooltipTemplate>
                  </div>
                )}
              </div>

              {route.swaps.length === index + 1 && (
                <div
                  className={`${isEven ? "mt-[3.125rem] ms-[22px]" : "ms-[42px]"
                    } ${containerClasses}`}
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
        <div className="absolute top-0 right-2 px-2 py-1 rounded-md text-sm font-bold text-primary-dark border border-primary-dark">
          {"Browser"}
        </div>
      </div>
    );
  };

  // Function to render each quote with relevant information
  const chainflipRoute = (route: ChainflipQuote) => {
    const [ingressAsset, ingressChain] = route.ingressAsset.split('.')
    const [egressAsset, egressChain] = route.egressAsset.split('.')
    const tokenFrom: Token | undefined = coins.find(
      (token: Token) =>
        token.blockchain === ingressChain || token.blockchain === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[ingressChain] &&
        token.symbol === ingressAsset.toUpperCase()
    );
    const tokenTo: Token | undefined = coins.find(
      (token: Token) =>
        token.blockchain === egressChain || token.blockchain === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[egressChain] &&
        token.symbol === egressAsset.toUpperCase()
    );
    const blockchainFrom: Blockchain | undefined = chains.find(
      (blockchain: Blockchain) =>
        blockchain.name === ingressChain || blockchain.name === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[ingressChain]
    );
    const blockchainTo: Blockchain | undefined = chains.find(
      (blockchain: Blockchain) =>
        blockchain.name === egressChain || blockchain.name === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[egressChain]
    );
    return (
      <div className={`relative w-full flex overflow-x-auto`}>
        <div className="flex items-start">
          <div className={`relative flex flex-col gap-y-1`}>
            {singleNodeTemplate(
              tokenFrom?.image || '',
              tokenFrom?.symbol || '',
              route.ingressAmount.toFixed(2),
              blockchainFrom?.logo || ''
            )}
            <div>
              <Image
                src="/assets/icons/arrow-down.svg"
                width={59}
                height={21}
                alt="Arrow down"
                className={`absolute -right-[3.0625rem] top-6`}
              />
              <TooltipTemplate content={`Chainflip`}>
                <TokenIcon
                  token={{
                    image: "https://docs.chainflip.io/chainfliplogo.png",
                    alt: "Chainflip",
                    className: "size-5",
                  }}
                  className={`absolute -right-[2.125rem] top-3.5`}
                />
              </TooltipTemplate>
            </div>
          </div>
          <div className={`mt-[50px] ms-[22px] flex flex-col gap-y-1`}>
            {singleNodeTemplate(
              tokenTo?.image || '',
              tokenTo?.symbol || '',
              route.egressAmount.toFixed(2),
              blockchainTo?.logo || ''
            )}
          </div>
        </div>
        <div className="absolute top-0 right-2 px-2 py-1 rounded-md text-sm font-bold text-primary-dark border border-primary-dark">
          {"Wallet-less"}
        </div>
      </div>
    );
  };

  const exolixRoute = (route: RateResponse) => {
    if (tokenFrom && tokenTo) {
      const blockchainFrom: Blockchain | undefined = chains.find(
        (blockchain: Blockchain) =>
          blockchain.name === tokenFrom.blockchain || tokenFrom.blockchain && blockchain.name === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[tokenFrom.blockchain]
      );
      const blockchainTo: Blockchain | undefined = chains.find(
        (blockchain: Blockchain) =>
          blockchain.name === tokenTo.blockchain || tokenTo.blockchain && blockchain.name === MAP_BLOCKCHAIN_RANGO_2_EXOLIX[tokenTo.blockchain]
      );
      return (
        <div className={`relative w-full flex overflow-x-auto`}>
          <div className="flex items-start">
            <div className={`relative flex flex-col gap-y-1`}>
              {singleNodeTemplate(
                tokenFrom.image || '',
                tokenFrom.symbol,
                route.fromAmount.toFixed(2),
                blockchainFrom?.logo || ''
              )}
              <div>
                <Image
                  src="/assets/icons/arrow-down.svg"
                  width={59}
                  height={21}
                  alt="Arrow down"
                  className={`absolute -right-[3.0625rem] top-6`}
                />
                <TooltipTemplate content={`Exolix`}>
                  <TokenIcon
                    token={{
                      image: "https://exolix.com/favicon/favicon-32x32.png",
                      alt: "Exolix",
                      className: "size-5",
                    }}
                    className={`absolute -right-[2.125rem] top-3.5`}
                  />
                </TooltipTemplate>
              </div>
            </div>
            <div className={`mt-[3.125rem] ms-[22px] flex flex-col gap-y-1`}>
              {singleNodeTemplate(
                tokenTo.image || '',
                tokenTo.symbol,
                route.toAmount.toFixed(2),
                blockchainTo?.logo || ''
              )}
            </div>
          </div>
          <div className="absolute top-0 right-2 px-2 py-1 rounded-md text-sm font-bold text-primary-dark border border-primary-dark">
            {"Wallet-less"}
          </div>
        </div>
      );
    }
  };

  function sortRoutesByLayers(routes: DexifierRoute[]) {
    return routes.sort((a, b) => {
      // Check if 'a' is a Quote or RateResponse
      const isAQuoteOrRateResponse = "srcAsset" in a || "rate" in a;
      // Check if 'b' is a Quote or RateResponse
      const isBQuoteOrRateResponse = "srcAsset" in b || "rate" in b;

      // If 'a' is a Quote or RateResponse and 'b' is not, 'a' should come first
      if (isAQuoteOrRateResponse && !isBQuoteOrRateResponse) {
        return -1;
      }
      // If 'b' is a Quote or RateResponse and 'a' is not, 'b' should come first
      if (isBQuoteOrRateResponse && !isAQuoteOrRateResponse) {
        return 1;
      }

      // If both are MultiRouteSimulationResult, sort by the number of swaps
      if ("swaps" in a && "swaps" in b) {
        return a.swaps.length - b.swaps.length;
      }

      // If none of the above conditions are met, maintain the original order
      return 0;
    });
  }

  function sortRoutesByEgress(routes: DexifierRoute[]) {
    // Precompute the sorting value for each route
    const routesWithValues = routes.map((route) => {
      let value: number;
      if ("outputAmount" in route) {
        value = Number(route.outputAmount); // MultiRouteSimulationResult
      } else if ("egressAmount" in route) {
        value = Number(route.egressAmount); // Quote
      } else if ("toAmount" in route) {
        value = route.toAmount; // RateResponse
      } else {
        value = 0; // Fallback (should not happen based on the type definition)
      }
      return { route, value };
    });

    // Sort the routes based on the precomputed values (descending order)
    routesWithValues.sort((a, b) => b.value - a.value);

    // Extract the sorted routes
    return routesWithValues.map((entry) => entry.route);
  }

  function sortRoutesByFee(routes: DexifierRoute[]) {
    // Precompute the sorting value for each route
    const routesWithValues = routes.map((route) => {
      let value: number;
      if ("outputAmount" in route) {
        value =
          route.scores.find((score: any) => score.preferenceType === "FEE")?.score ||
          0; // MultiRouteSimulationResult
      } else if ("egressAmount" in route) {
        value = 0; // Quote
      } else if ("rate" in route) {
        value = 0; // RateResponse
      } else {
        value = 0; // Fallback (should not happen based on the type definition)
      }
      return { route, value };
    });

    // Sort the routes based on the precomputed values (descending order)
    routesWithValues.sort((a, b) => a.value - b.value);

    // Extract the sorted routes
    return routesWithValues.map((entry) => entry.route);
  }

  function sortRoutesByTime(routes: DexifierRoute[]) {
    // Precompute the sorting value for each route
    const routesWithValues = routes.map((route) => {
      let value: number;
      if ("outputAmount" in route) {
        value =
          route.scores.find((score: any) => score.preferenceType === "SPEED")
            ?.score || 0; // MultiRouteSimulationResult
      } else if ("egressAmount" in route) {
        value = 0; // Quote
      } else if ("rate" in route) {
        value = 0; // RateResponse
      } else {
        value = 0; // Fallback (should not happen based on the type definition)
      }
      return { route, value };
    });

    // Sort the routes based on the precomputed values (descending order)
    routesWithValues.sort((a, b) => a.value - b.value);

    // Extract the sorted routes
    return routesWithValues.map((entry) => entry.route);
  }

  const sortedRoutes = useMemo(() => {
    if (routes)
      switch (filter) {
        case "Shortest":
          return sortRoutesByLayers(routes);
        case "Best rate":
          return sortRoutesByEgress(routes);
        case "Lowest fee":
          return sortRoutesByFee(routes);
        case "Fastest":
          return sortRoutesByTime(routes);
        default:
          break;
      }
  }, [routes, filter]);

  return (
    <Card
      className={cn(
        "h-full flex flex-col w-full border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg text-white",
        isMobile ? "bg-primary/10 p-5" : "max-w-[650px] bg-modal/5 p-6 border"
      )}
    >
      <CardHeader className="p-4">
        <div className="h-auto bg-transparent flex w-full justify-between">
          <CardTitle>Routes</CardTitle>
          <RadioGroup
            defaultValue={FILTERS[0]}
            onValueChange={(value) => setFilter(value)}
            className="flex items-center"
          >
            {FILTERS.map((filter) => (
              <RadioGroupPrimitive.Item
                value={filter}
                id={filter}
                key={filter}
                className="rounded-full border border-primary px-2 py-1 bg-primary/5 transition duration-300 ease-out hover:bg-transparent text-white text-xs data-[state=checked]:bg-primary data-[state=checked]:text-black"
              >
                {filter}
              </RadioGroupPrimitive.Item>
            ))}
          </RadioGroup>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto p-0 pe-1 flex-1">
        {state === DEXIFIER_STATE.FETCHING_ROUTES ? (
          [0, 1].map((val) => (
            <Skeleton
              className="h-[170px] w-full rounded-lg p-4 mb-2"
              key={val}
            >
              <div className="flex gap-2">
                <div className="flex flex-col items-center gap-2 w-12">
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="w-10 h-2 rounded-md" />
                  <Skeleton className="w-10 h-2 rounded-md" />
                </div>
                <div>
                  <div className="h-12 flex items-center">
                    <Skeleton className="h-2 w-12 rounded-md" />
                  </div>
                  <div className="flex flex-col items-center gap-2 w-12 ml-6">
                    <Skeleton className="size-12 rounded-full" />
                    <Skeleton className="w-10 h-2 rounded-md" />
                    <Skeleton className="w-10 h-2 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-12 w-2 rounded-md mt-6" />
                <div className="flex flex-col items-center gap-2 w-12">
                  <Skeleton className="size-12 rounded-full" />
                  <Skeleton className="w-10 h-2 rounded-md" />
                  <Skeleton className="w-10 h-2 rounded-md" />
                </div>
              </div>
            </Skeleton>
          ))
        ) : (
          <div className="overflow-auto size-full">
            {sortedRoutes && sortedRoutes.length ? (
              <RadioGroup
                defaultValue="0"
                onValueChange={(value) =>
                  setSelectedRoute(sortedRoutes[parseInt(value)])
                }
                className="w-full h-full"
              >
                {sortedRoutes.map((route, index) => {
                  return (
                    <FloatingTooltip
                      key={index}
                      description={
                        'outputAmount' in route
                          ? "Browser wallet connection needed"
                          : "No wallet connection needed"
                      }
                    >
                      <RadioGroupPrimitive.Item
                        value={index.toString()}
                        id={index.toString()}
                        key={index}
                        className="w-full rounded-lg border border-white/20 data-[state=checked]:border-primary p-4 bg-primary/5 bg-opacity-50 transition duration-300 ease-out hover:bg-transparent"
                      >
                        {'outputAmount' in route ? (
                          rangoRoute(route)
                        ) : 'egressAmount' in route ? (
                          chainflipRoute(route)
                        ) : 'toAmount' in route ? (
                          exolixRoute(route)
                        ) : (
                          <></>
                        )}
                      </RadioGroupPrimitive.Item>
                    </FloatingTooltip>
                  );
                })}
              </RadioGroup>
            ) : (
              <div className="flex flex-col h-full text-center justify-center text-primary">
                <span className="text-6xl">⚠</span>
                <br />
                <span className="text-base">No available route found</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RouteCard;
