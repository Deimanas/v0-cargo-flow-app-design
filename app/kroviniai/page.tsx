"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard, type CargoCardProps } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import {
  Bell,
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Plus,
  Package,
  Truck,
  ChevronRight,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Extended cargo data matching the specification
const CARGO_DATA: Omit<CargoCardProps, "id"> & { id: string }[] = [
  {
    id: "1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    distance: 1042,
    price: 2450,
    weight: 18.5,
    loadingDate: "2024-04-05",
    loadingTime: "08:00 - 12:00",
    status: "published",
    cargoType: "Bendras krovinys",
    transportType: "Tentinė",
    views: 47,
    description: "Statybinės medžiagos, paletizuotas krovinys. Reikalingas pakrovimas iš šono.",
    postedAt: "prieš 2 val.",
    postedBy: "UAB Transportas",
    matchingTransports: 3,
  },
  {
    id: "2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Warszawa", country: "PL" },
    distance: 398,
    price: 890,
    weight: 8.2,
    loadingDate: "2024-04-04",
    loadingTime: "14:00 - 18:00",
    status: "published",
    cargoType: "Šaldomas",
    transportType: "Refrižeratorius",
    views: 23,
    description: "Maisto produktai, temperatūra -18°C",
    postedAt: "prieš 5 val.",
    matchingTransports: 1,
  },
  {
    id: "3",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Amsterdam", country: "NL" },
    distance: 1456,
    price: null,
    lastOfferPrice: 3200,
    weight: 22,
    loadingDate: "2024-04-06",
    status: "awaiting_confirmation",
    cargoType: "Bendras krovinys",
    transportType: "Mega priekaba",
    views: 89,
    description: "Baldai, aukštis 3.2m. Laukiama vežėjo patvirtinimo.",
    postedAt: "prieš 1 d.",
    postedBy: "Baldų fabrikas",
  },
  {
    id: "4",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Rīga", country: "LV" },
    distance: 267,
    price: 580,
    weight: 5.5,
    loadingDate: "2024-04-04",
    loadingTime: "10:00",
    status: "assigned",
    cargoType: "Pavojingas (ADR)",
    transportType: "ADR cisterna",
    views: 12,
    description: "Chemikalai, ADR 3 klasė",
    postedAt: "prieš 3 d.",
    postedBy: "Chemijos įmonė",
  },
  {
    id: "5",
    from: { city: "Šiauliai", country: "LT" },
    to: { city: "Praha", country: "PL" },
    distance: 1124,
    price: 1850,
    weight: 14,
    loadingDate: "2024-04-07",
    status: "in_transit",
    cargoType: "Negabaritinis",
    transportType: "Platforma",
    views: 34,
    description: "Pramoninė įranga, plotis 3.5m",
    postedAt: "prieš 4 d.",
  },
  {
    id: "6",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Tallinn", country: "EE" },
    distance: 597,
    price: 720,
    weight: 6.8,
    loadingDate: "2024-04-05",
    loadingTime: "06:00 - 08:00",
    status: "delivered",
    cargoType: "Bendras krovinys",
    transportType: "Tentinė",
    views: 156,
    description: "Elektronika, saugi pakuotė",
    postedAt: "prieš 1 sav.",
    matchingTransports: 5,
  },
]

// Status filter tabs matching specification
const STATUS_TABS = [
  { key: "all", label: "Visi", count: CARGO_DATA.length },
  { key: "published", label: "Paskelbti", count: CARGO_DATA.filter(c => c.status === "published").length },
  { key: "assigned", label: "Priskirti", count: CARGO_DATA.filter(c => c.status === "assigned").length },
  { key: "in_transit", label: "Vežami", count: CARGO_DATA.filter(c => c.status === "in_transit").length },
  { key: "awaiting_confirmation", label: "Laukia patvirtinimo", count: CARGO_DATA.filter(c => c.status === "awaiting_confirmation").length },
  { key: "delivered", label: "Pristatyti", count: CARGO_DATA.filter(c => c.status === "delivered").length },
]

// City suggestions
const CITY_LIST = [
  { city: "Vilnius", country: "LT" },
  { city: "Kaunas", country: "LT" },
  { city: "Klaipėda", country: "LT" },
  { city: "Šiauliai", country: "LT" },
  { city: "Panevėžys", country: "LT" },
  { city: "Berlin", country: "DE" },
  { city: "Warszawa", country: "PL" },
]

// Active filters (for demonstration)
const ACTIVE_FILTERS = [
  { id: "f1", label: "Kilmė: Lietuva" },
  { id: "f2", label: "Svoris: 5-20 t" },
]

