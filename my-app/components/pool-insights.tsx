import type { Pool } from "@/types/pool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PoolInsights({ pool }: { pool: Pool }) {
  const token1Amount = Number.parseFloat(pool.token1.amount)
  const token2Amount = Number.parseFloat(pool.token2.amount)
  const totalLiquidity = token1Amount + token2Amount
  const token1Percentage = (token1Amount / totalLiquidity) * 100
  const token2Percentage = (token2Amount / totalLiquidity) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pool Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Liquidity</p>
          <p className="text-2xl font-bold">${totalLiquidity.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">24h Volume</p>
          <p className="text-2xl font-bold">$1,234,567</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">24h Fees</p>
          <p className="text-2xl font-bold">$3,702</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">7d APR</p>
          <p className="text-2xl font-bold text-green-500">12.34%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Token Distribution</p>
          <div className="flex items-center mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-[#E6007A] h-2.5 rounded-full" style={{ width: `${token1Percentage}%` }}></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-500">{token1Percentage.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between mt-1 text-sm">
            <span>{pool.token1.symbol}</span>
            <span>{pool.token2.symbol}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

