import { CompactTypeToken, Token } from "../types/interface";

export const reformatTokens = (tokens: CompactTypeToken[]): Token[] =>
  tokens && tokens.map((tm) => ({
    blockchain: tm.b,
    symbol: tm.s,
    image: tm.i,
    address: tm.a || null,
    usdPrice: tm.p || null,
    isSecondaryCoin: tm.is || false,
    coinSource: tm.c || null,
    coinSourceUrl: tm.cu || null,
    name: tm.n,
    decimals: tm.d,
    isPopular: tm.ip || false,
    supportedSwappers: tm.ss || [],
  }))