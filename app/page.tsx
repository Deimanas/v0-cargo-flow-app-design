"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  Truck,
  Bell,
  ChevronRight,
  Clock,
  CheckCircle2,
  Package,
  MapPin,
  ArrowRight,
  Star,
  TrendingUp,
  Calendar,
  Euro,
  Eye,
  Users,
  BarChart3,
  AlertCircle,
  FileText,
  Building2,
  Route,
  Snowflake,
  Box,
  Timer,
  CircleCheck,
  CircleDashed,
  Loader2,
  Award,
  Target,
  Zap,
  TrendingDown,
  Percent,
  Activity,
  Shield,
  ThumbsUp,
  RefreshCw,
} from "lucide-react"

// Flag URLs
const FLAGS: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  DE: "https://flagcdn.com/w40/de.png",
  PL: "https://flagcdn.com/w40/pl.png",
  LV: "https://flagcdn.com/w40/lv.png",
  NL: "https://flagcdn.com/w40/nl.png",
  FR: "https://flagcdn.com/w40/fr.png",
  BE: "https://flagcdn.com/w40/be.png",
  CZ: "https://flagcdn.com/w40/cz.png",
  AT: "https://flagcdn.com/w40/at.png",
}

// Company info
const COMPANY_INFO = {
  name: "UAB Logistika Pro",
  rating: 4.8,
  reviewCount: 156,
  verified: true,
  memberSince: "2019",
  completedDeals: 847,
  onTimeDelivery: 98.2,
  responseRate: 94,
  avgResponseTime: "15 min",
}

// Tasks for carrier (vežėjas)
const TASKS_CARRIER = [
  {
    id: "t1",
    type: "confirm",
    priority: "high",
    title: "Patvirtink pristatymą",
    description: "Vilnius → Klaipėda, krovinys pristatytas",
    time: "Prieš 2 val.",
    link: "/kroviniai/1",
  },
  {
    id: "t2",
    type: "offer",
    priority: "high",
    title: "Jūsų pasiūlymas priimtas",
    description: "Kaunas → Berlin, 1 280 EUR",
    time: "Prieš 30 min.",
    link: "/pasiulymai",
  },
  {
    id: "t3",
    type: "expiring",
    priority: "medium",
    title: "Transportas be krovinių",
    description: "Vilnius → Warsaw, balandžio 5 d.",
    time: "Liko 2 d.",
    link: "/transportas/1",
  },
]

// Tasks for shipper (siuntėjas)
const TASKS_SHIPPER = [
  {
    id: "t1",
    type: "offer",
    priority: "high",
    title: "3 nauji pasiūlymai",
    description: "Kaunas → Berlin kroviniui",
    time: "Prieš 15 min.",
    link: "/pasiulymai",
  },
  {
    id: "t2",
    type: "confirm",
    priority: "high",
    title: "Patvirtink vežėją",
    description: "UAB Greitas siūlo 1 180 EUR",
    time: "Prieš 1 val.",
    link: "/pasiulymai",
  },
  {
    id: "t3",
    type: "delivery",
    priority: "high",
    title: "Krovinys pristatytas",
    description: "Vilnius → Klaipėda, laukia patvirtinimo",
    time: "Prieš 2 val.",
    link: "/kroviniai/1",
  },
  {
    id: "t4",
    type: "expiring",
    priority: "low",
    title: "Krovinys baigia galioti",
    description: "Panevėžys → Marijampolė, liko 1 diena",
    time: "Rytoj",
    link: "/kroviniai/4",
  },
]

// Available CARGOS for carrier to browse
const AVAILABLE_CARGOS = [
  {
    id: "c1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Munich", country: "DE" },
    weight: 14.5,
    price: 1850,
    date: "Balandžio 5 d.",
    cargoType: "Paletės",
    company: "UAB Siuntos",
    rating: 4.8,
    distance: 1240,
    matchReason: "Atitinka maršrutą",
    urgent: false,
    views: 34,
  },
  {
    id: "c2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Hamburg", country: "DE" },
    weight: 8.2,
    price: 1620,
    date: "Balandžio 6 d.",
    cargoType: "Bendras",
    company: "Logistika UAB",
    rating: 4.5,
    distance: 1180,
    matchReason: "Tinkamas transportas",
    urgent: true,
    views: 67,
  },
  {
    id: "c3",
    from: { city: "Šiauliai", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    weight: 12.0,
    price: 1450,
    date: "Balandžio 5 d.",
    cargoType: "Paletės",
    company: "Express LT",
    rating: 4.9,
    distance: 980,
    matchReason: "Atitinka maršrutą",
    urgent: false,
    views: 23,
  },
  {
    id: "c4",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Prague", country: "CZ" },
    weight: 18.0,
    price: 1680,
    date: "Balandžio 7 d.",
    cargoType: "Mašinos",
    company: "AutoParts LT",
    rating: 4.7,
    distance: 1050,
    matchReason: "Pilnas pakrovimas",
    urgent: false,
    views: 19,
  },
  {
    id: "c5",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Vienna", country: "AT" },
    weight: 6.5,
    price: 1380,
    date: "Balandžio 8 d.",
    cargoType: "Šaldomas",
    company: "FreshFood",
    rating: 4.6,
    distance: 1150,
    matchReason: "Refrižeratorius",
    urgent: true,
    views: 45,
  },
]

