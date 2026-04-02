"use client"

import { Bookmark, Eye, Calendar, Route, Package, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface CargoCardProps {
  id: string
  from: {
    city: string
    country: string
    address: string
  }
  to: {
    city: string
    country: string
    address: string
  }
  distance: number
  price: number | null
  priceNegotiable?: boolean
  weight: number
  date: string
  status: "active" | "expired" | "negotiable"
  tags: string[]
  views?: number
  isBookmarked?: boolean
  onClick?: () => void
}

const countryFlags: Record<string, string> = {
  LT: "🇱🇹",
  LV: "🇱🇻",
  EE: "🇪🇪",
  PL: "🇵🇱",
  DE: "🇩🇪",
  NL: "🇳🇱",
  BE: "🇧🇪",
  FR: "🇫🇷",
}

export function CargoCard({
  from,
  to,
  distance,
  price,
  priceNegotiable,
  weight,
  date,
  status,
  tags,
  views = 0,
  isBookmarked = false,
  onClick,
}: CargoCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <button 
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            isBookmarked 
              ? "bg-primary/10 border-primary/20 text-primary" 
              : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
          )}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Bookmark className={cn("w-3.5 h-3.5", isBookmarked && "fill-current")} />
          Įsiminti
        </button>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Eye className="w-3.5 h-3.5" />
          {views}
        </div>
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-lg">{countryFlags[from.country] || "🏳️"}</span>
          <span className="font-semibold text-foreground">{from.city}</span>
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-lg">{countryFlags[to.country] || "🏳️"}</span>
          <span className="font-semibold text-foreground">{to.city}</span>
        </div>
        <span className="ml-2 px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
          {distance} km
        </span>
      </div>

      {/* Address */}
      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
        {from.address} → {to.address}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              status === "active" ? "bg-green-500" : 
              status === "negotiable" ? "bg-yellow-500" : "bg-red-500"
            )} />
            {status === "active" ? "Aktyvus" : 
             status === "negotiable" ? "Derinama" : "Pasibaigęs"}
          </div>
        </div>
        <div className="text-right">
          {price ? (
            <p className="font-bold text-foreground">
              {price.toLocaleString("lt-LT")} EUR
            </p>
          ) : (
            <p className="font-medium text-muted-foreground">Kaina derinama</p>
          )}
          {priceNegotiable && price && (
            <p className="text-xs text-muted-foreground">derinama</p>
          )}
        </div>
      </div>
    </div>
  )
}
