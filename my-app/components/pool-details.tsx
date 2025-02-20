"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import PriceGraph from "./price-graph"
import type { Pool } from "@/types/pool"

interface PoolDetailsProps {
  pool: Pool
  onClose: () => void
}

export default function PoolDetails({ pool, onClose }: PoolDetailsProps) {
  const [simulationAmount, setSimulationAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState(pool.token1.symbol)
  const [simulatedData, setSimulatedData] = useState<any>(null)

  // Generate historical price data
  const generateHistoricalData = () => {
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (29 - i))
      return {
        date: date.toISOString(),
        price:
          (Number.parseFloat(pool.token2.amount) / Number.parseFloat(pool.token1.amount)) * (1 + Math.sin(i / 5) * 0.1),
      }
    })
  }

  const [historicalData, setHistoricalData] = useState(generateHistoricalData())

  const simulatePrice = () => {
    const amount = Number.parseFloat(simulationAmount)
    if (isNaN(amount)) return

    const token1Amount = Number.parseFloat(pool.token1.amount)
    const token2Amount = Number.parseFloat(pool.token2.amount)
    const k = token1Amount * token2Amount // Constant product formula (x * y = k)

    let newPrice
    if (selectedToken === pool.token1.symbol) {
      newPrice = token2Amount / (token1Amount + amount)
    } else {
      newPrice = (token2Amount + amount) / token1Amount
    }

    const newData = [
      ...historicalData,
      {
        date: new Date().toISOString(),
        price: newPrice,
        simulated: true,
      },
    ]

    setSimulatedData(newData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={`/placeholder.svg?height=40&width=40`}
                  alt={pool.token1.symbol}
                  className="w-10 h-10 rounded-full bg-gray-100"
                />
                <img
                  src={`/placeholder.svg?height=40&width=40`}
                  alt={pool.token2.symbol}
                  className="w-10 h-10 rounded-full bg-gray-100 absolute -right-4 -bottom-1"
                />
              </div>
              <h2 className="ml-6 text-2xl font-semibold">{pool.name} Pool</h2>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-500 hover:text-gray-900">
              <X className="h-6 w-6" />
            </Button>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="simulate">Simulate</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <PriceGraph data={historicalData} />

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Total {pool.token1.symbol} Locked</div>
                  <div className="text-xl font-semibold">{pool.token1.amount}</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-sm text-gray-500 mb-1">Total {pool.token2.symbol} Locked</div>
                  <div className="text-xl font-semibold">{pool.token2.amount}</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulate" className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={simulationAmount}
                      onChange={(e) => setSimulationAmount(e.target.value)}
                      placeholder="Enter amount to add"
                      className="w-full"
                    />
                  </div>
                  <select
                    value={selectedToken}
                    onChange={(e) => setSelectedToken(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value={pool.token1.symbol}>{pool.token1.symbol}</option>
                    <option value={pool.token2.symbol}>{pool.token2.symbol}</option>
                  </select>
                </div>
                <Button onClick={simulatePrice} className="w-full bg-[#E6007A] hover:bg-[#C4006A] text-white">
                  Simulate Price Impact
                </Button>
              </div>

              <PriceGraph data={simulatedData || historicalData} showSimulation />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </motion.div>
  )
}

