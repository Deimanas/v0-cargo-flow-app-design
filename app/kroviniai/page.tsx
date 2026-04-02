"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, List, Map, Filter, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const mockCargos = [
  {
    id: "1",
    from: { city: "Vilnius", country: "LT", address: "Gariunų g. 70, Vilnius, Lietuva" },
    to: { city: "Klaipėda", country: "LT", address: "Perkėlos g. 10, Klaipėda, Lietuva" },
    distance: 307,
    price: 1320,
    priceNegotiable: false,
    weight: 11.8,
    date: "03-29",
    status: "expired" as const,
    tags: ["Bendras", "Tentinė", "11.8 t"],
    views: 12,
  },
  {
    id: "2",
    from: { city: "Kaunas", country: "LT", address: "Taikos pr. 141, Kaunas, Lietuva" },
    to: { city: "Šiauliai", country: "LT", address: "Pramonės g. 15, Šiauliai, Lietuva" },
    distance: 142,
    price: 980,
    priceNegotiable: false,
    weight: 10.0,
    date: "03-30",
    status: "expired" as const,
    tags: ["Šaldomas", "Refrižeratorius", "10.0 t", "Temp."],
    views: 8,
  },
  {
    id: "3",
    from: { city: "Klaipėda", country: "LT", address: "Šilutės pl. 5, Klaipėda, Lietuva" },
    to: { city: "Kaunas", country: "LT", address: "Ateities pl. 45, Kaunas, Lietuva" },
    distance: 213,
    price: 1490,
    priceNegotiable: true,
    weight: 16.0,
    date: "03-31",
    status: "expired" as const,
    tags: ["Bendras", "Mega priekaba", "16.0 t"],
    views: 15,
  },
  {
    id: "4",
    from: { city: "Panevėžys", country: "LT", address: "Beržų g. 12, Panevėžys, Lietuva" },
    to: { city: "Marijampolė", country: "LT", address: "Vokiečių g. 3, Marijampolė, Lietuva" },
    distance: 162,
    price: null,
    priceNegotiable: true,
    weight: 15.0,
    date: "03-31",
    status: "expired" as const,
    tags: ["Negabaritinis", "Platforma", "15.0 t"],
    views: 6,
  },
  {
    id: "5",
    from: { city: "Vilnius", country: "LT", address: "Ukmergės g. 120, Vilnius, Lietuva" },
    to: { city: "Alytus", country: "LT", address: "Santaikos g. 26, Alytus, Lietuva" },
    distance: 123,
    price: 430,
    priceNegotiable: false,
    weight: 2.8,
    date: "04-01",
    status: "expired" as const,
    tags: ["Bendras", "Tentinė", "2.8 t"],
    views: 4,
  },
  {
    id: "6",
    from: { city: "Utena", country: "LT", address: "J. Basanavičiaus g. 85, Utena, Lietuva" },
    to: { city: "Klaipėda", country: "LT", address: "Liepajų g. 18, Klaipėda, Lietuva" },
    distance: 331,
    price: 1040,
    priceNegotiable: true,
    weight: 7.6,
    date: "04-02",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "7.6 t"],
    views: 3,
  },
  {
    id: "7",
    from: { city: "Vilnius", country: "LT", address: "Vilnius, Lietuva" },
    to: { city: "Kaunas", country: "LT", address: "Kaunas, Lietuva" },
    distance: 101,
    price: 760,
    priceNegotiable: false,
    weight: 14.0,
    date: "03-29",
    status: "expired" as const,
    tags: ["Bendras", "Tentinė", "14.0 t"],
    views: 9,
  },
  {
    id: "8",
    from: { city: "Kaunas", country: "LT", address: "Kaunas, Lietuva" },
    to: { city: "Klaipėda", country: "LT", address: "Klaipėda, Lietuva" },
    distance: 213,
    price: 890,
    priceNegotiable: false,
    weight: 8.5,
    date: "04-03",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "8.5 t"],
    views: 2,
  },
]

export default function KroviniaiPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Rasti krovinį</h1>
              <p className="text-sm text-muted-foreground">{mockCargos.length} krovinių rasta</p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Toggle */}
              <div className="flex items-center bg-muted rounded-xl p-1">
                <button
                  onClick={() => setView("list")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === "list"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                  Sąrašas
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    view === "map"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Map className="w-4 h-4" />
                  Žemėlapis
                </button>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  5
                </span>
              </button>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors"
              >
                <Filter className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex gap-6">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-80 shrink-0">
              <FilterPanel />
            </div>

            {/* Filters - Mobile */}
            {showFilters && (
              <>
                <div
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowFilters(false)}
                />
                <div className="lg:hidden fixed inset-y-0 right-0 w-full max-w-sm bg-background z-50 overflow-y-auto">
                  <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">Filtrai</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 rounded-lg hover:bg-muted"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterPanel onClose={() => setShowFilters(false)} className="border-0 p-0" />
                  </div>
                </div>
              </>
            )}

            {/* Cargo List */}
            <div className="flex-1">
              {view === "list" ? (
                <div className="space-y-4">
                  {mockCargos.map((cargo) => (
                    <Link key={cargo.id} href={`/kroviniai/${cargo.id}`}>
                      <CargoCard {...cargo} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-2xl border border-border h-[600px] flex items-center justify-center">
                  <p className="text-muted-foreground">Žemėlapio vaizdas</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
