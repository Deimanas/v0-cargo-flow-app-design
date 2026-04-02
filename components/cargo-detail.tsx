"use client"

import { 
  ArrowLeft, 
  Bookmark, 
  Eye, 
  Calendar, 
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Package,
  Scale,
  Box,
  Layers,
  Ruler,
  Truck,
  Clock,
  FileText,
  ExternalLink
} from "lucide-react"
import Link from "next/link"

interface CargoDetailProps {
  cargo: {
    id: string
    title: string
    from: {
      city: string
      country: string
      address: string
      date: string
      time?: string
    }
    to: {
      city: string
      country: string
      address: string
      date: string
      time?: string
    }
    price: number | null
    priceNegotiable: boolean
    status: "active" | "expired" | "negotiable"
    views: number
    publishedAt: string
    description?: string
    requirements?: string
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
    publisher: {
      name: string
      company?: string
      phone: string
      email: string
    }
    reference?: string
    tags: string[]
  }
}

const countryFlags: Record<string, string> = {
  LT: "🇱🇹",
  LV: "🇱🇻",
  EE: "🇪🇪",
  PL: "🇵🇱",
  DE: "🇩🇪",
  NL: "🇳🇱",
}

export function CargoDetail({ cargo }: CargoDetailProps) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Link href="/kroviniai" className="hover:text-primary">
          Kroviniai
        </Link>
        <span>/</span>
        <span className="text-foreground">{cargo.from.city} → {cargo.to.city}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* Header Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-foreground mb-1">
                  {cargo.from.city} → {cargo.to.city}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {cargo.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {cargo.from.address} → {cargo.to.address}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={`px-2 py-1 rounded-full ${
                  cargo.status === "active" ? "bg-green-100 text-green-700" :
                  cargo.status === "negotiable" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {cargo.status === "active" ? "Aktyvus" : 
                   cargo.status === "negotiable" ? "Derinama" : "Pasibaigęs"}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {cargo.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-muted rounded-lg text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Route Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Maršrutas</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              {/* From */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs font-medium text-primary uppercase">Pakrovimas</span>
                </div>
                <p className="font-semibold text-foreground mb-1">
                  {countryFlags[cargo.from.country]} {cargo.from.city}, {cargo.from.country}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{cargo.from.address}</p>
                <p className="text-sm text-muted-foreground">
                  {cargo.from.date}{cargo.from.time && ` ${cargo.from.time}`}
                </p>
              </div>

              {/* To */}
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-medium text-green-600 uppercase">Iškrovimas</span>
                </div>
                <p className="font-semibold text-foreground mb-1">
                  {countryFlags[cargo.to.country]} {cargo.to.city}, {cargo.to.country}
                </p>
                <p className="text-sm text-muted-foreground mb-2">{cargo.to.address}</p>
                <p className="text-sm text-muted-foreground">
                  {cargo.to.date}{cargo.to.time && ` ${cargo.to.time}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Atstumas keliais: <strong className="text-foreground">{cargo.distance} km</strong></span>
              <span className="text-muted-foreground">pagal navigaciją (OSRM)</span>
            </div>

            {/* Map Links */}
            <div className="flex gap-2 mt-4">
              <button className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Google Maps
              </button>
              <button className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Waze
              </button>
              <button className="px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                OSM
              </button>
            </div>

            {/* Map placeholder */}
            <div className="mt-4 h-64 bg-muted rounded-xl flex items-center justify-center">
              <p className="text-muted-foreground">Žemėlapio vaizdas</p>
            </div>
          </div>

          {/* Cargo Details Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Package className="w-5 h-5 text-green-500" />
              <h2 className="font-semibold text-foreground">Krovinys</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Tipas</span>
                <span className="font-medium text-primary">{cargo.cargo.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Svoris</span>
                <span className="font-medium text-primary">{cargo.cargo.weight} t ({(cargo.cargo.weight * 1000).toLocaleString()} kg)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Tūris</span>
                <span className="text-foreground">{cargo.cargo.volume} m³</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Padėklai</span>
                <span className="font-medium text-primary">{cargo.cargo.pallets} vnt.</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Krovos metrai</span>
                <span className="font-medium text-primary">{cargo.cargo.ldm} ldm</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Transporto priemonė</span>
                <span className="font-medium text-primary">{cargo.vehicle}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Pakrovimo būdas</span>
                <span className="text-foreground">{cargo.cargo.loadingType}</span>
              </div>
              {cargo.requirements && (
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Specialūs reikalavimai</span>
                  <span className="font-medium text-primary">{cargo.requirements}</span>
                </div>
              )}
              {cargo.reference && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Ref. numeris</span>
                  <span className="text-foreground">{cargo.reference}</span>
                </div>
              )}
            </div>

            {cargo.description && (
              <div className="mt-4 p-4 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">{cargo.description}</p>
              </div>
            )}
          </div>

          {/* Offers Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💬</span>
              <h2 className="font-semibold text-foreground">Pasiūlymai (0)</h2>
            </div>

            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-muted-foreground">Pasiūlymų dar nėra</p>
            </div>
          </div>

          {/* History Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Istorija</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Sukurta</span>
                <span className="font-medium text-primary">{cargo.publishedAt}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Paskelbta</span>
                <span className="font-medium text-primary">{cargo.publishedAt}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Peržiūros</span>
                <span className="text-foreground">{cargo.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Price Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💶</span>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {cargo.price ? `${cargo.price.toLocaleString("lt-LT")} EUR` : "Derinama"}
                  </p>
                  {cargo.priceNegotiable && (
                    <p className="text-xs text-muted-foreground">Derinama</p>
                  )}
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Rašyti
              </button>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <p className="font-semibold text-foreground">{cargo.publisher.name}</p>
              <p className="text-sm text-muted-foreground">Paskelbė: <span className="text-foreground">{cargo.publisher.company || cargo.publisher.name}</span></p>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <a href={`tel:${cargo.publisher.phone}`} className="text-primary hover:underline">
                  {cargo.publisher.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <a href={`mailto:${cargo.publisher.email}`} className="text-primary hover:underline">
                  {cargo.publisher.email}
                </a>
              </div>
            </div>

            <button className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Skelbti iš naujo
            </button>
          </div>

          {/* Summary Card */}
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="font-semibold text-foreground">Santrauka</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Scale className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{cargo.cargo.weight} t</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">Pakr. {cargo.from.date.split("-").slice(1).join("-")}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{cargo.vehicle}</span>
              </div>
            </div>
          </div>

          {/* Bookmark */}
          <button className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <Bookmark className="w-4 h-4" />
            Įsiminti
          </button>
        </div>
      </div>
    </div>
  )
}
