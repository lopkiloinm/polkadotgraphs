"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import PoolCard from "@/components/pool-card"
import type { Pool } from "@/types/pool"

const pools: Pool[] = [
  {
    id: "roc-edu",
    token1: { symbol: "ROC", amount: "100.0000" },
    token2: { symbol: "EDU", amount: "1.0000" },
    lpTokens: "999999999900",
  },
  {
    id: "roc-11111",
    token1: { symbol: "ROC", amount: "11883.0000" },
    token2: { symbol: "11111", amount: "50.4977" },
    lpTokens: "0",
  },
  {
    id: "roc-ast",
    token1: { symbol: "ROC", amount: "21.0000" },
    token2: { symbol: "AST", amount: "21.0000" },
    lpTokens: "0",
  },
  {
    id: "roc-bal",
    token1: { symbol: "ROC", amount: "236.0000" },
    token2: { symbol: "BAL", amount: "91.9392" },
    lpTokens: "0",
  },
  {
    id: "roc-dem",
    token1: { symbol: "ROC", amount: "764.2798" },
    token2: { symbol: "DEM", amount: "581.1929" },
    lpTokens: "0",
  },
  {
    id: "roc-dmo",
    token1: { symbol: "ROC", amount: "50.4080" },
    token2: { symbol: "DMO", amount: "223.6346" },
    lpTokens: "0",
  },
]

export default function PoolsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Pools</h1>
          <p className="text-gray-600">Earn fees by providing liquidity.</p>
        </div>
        <Button className="bg-[#E6007A] hover:bg-[#C4006A] text-white rounded-full px-6">
          <Plus className="w-4 h-4 mr-2" />
          New Position
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {pools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </motion.div>
    </div>
  )
}

