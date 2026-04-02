"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoCard } from "@/components/cargo-card"
import { FilterPanel } from "@/components/filter-panel"
import { Bell, Bookmark, Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const mockCargos = [
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
    tags: ["Bendroji", "Tentinė"],
    views: 3,
    description: "Vidutinio dydzio krovinys i uosta.",
  },
]

const filterTabs = [
  { id: "saved", label: "Išsaugoti", icon: Bookmark },
  { id: "published", label: "Paskelbti" },
  { id: "all", label: "Visi" },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("published")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">Kroviniai</h1>
            <button className="relative p-2.5 bg-card border border-border rounded-xl hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center font-medium">
                5
              </span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Ieškoti pagal kilmės miestą..."
                className="w-full pl-12 pr-4 py-3.5 bg-card border border-border rounded-2xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button 
              onClick={() => setShowFilters(true)}
              className="p-3.5 bg-card border border-border rounded-2xl hover:bg-muted transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 mb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
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
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-80 shrink-0">
              <FilterPanel />
            </div>

            {/* Filters - Mobile Modal */}
            {showFilters && (
              <>
                <div
                  className="lg:hidden fixed inset-0 bg-black/50 z-40"
                  onClick={() => setShowFilters(false)}
                />
                <div className="lg:hidden fixed inset-0 bg-card z-50 overflow-y-auto">
                  <FilterPanel 
                    isModal 
                    onClose={() => setShowFilters(false)} 
                  />
                </div>
              </>
            )}

            {/* Cargo List */}
            <div className="flex-1">
              <div className="space-y-4">
                {mockCargos.map((cargo) => (
                  <Link key={cargo.id} href={`/kroviniai/${cargo.id}`}>
                    <CargoCard {...cargo} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