// Available TRANSPORT for shipper to browse
const AVAILABLE_TRANSPORT = [
  {
    id: "tr1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    type: "Tentinė",
    capacity: 24,
    date: "Balandžio 5 d.",
    pricePerKm: 1.2,
    company: "UAB Greitas",
    rating: 4.9,
    completedJobs: 156,
    responseTime: "10 min",
    matchReason: "Geriausias įvertinimas",
    available: true,
  },
  {
    id: "tr2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Hamburg", country: "DE" },
    type: "Tentinė",
    capacity: 22,
    date: "Balandžio 5 d.",
    pricePerKm: 1.1,
    company: "TransBaltic",
    rating: 4.7,
    completedJobs: 89,
    responseTime: "25 min",
    matchReason: "Geriausia kaina",
    available: true,
  },
  {
    id: "tr3",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Warsaw", country: "PL" },
    type: "Refrižeratorius",
    capacity: 20,
    date: "Balandžio 6 d.",
    pricePerKm: 1.35,
    company: "CoolTrans",
    rating: 4.8,
    completedJobs: 234,
    responseTime: "15 min",
    matchReason: "Šaldomas transportas",
    available: true,
  },
  {
    id: "tr4",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Amsterdam", country: "NL" },
    type: "Tentinė",
    capacity: 24,
    date: "Balandžio 7 d.",
    pricePerKm: 1.15,
    company: "SeaRoute",
    rating: 4.6,
    completedJobs: 67,
    responseTime: "30 min",
    matchReason: "Tiesus maršrutas",
    available: true,
  },
  {
    id: "tr5",
    from: { city: "Šiauliai", country: "LT" },
    to: { city: "Frankfurt", country: "DE" },
    type: "Tentinė",
    capacity: 24,
    date: "Balandžio 8 d.",
    pricePerKm: 1.18,
    company: "NordTrans",
    rating: 4.5,
    completedJobs: 112,
    responseTime: "20 min",
    matchReason: "Patikimas vežėjas",
    available: false,
  },
]

// Stats for shipper
const SHIPPER_STATS = {
  activeCargos: 4,
  pendingOffers: 7,
  inTransit: 2,
  delivered: 12,
  monthlySpend: 8450,
  avgPrice: 1.18,
  savedMoney: 1240,
}

// Stats for carrier  
const CARRIER_STATS = {
  activeRoutes: 3,
  matchingCargos: 24,
  inProgress: 2,
  completed: 47,
  monthlyEarnings: 12680,
  avgRating: 4.8,
  acceptanceRate: 78,
}

// Market trends
const MARKET_TRENDS = {
  avgPriceChange: +3.2,
  demandLevel: "high",
  popularRoutes: ["LT → DE", "LT → PL", "LT → NL"],
  avgDeliveryTime: 2.4,
}

function Flag({ code }: { code: string }) {
  const url = FLAGS[code]
  if (!url) return <span className="w-5 h-3.5 rounded-sm bg-muted inline-block" />
  return <Image src={url} alt={code} width={20} height={14} className="rounded-sm w-auto h-auto" unoptimized loading="eager" />
}

