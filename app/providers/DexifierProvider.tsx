'use client'

// This file defines a React context for managing state related to a token dexifier page.
// It includes a DexifierContext and a DexifierProvider component to wrap dexifier page and 
// make the state accessible through the React Context API. Additionally, a custom hook
// (useDexifier) is provided for easier consumption of the context in components.

import { createContext, useContext, ReactNode, SetStateAction, Dispatch, useState, useEffect, useMemo, useRef } from "react";
import { BlockchainMeta, ConfirmRouteResponse, MultiRouteRequest, MultiRouteResponse, MultiRouteSimulationResult, Token as RangoToken, Transaction, TransactionType } from "rango-types/mainApi"
import { Settings } from "../types/rango";
import { Asset } from "@chainflip/sdk/swap";
import { ChainflipSwapResponse, ChainflipQuote, ChainflipError, ChainflipSwapStatus } from "../types/chainflip";
import { axiosExolix } from "@/lib/axios";
import { DCurrency, DNetwork, ExTxInfo, RateRequest, RateResponse } from "../types/exolix";
import { ConnectedWallet, useWallets, useWidget } from "@rango-dev/widget-embedded";
import { debounce } from "lodash";
import { CHAINFLIP_BLOCKCHAIN_NAME_MAP } from "../utils/chainflip";
import { rangoSDK } from "@/lib/utils";
import { getTxInfo } from "../api/exolix";
import { ethers } from 'ethers';
import { createQuotes, getSwapStatus } from "../api/chainflip";
import axios, { AxiosError } from "axios";
import { getExolixflipBlockchainName, MAP_BLOCKCHAIN_RANGO_2_EXOLIX } from "../utils/exolix";
import { Blockchain, Token } from "../types/dexifier";

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
  swapData?: ChainflipSwapResponse | ExTxInfo | ConfirmRouteResponse,
  setSwapData: Dispatch<SetStateAction<ChainflipSwapResponse | ExTxInfo | ConfirmRouteResponse | undefined>>,
  swapStatus?: ChainflipSwapStatus | ExTxInfo,
  setSwapStatus: Dispatch<SetStateAction<ChainflipSwapStatus | ExTxInfo | undefined>>,
  initialize: () => void,
  stopConfirming: () => void,
  sendTx: (recipient: string) => Promise<{
    success: boolean;
    data: any;
  } | undefined>,
  isMobile: boolean,
  currencies: DCurrency[],
  chains: Blockchain[],
  coins: Token[]
}

// Create the context with an initial value
const DexifierContext: React.Context<DexifierContextType | undefined> = createContext<DexifierContextType | undefined>(undefined);

// Define default settings for the swap
const DEFAULT_SETTINS: Settings = {
  slippage: '1',           // Default slippage value for transactions
  swappers: [],            // Array of available swap providers
  infiniteApproval: false, // Indicates whether infinite approval is enabled
}

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

