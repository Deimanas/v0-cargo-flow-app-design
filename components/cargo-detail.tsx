"use client"

import { 
  ChevronRight,
  MoreVertical,
  Eye,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  Package,
  Box,
  Ruler,
  Truck,
  FileText
} from "lucide-react"
import Link from "next/link"

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

const countryFlags: Record<string, string> = {
  LT: "🇱🇹",
  LV: "🇱🇻",
  EE: "🇪🇪",
  PL: "🇵🇱",
  DE: "🇩🇪",
}

export function CargoDetail({ cargo }: CargoDetailProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link 
          href="/kroviniai" 
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
          <span className="text-sm">Atgal</span>
        </Link>
        <button className="p-2 hover:bg-muted rounded-lg">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Status Bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          cargo.status === "active" ? "bg-primary/10 text-primary" :
          cargo.status === "negotiable" ? "bg-yellow-100 text-yellow-700" :
          "bg-muted text-muted-foreground"
        }`}>
          {cargo.status === "active" ? "Paskelbtas" : 
           cargo.status === "negotiable" ? "Derinama" : "Pasibaigęs"}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          {cargo.publishedAt}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" />
          {cargo.views}
        </span>
      </div>

      {/* Company Info */}
      <div className="bg-card rounded-2xl border border-border p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-foreground">{cargo.title}</p>
            <p className="text-sm text-muted-foreground">Paskelbė: {cargo.company} ★ — ({cargo.rating})</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">💶</span>
        <span className="text-2xl font-bold text-foreground">
          {cargo.price ? `${cargo.price.toLocaleString("lt-LT").replace(",", " ")} €` : "—"}
        </span>
        {cargo.priceNegotiable && (
          <span className="px-2 py-1 bg-muted rounded-lg text-xs text-muted-foreground">
            Derinama
          </span>
        )}
      </div>

      {/* Description Section */}
      {cargo.description && (
        <div className="bg-card rounded-2xl border border-border p-5 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Aprašymas
          </p>
          <p className="text-sm text-foreground">{cargo.description}</p>
          {cargo.requirements && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2">
              <span className="text-amber-500">ⓘ</span>
              <p className="text-sm text-amber-700">{cargo.requirements}</p>
            </div>
          )}
        </div>
      )}

      {/* Cargo Data Grid */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Krovinio duomenys
        </p>
        <div className="grid grid-cols-3 gap-4">
          {/* Type */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <Package className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground mb-1">Tipas</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.type}</span>
          </div>
          {/* Weight */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <svg className="w-6 h-6 text-muted-foreground mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18M7 7l10 10M17 7L7 17" />
            </svg>
            <span className="text-xs text-muted-foreground mb-1">Svoris</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.weight} t</span>
          </div>
          {/* Volume */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <Box className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground mb-1">Tūris</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.volume} m³</span>
          </div>
          {/* LDM */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <Ruler className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground mb-1">LDM</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.ldm} ldm</span>
          </div>
          {/* Pallets */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <svg className="w-6 h-6 text-muted-foreground mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 10h20M8 4v16M16 4v16" />
            </svg>
            <span className="text-xs text-muted-foreground mb-1">Paletės</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.pallets}</span>
          </div>
          {/* Loading */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-xl">
            <Truck className="w-6 h-6 text-muted-foreground mb-2" />
            <span className="text-xs text-muted-foreground mb-1">Pakrovimas</span>
            <span className="text-sm font-medium text-foreground">{cargo.cargo.loadingType}</span>
          </div>
        </div>
      </div>

      {/* Route Section */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-4">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Maršrutas
        </p>
        
        <div className="space-y-4">
          {/* From */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-0.5 h-16 bg-border my-1" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Pakrovimas</p>
              <p className="font-semibold text-foreground">{cargo.from.city}</p>
              <p className="text-sm text-muted-foreground">{cargo.from.address}</p>
              <p className="text-sm text-muted-foreground">{cargo.from.date}</p>
            </div>
          </div>

          {/* To */}
          <div className="flex items-start gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase mb-1">Pristatymas</p>
              <p className="font-semibold text-foreground">{cargo.to.city}</p>
              <p className="text-sm text-muted-foreground">{cargo.to.address}</p>
              <p className="text-sm text-muted-foreground">{cargo.to.date}</p>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4" />
          </svg>
          <span>{cargo.distance} km · ~{Math.round(cargo.distance / 80 * 60)} min</span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
        <div className="h-48 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Žemėlapio vaizdas</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 lg:relative lg:bottom-auto p-4 bg-card border-t border-border lg:border-0 lg:bg-transparent lg:p-0 flex gap-3">
        <button className="flex-1 py-3.5 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors">
          Siūlyti kainą
        </button>
        <button className="flex-1 py-3.5 bg-muted text-foreground rounded-2xl font-medium hover:bg-muted/80 transition-colors flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Rašyti
        </button>
      </div>

      {/* Spacer for fixed buttons on mobile */}
      <div className="h-20 lg:hidden" />
    </div>
  )
}
