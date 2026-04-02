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
  FileText,
  AlertCircle
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
      className="rounded-sm object-cover"
      unoptimized
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

      {/* Main Content - Full Width Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column - Main Info */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Hero Card with Route */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {/* Route Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold",
                    cargo.status === "active" ? "bg-green-500/15 text-green-400" :
                    cargo.status === "negotiable" ? "bg-yellow-500/15 text-yellow-400" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {cargo.status === "active" ? "Aktyvus" : 
                     cargo.status === "negotiable" ? "Derinama" : "Pasibaigęs"}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {cargo.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {cargo.views} peržiūrų
                    </span>
                  </div>
                </div>
              </div>

              {/* Big Route Display */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/30" />
                  <CountryFlag country={cargo.from.country} />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{cargo.from.city}</p>
                    <p className="text-sm text-muted-foreground">{cargo.from.country}</p>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-primary via-border to-green-500 rounded-full" />
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full">
                    <Navigation className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{cargo.distance} km</span>
                  </div>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-border to-green-500 rounded-full" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/30" />
                  <CountryFlag country={cargo.to.country} />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{cargo.to.city}</p>
                    <p className="text-sm text-muted-foreground">{cargo.to.country}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Details Row */}
            <div className="grid grid-cols-2 border-t border-border">
              <div className="p-5 border-r border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="uppercase tracking-wider font-medium">Pakrovimas</span>
                </div>
                <p className="text-sm text-foreground font-medium">{cargo.from.address}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {cargo.from.date}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="uppercase tracking-wider font-medium">Pristatymas</span>
                </div>
                <p className="text-sm text-foreground font-medium">{cargo.to.address}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {cargo.to.date}
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Specifications - Horizontal Layout */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Krovinio specifikacijos
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Package className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Tipas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.type}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <svg className="w-5 h-5 text-muted-foreground mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="8" />
                  <path d="M12 8v4M12 16v-4M8 12h4M16 12h-4" />
                </svg>
                <p className="text-xs text-muted-foreground mb-1">Svoris</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.weight} t</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Box className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Tūris</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.volume} m³</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Ruler className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">LDM</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.ldm} ldm</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <svg className="w-5 h-5 text-muted-foreground mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 6v12M10 6v12M14 6v12M18 6v12" />
                </svg>
                <p className="text-xs text-muted-foreground mb-1">Paletės</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.pallets}</p>
              </div>
              <div className="bg-secondary/50 rounded-xl p-4 text-center">
                <Truck className="w-5 h-5 text-muted-foreground mx-auto mb-2" />
                <p className="text-xs text-muted-foreground mb-1">Pakrovimas</p>
                <p className="text-sm font-semibold text-foreground">{cargo.cargo.loadingType}</p>
              </div>
            </div>
          </div>

          {/* Description & Requirements */}
          {(cargo.description || cargo.requirements) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cargo.description && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Aprašymas
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cargo.description}</p>
                </div>
              )}
              {cargo.requirements && (
                <div className="bg-card rounded-2xl border border-border p-6">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    Reikalavimai
                  </h3>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <p className="text-sm text-yellow-200">{cargo.requirements}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Map */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="h-64 bg-secondary flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Žemėlapio vaizdas</p>
                <p className="text-xs text-muted-foreground mt-1">~{Math.round(cargo.distance / 80 * 60)} min kelionė</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          
          {/* Price Card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="text-center mb-6">
              {cargo.price ? (
                <>
                  <p className="text-4xl font-bold text-foreground">
                    {cargo.price.toLocaleString("lt-LT").replace(",", " ")}
                    <span className="text-xl ml-1">€</span>
                  </p>
                  {cargo.priceNegotiable && (
                    <span className="inline-block mt-2 px-3 py-1 bg-yellow-500/15 text-yellow-400 rounded-full text-xs font-medium">
                      Kaina derinama
                    </span>
                  )}
                </>
              ) : (
                <p className="text-2xl font-semibold text-muted-foreground">Kaina derinama</p>
              )}
            </div>
            
            <div className="space-y-3">
              <button className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30">
                Siūlyti kainą
              </button>
              <button className="w-full py-3.5 bg-secondary text-foreground rounded-xl font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Rašyti žinutę
              </button>
            </div>
          </div>

          {/* Company Card */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Skelbėjas
            </h3>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center">
                <Building2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{cargo.title}</p>
                <p className="text-sm text-muted-foreground truncate">{cargo.company}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(cargo.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                      )}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({cargo.rating})</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <button className="w-full py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Skambinti
              </button>
              <button className="w-full py-2.5 bg-secondary text-foreground rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Siųsti el. laišką
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Žymos</h3>
            <div className="flex flex-wrap gap-2">
              {cargo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-secondary rounded-lg text-xs font-medium text-muted-foreground">
                {cargo.vehicle}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Santrauka</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Atstumas</span>
                <span className="text-sm font-medium text-foreground">{cargo.distance} km</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Kelionės laikas</span>
                <span className="text-sm font-medium text-foreground">~{Math.round(cargo.distance / 80 * 60)} min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transportas</span>
                <span className="text-sm font-medium text-foreground">{cargo.vehicle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Peržiūros</span>
                <span className="text-sm font-medium text-foreground">{cargo.views}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
