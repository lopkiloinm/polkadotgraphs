"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import AccountButton from "./account-button"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Pools" },
    { href: "/swap", label: "Swap" },
    { href: "/bridge", label: "Bridge" },
  ]

  return (
    <nav className="flex justify-between items-center w-full">
      <div className="flex space-x-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-lg font-medium transition-colors",
              pathname === item.href ? "text-[#E6007A]" : "text-gray-600 hover:text-gray-900",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
      <AccountButton />
    </nav>
  )
}

