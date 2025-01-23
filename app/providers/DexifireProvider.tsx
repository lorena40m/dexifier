'use client'

// This file defines a React context for managing state related to a token dexifier page.
// It includes a DexifierContext and a DexifierProvider component to wrap dexifier page and 
// make the state accessible through the React Context API. Additionally, a custom hook
// (useDexifier) is provided for easier consumption of the context in components.

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState, useEffect, useMemo, useRef } from "react";
import { ConfirmRouteResponse, MultiRouteRequest, MultiRouteResponse, MultiRouteSimulationResult, Token } from "rango-types/mainApi"
import { Settings } from "../types/rango";
import { Asset, Quote, QuoteRequest, SwapStatusResponseV2 } from "@chainflip/sdk/swap";
import { axiosExolix } from "@/lib/axios";
import { ExTxInfo, RateRequest, RateResponse } from "../types/exolix";
import { ConnectedWallet, WidgetConfig, WidgetProvider } from "@rango-dev/widget-embedded";
import QueueManager from "./QueueManager";
import { debounce } from "lodash";
import { chainsMap } from "../utils/chainflip";
import { DepositAddressResponseV2 } from "../types/chainflip";
import { chainflipSDK, rangoSDK } from "@/lib/utils";
import { getTxInfo } from "../api/exolix";

// Define the type for the context
interface DexifierContextType {
  tokenFrom?: Token,                                                                  // The token being swapped from
  setTokenFrom: Dispatch<SetStateAction<Token | undefined>>,                          // Setter for tokenFrom
  tokenTo?: Token,                                                                    // The token being swapped to
  setTokenTo: Dispatch<SetStateAction<Token | undefined>>,                            // Setter for tokenTo
  amountFrom?: string,
  setAmountFrom: Dispatch<SetStateAction<string | undefined>>,
  amountTo: string | number,
  selectedRoute?: DexifierRoute,                                                      // The currently selected swap route
  setSelectedRoute: Dispatch<SetStateAction<DexifierRoute | undefined>>,              // Setter for selectedRoute
  settings: Settings,                                                                 // Settings for the swap (e.g., slippage, infinite approval)
  setSettings: Dispatch<SetStateAction<Settings>>,                                    // Setter for settings
  routes: DexifierRoute[],
  state: DEXIFIER_STATE,
  setState: Dispatch<SetStateAction<DEXIFIER_STATE>>,
  walletFrom?: ConnectedWallet | string,
  setWalletFrom: Dispatch<SetStateAction<ConnectedWallet | string | undefined>>,
  walletTo?: ConnectedWallet | string,
  setWalletTo: Dispatch<SetStateAction<ConnectedWallet | string | undefined>>,
  swapData?: DepositAddressResponseV2 | ExTxInfo | ConfirmRouteResponse,
  setSwapData: Dispatch<SetStateAction<DepositAddressResponseV2 | ExTxInfo | ConfirmRouteResponse | undefined>>,
  swapStatus?: SwapStatusResponseV2 | ExTxInfo,
  setSwapStatus: Dispatch<SetStateAction<SwapStatusResponseV2 | ExTxInfo | undefined>>,
  initialize: () => void,
}

// Create the context with an initial value
const DexifierContext: React.Context<DexifierContextType | undefined> = createContext<DexifierContextType | undefined>(undefined);

// Define default settings for the swap
const DEFAULT_SETTINS: Settings = {
  slippage: '1',           // Default slippage value for transactions
  swappers: [],            // Array of available swap providers
  infiniteApproval: false, // Indicates whether infinite approval is enabled
}

const DEXIFIER_CONFIG: WidgetConfig = {
  apiKey: process.env.NEXT_PUBLIC_RANGO_API_KEY_BASIC || process.env.NEXT_PUBLIC_RANGO_API_KEY || '',
  title: 'Dexifier',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '',
  multiWallets: true,
  excludeLiquiditySources: true,
  customDestination: true,
  trezorManifest: {
    appUrl: 'https://widget.rango.exchange/',
    email: 'hi+trezorwidget@rango.exchange',
  },
  tonConnect: {
    manifestUrl: 'https://raw.githubusercontent.com/rango-exchange/assets/refs/heads/main/manifests/tonconnect/manifest.json'
  },
};

