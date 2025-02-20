export interface Token {
  symbol: string
  amount: string
}

export interface Pool {
  id: string
  name: string
  token1: Token
  token2: Token
  lpTokens: string
}

