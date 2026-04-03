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
  MessageSquare,
  Package,
  MapPin,
  ArrowRight,
  Star,
  TrendingUp,
  CircleDot,
  Calendar,
  Euro,
  Eye,
  Users,
  BarChart3,
  AlertCircle,
  FileText,
  Phone,
  Building2,
  Route,
  Gauge,
  Snowflake,
  Box,
  Timer,
  CircleCheck,
  CircleDashed,
  Loader2,
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
}

// Tasks/notifications for attention
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
    type: "message",
    priority: "medium",
    title: "Neperskaitytos žinutės (3)",
    description: "UAB Logistika: \"Kada galite pakrauti?\"",
    time: "Prieš 1 val.",
    link: "/zinutes",
  },
  {
    id: "t4",
    type: "expiring",
    priority: "medium",
    title: "Transportas neturi krovinių",
    description: "Vilnius → Warsaw, balandžio 5 d.",
    time: "Liko 2 d.",
    link: "/transportas/1",
  },
]

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
    type: "message",
    priority: "medium",
    title: "Nauja žinutė",
    description: "Jonas Jonaitis: \"Ar dokumentai paruošti?\"",
    time: "Prieš 3 val.",
    link: "/zinutes",
  },
  {
    id: "t5",
    type: "expiring",
    priority: "low",
    title: "Krovinys baigia galioti",
    description: "Panevėžys → Marijampolė, liko 1 diena",
    time: "Rytoj",
    link: "/kroviniai/4",
  },
]

// My cargos (for shipper)
const MY_CARGOS = [
  {
    id: "c1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Klaipėda", country: "LT" },
    status: "delivering",
    statusLabel: "Vežamas",
    date: "Šiandien",
    price: 1320,
    offers: 0,
    carrier: "UAB Greitas",
    cargoType: "Paletės",
    weight: 8.5,
  },
  {
    id: "c2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    status: "published",
    statusLabel: "Paskelbtas",
    date: "Balandžio 5 d.",
    price: 2100,
    offers: 3,
    views: 47,
    cargoType: "Bendras",
    weight: 14.2,
  },
  {
    id: "c3",
    from: { city: "Utena", country: "LT" },
    to: { city: "Riga", country: "LV" },
    status: "waiting",
    statusLabel: "Laukia patvirtinimo",
    date: "Balandžio 4 d.",
    price: 680,
    offers: 1,
    cargoType: "ADR",
    weight: 4.8,
  },
  {
    id: "c4",
    from: { city: "Šiauliai", country: "LT" },
    to: { city: "Warsaw", country: "PL" },
    status: "published",
    statusLabel: "Paskelbtas",
    date: "Balandžio 6 d.",
    price: 890,
    offers: 0,
    views: 12,
    cargoType: "Šaldomas",
    weight: 6.0,
  },
]

// My transport (for carrier)
const MY_TRANSPORT = [
  {
    id: "tr1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    type: "Tentinė",
    date: "Balandžio 5 d.",
    status: "active",
    statusLabel: "Aktyvus",
    matches: 12,
    capacity: 24,
  },
  {
    id: "tr2",
    from: { city: "Klaipėda", country: "LT" },
    to: { city: "Warsaw", country: "PL" },
    type: "Refrižeratorius",
    date: "Balandžio 6 d.",
    status: "active",
    statusLabel: "Aktyvus",
    matches: 5,
    capacity: 20,
  },
  {
    id: "tr3",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Amsterdam", country: "NL" },
    type: "Tentinė",
    date: "Balandžio 7 d.",
    status: "booked",
    statusLabel: "Užsakytas",
    matches: 0,
    capacity: 24,
    bookedCargo: "Elektronika, 18t",
  },
]

// Recommended cargos (for carrier)
const RECOMMENDED_CARGOS = [
  {
    id: "r1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Munich", country: "DE" },
    weight: 14.5,
    price: 1850,
    date: "Balandžio 5 d.",
    matchReason: "Atitinka tavo maršrutą",
    distance: 1240,
    cargoType: "Paletės",
    company: "UAB Siuntos",
    rating: 4.8,
  },
  {
    id: "r2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Hamburg", country: "DE" },
    weight: 8.2,
    price: 1620,
    date: "Balandžio 6 d.",
    matchReason: "Tinkamas transportas",
    distance: 1180,
    cargoType: "Bendras",
    company: "Logistika UAB",
    rating: 4.5,
  },
  {
    id: "r3",
    from: { city: "Šiauliai", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    weight: 12.0,
    price: 1450,
    date: "Balandžio 5 d.",
    matchReason: "Atitinka tavo maršrutą",
    distance: 980,
    cargoType: "Paletės",
    company: "Express LT",
    rating: 4.9,
  },
  {
    id: "r4",
    from: { city: "Panevėžys", country: "LT" },
    to: { city: "Frankfurt", country: "DE" },
    weight: 18.0,
    price: 1980,
    date: "Balandžio 7 d.",
    matchReason: "Pilnas pakrovimas",
    distance: 1350,
    cargoType: "Mašinos",
    company: "Auto Parts",
    rating: 4.7,
  },
]

