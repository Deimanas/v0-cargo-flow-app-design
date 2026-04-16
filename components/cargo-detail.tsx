"use client"

import {
  ChevronLeft, MoreHorizontal, Eye, Calendar, MessageCircle, Phone, Mail,
  Package, Box, Ruler, Truck, Clock, Star, Building2, Navigation,
  Bookmark, Share2, Scale, Layers, ArrowRight
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CargoDetailProps {
  cargo: {
    id: string
    status: "active" | "expired" | "negotiable"
    publishedAt: string
    views: number
    title: string
    company: string
    rating: number
    price: number | null
    priceNegotiable: boolean
    description?: string
    requirements?: string
    from: { city: string; country: string; address: string; date: string }
    to: { city: string; country: string; address: string; date: string }
    cargo: {
      type: string; weight: number; volume: number; pallets: number
      ldm: number; loadingType: string
    }
    vehicle: string
    distance: number
    tags: string[]
  }
}

const FLAG_URLS: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  LV: "https://flagcdn.com/w40/lv.png",
  EE: "https://flagcdn.com/w40/ee.png",
  PL: "https://flagcdn.com/w40/pl.png",
  DE: "https://flagcdn.com/w40/de.png",
}

function Flag({ country }: { country: string }) {
  const url = FLAG_URLS[country]
  if (!url) return <span className="w-6 h-4 rounded-sm bg-muted inline-block" />
  return <Image src={url} alt={country} width={24} height={16} className="rounded-sm object-cover w-auto h-auto" unoptimized loading="eager" />
}

const STATUS_MAP = {
  active:     { label: "Aktyvus",    cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  negotiable: { label: "Derinama",   cls: "bg-amber-50 text-amber-700 border-amber-200" },
  expired:    { label: "Pasibaigęs", cls: "bg-slate-100 text-slate-500 border-slate-200" },
}

function SpecCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="bg-background border border-border rounded-xl p-4 flex flex-col items-center text-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-primary/8 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  )
}

export function CargoDetail({ cargo }: CargoDetailProps) {
  const [bookmarked, setBookmarked] = useState(false)
  const status = STATUS_MAP[cargo.status]

  return (
    <div className="w-full space-y-4">

      {/* Breadcrumb nav */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/kroviniai" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" />
            Kroviniai
          </Link>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">{cargo.from.city} → {cargo.to.city}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setBookmarked(b => !b)}
            className={cn("p-2 rounded-lg border transition-all",
              bookmarked ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
          </button>
          <button className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
            <Share2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Status + price + actions bar */}
      <div className="bg-card border border-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", status.cls)}>
            {status.label}
          </span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{cargo.publishedAt}</span>
            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" />{cargo.views} peržiūrų</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            {cargo.price ? (
              <p className="text-2xl font-bold text-foreground">{cargo.price.toLocaleString("lt-LT")} €</p>
            ) : (
              <p className="text-base font-semibold text-muted-foreground">Kaina derinama</p>
            )}
            {cargo.priceNegotiable && cargo.price && (
              <p className="text-[10px] text-amber-600 font-medium">Galima derėtis</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all">
              Siūlyti kainą
            </button>
            <button className="px-3 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-secondary transition-colors flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4" />
              Rašyti
            </button>
          </div>
        </div>
      </div>

      {/* Route: from / distance / to */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* From */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Pakrovimas
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Flag country={cargo.from.country} />
            <p className="text-lg font-bold text-foreground">{cargo.from.city}</p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{cargo.from.address}</p>
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Clock className="w-3.5 h-3.5" />{cargo.from.date}
          </div>
        </div>

        {/* Distance */}
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-2">
            <Navigation className="w-6 h-6 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{cargo.distance} km</p>
          <p className="text-xs text-muted-foreground mt-0.5">~{Math.round(cargo.distance / 80)} val. kelionė</p>
          <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
            <div className="w-16 h-px bg-border" />
            <ArrowRight className="w-3.5 h-3.5" />
            <div className="w-16 h-px bg-border" />
          </div>
        </div>

        {/* To */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Pristatymas
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Flag country={cargo.to.country} />
            <p className="text-lg font-bold text-foreground">{cargo.to.city}</p>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{cargo.to.address}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <Clock className="w-3.5 h-3.5" />{cargo.to.date}
          </div>
        </div>
      </div>

      {/* Specs + Company */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* Specs */}
        <div className="lg:col-span-3 bg-card border border-border rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Package className="w-4 h-4 text-primary" />
            Krovinio specifikacijos
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            <SpecCard icon={Package} label="Tipas"     value={cargo.cargo.type} />
            <SpecCard icon={Scale}   label="Svoris"    value={`${cargo.cargo.weight} t`} />
            <SpecCard icon={Box}     label="Tūris"     value={`${cargo.cargo.volume} m³`} />
            <SpecCard icon={Ruler}   label="LDM"       value={`${cargo.cargo.ldm} ldm`} />
            <SpecCard icon={Layers}  label="Paletės"   value={String(cargo.cargo.pallets)} />
            <SpecCard icon={Truck}   label="Pakrovimas" value={cargo.cargo.loadingType} />
          </div>
        </div>

        {/* Company */}
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-primary" />
            Skelbėjas
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{cargo.title}</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-3 h-3", i < Math.floor(cargo.rating) ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                ))}
                <span className="text-[10px] text-muted-foreground ml-1">({cargo.rating})</span>
              </div>
            </div>
          </div>
          <div className="space-y-2 mt-auto">
            <button className="w-full py-2 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />Skambinti
            </button>
            <button className="w-full py-2 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />El. paštas
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      {cargo.description && (
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Aprašymas</h3>
          <p className="text-sm text-foreground leading-relaxed">{cargo.description}</p>
          {cargo.requirements && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs font-semibold text-amber-700 mb-1">Reikalavimai:</p>
              <p className="text-xs text-amber-800">{cargo.requirements}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="bg-card border border-border rounded-xl p-4">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <Navigation className="w-4 h-4 text-primary" />
          Navigacija
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Pickup navigation */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Pakrovimo vieta
            </p>
            <p className="text-sm font-medium text-foreground mb-2">{cargo.from.address}, {cargo.from.city}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Google Maps
              </a>
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#33CCFF"/>
                  <circle cx="9" cy="10" r="1.5" fill="#333"/>
                  <circle cx="15" cy="10" r="1.5" fill="#333"/>
                  <path d="M8 14c0 0 2 2 4 2s4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Waze
              </a>
              <a
                href={`https://maps.apple.com/?daddr=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#007AFF"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Apple Maps
              </a>
            </div>
          </div>

          {/* Delivery navigation */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Pristatymo vieta
            </p>
            <p className="text-sm font-medium text-foreground mb-2">{cargo.to.address}, {cargo.to.city}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Google Maps
              </a>
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <circle cx="12" cy="12" r="10" fill="#33CCFF"/>
                  <circle cx="9" cy="10" r="1.5" fill="#333"/>
                  <circle cx="15" cy="10" r="1.5" fill="#333"/>
                  <path d="M8 14c0 0 2 2 4 2s4-2 4-2" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Waze
              </a>
              <a
                href={`https://maps.apple.com/?daddr=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-muted hover:border-primary/30 transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#007AFF"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Apple Maps
              </a>
            </div>
          </div>
        </div>

        {/* Full route button */}
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}&destination=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Atidaryti pilną maršrutą Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}
