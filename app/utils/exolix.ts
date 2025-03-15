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

export const MAP_BLOCKCHAIN_RANGO_2_EXOLIX: Record<string, string> = {
  "TRON": "TRX",
  "OSMOSIS": "OSMO",
  "SOLANA": "SOL",
  "POLYGON": "MATIC",
  // "BTC": "BTC",
  // "ETH": "ETH",
  // "BSC": "BSC",
  // "ARBITRUM": "ARBITRUM",
  // "STARKNET": "STARKNET",
  // "OPTIMISM": "OPTIMISM",
  // "BASE": "BASE",
  // "TON": "TON",
  // "AURORA": "AURORA",
  // "LTC": "LTC",
  // "BCH": "BCH",
  // "DOGE": "DOGE",
  // "TAIKO": "TAIKO",
  // "DASH": "DASH",
  // "CELO": "CELO",
}

export function getExolixflipBlockchainName(key: string): string | undefined {
  return EXOLIX_BLOCKCHAIN_NAME_MAP[key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()];
}