// Recommended transport (for shipper)
const RECOMMENDED_TRANSPORT = [
  {
    id: "rt1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Berlin", country: "DE" },
    type: "Tentinė",
    date: "Balandžio 5 d.",
    price: 1.2,
    company: "UAB Greitas",
    rating: 4.9,
    completedJobs: 156,
    matchReason: "Geriausias įvertinimas",
  },
  {
    id: "rt2",
    from: { city: "Kaunas", country: "LT" },
    to: { city: "Hamburg", country: "DE" },
    type: "Tentinė",
    date: "Balandžio 5 d.",
    price: 1.1,
    company: "TransBaltic",
    rating: 4.7,
    completedJobs: 89,
    matchReason: "Geriausia kaina",
  },
  {
    id: "rt3",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Warsaw", country: "PL" },
    type: "Refrižeratorius",
    date: "Balandžio 6 d.",
    price: 0.95,
    company: "CoolTrans",
    rating: 4.8,
    completedJobs: 234,
    matchReason: "Šaldomas transportas",
  },
]

// Stats for shipper
const SHIPPER_STATS = {
  activeCargos: 4,
  pendingOffers: 4,
  inTransit: 1,
  delivered: 12,
  monthlySpend: 8450,
  avgPrice: 1.18,
}

// Stats for carrier  
const CARRIER_STATS = {
  activeRoutes: 3,
  matchingCargos: 24,
  inProgress: 2,
  completed: 47,
  monthlyEarnings: 12680,
  avgRating: 4.8,
}

function Flag({ code }: { code: string }) {
  const url = FLAGS[code]
  if (!url) return <span className="w-5 h-3.5 rounded-sm bg-muted inline-block" />
  return <Image src={url} alt={code} width={20} height={14} className="rounded-sm w-auto h-auto" unoptimized loading="eager" />
}

const TASK_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
  confirm: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  offer: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
  message: { icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-50" },
  expiring: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
  delivery: { icon: Package, color: "text-emerald-500", bg: "bg-emerald-50" },
}

const STATUS_CONFIG: Record<string, { color: string; icon: typeof CircleCheck }> = {
  delivering: { color: "bg-blue-100 text-blue-700", icon: Loader2 },
  published: { color: "bg-emerald-100 text-emerald-700", icon: CircleDashed },
  waiting: { color: "bg-amber-100 text-amber-700", icon: Timer },
  active: { color: "bg-emerald-100 text-emerald-700", icon: CircleCheck },
  booked: { color: "bg-blue-100 text-blue-700", icon: CircleCheck },
}

const CARGO_TYPE_ICONS: Record<string, typeof Box> = {
  "Paletės": Box,
  "Bendras": Package,
  "ADR": AlertCircle,
  "Šaldomas": Snowflake,
  "Mašinos": Truck,
}

