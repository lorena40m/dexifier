import { Chain } from "@chainflip/sdk/swap";

export const chainsMap: Record<string, Chain> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  DOT: "Polkadot",
  ARBITRUM: "Arbitrum",
  SOLANA: "Solana",
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