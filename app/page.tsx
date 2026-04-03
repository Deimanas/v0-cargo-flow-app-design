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
  Calendar,
  ArrowRight,
  Star,
  TrendingUp,
  CircleDot,
} from "lucide-react"

// Flag URLs
const FLAGS: Record<string, string> = {
  LT: "https://flagcdn.com/w40/lt.png",
  DE: "https://flagcdn.com/w40/de.png",
  PL: "https://flagcdn.com/w40/pl.png",
  LV: "https://flagcdn.com/w40/lv.png",
}

// Tasks requiring attention
const TASKS = [
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
    title: "Naujas pasiūlymas",
    description: "UAB Greitas siūlo 1 280 EUR už Kaunas → Berlin",
    time: "Prieš 30 min.",
    link: "/pasiulymai",
  },
  {
    id: "t3",
    type: "message",
    priority: "medium",
    title: "Neperskaitytos žinutės (3)",
    description: "Jonas Jonaitis: \"Ar galite pakrauti rytoj?\"",
    time: "Prieš 1 val.",
    link: "/zinutes",
  },
  {
    id: "t4",
    type: "expiring",
    priority: "medium",
    title: "Krovinys baigia galioti",
    description: "Panevėžys → Marijampolė, liko 1 diena",
    time: "Rytoj",
    link: "/kroviniai/4",
  },
]

// My cargos
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
  },
]

// My transport
const MY_TRANSPORT = [
  {
    id: "tr1",
    route: "Vilnius → Berlin",
    type: "Tentinė",
    date: "Balandžio 5 d.",
    status: "active",
    statusLabel: "Aktyvus",
    matches: 5,
  },
  {
    id: "tr2",
    route: "Klaipėda → Warsaw",
    type: "Refrižeratorius",
    date: "Balandžio 6 d.",
    status: "active",
    statusLabel: "Aktyvus",
    matches: 2,
  },
]

// Recommended cargos
const RECOMMENDED = [
  {
    id: "r1",
    from: { city: "Vilnius", country: "LT" },
    to: { city: "Munich", country: "DE" },
    weight: 14.5,
    price: 1850,
    date: "Balandžio 5 d.",
    matchReason: "Atitinka tavo maršrutą",
    distance: 1240,
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
  },
]

function Flag({ code }: { code: string }) {
  const url = FLAGS[code]
  if (!url) return <span className="w-5 h-3.5 rounded-sm bg-muted inline-block" />
  return <Image src={url} alt={code} width={20} height={14} className="rounded-sm w-auto h-auto" unoptimized loading="eager" />
}

