type CurrencyType = {
  code: string,
  icon: string,
  name: string,
  notes: string
  networks?: Networks[]
}

type Networks = {
  network: string,
  name: string,
  shortName: string,
  notes: string,
  addressRegex: string,
  blockExplorer: string | null,
  decimal: number | null,
  depositMinAmount: number | null,
  isDefault: boolean,
  memoName: string | null,
  memoNeeded: boolean,
  memoRegex: string,
  precision: number,

}
type CurrencyResponse = {
  count: number,
  data: CurrencyType[]
}

type RateResponse = {
  fromAmount: number,
  maxAmount: number,
  message: string | null,
  minAmount: number,
  rate: number,
  toAmount: number,
  withdrawMin: number,
}