import type { Pool } from "@/types/pool"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PoolHeader({ pool }: { pool: Pool }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex items-center">
          <div className="relative">
            <img
              src={`/placeholder.svg?height=48&width=48`}
              alt={pool.token1.symbol}
              className="w-12 h-12 rounded-full bg-gray-100"
            />
            <img
              src={`/placeholder.svg?height=48&width=48`}
              alt={pool.token2.symbol}
              className="w-12 h-12 rounded-full bg-gray-100 absolute -right-4 -bottom-1"
            />
          </div>
          <h1 className="ml-8 text-3xl font-bold text-gray-900">
            {pool.token1.symbol}-{pool.token2.symbol} Pool
          </h1>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Total Liquidity</p>
        <p className="text-2xl font-bold text-gray-900">
          ${((Number.parseFloat(pool.token1.amount) + Number.parseFloat(pool.token2.amount)) / 2).toLocaleString()}
        </p>
      </div>
    </div>
  )
}

