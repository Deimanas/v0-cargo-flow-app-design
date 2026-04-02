"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import { 
  MapPin, 
  Calendar, 
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Eye,
  RefreshCw
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const loadingTypes = [
  { id: "galas", label: "Galas" },
  { id: "virsus", label: "Viršus" },
  { id: "sonas", label: "Šonas" },
]

const packingTypes = [
  { id: "pilnas", label: "Pilnas" },
  { id: "dalinis", label: "Dalinis" },
]

const features = [
  { id: "adr", label: "ADR" },
  { id: "tir", label: "TIR" },
  { id: "liftas", label: "Liftas" },
  { id: "manipuliatorius", label: "Manipuliatorius" },
]

const priceTypes = [
  { id: "fiksuota", label: "Fiksuota" },
  { id: "derinama", label: "Derinama" },
  { id: "pagal_uzklausa", label: "Pagal užklausą" },
]

const mockTransport = {
  id: "1",
  company: "UAB \"VARLE\"",
  rating: 0,
  status: "Paskelbtas",
  publishedAt: "2026-03-28 10:33",
  views: 0,
  price: 950,
  priceNegotiable: true,
  from: {
    city: "Utena",
    address: "Utena, Lietuva, 28193, LT",
    date: "2026-04-02",
  },
  to: {
    city: "Klaipėda",
    address: "Klaipėda, Lietuva, 91100, LT",
    dateRange: "2026-04-02 – 2026-04-03",
  },
  distance: 331,
  matchingCargo: {
    route: "Utena → Klaipėda",
    company: "UAB dfsdfsdsf",
    rating: 0,
    price: 1040,
    weight: 7.6,
    date: "balandžio 2 d.",
    type: "Bendroji",
  },
}

export default function TransportasPage() {
  const [selectedLoadingTypes, setSelectedLoadingTypes] = useState<string[]>(["galas"])
  const [selectedPackingType, setSelectedPackingType] = useState("pilnas")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [selectedPriceType, setSelectedPriceType] = useState("fiksuota")
  const [price, setPrice] = useState("500")

  const toggleLoadingType = (id: string) => {
    setSelectedLoadingTypes(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="text-sm">Atgal</span>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Siūlyti savo transportą</h1>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Recurring Route Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Pasikartojantis maršrutas
              </p>
              <p className="text-sm text-foreground mb-1">
                Greitas maršruto užpildymas ir automatinis savaitinis skelbimas
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Dar neturite išsaugotų maršrutų.
              </p>
              <button className="flex items-center gap-2 w-full justify-center py-3 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                <RefreshCw className="w-4 h-4" />
                Išsaugoti dabartinę formą kaip maršrutą
              </button>
            </div>

            {/* Loading Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Pakrovimas
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Šalis *</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl">
                      <span>🇱🇹</span>
                      <span className="text-sm">LT</span>
                    </div>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Miestas *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Vilnius..."
                      className="flex-1 px-4 py-3 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button className="p-3 bg-primary text-primary-foreground rounded-xl">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Pakrovimo datos *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Pasirinkite datą"
                    className="w-full pl-11 pr-4 py-3 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Delivery Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Pristatymas
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Šalis *</label>
                  <div className="relative">
                    <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-xl">
                      <span>🇱🇹</span>
                      <span className="text-sm">LT</span>
                    </div>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Miestas *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Berlin..."
                      className="flex-1 px-4 py-3 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button className="p-3 bg-primary text-primary-foreground rounded-xl">
                      <MapPin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Pristatymo datos *</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Pasirinkite datą"
                    className="w-full pl-11 pr-4 py-3 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            {/* Transport Capacity Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Transporto talpinimas
              </p>
              
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Krovinio rūšis *</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-muted border-0 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Pasirinkite...</option>
                    <option>Bendras</option>
                    <option>Šaldomas</option>
                    <option>ADR</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Pakrovimo rūšis *</label>
                <div className="flex flex-wrap gap-2">
                  {loadingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => toggleLoadingType(type.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                        selectedLoadingTypes.includes(type.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Pakrovimo tipas *</label>
                <div className="flex flex-wrap gap-2">
                  {packingTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedPackingType(type.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                        selectedPackingType === type.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Savybės</label>
                <div className="flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                        selectedFeatures.includes(feature.id)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {feature.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Kaina
              </p>
              
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-1.5 block">Suma (EUR)</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Kainos tipas</label>
                <div className="flex flex-wrap gap-2">
                  {priceTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedPriceType(type.id)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-colors",
                        selectedPriceType === type.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:bg-muted"
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Aprašymas
              </p>
              
              <textarea
                rows={4}
                placeholder="Papildoma informacija apie transporto pasiūlymą..."
                className="w-full px-4 py-3 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
              />
              <p className="text-xs text-muted-foreground text-right mt-1">0/300</p>
            </div>

            {/* Submit Button */}
            <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Siūlyti savo transportą
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
