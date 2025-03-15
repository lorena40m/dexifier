export type Blockchain = {
  id: number | string | null,
  name: string,
  logo: string | null,
  color?: string,
}

export type Token = {
  address: string | null,
  isPopular?: boolean,
  decimals?: number,
  symbol: string,
  blockchain?: string,
  image?: string,
  usdPrice?: number | null,
}