export type DexifierRoute = MultiRouteSimulationResult | ChainflipQuote | RateResponse

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
  const [swapData, setSwapData] = useState<ChainflipSwapResponse | ExTxInfo | ConfirmRouteResponse>();
  const [swapStatus, setSwapStatus] = useState<ChainflipSwapStatus | ExTxInfo>();
  const [currencies, setCurrencies] = useState<DCurrency[]>([]);
  const [networks, setNetworks] = useState<DNetwork[]>([]);
  const confirmIntervalRef = useRef<NodeJS.Timeout>();
  const { getSigners } = useWallets();
  const isMobile = useMemo(() => {
    const userAgent = navigator.userAgent;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
  }, []);
  const { meta } = useWidget(); // Fetch widget metadata using the custom hook
  const { blockchains, tokens } = meta; // Extract blockchains from the metadata

  const chains: Blockchain[] = useMemo(() => {
    const bc = blockchains.map((blockchain: BlockchainMeta) => ({
      id: blockchain.chainId,
      name: blockchain.name,
      displayName: blockchain.displayName,
      shortName: blockchain.shortName,
      logo: blockchain.logo,
      color: blockchain.color,
    }))
    const nt = networks?.map(network => ({
      id: network.id + 100000000,
      name: network.network,
      displayName: network.name,
      shortName: network.shortName,
      logo: network.icon,
    })).filter(network => !bc.some(blockchain => blockchain.name === network.name || MAP_BLOCKCHAIN_RANGO_2_EXOLIX[blockchain.name] === network.name));

    return [...bc, ...nt];
  }, [blockchains, networks]);

  const coins: Token[] = useMemo(() => {
    const tk = tokens.map((token: RangoToken) => ({
      address: token.address,
      isPopular: token.isPopular,
      symbol: token.symbol,
      blockchain: token.blockchain,
      image: token.image,
      decimals: token.decimals,
      usdPrice: token.usdPrice,
    }))
    const cu = currencies?.map(currency => ({
      address: null,
      symbol: currency.code,
      blockchain: networks.find(n => n.id === currency.networkId)?.network,
      image: currency.icon,
    }))
    return [...tk, ...cu];
  }, [networks, tokens, currencies])

  const amountTo = useMemo(() => {
    if (!selectedRoute) return 0
    else if ('outputAmount' in selectedRoute) {
      return Number(selectedRoute.outputAmount)
    } else if ('egressAmount' in selectedRoute) {
      return selectedRoute.egressAmount
    } else if ('toAmount' in selectedRoute) {
      return selectedRoute.toAmount
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
    if (!tokenFrom.blockchain || !tokenTo.blockchain) return [];
    try {
      if (tokenFrom.blockchain in CHAINFLIP_BLOCKCHAIN_NAME_MAP && tokenTo.blockchain in CHAINFLIP_BLOCKCHAIN_NAME_MAP) {
        // Use the createQuotes function from api/chainflip.ts
        const chainflipQuotes = await createQuotes({
          sourceAsset: `${tokenFrom.symbol.toLowerCase()}.${CHAINFLIP_BLOCKCHAIN_NAME_MAP[tokenFrom.blockchain]}` as Asset,
          destinationAsset: `${tokenTo.symbol.toLowerCase()}.${CHAINFLIP_BLOCKCHAIN_NAME_MAP[tokenTo.blockchain]}` as Asset,
          amount: amount,
          commissionBps: 15,
        });

        if (allRoutes.push(...chainflipQuotes)) return allRoutes
      }
    } catch (error) { }
    try {
      const exolixRateRequest: RateRequest = {
        coinFrom: tokenFrom.symbol,
        networkFrom: getExolixflipBlockchainName(tokenFrom.blockchain),
        coinTo: tokenTo.symbol,
        networkTo: getExolixflipBlockchainName(tokenTo.blockchain),
        amount: amount,
        rateType: 'float',
      }
      const { data: exolixRateResponse }: { data: RateResponse } = await axiosExolix.get('/rate', {
        params: exolixRateRequest
      })
      allRoutes.push(exolixRateResponse)
    } catch (error) { }
    if (!isMobile) try {
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
      const rangoMultiRouteSimulationResults: MultiRouteSimulationResult[] = rangoMultiRouteResponse.results.sort((a, b) => a.swaps.length - b.swaps.length);
      allRoutes.push(...rangoMultiRouteSimulationResults)
    } catch (error) { }
    return allRoutes
  }

  const debounceFetchRoutes = useMemo(
    () =>
      debounce(async () => {
        if (tokenFrom && tokenTo && amountFrom && parseFloat(amountFrom)) {
          setState(DEXIFIER_STATE.FETCHING_ROUTES)
          const allRoutes = await getRoutes(tokenFrom, tokenTo, amountFrom)
          setRoutes(allRoutes)
          if (allRoutes.length) setSelectedRoute(allRoutes[0])
          setState(DEXIFIER_STATE.ROUTES)
        } else {
          setState(DEXIFIER_STATE.START)
          setRoutes([])
          setSelectedRoute(undefined)
        }
      }, 1000), // 1s delay
    [tokenFrom, tokenTo, amountFrom]
  )

  useEffect(() => {
    debounceFetchRoutes()
    return () => {
      debounceFetchRoutes.cancel();
    };
  }, [tokenFrom, tokenTo, amountFrom])

  const sendTx = async (recipient: string) => {
    if (walletFrom && typeof walletFrom !== 'string' && tokenFrom && amountFrom) {
      const tokenContractAddress = tokenFrom.address; // The ERC-20 token contract address
      const tokenAmount = amountFrom; // Amount of tokens to send (human-readable)
      const decimals = tokenFrom.decimals; // Token decimals (usually 18 for ERC-20)

      // Encode the transfer function data
      const erc20Interface = new ethers.Interface([
        'function transfer(address to, uint256 amount) public returns (bool)',
      ]);
      const amountInWei = ethers.parseUnits(tokenAmount, decimals); // Convert amount to smallest unit
      const data = erc20Interface.encodeFunctionData('transfer', [recipient, amountInWei]);

      const transaction: Transaction = {
        from: walletFrom.address,
        to: tokenContractAddress || recipient,
        type: TransactionType.EVM,
        blockChain: tokenFrom.blockchain || '',
        isApprovalTx: true,
        data: data,
        value: tokenContractAddress ? null : amountInWei.toString(),
        nonce: null,
        gasLimit: null,
        gasPrice: null,
        maxPriorityFeePerGas: null,
        maxFeePerGas: null,
      };

      return (await getSigners(walletFrom.walletType)).getSigner(TransactionType.EVM).signAndSendTx(transaction, walletFrom.address, null)
        .then((hash) => ({ success: true, data: hash }))
        .catch(error => ({ success: false, data: error }))
    }
  }

  const stopConfirming = () => {
    clearInterval(confirmIntervalRef.current);
    confirmIntervalRef.current = undefined;
  }

  useEffect(() => {
    if (swapData) {
      // Clear any existing interval before starting a new one
      stopConfirming();

      if ('channelId' in swapData) {
        confirmIntervalRef.current = setInterval(async () => {
          try {
            // const statusData = await chainflipSDK.getStatusV2({
            //   id: swapData.depositChannelId
            // });
            const statusData = await getSwapStatus(swapData.id);
            setSwapStatus(statusData);
            if (statusData.state === "COMPLETED" || statusData.state === "FAILED") {
              stopConfirming();
            }
          } catch (error) {
            if (error instanceof AxiosError) {
              return error.response?.data as ChainflipError;
            }
          }
        }, 10000); // Poll every 10 seconds (adjust as needed)
      }
      if ('amountTo' in swapData) {
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

  useEffect(() => {
    axios.get(
      `/api/exolix/currency`
    ).then(result => {
      setCurrencies(result.data as DCurrency[])
    });
    axios.get(
      `/api/exolix/network`
    ).then(result => {
      setNetworks(result.data as DNetwork[])
    });
  }, [])

  return (
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
        stopConfirming,
        sendTx,
        isMobile,
        currencies,
        chains,
        coins,
      }}
    >
      {children}
    </DexifierContext.Provider>
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