export enum DEXIFIER_MODERATOR {
  Rango = "Rango",
  Chainflip = "Chainflip",
  Exolix = "Exolix",
}

export enum DEXIFIER_STATE {
  START = "START",
  FETCHING_ROUTES = "FETCHING_ROUTES",
  ROUTES = "ROUTES",
  WITHDRAWAL_ADDRESS = "WITHDRAWAL_ADDRESS",
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  FAILED = "FAILED",
  SUCCESS = "SUCCESS",
}

type DexifierRoute = (MultiRouteSimulationResult | Quote | RateResponse) & { moderator?: DEXIFIER_MODERATOR }

const DexifierProvider = ({ children }: { children: ReactNode }) => {
  const [tokenFrom, setTokenFrom] = useState<Token>();
  const [tokenTo, setTokenTo] = useState<Token>();
  const [amountFrom, setAmountFrom] = useState<string>();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINS);
  const [routes, setRoutes] = useState<DexifierRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<DexifierRoute>();
  const [state, setState] = useState<DEXIFIER_STATE>(DEXIFIER_STATE.START);
  // const [withdrawalAddress, setWithdrawalAddress] = useState<string>('');
  const [walletFrom, setWalletFrom] = useState<ConnectedWallet | string>();
  const [walletTo, setWalletTo] = useState<ConnectedWallet | string>();
  const [swapData, setSwapData] = useState<DepositAddressResponseV2 | ExTxInfo | ConfirmRouteResponse>();
  const [swapStatus, setSwapStatus] = useState<SwapStatusResponseV2 | ExTxInfo>();
  const confirmIntervalRef = useRef<NodeJS.Timeout>();

  const amountTo = useMemo(() => {
    if (selectedRoute?.moderator === DEXIFIER_MODERATOR.Rango) {
      return (selectedRoute as MultiRouteSimulationResult).outputAmount
    }
    else if (selectedRoute?.moderator === DEXIFIER_MODERATOR.Chainflip) {
      return Number((selectedRoute as Quote).egressAmount) / (10 ** (tokenTo?.decimals || 0))
    } else if (selectedRoute?.moderator === DEXIFIER_MODERATOR.Exolix) {
      return (selectedRoute as RateResponse).toAmount
    } else return 0
  }, [selectedRoute])

  const initialize = () => {
    stopConfirming()
    setAmountFrom('0')
    setRoutes([])
    setSelectedRoute(undefined)
    setState(DEXIFIER_STATE.START)
    setSwapData(undefined)
    setSwapStatus(undefined)
  }

  const getRoutes = async (tokenFrom: Token, tokenTo: Token, amount: string): Promise<DexifierRoute[]> => {
    const allRoutes: DexifierRoute[] = []
    try {
      if (tokenFrom.blockchain in chainsMap && tokenTo.blockchain in chainsMap) {
        const chainflipQuoteRequest: QuoteRequest = {
          srcChain: chainsMap[tokenFrom.blockchain],
          destChain: chainsMap[tokenTo.blockchain],
          srcAsset: tokenFrom.symbol as Asset,
          destAsset: tokenTo.symbol as Asset,
          amount: (Number(amount) * (10 ** tokenFrom.decimals)).toString(),
          brokerCommissionBps: 100, // 100 basis point = 1%
          affiliateBrokers: [
            { account: process.env.NEXT_PUBLIC_CHAINFLIP_ACCOUNT_ID || '', commissionBps: 50 }
          ],
        }
        const chainflipQuoteResponseV2 = await chainflipSDK.getQuoteV2(chainflipQuoteRequest)
        const chainflipQuotes = chainflipQuoteResponseV2.quotes
        if (allRoutes.push(...chainflipQuotes.map(quote => ({ ...quote, moderator: DEXIFIER_MODERATOR.Chainflip })))) return allRoutes
      }
    } catch (error) { }
    try {
      const rangoMultiRouteRequest: MultiRouteRequest = {
        amount: amount,
        from: {
          address: tokenFrom.address,
          blockchain: tokenFrom.blockchain,
          symbol: tokenFrom.symbol,
        },
        to: {
          address: tokenTo.address,
          blockchain: tokenTo.blockchain,
          symbol: tokenTo.symbol,
        },
        slippage: settings.slippage.toString(),
        swapperGroups: settings.swappers.map(swapper => swapper.swapperGroup),
        swappersGroupsExclude: false,
      }
      const rangoMultiRouteResponse: MultiRouteResponse = await rangoSDK.getAllRoutes(rangoMultiRouteRequest)
      const rangoMultiRouteSimulationResults: MultiRouteSimulationResult[] = rangoMultiRouteResponse.results
      allRoutes.push(...rangoMultiRouteSimulationResults.map(result => ({ ...result, moderator: DEXIFIER_MODERATOR.Rango })))
    } catch (error) { }
    try {
      const exolixRateRequest: RateRequest = {
        coinFrom: tokenFrom.symbol,
        networkFrom: tokenFrom.blockchain,
        coinTo: tokenTo.symbol,
        networkTo: tokenTo.blockchain,
        amount: amount,
        rateType: 'float',
      }
      const { data: exolixRateResponse }: { data: RateResponse } = await axiosExolix.get('/rate', {
        params: exolixRateRequest
      })
      allRoutes.push({ ...exolixRateResponse, moderator: DEXIFIER_MODERATOR.Exolix })
    } catch (error) { }
    return allRoutes
  }

  useEffect(() => {
    if (tokenFrom && tokenTo && amountFrom && parseFloat(amountFrom)) {
      debounce(async () => {
        setState(DEXIFIER_STATE.FETCHING_ROUTES)
        const allRoutes = await getRoutes(tokenFrom, tokenTo, amountFrom)
        setRoutes(allRoutes)
        if (allRoutes.length) setSelectedRoute(allRoutes[0])
        setState(DEXIFIER_STATE.ROUTES)
      }, 1000)() // 1s delay
    }
  }, [tokenFrom, tokenTo, amountFrom])

  const stopConfirming = () => {
    clearInterval(confirmIntervalRef.current);
    confirmIntervalRef.current = undefined;
  }

  useEffect(() => {
    if (swapData) {
      // Clear any existing interval before starting a new one
      stopConfirming();

      if ('depositChannelId' in swapData) {
        confirmIntervalRef.current = setInterval(async () => {
          try {
            const statusData = await chainflipSDK.getStatusV2({
              id: swapData.depositChannelId
            });
            setSwapStatus(statusData);
            if (statusData.state === "COMPLETED" || statusData.state === "FAILED") {
              stopConfirming();
            }
          } catch (error) { }
        }, 10000); // Poll every 10 seconds (adjust as needed)
      }
      if ('id' in swapData) {
        confirmIntervalRef.current = setInterval(async () => {
          const txInfo = await getTxInfo(swapData.id);
          setSwapStatus(txInfo);
          if (txInfo.status === "success" || txInfo.status === "overdue" || txInfo.status === "refunded") {
            stopConfirming();
          }
        }, 5000); // Poll every 5 seconds (adjust as needed)
      }
    } else {
      stopConfirming();
    }
  }, [swapData])

  return (
    <WidgetProvider config={DEXIFIER_CONFIG}>
      <QueueManager apiKey={DEXIFIER_CONFIG.apiKey}>
        <DexifierContext.Provider
          value={{
            // tokenFrom, setTokenFrom, tokenTo, setTokenTo, routeData, setRouteData, selectedRoute, setSelectedRoute, confirmData, setConfirmData, settings, setSettings,
            tokenFrom, setTokenFrom, tokenTo, setTokenTo, amountFrom, setAmountFrom, amountTo,
            settings,
            setSettings,
            routes,
            selectedRoute,
            setSelectedRoute,
            state,
            setState,
            swapData,
            setSwapData,
            swapStatus,
            setSwapStatus,
            walletFrom,
            setWalletFrom,
            walletTo,
            setWalletTo,
            initialize,
          }}
        >
          {children}
        </DexifierContext.Provider>
      </QueueManager>
    </WidgetProvider>
  )
};

// Custom hook to use the Dexifier context
export const useDexifier = () => {
  const context = useContext(DexifierContext);
  // Throw an error if the hook is used outside of a DexifierProvider
  if (!context) {
    throw new Error("useDexifier must be used within a DexifierProvider");
  }
  return context;
};

export default DexifierProvider