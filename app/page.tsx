"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard, type CargoCardProps } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import {
  Bell, Bookmark, Search, SlidersHorizontal,
  TrendingUp, Package, Truck, Users, Plus, ArrowUpRight,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

/* ─────────────────────────────────────────────────────────────
   MOCK DATA - Updated for new CargoCard interface
───────────────────────────────────────────────────────────── */
const DASHBOARD_CARGOS: (Omit<CargoCardProps, "id"> & { id: string })[] = [
  {
    id: "1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 307,
    price: 1320,
    weight: 11.8,
    loadingDate: "2024-04-02",
    loadingTime: "08:00 - 12:00",
    status: "published",
    cargoType: "Bendras krovinys",
    transportType: "Tentinė",
    views: 12,
    description: "Greitai reikalingas pervežimas",
    postedAt: "prieš 2 val.",
    matchingTransports: 2,
  },
  {
    id: "2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Šiauliai", country: "LT" },
    distance: 142,
    price: 980,
    weight: 10,
    loadingDate: "2024-03-30",
    status: "published",
    cargoType: "Šaldomas",
    transportType: "Refrižeratorius",
    views: 8,
    description: "Temperatūrinis režimas būtinas",
    postedAt: "prieš 5 val.",
  },
  {
    id: "6",
    from: { city: "Utena", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    distance: 331,
    price: 1040,
    weight: 7.6,
    loadingDate: "2024-04-02",
    status: "published",
    cargoType: "Bendras krovinys",
    transportType: "Tentinė",
    views: 3,
    description: "Vidutinio dydžio krovinys į uostą.",
    postedAt: "prieš 1 d.",
    matchingTransports: 1,
  },
]

const DASHBOARD_STATS = [
  { label: "Aktyvūs kroviniai",  value: "2 847", icon: Package, trend: "+12%", color: "text-primary",  bg: "bg-primary/8" },
  { label: "Laisvas transportas", value: "1 234", icon: Truck,   trend: "+8%",  color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Vežėjai šiandien",    value: "856",   icon: Users,   trend: "+5%",  color: "text-violet-600",  bg: "bg-violet-50" },
]

const DASHBOARD_TABS = [
  { id: "saved", label: "Išsaugoti", icon: Bookmark },
  { id: "published", label: "Paskelbti" },
  { id: "all", label: "Visi" },
]

/* ─────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────── */
export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("published")
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  function handleCargoClick(cargoId: string) {
    router.push(`/kroviniai/${cargoId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">

          {/* Header */}
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Valdymo skydas</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Sveiki sugrįžę, Deimanai</p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/transportas"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Siūlyti transportą
              </Link>
              <button className="relative p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center font-bold leading-none">5</span>
              </button>
            </div>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {DASHBOARD_STATS.map(stat => (
              <div key={stat.label} className="bg-card rounded-xl border border-border p-4 flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-2xl font-bold text-foreground leading-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {stat.trend}
                </span>
              </div>
            ))}
          </div>

          {/* Section title */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Naujausi kroviniai</h2>
            <Link href="/kroviniai" className="flex items-center gap-1 text-xs text-primary hover:underline font-medium">
              Žiūrėti visus <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ieškoti pagal kilmės miestą…"
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden p-2.5 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
            <button
              type="button"
              onClick={() => setFiltersVisible(v => !v)}
              className={cn(
                "hidden lg:flex items-center gap-1.5 px-3 py-2.5 border rounded-lg text-sm font-medium transition-colors",
                filtersVisible
                  ? "bg-primary/8 border-primary/25 text-primary"
                  : "bg-card border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtrai
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1.5 mb-4">
            {DASHBOARD_TABS.map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.icon && <tab.icon className={cn("w-3 h-3", activeTab === tab.id && "fill-current")} />}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex gap-5">
            <div className="flex-1 min-w-0 space-y-3">
              {DASHBOARD_CARGOS.map(cargo => (
                <div
                  key={cargo.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleCargoClick(cargo.id)}
                  onKeyDown={e => e.key === "Enter" && handleCargoClick(cargo.id)}
                  className="cursor-pointer"
                >
                  <CargoCard {...cargo} />
                </div>
              ))}
            </div>

            {filtersVisible && (
              <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-4">
                  <FilterPanel />
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      {mobileFiltersOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-hidden">
            <FilterPanel isModal onClose={() => setMobileFiltersOpen(false)} />
          </div>
        </>
      )}
    </div>
  )
}
