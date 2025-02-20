"use client"

import { useState, useEffect } from "react"
import type { Pool } from "@/types/pool"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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

const generateCombinedData = (days: number) => {
  const data = []
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    data.push({
      date: date.toISOString().split("T")[0],
      price: 100 + Math.random() * 20 - 10,
      volume: Math.floor(Math.random() * 1000000),
    })
  }
  return data
}

export default function PriceVolumeChart({ pool }: { pool: Pool }) {
  const [combinedData, setCombinedData] = useState(generateCombinedData(30))
  const [timeframe, setTimeframe] = useState("30d")

  useEffect(() => {
    setCombinedData(generateCombinedData(timeframe === "7d" ? 7 : 30))
  }, [timeframe])

  const latestPrice = combinedData[combinedData.length - 1].price
  const earliestPrice = combinedData[0].price
  const priceChange = ((latestPrice - earliestPrice) / earliestPrice) * 100

  const totalVolume = combinedData.reduce((sum, day) => sum + day.volume, 0)
  const averageVolume = totalVolume / combinedData.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price & Volume</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={timeframe} onValueChange={setTimeframe}>
          <div className="flex justify-between items-center mb-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-lg font-medium">${formatPrice(latestPrice)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Change</div>
                <div className={`text-lg font-medium ${priceChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {priceChange >= 0 ? "▲" : "▼"} {Math.abs(priceChange).toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Avg. Volume</div>
                <div className="text-lg font-medium">${formatNumber(averageVolume)}</div>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="7d">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={combinedData.slice(-7)} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} fontSize={12} />
                <YAxis yAxisId="left" orientation="left" tickFormatter={formatPrice} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatNumber} fontSize={12} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "price" ? formatPrice(value as number) : formatNumber(value as number),
                    name === "price" ? "Price" : "Volume",
                  ]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line yAxisId="left" type="monotone" dataKey="price" stroke="#E6007A" strokeWidth={2} dot={false} />
                <Bar yAxisId="right" dataKey="volume" fill="#8884d8" opacity={0.5} />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="30d">
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={combinedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} fontSize={12} />
                <YAxis yAxisId="left" orientation="left" tickFormatter={formatPrice} fontSize={12} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={formatNumber} fontSize={12} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "price" ? formatPrice(value as number) : formatNumber(value as number),
                    name === "price" ? "Price" : "Volume",
                  ]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Line yAxisId="left" type="monotone" dataKey="price" stroke="#E6007A" strokeWidth={2} dot={false} />
                <Bar yAxisId="right" dataKey="volume" fill="#8884d8" opacity={0.5} />
              </ComposedChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

