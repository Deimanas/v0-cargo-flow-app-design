"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import Link from "next/link"
import {
  Package,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Eye,
  ArrowRight,
  Filter,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const FLAG_URLS: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  DE: "https://flagcdn.com/w40/de.png",
  PL: "https://flagcdn.com/w40/pl.png",
  LV: "https://flagcdn.com/w40/lv.png",
}

// Offer statuses
const OFFER_STATUSES = {
  pending: { label: "Laukia atsakymo", color: "bg-amber-100 text-amber-700", icon: Clock },
  accepted: { label: "Priimtas", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected: { label: "Atmestas", color: "bg-red-100 text-red-700", icon: XCircle },
  counter: { label: "Priešpasiūlymas", color: "bg-blue-100 text-blue-700", icon: TrendingUp },
}

// Mock offers data
const OFFERS_DATA = [
  {
    id: "1",
    type: "sent" as const,
    cargoId: "1",
    cargoRoute: { from: { city: "Vilnius", country: "LT" }, to: { city: "Berlin", country: "DE" } },
    cargoDescription: "Statybinės medžiagos, paletizuotas krovinys",
    originalPrice: 2450,
    offeredPrice: 2200,
    status: "pending" as const,
    createdAt: "prieš 2 val.",
    counterpart: { name: "UAB Transportas", avatar: null },
    messages: 0,
  },
  {
    id: "2",
    type: "received" as const,
    cargoId: "2",
    cargoRoute: { from: { city: "Kaunas", country: "LT" }, to: { city: "Warszawa", country: "PL" } },
    cargoDescription: "Maisto produktai, temperatūra -18°C",
    originalPrice: 890,
    offeredPrice: 950,
    status: "counter" as const,
    createdAt: "prieš 5 val.",
    counterpart: { name: "Jonas Jonaitis", avatar: null },
    messages: 3,
    counterOffer: 920,
  },
  {
    id: "3",
    type: "sent" as const,
    cargoId: "3",
    cargoRoute: { from: { city: "Klaipėda", country: "LT" }, to: { city: "Rīga", country: "LV" } },
    cargoDescription: "Baldai, aukštis 3.2m",
    originalPrice: null,
    offeredPrice: 580,
    status: "accepted" as const,
    createdAt: "prieš 1 d.",
    counterpart: { name: "Baldų fabrikas", avatar: null },
    messages: 5,
  },
  {
    id: "4",
    type: "received" as const,
    cargoId: "4",
    cargoRoute: { from: { city: "Panevėžys", country: "LT" }, to: { city: "Berlin", country: "DE" } },
    cargoDescription: "Chemikalai, ADR 3 klasė",
    originalPrice: 1200,
    offeredPrice: 1100,
    status: "rejected" as const,
    createdAt: "prieš 2 d.",
    counterpart: { name: "Chemijos įmonė", avatar: null },
    messages: 2,
  },
]

const TABS = [
  { key: "all", label: "Visi", count: OFFERS_DATA.length },
  { key: "sent", label: "Išsiųsti", count: OFFERS_DATA.filter(o => o.type === "sent").length },
  { key: "received", label: "Gauti", count: OFFERS_DATA.filter(o => o.type === "received").length },
  { key: "pending", label: "Laukiantys", count: OFFERS_DATA.filter(o => o.status === "pending" || o.status === "counter").length },
]

function CountryFlag({ code }: { code: string }) {
  const url = FLAG_URLS[code]
  if (!url) return <span className="w-5 h-3.5 rounded-sm bg-slate-200" />
  return (
    <Image
      src={url}
      alt={code}
      width={20}
      height={14}
      className="rounded-sm object-cover w-auto h-auto"
      unoptimized
    />
  )
}

export default function PasiulymaiPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredOffers = OFFERS_DATA.filter(o => {
    if (activeTab === "all") return true
    if (activeTab === "sent") return o.type === "sent"
    if (activeTab === "received") return o.type === "received"
    if (activeTab === "pending") return o.status === "pending" || o.status === "counter"
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-5xl mx-auto">
          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Pasiūlymai</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Valdykite savo gautus ir išsiųstus kainos pasiūlymus
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Laukia atsakymo", value: 2, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Priimti šį mėnesį", value: 8, color: "text-emerald-600", bg: "bg-emerald-50" },
              { label: "Atmesti", value: 3, color: "text-red-600", bg: "bg-red-50" },
              { label: "Sėkmės rodiklis", value: "72%", color: "text-primary", bg: "bg-primary/10" },
            ].map(stat => (
              <div key={stat.label} className={cn("p-4 rounded-xl", stat.bg)}>
                <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {TABS.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                  activeTab === tab.key
                    ? "bg-foreground text-background border-foreground"
                    : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {tab.label}
                <span className={cn(
                  "ml-1.5 text-xs",
                  activeTab === tab.key ? "text-background/70" : "text-muted-foreground"
                )}>
                  ({tab.count})
                </span>
              </button>
            ))}
          </div>

          {/* Offers list */}
          <div className="space-y-3">
            {filteredOffers.map(offer => {
              const statusConfig = OFFER_STATUSES[offer.status]
              const StatusIcon = statusConfig.icon

              return (
                <Link
                  key={offer.id}
                  href={`/kroviniai/${offer.cargoId}`}
                  className="block bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left: Route and info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-semibold uppercase",
                          offer.type === "sent" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                        )}>
                          {offer.type === "sent" ? "Išsiųstas" : "Gautas"}
                        </span>
                        <span className={cn(
                          "flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold",
                          statusConfig.color
                        )}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </span>
                        <span className="text-xs text-muted-foreground">{offer.createdAt}</span>
                      </div>

                      {/* Route */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <CountryFlag code={offer.cargoRoute.from.country} />
                          <span className="font-semibold text-foreground">{offer.cargoRoute.from.city}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <div className="flex items-center gap-1.5">
                          <CountryFlag code={offer.cargoRoute.to.country} />
                          <span className="font-semibold text-foreground">{offer.cargoRoute.to.city}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground truncate">{offer.cargoDescription}</p>

                      {/* Counterpart */}
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-primary">
                            {offer.counterpart.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{offer.counterpart.name}</span>
                        {offer.messages > 0 && (
                          <span className="flex items-center gap-1 text-xs text-primary">
                            <MessageCircle className="w-3 h-3" />
                            {offer.messages}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Prices */}
                    <div className="text-right shrink-0">
                      {offer.originalPrice && (
                        <p className="text-xs text-muted-foreground line-through">
                          {offer.originalPrice.toLocaleString()} EUR
                        </p>
                      )}
                      <p className="text-lg font-bold text-foreground">
                        {offer.offeredPrice.toLocaleString()} EUR
                      </p>
                      {offer.counterOffer && (
                        <p className="text-xs text-primary font-medium flex items-center justify-end gap-1">
                          <TrendingDown className="w-3 h-3" />
                          Priešpasiūlymas: {offer.counterOffer} EUR
                        </p>
                      )}

                      {/* Actions */}
                      {(offer.status === "pending" || offer.status === "counter") && offer.type === "received" && (
                        <div className="flex items-center gap-2 mt-3 justify-end">
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation() }}
                            className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors"
                          >
                            Priimti
                          </button>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation() }}
                            className="px-3 py-1.5 bg-muted text-foreground rounded-lg text-xs font-medium hover:bg-muted/80 transition-colors"
                          >
                            Siūlyti kitą
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}

            {filteredOffers.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Pasiūlymų nerasta</h3>
                <p className="text-sm text-muted-foreground">
                  Šiuo metu neturite jokių pasiūlymų šioje kategorijoje
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
