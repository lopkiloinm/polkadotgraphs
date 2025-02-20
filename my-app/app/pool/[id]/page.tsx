"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import PoolHeader from "@/components/pool-header"
import PriceVolumeChart from "@/components/price-chart"
import PoolInsights from "@/components/pool-insights"
import PriceSimulation from "@/components/price-simulation"
import type { Pool } from "@/types/pool"

// Dummy data generator
const generatePoolData = (id: string): Pool => {
  const [token1Symbol, token2Symbol] = id.split("-")
  const token1Amount = Math.random() * 1000000 + 100000
  const token2Amount = Math.random() * 1000000 + 100000
  return {
    id,
    token1: { symbol: token1Symbol.toUpperCase(), amount: token1Amount.toFixed(4) },
    token2: { symbol: token2Symbol.toUpperCase(), amount: token2Amount.toFixed(4) },
    lpTokens: (Math.sqrt(token1Amount * token2Amount) - 1000).toFixed(0),
  }
}

export default function PoolAnalysisPage() {
  const { id } = useParams()
  const [pool, setPool] = useState<Pool | null>(null)

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setPool(generatePoolData(id as string))
  }, [id])

  if (!pool) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <PoolHeader pool={pool} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PriceVolumeChart pool={pool} />
            <PriceSimulation pool={pool} />
          </div>
          <div className="lg:col-span-1">
            <PoolInsights pool={pool} />
          </div>
        </div>
      </div>
    </div>
  )
}

