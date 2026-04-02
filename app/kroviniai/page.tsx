"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, Bookmark, Search, SlidersHorizontal, X, MapPin } from "lucide-react"
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
    date: "balandžio 2 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "11.8 t"],
    views: 12,
    description: "Greitai reikalingas pervežimas",
  },
  {
    id: "2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Šiauliai", country: "LT" },
    distance: 142,
    price: 980,
    priceNegotiable: false,
    weight: 10,
    date: "kovo 30 d.",
    status: "active" as const,
    tags: ["Šaldomas", "Refrižeratorius", "10 t"],
    views: 8,
    description: "Temperatūrinis režimas būtinas",
  },
  {
    id: "3",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Kaunas", country: "LT" },
    distance: 213,
    price: 1490,
    priceNegotiable: true,
    weight: 16,
    date: "kovo 31 d.",
    status: "negotiable" as const,
    tags: ["Bendras", "Mega priekaba", "16 t"],
    views: 5,
    description: "Pilnas krovinys į Kauno sandėlį",
  },
  {
    id: "4",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Marijampolė", country: "LT" },
    distance: 162,
    price: null,
    priceNegotiable: true,
    weight: 15,
    date: "kovo 31 d.",
    status: "negotiable" as const,
    tags: ["Negabaritinis", "Platforma", "15 t"],
    views: 3,
    description: "Specialus krovinys",
  },
  {
    id: "5",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Alytus", country: "LT" },
    distance: 123,
    price: 430,
    priceNegotiable: false,
    weight: 2.8,
    date: "balandžio 1 d.",
    status: "active" as const,
    tags: ["Bendras", "Tentinė", "2.8 t"],
    views: 7,
  },
  {
    id: "6",
    from: { city: "Utena", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 331.1,
    price: 1040,
    priceNegotiable: true,
    weight: 7.6,
    date: "balandžio 2 d.",
    status: "active" as const,
    tags: ["Bendroji", "Tentinė", "7.6 t"],
    views: 3,
    description: "Vidutinio dydzio krovinys i uosta.",
  },
]

const filterTabs = [
  { id: "saved", label: "Išsaugoti", icon: Bookmark },
  { id: "published", label: "Paskelbti" },
  { id: "all", label: "Visi" },
]

const searchSuggestions = [
  { city: "Vilnius", country: "LT" },
  { city: "Kaunas", country: "LT" },
  { city: "Klaipėda", country: "LT" },
  { city: "Šiauliai", country: "LT" },
  { city: "Panevėžys", country: "LT" },
  { city: "Alytus", country: "LT" },
  { city: "Marijampolė", country: "LT" },
  { city: "Utena", country: "LT" },
]

export default function KroviniaiPage() {
  const [activeTab, setActiveTab] = useState("published")
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const filteredSuggestions = searchSuggestions.filter(s => 
    s.city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Kroviniai</h1>
              <p className="text-sm text-muted-foreground mt-1">{mockCargos.length} krovinių rasta</p>
            </div>
            <button className="relative p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </button>
          </div>

          {/* Search Bar with dropdown results */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative" ref={searchRef}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearchResults(true)
                }}
                onFocus={() => setShowSearchResults(true)}
                placeholder="Ieškoti pagal kilmės miestą..."
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-2xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl shadow-black/20 overflow-hidden z-50">
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Miestai
                    </p>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((suggestion) => (
                        <button
                          key={suggestion.city}
                          onClick={() => {
                            setSearchQuery(suggestion.city)
                            setShowSearchResults(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{suggestion.city}</p>
                            <p className="text-xs text-muted-foreground">{suggestion.country === "LT" ? "Lietuva" : suggestion.country}</p>
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
            {/* Mobile filter button */}
            <button 
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden p-3.5 bg-card border border-border rounded-2xl hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
            {/* Desktop filter toggle */}
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "hidden lg:flex items-center gap-2 px-4 py-3.5 border rounded-2xl transition-colors",
                showFilters 
                  ? "bg-primary/10 border-primary/30 text-primary" 
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-sm font-medium">Filtrai</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card border border-border text-foreground hover:bg-muted"
                )}
              >
                {tab.icon && <tab.icon className="w-4 h-4" />}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex gap-6">
            {/* Cargo List - Single Column */}
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                {mockCargos.map((cargo) => (
                  <Link key={cargo.id} href={`/kroviniai/${cargo.id}`}>
                    <CargoCard {...cargo} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Filters - Desktop (collapsible on right) */}
            {showFilters && (
              <div className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-6">
                  <FilterPanel />
                </div>
              </div>
            )}
          </div>

          {/* Filters - Mobile Modal */}
          {showMobileFilters && (
            <>
              <div
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-hidden">
                <FilterPanel 
                  isModal 
                  onClose={() => setShowMobileFilters(false)} 
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
