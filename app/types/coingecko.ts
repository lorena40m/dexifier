export type Chain = {
  id: string
  chain_identifier: number | null
  name: string
  shortname: string
  native_coin_id: string
  image: {
    large: string
    small: string
    thumb: string
  }
}