export interface Token {
  symbol: string
  logo: string
}

export interface ExchangePair {
  id: number
  token1: Token
  token2: Token
  reserve1: number
  reserve2: number
  apy: number
}

export interface LiquidityPool {
  id: number
  name: string
  protocol: string
  tvl: number
  exchangePairs: ExchangePair[]
}

