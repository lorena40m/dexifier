export type CurrencyType = {
  code: string,
  icon: string,
  name: string,
  notes: string
  networks: Networks[]
}

export type SelectedCurrencyType = {
  code: string,
  icon: string,
  name: string,
  notes: string
  network: Networks | undefined
}

export type Networks = {
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
export type CurrencyResponse = {
  count: number,
  data: CurrencyType[]
}

export type RateResponse = {
  fromAmount: number,
  maxAmount?: number,
  message: string | null,
  minAmount?: number,
  rate?: number,
  toAmount?: number,
  withdrawMin?: number,
}

export type TransacionRequest = {
  coinFrom: string,
  networkFrom?: string,
  coinTo: string,
  networkTo?: string,
  amount: number,
  withdrawalAmount?: number,
  withdrawalAddress: string,
  withdrawalExtralId?: string,
  rateType?: string,
  refundAddress?: string,
  refundExtraId?: string
}

export type TransactionCoin = {
  coinCode: string,
  coinName: string,
  icon: string,
  network: string,
  networkName: string,
  networkShortName: string,
  memoName: string
}

export type TransactionData = {
  amount: number,
  amountTo: number,
  coinFrom: TransactionCoin,
  coinTo: TransactionCoin,
  createdAt: string,
  depositAddress: string,
  depositExtraId: string | null,
  hashIn: any,
  hashOut: any,
  id: string,
  rate: number,
  rateType: string,
  refundAddress: string | null,
  refundExtraId: string,
  source: string,
  status: string,
  withdrawalAddress: string,
  withdrawalExtraId: string | null
}