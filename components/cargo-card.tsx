"use client"

import { Bookmark, Eye, Package, MapPin, Calendar, Phone, Mail, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

interface CargoProps {
  id: string
  from: { city: string; country: string }
  to: { city: string; country: string }
  distance: number
  price: number | null
  weight: number
  date: string
  status: "active" | "expired" | "negotiable"
  tags: string[]
  views?: number
  isBookmarked?: boolean
  description?: string
  contact?: { name: string; phone?: string; email?: string }
}

const FLAG_IMAGES: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  LV: "https://flagcdn.com/w40/lv.png",
  EE: "https://flagcdn.com/w40/ee.png",
  PL: "https://flagcdn.com/w40/pl.png",
  DE: "https://flagcdn.com/w40/de.png",
}

const STATUS_CONFIG = {
  active: { bg: "bg-emerald-50", fg: "text-emerald-700", border: "border-emerald-200", label: "Aktyvus" },
  negotiable: { bg: "bg-amber-50", fg: "text-amber-700", border: "border-amber-200", label: "Derinama" },
  expired: { bg: "bg-slate-100", fg: "text-slate-500", border: "border-slate-200", label: "Pasibaigęs" },
}

function CountryFlagImg({ code }: { code: string }) {
  const url = FLAG_IMAGES[code]
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

export function CargoCard(props: CargoProps) {
  const { from, to, distance, price, weight, date, status, tags, views = 0, isBookmarked = false, description, contact } = props
  const [saved, setSaved] = useState(isBookmarked)

  const cargoType = tags.find(t => !t.match(/^\d/) && !t.match(/t$/)) ?? tags[0] ?? "Krovinys"
  const st = STATUS_CONFIG[status]

  function handleBookmark(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setSaved(v => !v)
  }

  function handlePhone(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (contact?.phone) window.open(`tel:${contact.phone}`, "_self")
  }

  function handleEmail(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (contact?.email) window.open(`mailto:${contact.email}`, "_self")
  }

  return (
    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 hover:shadow-sm transition-all">
      <div className="flex items-center divide-x divide-border">
        <div className="flex items-center gap-3 px-5 py-4 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <CountryFlagImg code={from.country} />
            <span className="font-semibold text-sm text-foreground">{from.city}</span>
          </div>
          <div className="flex items-center w-24 shrink-0">
            <span className="flex-1 h-px bg-border" />
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground mx-1" />
            <span className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <CountryFlagImg code={to.country} />
            <span className="font-semibold text-sm text-foreground">{to.city}</span>
          </div>
        </div>

        <div className="hidden sm:flex px-4 py-4 w-28 shrink-0">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md font-medium truncate">{cargoType}</span>
        </div>

        <div className="hidden md:flex px-4 py-4 items-center gap-4 text-xs text-muted-foreground w-56 shrink-0">
          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" />{weight} t</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{distance} km</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{date}</span>
        </div>

        <div className="hidden lg:flex px-4 py-4 items-center gap-3 w-48 shrink-0">
          {contact?.phone && (
            <span
              role="button"
              tabIndex={0}
              onClick={handlePhone}
              onKeyDown={e => e.key === "Enter" && handlePhone(e as unknown as React.MouseEvent)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary cursor-pointer truncate"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{contact.phone}</span>
            </span>
          )}
        </div>

        <div className="px-5 py-4 flex flex-col items-end gap-1.5 w-40 shrink-0">
          <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full border", st.bg, st.fg, st.border)}>{st.label}</span>
          {price ? (
            <p className="font-bold text-foreground text-base">{price.toLocaleString("lt-LT")} &euro;</p>
          ) : (
            <p className="text-xs text-muted-foreground font-medium">Kaina derinama</p>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground"><Eye className="w-3 h-3" />{views}</span>
        </div>

        <div className="px-4 py-4 shrink-0">
          <button
            type="button"
            onClick={handleBookmark}
            className={cn(
              "p-2 rounded-lg transition-colors",
              saved ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"
            )}
          >
            <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
          </button>
        </div>
      </div>

      {description && (
        <div className="px-5 py-2.5 bg-muted/40 border-t border-border text-xs text-muted-foreground flex items-center justify-between gap-4">
          <span className="truncate">{description}</span>
          {contact?.email && (
            <span
              role="button"
              tabIndex={0}
              onClick={handleEmail}
              onKeyDown={e => e.key === "Enter" && handleEmail(e as unknown as React.MouseEvent)}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary cursor-pointer shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              {contact.email}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
