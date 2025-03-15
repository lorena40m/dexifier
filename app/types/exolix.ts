export type Network = {
  coinNetworkId: number
  network: string	                  // Network code
  name: string	                    // Network name
  shortName: string | null	        // Network short name
  addresRegex: string | null	      // Address regex
  notes: string	                    // Network notes
  isDefault: boolean	              // Is network default
  decimal: number | null	          // Decimal
  icon: string | null	              // Icon
  blockExplorer: string | null	    // Link to explorer
  depositMinAmount: number | null	  // Network minimum amount to deposit
  memoNeeded: boolean	              // Network has extra ID
  memoName: string | null	          // Network extra name
  memoRegex: string | null	        // Memo regex
  precision: number	                // Network precision
  contract: string | null	          // Contract address
}

export type Currency = {
  code: string	                    // Currency code
  name: string	                    // Currency name
  icon?: string	                    // Currency icon
  notes: string	                    // Currency notes
  network: Network	                // Currency network
}

export type DCurrency = Omit<Currency, 'network'> & {
  id: number
  networkId: number
}

export type DNetwork = Network & {
  id: number,
}

export type CurrencyData = {
  code: string	                    // Currency code
  name: string	                    // Currency name
  icon: string	                    // Currency icon
  notes: string	                    // Currency notes
  networks: Network[]               // List of currency networks *Only withNetworks=true
}

export type CurrencyResponse = {
  count: number,                    // Number of currencies in response
  data: CurrencyData[]              // Array of currency
}

export type RateRequest = {
  coinFrom: string	                // Currency to exchange from
  networkFrom?: string	            // Network to exchange from
  coinTo: string	                  // Currency to exchange to
  networkTo?: string	              // Network to exchange to
  amount: string	                  // Amount of currency you are going to send
  withdrawalAmount?: string	        // Amount of currency you are going to get
  rateType: 'float' | 'fixed'	      // The type of the coin rate
}

export type RateResponse = {
  fromAmount: number	              // Amount sent
  toAmount: number	                // Amount you will receive
  rate: number	                    // Exchange rate
  minAmount: number	                // Minimal payment amount
  message: string | null
  withdrawMin?: number
  maxAmount?: number
}

export type TxRequest = {
  coinFrom: string	                // Currency to exchange from
  networkFrom?: string	            // Network to exchange from
  coinTo: string	                  // Currency to exchange to
  networkTo?: string	              // Network to exchange to
  amount: number	                  // Amount of currency to send
  withdrawalAmount?: number	        // Amount of currency to get
  withdrawalAddress: string	        // Address where the exchange result will be sent to
  withdrawalExtraId?: string	      // Extra ID for withdrawalAddress in case it is required
  rateType?: 'float' | 'fixed'	    // The type of the coin rate
  refundAddress?: string	          // Address for refund
  refundExtraId?: string	          // Extra ID for refund address
}

export type ExCoin = {
  coinCode: string	                // Currency from code
  coinName: string	                // Currency from name
  network: string	                  // Currency from network
  networkName: string	              // Currency from network name
  networkShortName: string | null	  // Currency from network short name
  icon: string	                    // Currency from icon
  memoName: string	                // Currency from extra name
}

export type ExHash = {
  hash: string | null	              // Hash In value
  link: string | null	              // Hash In link
}

export type ExTxInfo = {
  id: string	                      // Transaction ID
  amount: number	                  // Amount sent
  amountTo: number	                // The amount received
  coinFrom: ExCoin	                // Currency to exchange from
  coinTo: ExCoin	                  // Currency to exchange to
  comment: string | null	          // Additional information about the transaction
  createdAt: Date	                  // Date of creation
  depositAddress: string	          // Address to send coins to
  depositExtraId: string | null	    // Extra ID for depositAddress in case it is required
  withdrawalAddress: string	        // Address where the exchange result will be sent to
  withdrawalExtraId: string	        // Extra ID for withdrawalAddress in case it is required
  hashIn: ExHash	                  // Hash In
  hashOut: ExHash	                  // Hash Out
  rate: number	                    // Exchange rate
  rateType: 'float' | 'fixed'	      // The type of the coin rate
  refundAddress: string | null	    // Address for refund
  refundExtraId: string | null	    // Extra ID for refund address
  status: 'wait'                    // Transaction status
  | 'confirmation'
  | 'confirmed'
  | 'exchanging'
  | 'sending'
  | 'success'
  | 'overdue'
  | 'refunded'
}
