import { Asset, Chain, ChainsAndAssets, Quote } from "@chainflip/sdk/swap";

export const chainsMap: Record<string, Chain> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  DOT: "Polkadot",
  ARBITRUM: "Arbitrum",
  SOLANA: "Solana",
  SOL: "Solana",
}

export const DEXIFIER_BLOCKCHAIN_NAME_MAP: Record<string, Chain> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  DOT: "Polkadot",
  ARB: "Arbitrum",
  SOL: "Solana",
}

export function formatChainName(chain: string): Chain | string | undefined {
  for (const [key, value] of Object.entries(chainsMap)) {
    if (key === chain) {
      return value;
    }
    if (value === chain) {
      return key;
    }
  }

  return undefined;
}

export const CHAINFLIP_BLOCKCHAIN_NAME_MAP: Record<string, string> = {
  "ETH": "eth",
  "SOLANA": "sol",
  "BTC": "btc",
  "ARBITRUM": "arb",
  "POLKADOT": "dot",
  "eth": "ETH",
  "sol": "SOLANA",
  "btc": "BTC",
  "arb": "ARBITRUM",
  "dot": "POLKADOT",
}
