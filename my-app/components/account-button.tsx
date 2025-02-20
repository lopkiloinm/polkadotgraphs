"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const truncateAddress = (address: string) => {
  if (address.length <= 13) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function AccountButton() {
  // This would typically come from a wallet connection or state management
  const walletAddress = "0x1234567890123456789012345678901234567890"

  return (
    <Button variant="outline" className="text-gray-600 hover:text-gray-900">
      <span className="mr-2">{truncateAddress(walletAddress)}</span>
      <ChevronDown className="w-4 h-4" />
    </Button>
  )
}

