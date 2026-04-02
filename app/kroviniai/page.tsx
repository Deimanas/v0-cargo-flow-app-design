"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, Bookmark, Search, SlidersHorizontal, X, MapPin, Plus } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mockCargos = [
  {
    id: "1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 307,
    price: 1320,
    priceNegotiable: false,
    weight: 11.8,
    date: "bal. 2 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "11.8 t"],
    views: 12,
    description: "Greitai reikalingas pervežimas",
    contact: { name: "UAB Greitas", phone: "+37060011111", email: "info@greitas.lt" },
  },
  {
    id: "2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Šiauliai", country: "LT" },
    distance: 142,
    price: 980,
    priceNegotiable: false,
    weight: 10,
    date: "kov. 30 d.",
    status: "active" as const,
    tags: ["Šaldomas", "Refrižeratorius", "10 t"],
    views: 8,
    description: "Temperatūrinis režimas būtinas",
    contact: { name: "Jonas Jonaitis", phone: "+37062500000" },
  },
  {
    id: "3",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Kaunas", country: "LT" },
    distance: 213,
    price: 1490,
    priceNegotiable: true,
    weight: 16,
    date: "kov. 31 d.",
    status: "negotiable" as const,
    tags: ["Bendras", "Mega priekaba", "16 t"],
    views: 5,
    description: "Pilnas krovinys į Kauno sandėlį",
    contact: { name: "UAB Sandėlis", phone: "+37062650778", email: "sandėlis@lt.lt" },
  },
  {
    id: "4",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Marijampolė", country: "LT" },
    distance: 162,
    price: null,
    priceNegotiable: true,
    weight: 15,
    date: "kov. 31 d.",
    status: "negotiable" as const,
    tags: ["Negabaritinis", "Platforma", "15 t"],
    views: 3,
    description: "Specialus krovinys",
    contact: { name: "Petras P.", phone: "+37065000001" },
  },
  {
    id: "5",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Alytus", country: "LT" },
    distance: 123,
    price: 430,
    priceNegotiable: false,
    weight: 2.8,
    date: "bal. 1 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "2.8 t"],
    views: 7,
    contact: { name: "UAB Ekspres", phone: "+37061234567" },
  },
  {
    id: "6",
    from: { city: "Utena", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 331,
    price: 1040,
    priceNegotiable: true,
    weight: 7.6,
    date: "bal. 2 d.",
    status: "active" as const,
    tags: ["Bendroji", "Tentinė", "7.6 t"],
    views: 3,
    description: "Vidutinio dydžio krovinys į uostą.",
    contact: { name: "UAB Cargo", phone: "+37062650778", email: "cargo@lt.lt" },
  },
]

const FILTER_TABS = [
  { id: "saved_sf1", label: "LT → DE",    isSaved: true },
  { id: "saved_sf2", label: "Šaldomieji", isSaved: true },
  { id: "published", label: "Paskelbti" },
  { id: "all",       label: "Visi" },
]

const SEARCH_SUGGESTIONS = [
  { city: "Vilnius",      country: "LT" },
  { city: "Kaunas",       country: "LT" },
  { city: "Klaipėda",    country: "LT" },
  { city: "Šiauliai",    country: "LT" },
  { city: "Panevėžys",  country: "LT" },
  { city: "Alytus",       country: "LT" },
  { city: "Marijampolė", country: "LT" },
  { city: "Utena",        country: "LT" },
]

export default function KroviniaiPage() {
  const [activeTab, setActiveTab] = useState("published")
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filtered = SEARCH_SUGGESTIONS.filter(s =>
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setShowSuggestions(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">

          {/* Page header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Kroviniai</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{mockCargos.length} krovinių rasta</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/kroviniai/naujas"
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Naujas krovinys</span>
              </Link>
              <button className="relative p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center font-bold leading-none">5</span>
              </button>
            </div>
          </div>

          {/* Search + filter toggle */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Ieškoti pagal kilmės miestą…"
                className="w-full pl-9 pr-9 py-2.5 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setShowSuggestions(false) }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {showSuggestions && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-lg shadow-black/10 overflow-hidden z-50">
                  <div className="p-1.5">
                    {filtered.length > 0 ? filtered.map(s => (
                      <button
                        key={s.city}
                        onClick={() => { setSearchQuery(s.city); setShowSuggestions(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{s.city}</p>
                          <p className="text-xs text-muted-foreground">Lietuva</p>
                        </div>
                      </button>
                    )) : (
                      <p className="px-3 py-3 text-sm text-muted-foreground text-center">Nieko nerasta</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile filter */}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden p-2.5 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Desktop filter toggle */}
            <button
              onClick={() => setShowFilters(f => !f)}
              className={cn(
                "hidden lg:flex items-center gap-1.5 px-3 py-2.5 border rounded-lg text-sm font-medium transition-colors",
                showFilters
                  ? "bg-primary/8 border-primary/25 text-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {FILTER_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : tab.isSaved
                    ? "bg-card border-dashed border-primary/40 text-primary hover:bg-primary/5"
                    : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.isSaved && (
                  <Bookmark className={cn("w-3 h-3", activeTab === tab.id && "fill-current")} />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Table header */}
          <div className="hidden md:flex items-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 pb-2 border-b border-border mb-1">
            <span className="flex-1">Maršrutas</span>
            <span className="hidden sm:block w-[110px] shrink-0">Tipas</span>
            <span className="hidden md:block w-[230px] shrink-0">Svoris / Km / Data</span>
            <span className="hidden lg:block w-[200px] shrink-0">Kontaktas</span>
            <span className="w-[160px] shrink-0 text-right">Statusas / Kaina</span>
            <span className="w-[52px] shrink-0" />
          </div>

          {/* Cargo list */}
          <div className="flex gap-5">
            <div className="flex-1 min-w-0 space-y-1.5">
              {mockCargos.map(cargo => (
                <Link key={cargo.id} href={`/kroviniai/${cargo.id}`} className="block">
                  <CargoCard {...cargo} />
                </Link>
              ))}
            </div>

            {/* Desktop filter panel */}
            {showFilters && (
              <div className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-4">
                  <FilterPanel />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter modal */}
      {showMobileFilters && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
          <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-hidden">
            <FilterPanel isModal onClose={() => setShowMobileFilters(false)} />
          </div>
        </>
      )}
    </div>
  )
}