export default function DashboardPage() {
  // User type: "carrier" = vežėjas (sees cargos), "shipper" = siuntėjas (sees transport)
  const [userType, setUserType] = useState<"carrier" | "shipper">("carrier")
  const unreadNotifications = 5

  const tasks = userType === "carrier" ? TASKS_CARRIER : TASKS_SHIPPER
  const stats = userType === "carrier" ? CARRIER_STATS : SHIPPER_STATS

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 lg:ml-60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Header with user type toggle */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sveiki, Deimanai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {userType === "carrier" 
                  ? `${CARRIER_STATS.matchingCargos} kroviniai atitinka jūsų transportą`
                  : `${SHIPPER_STATS.pendingOffers} pasiūlymai laukia jūsų sprendimo`
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

          {/* Stats Cards */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {userType === "carrier" ? (
              <>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Route className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stats.activeRoutes}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Aktyvūs maršrutai</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{CARRIER_STATS.matchingCargos}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Atitinkantys kroviniai</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{CARRIER_STATS.inProgress}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Vežami dabar</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Euro className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{(CARRIER_STATS.monthlyEarnings / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mėnesio uždarbis</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{SHIPPER_STATS.activeCargos}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Aktyvūs kroviniai</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{SHIPPER_STATS.pendingOffers}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Gauti pasiūlymai</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Truck className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{SHIPPER_STATS.inTransit}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Vežami dabar</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Euro className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{(SHIPPER_STATS.monthlySpend / 1000).toFixed(1)}k</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Mėnesio išlaidos</p>
                </div>
              </>
            )}
          </section>

          {/* Quick Actions */}
          <section className="mb-6">
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
                    <div>
                      <p className="font-semibold">Rasti krovinį</p>
                      <p className="text-sm text-primary-foreground/70">{CARRIER_STATS.matchingCargos} atitinka transportą</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/transportas"
                    className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Plus className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Pridėti maršrutą</p>
                      <p className="text-sm text-muted-foreground">Paskelbti laisvą transportą</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/pasiulymai"
                    className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Mano pasiūlymai</p>
                      <p className="text-sm text-muted-foreground">Peržiūrėti išsiųstus</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
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
                    <div>
                      <p className="font-semibold">Naujas krovinys</p>
                      <p className="text-sm text-primary-foreground/70">Paskelbti skelbimą</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/transportas"
                    className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Search className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Rasti transportą</p>
                      <p className="text-sm text-muted-foreground">Naršyti vežėjus</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href="/pasiulymai"
                    className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Gauti pasiūlymai</p>
                      <p className="text-sm text-muted-foreground">{SHIPPER_STATS.pendingOffers} laukia atsakymo</p>
                    </div>
                    <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </>
              )}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column - Tasks & My Items */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Tasks requiring attention */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    <h2 className="font-semibold text-foreground">Laukia dėmesio</h2>
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                      {tasks.length}
                    </span>
                  </div>
                  <Link href="/pranesimai" className="text-sm text-primary font-medium hover:underline">
                    Visi pranešimai
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {tasks.slice(0, 4).map((task) => {
                    const config = TASK_CONFIG[task.type]
                    const Icon = config?.icon || Bell
                    return (
                      <Link
                        key={task.id}
                        href={task.link}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", config?.bg || "bg-muted")}>
                          <Icon className={cn("w-5 h-5", config?.color || "text-muted-foreground")} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{task.title}</p>
                            {task.priority === "high" && (
                              <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{task.description}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{task.time}</span>
                      </Link>
                    )
                  })}
                </div>
              </section>

              {/* My Cargos (Shipper) OR My Transport (Carrier) */}
              {userType === "shipper" ? (
                <section className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 text-primary" />
                      <h2 className="font-semibold text-foreground">Mano kroviniai</h2>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        {MY_CARGOS.length}
                      </span>
                    </div>
                    <Link href="/kroviniai?filter=my" className="text-sm text-primary font-medium hover:underline">
                      Visi kroviniai
                    </Link>
                  </div>
                  <div className="divide-y divide-border">
                    {MY_CARGOS.map((cargo) => {
                      const statusConfig = STATUS_CONFIG[cargo.status]
                      const TypeIcon = CARGO_TYPE_ICONS[cargo.cargoType] || Package
                      return (
                        <Link
                          key={cargo.id}
                          href={`/kroviniai/${cargo.id}`}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            <TypeIcon className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Flag code={cargo.from.country} />
                              <span className="font-medium text-foreground text-sm">{cargo.from.city}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                              <Flag code={cargo.to.country} />
                              <span className="font-medium text-foreground text-sm">{cargo.to.city}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{cargo.cargoType}</span>
                              <span>{cargo.weight} t</span>
                              <span>{cargo.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-medium",
                              statusConfig?.color
                            )}>
                              {cargo.statusLabel}
                            </span>
                            <div className="flex items-center gap-2 text-xs">
                              {cargo.offers > 0 && (
                                <span className="flex items-center gap-1 text-primary font-medium">
                                  <TrendingUp className="w-3.5 h-3.5" />
                                  {cargo.offers} pasiūl.
                                </span>
                              )}
                              {cargo.views && (
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Eye className="w-3.5 h-3.5" />
                                  {cargo.views}
                                </span>
                              )}
                              <span className="font-semibold text-foreground">{cargo.price} €</span>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              ) : (
                <section className="bg-card border border-border rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-primary" />
                      <h2 className="font-semibold text-foreground">Mano transportas</h2>
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        {MY_TRANSPORT.length}
                      </span>
                    </div>
                    <Link href="/transportas" className="text-sm text-primary font-medium hover:underline">
                      Valdyti transportą
                    </Link>
                  </div>
                  <div className="divide-y divide-border">
                    {MY_TRANSPORT.map((transport) => {
                      const statusConfig = STATUS_CONFIG[transport.status]
                      return (
                        <Link
                          key={transport.id}
                          href={`/transportas/${transport.id}`}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                            {transport.type === "Refrižeratorius" ? (
                              <Snowflake className="w-5 h-5 text-blue-500" />
                            ) : (
                              <Truck className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Flag code={transport.from.country} />
                              <span className="font-medium text-foreground text-sm">{transport.from.city}</span>
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                              <Flag code={transport.to.country} />
                              <span className="font-medium text-foreground text-sm">{transport.to.city}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span>{transport.type}</span>
                              <span>{transport.capacity} t</span>
                              <span>{transport.date}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1.5">
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-medium",
                              statusConfig?.color
                            )}>
                              {transport.statusLabel}
                            </span>
                            {transport.status === "active" && transport.matches > 0 && (
                              <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                                <Package className="w-3.5 h-3.5" />
                                {transport.matches} kroviniai
                              </span>
                            )}
                            {transport.bookedCargo && (
                              <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                                {transport.bookedCargo}
                              </span>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Recommended */}
            <div className="space-y-6">
              {/* Recommended items based on user type */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <h2 className="font-semibold text-foreground">
                      {userType === "carrier" ? "Rekomenduojami kroviniai" : "Rekomenduojamas transportas"}
                    </h2>
                  </div>
                  <Link 
                    href={userType === "carrier" ? "/kroviniai?recommended=true" : "/transportas?recommended=true"} 
                    className="text-sm text-primary font-medium hover:underline"
                  >
                    Daugiau
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {userType === "carrier" ? (
                    RECOMMENDED_CARGOS.slice(0, 4).map((cargo) => (
                      <Link
                        key={cargo.id}
                        href={`/kroviniai/${cargo.id}`}
                        className="block px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                            {cargo.matchReason}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Flag code={cargo.from.country} />
                          <span className="font-medium text-foreground text-sm">{cargo.from.city}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                          <Flag code={cargo.to.country} />
                          <span className="font-medium text-foreground text-sm">{cargo.to.city}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{cargo.weight} t</span>
                            <span>{cargo.cargoType}</span>
                            <span>{cargo.date}</span>
                          </div>
                          <span className="font-bold text-foreground">{cargo.price} €</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{cargo.company}</span>
                          <span className="flex items-center gap-1 ml-auto text-xs text-amber-600">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {cargo.rating}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : (
                    RECOMMENDED_TRANSPORT.map((transport) => (
                      <Link
                        key={transport.id}
                        href={`/transportas/${transport.id}`}
                        className="block px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                            {transport.matchReason}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Flag code={transport.from.country} />
                          <span className="font-medium text-foreground text-sm">{transport.from.city}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                          <Flag code={transport.to.country} />
                          <span className="font-medium text-foreground text-sm">{transport.to.city}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{transport.type}</span>
                            <span>{transport.date}</span>
                          </div>
                          <span className="font-bold text-foreground">{transport.price} €/km</span>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{transport.company}</span>
                          <span className="text-xs text-muted-foreground ml-1">({transport.completedJobs} perv.)</span>
                          <span className="flex items-center gap-1 ml-auto text-xs text-amber-600">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            {transport.rating}
                          </span>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </section>

              {/* Quick contacts / Recent */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <h2 className="font-semibold text-foreground">Paskutiniai pokalbiai</h2>
                  </div>
                  <Link href="/zinutes" className="text-sm text-primary font-medium hover:underline">
                    Visos
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {[
                    { name: "Jonas Jonaitis", company: "UAB Greitas", lastMsg: "Ar galite pakrauti rytoj?", time: "Prieš 1 val.", unread: true },
                    { name: "Petras Petraitis", company: "TransBaltic", lastMsg: "Dokumentai paruošti.", time: "Prieš 3 val.", unread: false },
                    { name: "Laura Lauraitė", company: "Express LT", lastMsg: "Ačiū už bendradarbiavimą!", time: "Vakar", unread: false },
                  ].map((chat, idx) => (
                    <Link
                      key={idx}
                      href="/zinutes"
                      className="flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-primary">
                          {chat.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                          {chat.unread && <span className="w-2 h-2 rounded-full bg-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
