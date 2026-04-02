"use client"

import { 
  ChevronLeft,
  MoreHorizontal,
  Eye,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Package,
  Box,
  Ruler,
  Truck,
  MapPin,
  Clock,
  Star,
  Building2,
  Navigation,
  Bookmark,
  Share2,
  Scale,
  Layers
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
    from: {
      city: string
      country: string
      address: string
      date: string
    }
    to: {
      city: string
      country: string
      address: string
      date: string
    }
    cargo: {
      type: string
      weight: number
      volume: number
      pallets: number
      ldm: number
      loadingType: string
    }
    vehicle: string
    distance: number
    tags: string[]
  }
}

const countryFlagUrls: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  LV: "https://flagcdn.com/w40/lv.png",
  EE: "https://flagcdn.com/w40/ee.png",
  PL: "https://flagcdn.com/w40/pl.png",
  DE: "https://flagcdn.com/w40/de.png",
}

function CountryFlag({ country }: { country: string }) {
  const flagUrl = countryFlagUrls[country]
  if (!flagUrl) return <span className="w-6 h-4 bg-muted rounded" />
  return (
    <Image
      src={flagUrl}
      alt={country}
      width={24}
      height={16}
      className="rounded-sm object-cover w-auto h-auto"
      unoptimized
      loading="eager"
    />
  )
}

export function CargoDetail({ cargo }: CargoDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="w-full">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/kroviniai" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kroviniai</span>
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm text-foreground">{cargo.from.city} → {cargo.to.city}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={cn(
              "p-2.5 rounded-xl border transition-all",
              isBookmarked 
                ? "bg-primary/10 border-primary/30 text-primary" 
                : "bg-card border-border text-muted-foreground hover:bg-muted"
            )}
          >
            <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-current")} />
          </button>
          <button className="p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
            <Share2 className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Main Content - Horizontal Full Width Layout */}
      <div className="space-y-6">
        
        {/* Top Row: Status + Price + Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-4">
            <span className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold",
              cargo.status === "active" ? "bg-green-500/15 text-green-400" :
              cargo.status === "negotiable" ? "bg-yellow-500/15 text-yellow-400" :
              "bg-muted text-muted-foreground"
            )}>
              {cargo.status === "active" ? "Aktyvus" : 
               cargo.status === "negotiable" ? "Derinama" : "Pasibaigęs"}
            </span>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {cargo.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {cargo.views} peržiūrų
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              {cargo.price ? (
                <p className="text-3xl font-bold text-foreground">
                  {cargo.price.toLocaleString("lt-LT").replace(",", " ")} €
                </p>
              ) : (
                <p className="text-xl font-semibold text-muted-foreground">Kaina derinama</p>
              )}
              {cargo.priceNegotiable && cargo.price && (
                <span className="text-xs text-yellow-400">Galima derėtis</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Siūlyti kainą
              </button>
              <button className="px-6 py-3 bg-secondary text-foreground rounded-xl font-medium hover:bg-muted transition-colors flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Rašyti
              </button>
            </div>
          </div>
        </div>

        {/* Route Row - Full Width Horizontal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* From */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="uppercase tracking-wider font-medium">Pakrovimas</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <CountryFlag country={cargo.from.country} />
              <p className="text-xl font-bold text-foreground">{cargo.from.city}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{cargo.from.address}</p>
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <Clock className="w-4 h-4" />
              {cargo.from.date}
            </div>
          </div>

          {/* Distance */}
          <div className="bg-card rounded-2xl border border-border p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3">
              <Navigation className="w-8 h-8 text-primary" />
            </div>
            <p className="text-3xl font-bold text-foreground">{cargo.distance} km</p>
            <p className="text-sm text-muted-foreground mt-1">~{Math.round(cargo.distance / 80)} val. kelionė</p>
          </div>

          {/* To */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="uppercase tracking-wider font-medium">Pristatymas</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <CountryFlag country={cargo.to.country} />
              <p className="text-xl font-bold text-foreground">{cargo.to.city}</p>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{cargo.to.address}</p>
            <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
              <Clock className="w-4 h-4" />
              {cargo.to.date}
            </div>
          </div>
        </div>

        {/* Specifications + Company Row */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Specifications - 3 columns */}
          <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Krovinio specifikacijos
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">Tipas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.type}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">Svoris</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.weight} t</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Box className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">Tūris</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.volume} m³</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Ruler className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">LDM</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.ldm} ldm</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">Paletės</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.pallets}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-muted-foreground mb-0.5">Pakrovimas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.loadingType}</p>
              </div>
            </div>
          </div>

          {/* Company - 1 column */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Skelbėjas
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground truncate">{cargo.title}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-3.5 h-3.5",
                        i < Math.floor(cargo.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      )}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">({cargo.rating})</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full py-2 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Skambinti
              </button>
              <button className="w-full py-2 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                El. paštas
              </button>
            </div>
          </div>
        </div>

        {/* Description - Full Width */}
        {cargo.description && (
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Aprašymas</h3>
            <p className="text-base text-muted-foreground leading-relaxed">{cargo.description}</p>
            {cargo.requirements && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <p className="text-sm font-medium text-yellow-400 mb-1">Reikalavimai:</p>
                <p className="text-sm text-yellow-200/80">{cargo.requirements}</p>
              </div>
            )}
          </div>
        )}

        {/* Map - Full Width */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="h-72 bg-secondary flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Žemėlapio vaizdas</p>
              <div className="flex items-center justify-center gap-4 mt-3">
                <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  Google Maps
                </button>
                <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  Waze
                </button>
                <button className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
                  OSM
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
