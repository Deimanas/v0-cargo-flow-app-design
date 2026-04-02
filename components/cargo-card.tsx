"use client"

import { Bookmark, Eye, Package, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

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

const countryFlagUrls: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  LV: "https://flagcdn.com/w40/lv.png",
  EE: "https://flagcdn.com/w40/ee.png",
  PL: "https://flagcdn.com/w40/pl.png",
  DE: "https://flagcdn.com/w40/de.png",
  NL: "https://flagcdn.com/w40/nl.png",
  BE: "https://flagcdn.com/w40/be.png",
  FR: "https://flagcdn.com/w40/fr.png",
}

function CountryFlag({ country }: { country: string }) {
  const flagUrl = countryFlagUrls[country]
  if (!flagUrl) return <span className="w-5 h-3.5 bg-muted rounded" />
  return (
    <Image
      src={flagUrl}
      alt={country}
      width={20}
      height={14}
      className="rounded-sm object-cover w-auto h-auto"
      unoptimized
      loading="eager"
    />
  )
}

export function CargoCard({
  from,
  to,
  distance,
  price,
  priceNegotiable,
  date,
  tags,
  views = 0,
  isBookmarked: initialBookmarked = false,
  description,
  onClick,
}: CargoCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-card rounded-2xl border border-border p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <button 
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
            isBookmarked 
              ? "bg-primary/15 border-primary/30 text-primary" 
              : "bg-secondary border-border text-muted-foreground hover:border-primary/20 hover:text-primary"
          )}
          onClick={handleBookmark}
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
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <CountryFlag country={from.country} />
          <span className="font-semibold text-foreground">{from.city}</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-primary/50 via-border to-green-500/50 mx-2" />
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <CountryFlag country={to.country} />
          <span className="font-semibold text-foreground">{to.city}</span>
        </div>
      </div>

      {/* Tags Row */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-secondary rounded-lg text-xs text-muted-foreground font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Info Row with correct icons */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1.5">
          <Package className="w-4 h-4" />
          {tags.find(t => t.includes(' t')) || tags[0] || '—'}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          {distance} km
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {date}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
          {description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          prieš 4 d ir 21 val
        </div>
        <div className="text-right">
          {price ? (
            <p className="font-bold text-foreground text-xl">
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
