"use client"

import { useState, useMemo, useCallback } from "react"
import type { Pool } from "@/types/pool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toFixed(1)
}

const formatPrice = (price: number) => {
  if (price < 0.01) return price.toFixed(4)
  if (price < 1) return price.toFixed(3)
  return price.toFixed(2)
}

const calculatePrice = (token1Amount: number, token2Amount: number) => {
  return token2Amount / token1Amount
}

const generatePriceData = (pool: Pool, selectedToken: string, maxAmount: number) => {
  const data = []
  const token1Amount = Number.parseFloat(pool.token1.amount)
  const token2Amount = Number.parseFloat(pool.token2.amount)
  const steps = 200 // Increased for smoother curve

  for (let i = 0; i <= steps; i++) {
    const amount = (i / steps) * maxAmount
    let newToken1Amount = token1Amount
    let newToken2Amount = token2Amount

    if (selectedToken === pool.token1.symbol) {
      newToken1Amount += amount
    } else {
      newToken2Amount += amount
    }

    const price = calculatePrice(newToken1Amount, newToken2Amount)
    data.push({
      amount,
      price,
      percentChange: ((price - data[0]?.price || price) / (data[0]?.price || price)) * 100,
    })
  }

  return data
}

export default function PriceSimulation({ pool }: { pool: Pool }) {
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState(pool.token1.symbol)
  const [activePoint, setActivePoint] = useState<any>(null)

  const simulatedData = useMemo(() => {
    const maxAmount = Number.parseFloat(amount) || 0
    return generatePriceData(pool, token, maxAmount)
  }, [pool, token, amount])

  const initialPrice = calculatePrice(Number.parseFloat(pool.token1.amount), Number.parseFloat(pool.token2.amount))

  const handleMouseMove = useCallback((props: any) => {
    if (props.activePayload && props.activePayload.length) {
      setActivePoint(props.activePayload[0].payload)
    }
  }, [])

  const handleMouseLeave = () => {
    setActivePoint(null)
  }

  const displayPrice = activePoint?.price || initialPrice
  const displayChange = activePoint?.percentChange || 0
  const displayAmount = activePoint?.amount || 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-6">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="flex-grow"
          />
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={pool.token1.symbol}>{pool.token1.symbol}</SelectItem>
              <SelectItem value={pool.token2.symbol}>{pool.token2.symbol}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <div className="text-sm text-gray-500">Amount</div>
            <div className="text-lg font-medium">
              {formatNumber(displayAmount)} {token}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-lg font-medium">{formatPrice(displayPrice)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Change</div>
            <div className={`text-lg font-medium ${displayChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {displayChange >= 0 ? "+" : ""}
              {displayChange.toFixed(2)}%
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={simulatedData}
            margin={{ top: 5, right: 5, bottom: 20, left: 10 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="amount" tickFormatter={formatNumber} stroke="#888" fontSize={12} tickMargin={8} />
            <YAxis tickFormatter={formatPrice} stroke="#888" fontSize={12} width={40} />
            <Tooltip
              formatter={(value: number, name: string) => [
                name === "price" ? formatPrice(value) : formatNumber(value),
                name === "price" ? "Price" : "Amount",
              ]}
              labelFormatter={() => ""}
              contentStyle={{ fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#E6007A"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

