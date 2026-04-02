"use client"

import { Bookmark, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

interface CargoCardProps {
  id: string
  from: {
    city: string
    country: string
    address?: string
  }
  to: {
    city: string
    country: string
    address?: string
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
  description?: string
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
  date,
  status,
  tags,
  views = 0,
  isBookmarked = false,
  description,
  onClick,
}: CargoCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-3">
        <button 
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors",
            isBookmarked 
              ? "bg-primary/10 border-primary/20 text-primary" 
              : "bg-card border-border text-muted-foreground hover:bg-muted"
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
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2.5 h-2.5 rounded-full bg-primary" />
        <span className="text-lg">{countryFlags[from.country] || "🏳️"}</span>
        <span className="font-semibold text-foreground">{from.city}</span>
        <span className="text-muted-foreground mx-1">→</span>
        <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
        <span className="text-lg">{countryFlags[to.country] || "🏳️"}</span>
        <span className="font-semibold text-foreground">{to.city}</span>
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-muted rounded text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Info Row */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="6" width="22" height="12" rx="2" />
            <circle cx="6" cy="18" r="2" />
            <circle cx="18" cy="18" r="2" />
          </svg>
          {tags.find(t => t.includes(' t')) || '—'}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h18v18H3z" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
          {distance} km
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M3 10h18M16 2v4M8 2v4" />
          </svg>
          {date}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
          {description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          prieš 4 d ir 21 val
        </div>
        <div className="text-right">
          {price ? (
            <p className="font-bold text-foreground text-lg">
              {price.toLocaleString("lt-LT").replace(",", " ")} €
            </p>
          ) : (
            <p className="font-medium text-muted-foreground">Kaina derinama</p>
          )}
        </div>
      </div>
    </div>
  )
}
