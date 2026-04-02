"use client"

import { Bookmark, Eye, Package, MapPin, Calendar, Phone, Mail, Weight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface CargoCardProps {
  id: string
  from: { city: string; country: string; address?: string }
  to: { city: string; country: string; address?: string }
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
  contact?: { name: string; phone?: string; email?: string }
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
  const url = countryFlagUrls[country]
  if (!url) return <span className="inline-block w-5 h-3.5 rounded-sm bg-muted" />
  return (
    <Image
      src={url}
      alt={country}
      width={20}
      height={14}
      className="rounded-sm object-cover"
      unoptimized
      loading="eager"
    />
  )
}

const STATUS_STYLES = {
  active:     "bg-emerald-50 text-emerald-700 border-emerald-200",
  negotiable: "bg-amber-50 text-amber-700 border-amber-200",
  expired:    "bg-slate-100 text-slate-500 border-slate-200",
}
const STATUS_LABELS = {
  active: "Aktyvus", negotiable: "Derinama", expired: "Pasibaigęs",
}

export function CargoCard({
  from, to, distance, price, priceNegotiable, weight, date, status,
  tags, views = 0, isBookmarked: initialBookmarked = false,
  description, contact,
}: CargoCardProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked)

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation()
    setBookmarked(b => !b)
  }

  const cargoType = tags.find(t => !t.match(/^\d/) && !t.match(/t$/)) ?? tags[0]

  return (
    <div className="group bg-card border border-border hover:border-primary/30 hover:shadow-sm transition-all rounded-xl overflow-hidden">
      {/* Main row */}
      <div className="flex items-center gap-0 divide-x divide-border">

        {/* Route — fixed width so it never wraps weirdly */}
        <div className="flex items-center gap-3 px-5 py-4 min-w-0 flex-1">
          {/* From */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <CountryFlag country={from.country} />
            <span className="font-semibold text-sm text-foreground whitespace-nowrap">{from.city}</span>
          </div>

          {/* Arrow connector — fixed 100px so cities stay close */}
          <div className="flex items-center w-[100px] shrink-0">
            <div className="flex-1 h-px bg-border" />
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mx-1 shrink-0" />
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* To */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <CountryFlag country={to.country} />
            <span className="font-semibold text-sm text-foreground whitespace-nowrap">{to.city}</span>
          </div>
        </div>

        {/* Type badge */}
        <div className="px-4 py-4 shrink-0 hidden sm:flex items-center w-[110px]">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium truncate">
            {cargoType}
          </span>
        </div>

        {/* Meta: weight / distance / date */}
        <div className="px-4 py-4 shrink-0 hidden md:flex items-center gap-4 text-xs text-muted-foreground w-[230px]">
          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{weight} t</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{distance} km</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
        </div>

        {/* Contact */}
        <div className="px-4 py-4 shrink-0 hidden lg:flex items-center gap-3 w-[200px]">
          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors truncate"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </a>
          )}
        </div>

        {/* Status + price */}
        <div className="px-5 py-4 shrink-0 flex flex-col items-end gap-1.5 w-[160px]">
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full border",
            STATUS_STYLES[status]
          )}>
            {STATUS_LABELS[status]}
          </span>
          {price ? (
            <p className="font-bold text-foreground text-base leading-tight">
              {price.toLocaleString("lt-LT")} €
            </p>
          ) : (
            <p className="text-xs text-muted-foreground font-medium">Kaina derinama</p>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />{views}
          </div>
        </div>

        {/* Bookmark */}
        <div className="px-4 py-4 shrink-0">
          <button
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-lg transition-colors",
              bookmarked
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
            aria-label={bookmarked ? "Pašalinti iš išsaugotų" : "Išsaugoti"}
          >
            <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
          </button>
        </div>
      </div>

      {/* Description strip — shown when present */}
      {description && (
        <div className="px-5 py-2.5 bg-muted/40 border-t border-border text-xs text-muted-foreground flex items-center justify-between gap-4">
          <span className="truncate">{description}</span>
          {contact?.email && (
            <a
              href={`mailto:${contact.email}`}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              {contact.email}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
