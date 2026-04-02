"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, Bookmark, Search, SlidersHorizontal, X, MapPin, Plus } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const CARGO_DATA = [
  {
    id: "1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 307,
    price: 1320,
    weight: 11.8,
    date: "bal. 2 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė"],
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
    weight: 10,
    date: "kov. 30 d.",
    status: "active" as const,
    tags: ["Šaldomas", "Refrižeratorius"],
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
    weight: 16,
    date: "kov. 31 d.",
    status: "negotiable" as const,
    tags: ["Bendras", "Mega priekaba"],
    views: 5,
    description: "Pilnas krovinys į Kauno sandėlį",
    contact: { name: "UAB Sandėlis", phone: "+37062650778", email: "sandelis@lt.lt" },
  },
  {
    id: "4",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Marijampolė", country: "LT" },
    distance: 162,
    price: null,
    weight: 15,
    date: "kov. 31 d.",
    status: "negotiable" as const,
    tags: ["Negabaritinis", "Platforma"],
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
    weight: 2.8,
    date: "bal. 1 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė"],
    views: 7,
    contact: { name: "UAB Ekspres", phone: "+37061234567" },
  },
]

const TAB_LIST = [
  { key: "saved_sf1", text: "LT → DE", saved: true },
  { key: "saved_sf2", text: "Šaldomieji", saved: true },
  { key: "published", text: "Paskelbti" },
  { key: "all", text: "Visi" },
]

const CITY_LIST = [
  { city: "Vilnius", country: "LT" },
  { city: "Kaunas", country: "LT" },
  { city: "Klaipėda", country: "LT" },
  { city: "Šiauliai", country: "LT" },
  { city: "Panevėžys", country: "LT" },
]

export default function KroviniaiPage() {
  const router = useRouter()
  const [tab, setTab] = useState("published")
  const [showFilters, setShowFilters] = useState(true)
  const [mobileFilters, setMobileFilters] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [suggestions, setSuggestions] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  const matches = CITY_LIST.filter(c => c.city.toLowerCase().includes(searchText.toLowerCase()))

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setSuggestions(false)
      }
    }
    document.addEventListener("mousedown", clickOutside)
    return () => document.removeEventListener("mousedown", clickOutside)
  }, [])

  function goToCargo(id: string) {
    router.push(`/kroviniai/${id}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Kroviniai</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{CARGO_DATA.length} krovinių rasta</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.push("/kroviniai/naujas")}
                className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Naujas krovinys</span>
              </button>
              <button type="button" className="relative p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center font-bold">5</span>
              </button>
            </div>
          </header>

          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative" ref={boxRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
              <input
                type="text"
                value={searchText}
                onChange={e => { setSearchText(e.target.value); setSuggestions(true) }}
                onFocus={() => setSuggestions(true)}
                placeholder="Ieškoti pagal kilmės miestą…"
                className="w-full pl-9 pr-9 py-2.5 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              />
              {searchText && (
                <button type="button" onClick={() => { setSearchText(""); setSuggestions(false) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              {suggestions && searchText && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <div className="p-1.5">
                    {matches.length > 0 ? matches.map(c => (
                      <button
                        key={c.city}
                        type="button"
                        onClick={() => { setSearchText(c.city); setSuggestions(false) }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{c.city}</p>
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

            <button type="button" onClick={() => setMobileFilters(true)} className="lg:hidden p-2.5 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>

            <button
              type="button"
              onClick={() => setShowFilters(v => !v)}
              className={cn(
                "hidden lg:flex items-center gap-1.5 px-3 py-2.5 border rounded-lg text-sm font-medium transition-colors",
                showFilters ? "bg-primary/8 border-primary/25 text-primary" : "bg-card border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
            </button>
          </div>

          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            {TAB_LIST.map(t => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  tab === t.key
                    ? "bg-primary text-primary-foreground border-primary"
                    : t.saved
                    ? "bg-card border-dashed border-primary/40 text-primary hover:bg-primary/5"
                    : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t.saved && <Bookmark className={cn("w-3 h-3", tab === t.key && "fill-current")} />}
                {t.text}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-5 pb-2 border-b border-border mb-1">
            <span className="flex-1">Maršrutas</span>
            <span className="hidden sm:block w-28 shrink-0">Tipas</span>
            <span className="hidden md:block w-56 shrink-0">Svoris / Km / Data</span>
            <span className="hidden lg:block w-48 shrink-0">Kontaktas</span>
            <span className="w-40 shrink-0 text-right">Statusas / Kaina</span>
            <span className="w-14 shrink-0" />
          </div>

          <div className="flex gap-5">
            <div className="flex-1 min-w-0 space-y-1.5">
              {CARGO_DATA.map(cargo => (
                <div
                  key={cargo.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => goToCargo(cargo.id)}
                  onKeyDown={e => e.key === "Enter" && goToCargo(cargo.id)}
                  className="cursor-pointer"
                >
                  <CargoCard {...cargo} />
                </div>
              ))}
            </div>

            {showFilters && (
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-4">
                  <FilterPanel />
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      {mobileFilters && (
        <>
          <div className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setMobileFilters(false)} />
          <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-hidden">
            <FilterPanel isModal onClose={() => setMobileFilters(false)} />
          </div>
        </>
      )}
    </div>
  )
}