const TASK_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  confirm: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
  offer: { icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
  expiring: { icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  delivery: { icon: Package, color: "text-emerald-600", bg: "bg-emerald-50" },
}

const CARGO_TYPE_ICONS: Record<string, typeof Box> = {
  "Paletės": Box,
  "Bendras": Package,
  "ADR": AlertCircle,
  "Šaldomas": Snowflake,
  "Mašinos": Truck,
}

const TRANSPORT_TYPE_ICONS: Record<string, typeof Truck> = {
  "Tentinė": Truck,
  "Refrižeratorius": Snowflake,
}

export default function DashboardPage() {
  // User type: "carrier" = vežėjas (sees available cargos), "shipper" = siuntėjas (sees available transport)
  const [userType, setUserType] = useState<"carrier" | "shipper">("carrier")
  const unreadNotifications = 5

  const tasks = userType === "carrier" ? TASKS_CARRIER : TASKS_SHIPPER

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 lg:ml-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sveiki, Deimanai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {userType === "carrier" 
                  ? `${CARRIER_STATS.matchingCargos} kroviniai atitinka jūsų transportą`
                  : `${AVAILABLE_TRANSPORT.length} vežėjai atitinka jūsų maršrutus`
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* User type toggle */}
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setUserType("carrier")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                    userType === "carrier"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Truck className="w-4 h-4" />
                  Vežėjas
                </button>
                <button
                  onClick={() => setUserType("shipper")}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all",
                    userType === "shipper"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Package className="w-4 h-4" />
                  Siuntėjas
                </button>
              </div>
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column - Main Content */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Quick Actions */}
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {userType === "carrier" ? (
                    <>
                      <Link
                        href="/kroviniai"
                        className="group flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <Search className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold">Rasti krovinį</p>
                          <p className="text-sm text-primary-foreground/70 truncate">{CARRIER_STATS.matchingCargos} atitinka</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                      <Link
                        href="/transportas"
                        className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Plus className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">Pridėti maršrutą</p>
                          <p className="text-sm text-muted-foreground truncate">Paskelbti transportą</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                      <Link
                        href="/pasiulymai"
                        className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">Mano pasiūlymai</p>
                          <p className="text-sm text-muted-foreground truncate">Išsiųsti pasiūlymai</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/kroviniai/naujas"
                        className="group flex items-center gap-4 p-4 bg-primary text-primary-foreground rounded-2xl hover:bg-primary/90 transition-all shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <Plus className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold">Naujas krovinys</p>
                          <p className="text-sm text-primary-foreground/70 truncate">Paskelbti krovinį</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                      <Link
                        href="/transportas"
                        className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Search className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">Rasti transportą</p>
                          <p className="text-sm text-muted-foreground truncate">{AVAILABLE_TRANSPORT.filter(t => t.available).length} laisvi vežėjai</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                      <Link
                        href="/pasiulymai"
                        className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                      >
                        <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <TrendingUp className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground">Gauti pasiūlymai</p>
                          <p className="text-sm text-muted-foreground truncate">{SHIPPER_STATS.pendingOffers} laukia</p>
                        </div>
                        <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform shrink-0" />
                      </Link>
                    </>
                  )}
                </div>
              </section>

              {/* Tasks / Attention Required */}
              {tasks.length > 0 && (
                <section className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                      Laukia dėmesio
                    </h2>
                    <span className="px-2.5 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
                      {tasks.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {tasks.map(task => {
                      const config = TASK_CONFIG[task.type] || TASK_CONFIG.confirm
                      const Icon = config.icon
                      return (
                        <Link
                          key={task.id}
                          href={task.link}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl transition-all hover:scale-[1.01]",
                            task.priority === "high" ? "bg-red-50/50 hover:bg-red-50" : "bg-muted/50 hover:bg-muted"
                          )}
                        >
                          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                            <Icon className={cn("w-5 h-5", config.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                            <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-xs text-muted-foreground">{task.time}</span>
                            {task.priority === "high" && (
                              <span className="block text-[10px] font-semibold text-red-600 mt-0.5">Skubu</span>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Main Browse Section - Carrier sees CARGOS, Shipper sees TRANSPORT */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="text-base font-semibold text-foreground">
                    {userType === "carrier" ? "Rekomenduojami kroviniai" : "Rekomenduojamas transportas"}
                  </h2>
                  <Link
                    href={userType === "carrier" ? "/kroviniai" : "/transportas"}
                    className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                  >
                    Žiūrėti visus
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                <div className="divide-y divide-border">
                  {userType === "carrier" ? (
                    // CARRIER sees available CARGOS
                    AVAILABLE_CARGOS.slice(0, 5).map(cargo => {
                      const TypeIcon = CARGO_TYPE_ICONS[cargo.cargoType] || Package
                      return (
                        <Link
                          key={cargo.id}
                          href={`/kroviniai/${cargo.id}`}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Flag code={cargo.from.country} />
                              <span className="text-sm font-medium text-foreground">{cargo.from.city}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Flag code={cargo.to.country} />
                              <span className="text-sm font-medium text-foreground">{cargo.to.city}</span>
                            </div>
                            {cargo.urgent && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-red-100 text-red-700 rounded ml-2">
                                SKUBU
                              </span>
                            )}
                          </div>
                          
                          <div className="hidden sm:flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TypeIcon className="w-3.5 h-3.5" />
                              <span>{cargo.cargoType}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {cargo.weight} t
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {cargo.distance} km
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {cargo.rating}
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-primary">{cargo.price} EUR</p>
                            <p className="text-[11px] text-muted-foreground">{cargo.date}</p>
                          </div>
                          
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      )
                    })
                  ) : (
                    // SHIPPER sees available TRANSPORT
                    AVAILABLE_TRANSPORT.slice(0, 5).map(transport => {
                      const TypeIcon = TRANSPORT_TYPE_ICONS[transport.type] || Truck
                      return (
                        <Link
                          key={transport.id}
                          href={`/transportas/${transport.id}`}
                          className={cn(
                            "flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors",
                            !transport.available && "opacity-60"
                          )}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Flag code={transport.from.country} />
                              <span className="text-sm font-medium text-foreground">{transport.from.city}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Flag code={transport.to.country} />
                              <span className="text-sm font-medium text-foreground">{transport.to.city}</span>
                            </div>
                            {!transport.available && (
                              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded ml-2">
                                UŽIMTAS
                              </span>
                            )}
                          </div>
                          
                          <div className="hidden sm:flex items-center gap-4 shrink-0">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <TypeIcon className="w-3.5 h-3.5" />
                              <span>{transport.type}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {transport.capacity} t
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {transport.rating}
                            </div>
                            <div className="text-xs text-emerald-600">
                              {transport.completedJobs} perv.
                            </div>
                          </div>
                          
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-primary">{transport.pricePerKm} EUR/km</p>
                            <p className="text-[11px] text-muted-foreground">{transport.date}</p>
                          </div>
                          
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </Link>
                      )
                    })
                  )}
                </div>
              </section>

            </div>

            {/* Right Column - Stats & Company */}
            <div className="space-y-6">
              
              {/* Personal Stats */}
              <section className="bg-card border border-border rounded-2xl p-5">
                <h2 className="text-base font-semibold text-foreground mb-4">
                  {userType === "carrier" ? "Mano statistika" : "Mano statistika"}
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {userType === "carrier" ? (
                    <>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Route className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-foreground">{CARRIER_STATS.activeRoutes}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Aktyvūs maršrutai</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-4 h-4 text-emerald-600" />
                          <span className="text-lg font-bold text-foreground">{CARRIER_STATS.matchingCargos}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Atitinka transport.</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          <span className="text-lg font-bold text-foreground">{CARRIER_STATS.completed}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Įvykdyta šį mėn.</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Euro className="w-4 h-4 text-amber-600" />
                          <span className="text-lg font-bold text-foreground">{(CARRIER_STATS.monthlyEarnings / 1000).toFixed(1)}k</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Uždarbis EUR</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Package className="w-4 h-4 text-primary" />
                          <span className="text-lg font-bold text-foreground">{SHIPPER_STATS.activeCargos}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Aktyvūs kroviniai</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                          <span className="text-lg font-bold text-foreground">{SHIPPER_STATS.pendingOffers}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Gauti pasiūlymai</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="w-4 h-4 text-blue-600" />
                          <span className="text-lg font-bold text-foreground">{SHIPPER_STATS.inTransit}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Vežami dabar</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Euro className="w-4 h-4 text-amber-600" />
                          <span className="text-lg font-bold text-foreground">{(SHIPPER_STATS.monthlySpend / 1000).toFixed(1)}k</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Išlaidos EUR</p>
                      </div>
                    </>
                  )}
                </div>
              </section>

              {/* Company Stats */}
              <section className="bg-card border border-border rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{COMPANY_INFO.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium text-foreground">{COMPANY_INFO.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({COMPANY_INFO.reviewCount} atsiliepimai)</span>
                      {COMPANY_INFO.verified && (
                        <Shield className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Award className="w-4 h-4" />
                      Narys nuo
                    </div>
                    <span className="text-sm font-medium text-foreground">{COMPANY_INFO.memberSince} m.</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4" />
                      Įvykdyti sandoriai
                    </div>
                    <span className="text-sm font-medium text-foreground">{COMPANY_INFO.completedDeals}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Timer className="w-4 h-4" />
                      Pristatymas laiku
                    </div>
                    <span className="text-sm font-medium text-emerald-600">{COMPANY_INFO.onTimeDelivery}%</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Zap className="w-4 h-4" />
                      Atsako greitis
                    </div>
                    <span className="text-sm font-medium text-foreground">{COMPANY_INFO.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      Atsako dažnis
                    </div>
                    <span className="text-sm font-medium text-foreground">{COMPANY_INFO.responseRate}%</span>
                  </div>
                </div>

                <Link
                  href="/profilis"
                  className="flex items-center justify-center gap-2 w-full mt-4 py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  Redaguoti profilį
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </section>

              {/* Market Trends */}
              <section className="bg-card border border-border rounded-2xl p-5">
                <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Rinkos tendencijos
                </h2>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Vidutinė kaina</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-medium text-emerald-600">+{MARKET_TRENDS.avgPriceChange}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Paklausa</span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                      Aukšta
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Vid. pristatymo laikas</span>
                    <span className="text-sm font-medium text-foreground">{MARKET_TRENDS.avgDeliveryTime} d.</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Populiariausi maršrutai</p>
                  <div className="flex flex-wrap gap-1.5">
                    {MARKET_TRENDS.popularRoutes.map(route => (
                      <span key={route} className="px-2 py-1 text-xs bg-muted rounded-md text-foreground">
                        {route}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
