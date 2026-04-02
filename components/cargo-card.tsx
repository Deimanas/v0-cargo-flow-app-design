"use client"

import { Bookmark, Eye, Package, MapPin, Calendar, Phone, Mail } from "lucide-react"
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
  contact?: {
    name: string
    phone?: string
    email?: string
  }
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
  if (!flagUrl) return <span className="inline-block w-5 h-3.5 bg-muted rounded" />
  return (
    <Image
      src={flagUrl}
      alt={country}
      width={20}
      height={14}
      className="rounded-sm object-cover"
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
  contact,
  onClick,
}: CargoCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked)

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    setIsBookmarked(!isBookmarked)
  }

  const weight = tags.find(t => t.match(/\d+(\.\d+)?\s*t$/))

  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-2xl border border-border px-5 py-4 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer"
    >
      {/* Top row: bookmark + route + price */}
      <div className="flex items-start gap-4">
        {/* Left: bookmark + route */}
        <div className="flex-1 min-w-0">
          {/* Route row */}
          <div className="flex items-center gap-2 mb-3">
            {/* From */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <CountryFlag country={from.country} />
              <span className="font-semibold text-foreground text-sm">{from.city}</span>
            </div>

            {/* Arrow + line — fixed width so cities stay ~150px apart */}
            <div className="flex items-center gap-1 w-[120px] shrink-0">
              <div className="flex-1 h-px bg-border" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-muted-foreground shrink-0">
                <path d="M7.5 1L11 4L7.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 4H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* To */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <CountryFlag country={to.country} />
              <span className="font-semibold text-foreground text-sm">{to.city}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-secondary rounded-md text-xs text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta row */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {weight && (
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5" />
                {weight}
              </span>
            )}
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {distance} km
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </span>
          </div>

          {description && (
            <p className="text-xs text-muted-foreground mt-2 line-clamp-1">{description}</p>
          )}
        </div>

        {/* Right: price + views */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {price ? (
            <p className="font-bold text-foreground text-lg leading-tight">
              {price.toLocaleString("lt-LT").replace(",", " ")} €
            </p>
          ) : (
            <p className="text-sm font-medium text-muted-foreground">Kaina derinama</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3.5 h-3.5" />
            {views}
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-3">
          {/* Bookmark button */}
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
            {isBookmarked ? "Išsaugota" : "Įsiminti"}
          </button>

          {/* Contact info */}
          {contact && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {contact.phone}
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  onClick={e => e.stopPropagation()}
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {contact.email}
                </a>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-muted-foreground">prieš 4 d ir 21 val</p>
      </div>
    </div>
  )
}
