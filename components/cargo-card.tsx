"use client"

import { Bookmark, Eye, Package, MapPin, Calendar, Clock, Phone, Truck, ArrowRight, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

export interface CargoCardProps {
  id: string
  from: { city: string; country: string }
  to: { city: string; country: string }
  distance?: number
  price: number | null
  lastOfferPrice?: number
  weight: number
  loadingDate: string
  loadingTime?: string
  status: "published" | "assigned" | "in_transit" | "awaiting_confirmation" | "delivered" | "expired"
  cargoType: string
  transportType: string
  views?: number
  isBookmarked?: boolean
  description?: string
  postedAt?: string
  postedBy?: string
  matchingTransports?: number
  contact?: { name: string; phone?: string }
}

const FLAG_URLS: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  LV: "https://flagcdn.com/w40/lv.png",
  EE: "https://flagcdn.com/w40/ee.png",
  PL: "https://flagcdn.com/w40/pl.png",
  DE: "https://flagcdn.com/w40/de.png",
  FR: "https://flagcdn.com/w40/fr.png",
  NL: "https://flagcdn.com/w40/nl.png",
  BE: "https://flagcdn.com/w40/be.png",
}

const STATUS_MAP: Record<string, { bg: string; text: string; label: string }> = {
  published: { bg: "bg-emerald-50", text: "text-emerald-700", label: "Paskelbtas" },
  assigned: { bg: "bg-blue-50", text: "text-blue-700", label: "Priskirtas" },
  in_transit: { bg: "bg-amber-50", text: "text-amber-700", label: "Vežamas" },
  awaiting_confirmation: { bg: "bg-purple-50", text: "text-purple-700", label: "Laukia patvirtinimo" },
  delivered: { bg: "bg-slate-100", text: "text-slate-600", label: "Pristatytas" },
  expired: { bg: "bg-red-50", text: "text-red-600", label: "Pasibaigęs" },
}

function CountryFlag({ code }: { code: string }) {
  const url = FLAG_URLS[code]
  if (!url) return <span className="inline-block w-5 h-3.5 rounded-sm bg-slate-200" />
  return (
    <Image
      src={url}
      alt={code}
      width={20}
      height={14}
      className="rounded-sm object-cover w-auto h-auto"
      unoptimized
    />
  )
}

export function CargoCard({
  from,
  to,
  distance,
  price,
  lastOfferPrice,
  weight,
  loadingDate,
  loadingTime,
  status,
  cargoType,
  transportType,
  views = 0,
  isBookmarked = false,
  description,
  postedAt,
  postedBy,
  matchingTransports,
}: CargoCardProps) {
  const [saved, setSaved] = useState(isBookmarked)
  const st = STATUS_MAP[status] ?? STATUS_MAP.published

  function toggleBookmark(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setSaved(v => !v)
  }

  const displayPrice = price ?? lastOfferPrice

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-md transition-all">
      {/* Main content */}
      <div className="p-4">
        {/* Top row: bookmark, views, posted by */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleBookmark}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                saved
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", saved && "fill-current")} />
              {saved ? "Išsaugotas" : "Įsiminti"}
            </button>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              {views}
            </span>
          </div>
          {postedBy && (
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="w-3.5 h-3.5" />
              {postedBy}
            </span>
          )}
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <CountryFlag code={from.country} />
            <span className="font-semibold text-foreground">{from.city}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="w-8 h-px bg-border" />
            <ArrowRight className="w-4 h-4" />
            <span className="w-8 h-px bg-border" />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <CountryFlag code={to.country} />
            <span className="font-semibold text-foreground">{to.city}</span>
          </div>
        </div>

        {/* Info chips */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
            <Package className="w-3.5 h-3.5 text-muted-foreground" />
            {cargoType}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
            <Truck className="w-3.5 h-3.5 text-muted-foreground" />
            {transportType}
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
            {weight} t
          </span>
          {distance && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
              {distance} km
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            {loadingDate}
          </span>
          {loadingTime && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              {loadingTime}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
        )}

        {/* Bottom row: posted time, price, status, matching transports */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            {postedAt && (
              <span className="text-xs text-muted-foreground">{postedAt}</span>
            )}
            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", st.bg, st.text)}>
              {st.label}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {matchingTransports !== undefined && matchingTransports > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <Truck className="w-3.5 h-3.5" />
                {matchingTransports} atitinka
              </span>
            )}
            {displayPrice ? (
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{displayPrice.toLocaleString("lt-LT")} &euro;</p>
                {lastOfferPrice && !price && (
                  <p className="text-[10px] text-muted-foreground">paskutinis pasiūlymas</p>
                )}
              </div>
            ) : (
              <p className="text-sm font-medium text-muted-foreground">Kaina derinama</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