const TASK_CONFIG = {
  confirm: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50" },
  offer: { icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
  message: { icon: MessageSquare, color: "text-violet-500", bg: "bg-violet-50" },
  expiring: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
}

const STATUS_CONFIG = {
  delivering: { color: "bg-blue-100 text-blue-700" },
  published: { color: "bg-emerald-100 text-emerald-700" },
  waiting: { color: "bg-amber-100 text-amber-700" },
  active: { color: "bg-emerald-100 text-emerald-700" },
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<"cargos" | "transport">("cargos")
  const unreadNotifications = 5

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <main className="flex-1 lg:ml-60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          
          {/* Header */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sveiki, Deimanai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Turite <span className="text-primary font-medium">4 užduotis</span> laukiančias dėmesio
              </p>
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
          </header>

          {/* Quick Actions */}
          <section className="mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                href="/kroviniai"
                className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Search className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Rasti krovinį</p>
                  <p className="text-sm text-muted-foreground">Naršyti skelbimus</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/transportas"
                className="group flex items-center gap-4 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-muted/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Siūlyti transportą</p>
                  <p className="text-sm text-muted-foreground">Pridėti maršrutą</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-muted-foreground opacity-60 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - Tasks & My Items */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tasks requiring attention */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                    <h2 className="font-semibold text-foreground">Laukia dėmesio</h2>
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-xs font-medium rounded-full">
                      {TASKS.length}
                    </span>
                  </div>
                  <Link href="/pranesimai" className="text-sm text-primary font-medium hover:underline">
                    Visi pranešimai
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {TASKS.map((task) => {
                    const config = TASK_CONFIG[task.type as keyof typeof TASK_CONFIG]
                    const Icon = config.icon
                    return (
                      <Link
                        key={task.id}
                        href={task.link}
                        className="flex items-start gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", config.bg)}>
                          <Icon className={cn("w-5 h-5", config.color)} />
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

              {/* My Cargos / Transport */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                  <div className="flex items-center gap-1 p-1 bg-muted rounded-lg w-fit">
                    <button
                      onClick={() => setActiveSection("cargos")}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeSection === "cargos"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Mano kroviniai
                      <span className="ml-2 text-xs text-muted-foreground">({MY_CARGOS.length})</span>
                    </button>
                    <button
                      onClick={() => setActiveSection("transport")}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-all",
                        activeSection === "transport"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      Mano transportas
                      <span className="ml-2 text-xs text-muted-foreground">({MY_TRANSPORT.length})</span>
                    </button>
                  </div>
                </div>

                {activeSection === "cargos" ? (
                  <div className="divide-y divide-border">
                    {MY_CARGOS.map((cargo) => (
                      <Link
                        key={cargo.id}
                        href={`/kroviniai/${cargo.id}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <CircleDot className="w-3 h-3 text-primary" />
                            <Flag code={cargo.from.country} />
                            <span className="font-medium text-foreground">{cargo.from.city}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          <div className="flex items-center gap-1.5">
                            <CircleDot className="w-3 h-3 text-emerald-500" />
                            <Flag code={cargo.to.country} />
                            <span className="font-medium text-foreground">{cargo.to.city}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                            STATUS_CONFIG[cargo.status as keyof typeof STATUS_CONFIG]?.color
                          )}>
                            {cargo.statusLabel}
                          </span>
                          {cargo.offers > 0 && (
                            <span className="flex items-center gap-1 text-xs text-primary font-medium whitespace-nowrap">
                              <TrendingUp className="w-3.5 h-3.5" />
                              {cargo.offers} pasiūl.
                            </span>
                          )}
                          <span className="font-semibold text-foreground whitespace-nowrap">{cargo.price} €</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                    <div className="px-5 py-3 bg-muted/30">
                      <Link href="/kroviniai?filter=my" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                        Žiūrėti visus krovinius
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {MY_TRANSPORT.map((transport) => (
                      <Link
                        key={transport.id}
                        href={`/transportas/${transport.id}`}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                          <Truck className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">{transport.route}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transport.type}</span>
                            <span>•</span>
                            <span>{transport.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-2.5 py-1 rounded-full text-xs font-medium",
                            STATUS_CONFIG[transport.status as keyof typeof STATUS_CONFIG]?.color
                          )}>
                            {transport.statusLabel}
                          </span>
                          {transport.matches > 0 && (
                            <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-1 rounded-full">
                              <Package className="w-3.5 h-3.5" />
                              {transport.matches} atitinka
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                    <div className="px-5 py-3 bg-muted/30">
                      <Link href="/transportas" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
                        Valdyti transportą
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Right Column - Recommended */}
            <div className="space-y-6">
              {/* Recommended cargos */}
              <section className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    <h2 className="font-semibold text-foreground">Rekomenduojama</h2>
                  </div>
                  <Link href="/kroviniai?recommended=true" className="text-sm text-primary font-medium hover:underline">
                    Daugiau
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {RECOMMENDED.map((cargo) => (
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
                          <span className="flex items-center gap-1">
                            <Package className="w-3.5 h-3.5" />
                            {cargo.weight} t
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {cargo.distance} km
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {cargo.date}
                          </span>
                        </div>
                        <span className="font-bold text-foreground">{cargo.price} €</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Quick stats */}
              <section className="bg-card border border-border rounded-2xl p-5">
                <h2 className="font-semibold text-foreground mb-4">Šio mėnesio statistika</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pervežimai</span>
                    <span className="font-semibold text-foreground">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Paskelbti kroviniai</span>
                    <span className="font-semibold text-foreground">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Gauti pasiūlymai</span>
                    <span className="font-semibold text-foreground">24</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Apyvarta</span>
                    <span className="font-bold text-emerald-600 text-lg">4 850 €</span>
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
