"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"

interface PriceGraphProps {
  data: any[]
  showSimulation?: boolean
}

export default function PriceGraph({ data, showSimulation = false }: PriceGraphProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const lastRealPrice = data.filter((d) => !d.simulated).pop()?.price

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="date" tickFormatter={formatDate} stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip
            contentStyle={{ backgroundColor: "white", borderRadius: "8px" }}
            formatter={(value: number) => [value.toFixed(6), "Price"]}
            labelFormatter={formatDate}
          />
          <Line type="monotone" dataKey="price" stroke="#E6007A" strokeWidth={2} dot={false} />
          {showSimulation && lastRealPrice && (
            <ReferenceLine
              y={lastRealPrice}
              stroke="#888"
              strokeDasharray="3 3"
              label={{ value: "Current Price", position: "right" }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

