export const EXOLIX_BLOCKCHAIN_NAME_MAP: Record<string, string> = {
  "BTC": "BTC",
  "Tron": "TRX",
  "BSC": "BSC",
  "ETH": "ETH",
  "Base": "BASE",
  "Scroll": "SCROLL",
  "Optimism": "OPTIMISM",
  "Arbitrum": "ARBITRUM",
  "Ton": "TON",
  "Solana": "SOL",
  "Avax": "AVAX",
  "Celo": "CELO",
  "DASH": "DASH",
  "Doge": "DOGE",
  "LTC": "LTC",
  "Taiko": "TAIKO",
}

export function getExolixflipBlockchainName(key: string): string | undefined {
  return EXOLIX_BLOCKCHAIN_NAME_MAP[key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()];
}