export default function KroviniaiPage() {
  const [statusTab, setStatusTab] = useState("all")
  const [showFilters, setShowFilters] = useState(true)
  const [mobileFilters, setMobileFilters] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeFilters, setActiveFilters] = useState(ACTIVE_FILTERS)
  const searchRef = useRef<HTMLDivElement>(null)

  // Filter cities based on search
  const filteredCities = CITY_LIST.filter(c =>
    c.city.toLowerCase().includes(searchText.toLowerCase())
  )

  // Filter cargo based on status
  const filteredCargo = CARGO_DATA.filter(c => 
    statusTab === "all" || c.status === statusTab
  )

  // Check if any cargo is in transit or assigned (for reminder)
  const hasActiveDelivery = CARGO_DATA.some(c => c.status === "in_transit" || c.status === "assigned")

  // Count active offers (placeholder)
  const activeOffersCount = 5

  // Unread notifications count
  const unreadNotifications = 12

  // Click outside handler for search suggestions
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function removeFilter(id: string) {
    setActiveFilters(prev => prev.filter(f => f.id !== id))
  }

  function clearAllFilters() {
    setActiveFilters([])
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Kroviniai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Rasta {filteredCargo.length} krovinių
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Active offers button */}
              {activeOffersCount > 0 && (
                <Link
                  href="/pasiulymai"
                  className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-sm font-medium hover:bg-amber-100 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  {activeOffersCount} aktyvūs pasiūlymai
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
              {/* New cargo button */}
              <Link
                href="/kroviniai/naujas"
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Naujas krovinys</span>
              </Link>
              {/* Notifications */}
              <Link
                href="/pranesimai"
                className="relative p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1.5 bg-destructive text-white text-[11px] rounded-full flex items-center justify-center font-bold">
                    {unreadNotifications}
                  </span>
                )}
              </Link>
            </div>
          </header>

          {/* Reminder card for active deliveries */}
          {hasActiveDelivery && (
            <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Turite vežamų arba priskirtų krovinių</p>
                  <p className="text-xs text-blue-700">Nepamirškite patvirtinti pristatymą</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStatusTab("in_transit")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Peržiūrėti
              </button>
            </div>
          )}

          {/* Search and filter controls */}
          <div className="flex gap-3 mb-4">
            {/* Search input */}
            <div className="flex-1 relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchText}
                onChange={e => { setSearchText(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Ieškoti pagal miestą..."
                className="w-full pl-12 pr-10 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
              {searchText && (
                <button
                  type="button"
                  onClick={() => { setSearchText(""); setShowSuggestions(false) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              {/* Search suggestions dropdown */}
              {showSuggestions && searchText && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-2">
                    {filteredCities.length > 0 ? (
                      filteredCities.map(c => (
                        <button
                          key={c.city}
                          type="button"
                          onClick={() => { setSearchText(c.city); setShowSuggestions(false) }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{c.city}</p>
                            <p className="text-xs text-muted-foreground">{c.country}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="px-3 py-4 text-sm text-muted-foreground text-center">
                        Nieko nerasta
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Filter button - mobile */}
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-card border border-border rounded-xl hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              {activeFilters.length > 0 && (
                <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFilters.length}
                </span>
              )}
            </button>

            {/* Filter toggle - desktop */}
            <button
              type="button"
              onClick={() => setShowFilters(v => !v)}
              className={cn(
                "hidden lg:flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all border",
                showFilters
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
              {activeFilters.length > 0 && (
                <span className={cn(
                  "w-5 h-5 text-xs rounded-full flex items-center justify-center font-bold",
                  showFilters ? "bg-primary text-primary-foreground" : "bg-muted-foreground text-white"
                )}>
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {STATUS_TABS.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusTab(tab.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  statusTab === tab.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
                <span className={cn(
                  "ml-1.5 text-xs",
                  statusTab === tab.key ? "text-background/70" : "text-muted-foreground"
                )}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* Active filters bar */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-xl">
              <span className="text-xs font-medium text-muted-foreground">Aktyvūs filtrai:</span>
              <div className="flex items-center gap-2 flex-wrap flex-1">
                {activeFilters.map(f => (
                  <span
                    key={f.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-card border border-border rounded-lg text-xs font-medium text-foreground"
                  >
                    {f.label}
                    <button
                      type="button"
                      onClick={() => removeFilter(f.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-primary font-medium hover:underline"
              >
                Išvalyti viską
              </button>
            </div>
          )}

          {/* Main content */}
          <div className="flex gap-6">
            {/* Cargo list */}
            <div className="flex-1 min-w-0 space-y-3">
              {filteredCargo.length > 0 ? (
                filteredCargo.map(cargo => (
                  <Link
                    key={cargo.id}
                    href={`/kroviniai/${cargo.id}`}
                    className="block cursor-pointer"
                  >
                    <CargoCard {...cargo} />
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Krovinių nerasta</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Pabandykite pakeisti filtrus arba paieškos kriterijus
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Išvalyti filtrus
                  </button>
                </div>
              )}
            </div>

            {/* Filters sidebar - desktop */}
            {showFilters && (
              <aside className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-6">
                  <FilterPanel />
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filters modal */}
      {mobileFilters && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setMobileFilters(false)}
          />
          <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-hidden">
            <FilterPanel isModal onClose={() => setMobileFilters(false)} />
          </div>
        </>
      )}
    </div>
  )
}
