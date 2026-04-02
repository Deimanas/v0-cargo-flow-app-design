"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, Bookmark, Search, SlidersHorizontal, TrendingUp, Package, Truck, Users } from "lucide-react"
import { useState } from "react"
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

const stats = [
  { label: "Aktyvūs kroviniai", value: "2,847", icon: Package, trend: "+12%" },
  { label: "Laisvas transportas", value: "1,234", icon: Truck, trend: "+8%" },
  { label: "Vežėjai", value: "856", icon: Users, trend: "+5%" },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("published")
  const [showFilters, setShowFilters] = useState(true)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Valdymo skydas</h1>
              <p className="text-sm text-muted-foreground mt-1">Sveiki sugrįžę, Deimanai</p>
            </div>
            <button className="relative p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl border border-border p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Recent Cargos Section */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Naujausi kroviniai</h2>
            <Link href="/kroviniai" className="text-sm text-primary hover:underline font-medium">
              Žiūrėti visus
            </Link>
          </div>

          {/* Search Bar with inline filter toggle */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ieškoti pagal kilmės miestą..."
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-2xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
              />
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
            {/* Cargo List */}
            <div className="flex-1 min-w-0">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
              <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-y-auto">
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
