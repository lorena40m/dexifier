"use client";
import Image from "next/image";
import React from "react";  // Importing React hooks
import TooltipTemplate from "../common/tooltip-template";  // Import TooltipTemplate component for displaying tooltips
import { useWidget } from "@rango-dev/widget-embedded";  // Importing hook from the Rango widget
import { BlockchainMeta, MultiRouteSimulationResult, RouteTag, SwapResult, Token } from "rango-types/mainApi";  // Import types for the swap logic
import TokenIcon from "../common/token-icon";
import { Quote } from "@chainflip/sdk/swap";
import { formatChainName } from "@/app/utils/chainflip";
import { useDexifier } from "@/app/providers/DexifireProvider";
import { RateResponse } from "@/app/types/exolix";
import { RadioGroup } from "@/components/ui/radio-group";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RouteCard = () => {
  const { meta } = useWidget();  // Getting metadata
  const { tokens, blockchains } = meta;  // Extracting tokens & blockchains from the metadata

  const { routes, setSelectedRoute, tokenFrom, tokenTo } = useDexifier();

  // Helper function to render a single node with logo, symbol, and amount
  const singleNodeTemplate = (logo: string, symbol: string, amount: string, blockchainLogo?: string) => (
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
      <div
        className={`relative w-full flex overflow-x-auto`}
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
      </div>
    );
  };

  // Function to render each quote with relevant information
  const chainflipRoute = (route: Quote) => {
    const tokenFrom: Token = tokens.find((token: Token) => formatChainName(token.blockchain) === route.srcAsset.chain && token.symbol === route.srcAsset.asset)
    const tokenTo: Token = tokens.find((token: Token) => formatChainName(token.blockchain) === route.destAsset.chain && token.symbol === route.destAsset.asset)
    const blockchainFrom: BlockchainMeta = blockchains.find((blockchain: BlockchainMeta) => formatChainName(blockchain.name) === route.srcAsset.chain)
    const blockchainTo: BlockchainMeta = blockchains.find((blockchain: BlockchainMeta) => formatChainName(blockchain.name) === route.destAsset.chain)
    return (
      <div
        className={`relative w-full flex overflow-x-auto`}
      >
        <div className="flex items-start">
          <div className={`relative flex flex-col gap-y-1`}>
            {singleNodeTemplate(tokenFrom.image, tokenFrom.symbol, (Number(route.depositAmount) / (10 ** tokenFrom.decimals)).toFixed(2), blockchainFrom.logo)}
            <div>
              <Image src="/assets/icons/arrow-down.svg" width={59} height={21} alt="Arrow down" className={`absolute -right-[3.0625rem] top-6`} />
              <TooltipTemplate content={`Chainflip`}>
                <TokenIcon
                  token={{
                    image: "https://docs.chainflip.io/chainfliplogo.png",
                    alt: "Chainflip",
                    className: "size-5"
                  }}
                  className={`absolute -right-[2.125rem] top-3.5`}
                />
              </TooltipTemplate>
            </div>
          </div>
          <div className={`mt-[50px] ms-[22px] flex flex-col gap-y-1`}>
            {singleNodeTemplate(tokenTo.image, tokenTo.symbol, (Number(route.egressAmount) / (10 ** tokenTo.decimals)).toFixed(2), blockchainTo.logo)}
          </div>
        </div>
      </div>
    )
  }

  const exolixRoute = (route: RateResponse) => {
    if (tokenFrom && tokenTo) {
      const blockchainFrom: BlockchainMeta = blockchains.find((blockchain: BlockchainMeta) => blockchain.name === tokenFrom.blockchain)
      const blockchainTo: BlockchainMeta = blockchains.find((blockchain: BlockchainMeta) => blockchain.name === tokenTo.blockchain)
      return (
        <div className={`relative w-full flex overflow-x-auto`}>
          <div className="flex items-start">
            <div className={`relative flex flex-col gap-y-1`}>
              {singleNodeTemplate(tokenFrom.image, tokenFrom.symbol, route.fromAmount.toFixed(2), blockchainFrom.logo)}
              <div>
                <Image src="/assets/icons/arrow-down.svg" width={59} height={21} alt="Arrow down" className={`absolute -right-[3.0625rem] top-6`} />
                <TooltipTemplate content={`Exolix`}>
                  <TokenIcon
                    token={{
                      image: "https://exolix.com/favicon/favicon-32x32.png",
                      alt: "Exolix",
                      className: "size-5"
                    }}
                    className={`absolute -right-[2.125rem] top-3.5`}
                  />
                </TooltipTemplate>
              </div>
            </div>
            <div className={`mt-[3.125rem] ms-[22px] flex flex-col gap-y-1`}>
              {singleNodeTemplate(tokenTo.image, tokenTo.symbol, route.toAmount.toFixed(2), blockchainTo.logo)}
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <Card className="max-w-[650px] h-[540px] flex flex-col w-full bg-modal/5 border border-[#AAA]/20 backdrop-blur-lg p-6 rounded-[2rem] shadow-lg text-white">
      <CardHeader className="p-4">
        <div className="h-auto bg-transparent flex w-full justify-between">
          <CardTitle>
            Routes
          </CardTitle>
          <div className="flex items-center">
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-y-auto p-0 pe-1">
        <RadioGroup
          defaultValue="0"
          onValueChange={(value) => setSelectedRoute(routes[parseInt(value)])}
          className="w-full h-full"
        >
          {routes.map((route, index) => {
            return (
              <RadioGroupPrimitive.Item value={index.toString()} id={index.toString()} key={index}
                className='w-full rounded-lg border border-white/20 data-[state=checked]:border-primary p-4 bg-primary/5'
              >
                {
                  route.moderator === "Rango" ? rangoRoute(route as MultiRouteSimulationResult)
                    :
                    route.moderator === "Chainflip" ? chainflipRoute(route as Quote)
                      :
                      route.moderator === "Exolix" ? exolixRoute(route as RateResponse)
                        :
                        <></>
                }
              </RadioGroupPrimitive.Item>
            )
          })}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default RouteCard;