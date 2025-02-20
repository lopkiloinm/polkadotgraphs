"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRightLeft } from "lucide-react"
import Link from "next/link"
import type { Pool } from "@/types/pool"

interface PoolCardProps {
  pool: Pool
}

export default function PoolCard({ pool }: PoolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <Link href={`/pool/${pool.id}`} className="block">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={`/placeholder.svg?height=32&width=32`}
                alt={pool.token1.symbol}
                className="w-8 h-8 rounded-full bg-gray-100"
              />
              <img
                src={`/placeholder.svg?height=32&width=32`}
                alt={pool.token2.symbol}
                className="w-8 h-8 rounded-full bg-gray-100 absolute -right-3 -bottom-1"
              />
            </div>
            <span className="ml-4 font-medium text-gray-900">
              {pool.token1.symbol}-{pool.token2.symbol}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <img
              src={`/placeholder.svg?height=24&width=24`}
              alt={pool.token1.symbol}
              className="w-6 h-6 rounded-full bg-gray-100 mr-2"
            />
            <span className="text-sm font-medium">{Number.parseFloat(pool.token1.amount).toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium">{Number.parseFloat(pool.token2.amount).toLocaleString()}</span>
            <img
              src={`/placeholder.svg?height=24&width=24`}
              alt={pool.token2.symbol}
              className="w-6 h-6 rounded-full bg-gray-100 ml-2"
            />
          </div>
        </div>
      </Link>

      <div className="mt-4">
        <Button className="w-full bg-[#E6007A] hover:bg-[#C4006A] text-white rounded-full" asChild>
          <Link href={`/pool/${pool.id}`}>
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            Manage Liquidity
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

