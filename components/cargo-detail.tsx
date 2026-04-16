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
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 bg-muted/30 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Navigation className="w-4 h-4 text-primary" />
            Navigacija
          </h3>
        </div>
        
        <div className="p-4 space-y-5">
          {/* Pickup location */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Pakrovimas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.from.city}</p>
                <p className="text-xs text-muted-foreground">{cargo.from.address}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-11">
              {/* Google Maps */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#4285F4] hover:bg-[#4285F4]/5 hover:text-[#4285F4] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.26-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84l5.59-5.59V2z" fill="#4285F4"/>
                  <path d="M5 9c0-3.87 3.13-7 7-7v7H5z" fill="#34A853"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Google Maps
              </a>
              {/* Waze */}
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#33CCFF] hover:bg-[#33CCFF]/5 hover:text-[#00C8FF] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#fff"/>
                  <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" fill="#33CCFF"/>
                  <ellipse cx="8.5" cy="10" rx="1.5" ry="2" fill="#333"/>
                  <ellipse cx="15.5" cy="10" rx="1.5" ry="2" fill="#333"/>
                  <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
                Waze
              </a>
              {/* Apple Maps */}
              <a
                href={`https://maps.apple.com/?daddr=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#007AFF] hover:bg-[#007AFF]/5 hover:text-[#007AFF] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <defs>
                    <linearGradient id="appleMapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5AC8FA"/>
                      <stop offset="50%" stopColor="#34C759"/>
                      <stop offset="100%" stopColor="#FF9500"/>
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#appleMapGrad)"/>
                  <path d="M12 7l4 3-4 7-4-7 4-3z" fill="#fff" stroke="#fff" strokeWidth="0.5"/>
                  <circle cx="12" cy="11" r="1.5" fill="#FF3B30"/>
                </svg>
                Apple Maps
              </a>
            </div>
          </div>

          {/* Route line */}
          <div className="flex items-center gap-3 ml-4">
            <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-emerald-500 rounded-full" />
            <span className="text-xs text-muted-foreground">{cargo.distance} km</span>
          </div>

          {/* Delivery location */}
          <div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">Pristatymas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.to.city}</p>
                <p className="text-xs text-muted-foreground">{cargo.to.address}</p>
              </div>
            </div>
            <div className="flex gap-2 ml-11">
              {/* Google Maps */}
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#4285F4] hover:bg-[#4285F4]/5 hover:text-[#4285F4] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84.95 1.54 2.2 2.86 3.16 4.4.47.75.81 1.45 1.17 2.26.26.55.47 1.5 1.26 1.5s1-.95 1.26-1.5c.37-.81.7-1.51 1.17-2.26.96-1.53 2.21-2.85 3.16-4.4C18.5 12.37 19 10.74 19 9c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84l5.59-5.59V2z" fill="#4285F4"/>
                  <path d="M5 9c0-3.87 3.13-7 7-7v7H5z" fill="#34A853"/>
                  <circle cx="12" cy="9" r="2.5" fill="#fff"/>
                </svg>
                Google Maps
              </a>
              {/* Waze */}
              <a
                href={`https://waze.com/ul?q=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}&navigate=yes`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#33CCFF] hover:bg-[#33CCFF]/5 hover:text-[#00C8FF] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#fff"/>
                  <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" fill="#33CCFF"/>
                  <ellipse cx="8.5" cy="10" rx="1.5" ry="2" fill="#333"/>
                  <ellipse cx="15.5" cy="10" rx="1.5" ry="2" fill="#333"/>
                  <path d="M8 15c0 0 1.5 2.5 4 2.5s4-2.5 4-2.5" stroke="#333" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
                Waze
              </a>
              {/* Apple Maps */}
              <a
                href={`https://maps.apple.com/?daddr=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#007AFF] hover:bg-[#007AFF]/5 hover:text-[#007AFF] transition-all shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
                  <defs>
                    <linearGradient id="appleMapGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#5AC8FA"/>
                      <stop offset="50%" stopColor="#34C759"/>
                      <stop offset="100%" stopColor="#FF9500"/>
                    </linearGradient>
                  </defs>
                  <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#appleMapGrad2)"/>
                  <path d="M12 7l4 3-4 7-4-7 4-3z" fill="#fff" stroke="#fff" strokeWidth="0.5"/>
                  <circle cx="12" cy="11" r="1.5" fill="#FF3B30"/>
                </svg>
                Apple Maps
              </a>
            </div>
          </div>
        </div>

        {/* Full route buttons */}
        <div className="px-4 py-3 bg-muted/20 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 text-center">Visas maršrutas</p>
          <div className="flex gap-2">
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}&destination=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#4285F4] text-white rounded-xl text-sm font-semibold hover:bg-[#3367D6] transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#fff"/>
                <circle cx="12" cy="9" r="2" fill="#4285F4"/>
              </svg>
              Google Maps
            </a>
            <a
              href={`https://waze.com/ul?ll=${encodeURIComponent(cargo.to.city)}&navigate=yes&from=${encodeURIComponent(cargo.from.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#33CCFF] text-white rounded-xl text-sm font-semibold hover:bg-[#00B8E6] transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <circle cx="12" cy="12" r="8" fill="#fff"/>
                <ellipse cx="9" cy="11" rx="1" ry="1.3" fill="#333"/>
                <ellipse cx="15" cy="11" rx="1" ry="1.3" fill="#333"/>
                <path d="M9 14.5c0 0 1 1.5 3 1.5s3-1.5 3-1.5" stroke="#333" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
              </svg>
              Waze
            </a>
            <a
              href={`https://maps.apple.com/?saddr=${encodeURIComponent(cargo.from.address + ", " + cargo.from.city)}&daddr=${encodeURIComponent(cargo.to.address + ", " + cargo.to.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#5AC8FA] via-[#34C759] to-[#FF9500] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path d="M12 6l5 4-5 8-5-8 5-4z" fill="#fff"/>
              </svg>
              Apple Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
