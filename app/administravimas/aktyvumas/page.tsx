"use client"

import { useState } from "react"
import {
  Activity,
  Users,
  Globe,
  Smartphone,
  Monitor,
  RefreshCw,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ACTIVE_USERS = [
  { id: 1, name: "Jonas Jonaitis", company: "UAB Greitas", action: "Peržiūri krovinį CG-1234", device: "desktop", location: "Vilnius", duration: "15 min" },
  { id: 2, name: "Petras Petraitis", company: "MB Kroviniai", action: "Kuria naują skelbimą", device: "mobile", location: "Kaunas", duration: "8 min" },
  { id: 3, name: "Ona Onaitė", company: "UAB Baltic", action: "Redaguoja profilį", device: "desktop", location: "Klaipėda", duration: "3 min" },
  { id: 4, name: "Mindaugas R.", company: "UAB Express", action: "Peržiūri transporto pasiūlymus", device: "tablet", location: "Šiauliai", duration: "22 min" },
  { id: 5, name: "Gintarė G.", company: "UAB Logistika", action: "Atsako į žinutes", device: "mobile", location: "Panevėžys", duration: "5 min" },
  { id: 6, name: "Vytautas V.", company: "MB Trans", action: "Peržiūri sąskaitas", device: "desktop", location: "Vilnius", duration: "12 min" },
]

const HOURLY_STATS = [
  { hour: "00:00", users: 12 },
  { hour: "02:00", users: 5 },
  { hour: "04:00", users: 3 },
  { hour: "06:00", users: 18 },
  { hour: "08:00", users: 89 },
  { hour: "10:00", users: 156 },
  { hour: "12:00", users: 134 },
  { hour: "14:00", users: 178 },
  { hour: "16:00", users: 145 },
  { hour: "18:00", users: 98 },
  { hour: "20:00", users: 67 },
  { hour: "22:00", users: 34 },
]

const SOURCE_STATS = [
  { source: "Tiesioginis", count: 45, percent: 35 },
  { source: "Google", count: 38, percent: 30 },
  { source: "Facebook", count: 19, percent: 15 },
  { source: "El. paštas", count: 15, percent: 12 },
  { source: "Kita", count: 11, percent: 8 },
]

const DEVICE_STATS = [
  { device: "Kompiuteris", icon: Monitor, count: 78, percent: 61 },
  { device: "Telefonas", icon: Smartphone, count: 42, percent: 33 },
  { device: "Planšetė", icon: Monitor, count: 8, percent: 6 },
]

export default function ActivityPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const maxUsers = Math.max(...HOURLY_STATS.map(s => s.users))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Aktyvumas</h1>
          <p className="text-sm text-muted-foreground mt-1">Realaus laiko sistemos aktyvumo stebėjimas</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          Atnaujinti
        </button>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-muted-foreground">Dabar</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">128</p>
          <p className="text-sm text-muted-foreground">Prisijungę vartotojai</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600">
              <TrendingUp className="w-3 h-3" />
              +12%
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">1,847</p>
          <p className="text-sm text-muted-foreground">Šiandien prisijungimų</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-3xl font-bold text-foreground">8.5 min</p>
          <p className="text-sm text-muted-foreground">Vid. sesijos trukmė</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Activity Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Aktyvumas pagal valandą</h3>
          <div className="flex items-end gap-1 h-40">
            {HOURLY_STATS.map((stat, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-muted rounded-t relative" style={{ height: `${(stat.users / maxUsers) * 100}%` }}>
                  <div 
                    className="absolute inset-0 bg-primary rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    title={`${stat.hour}: ${stat.users} vartotojai`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{stat.hour.split(":")[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Source Stats */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Prisijungimai pagal šaltinį</h3>
          <div className="space-y-3">
            {SOURCE_STATS.map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-24 text-sm text-foreground">{stat.source}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${stat.percent}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm text-muted-foreground">{stat.percent}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Stats */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Įrenginių tipai</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DEVICE_STATS.map((stat, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{stat.percent}%</p>
                <p className="text-sm text-muted-foreground">{stat.device}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Users List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-foreground">Aktyvūs vartotojai dabar</h3>
          </div>
          <span className="text-xs text-muted-foreground">Atnaujinta prieš 5 sek.</span>
        </div>
        <div className="divide-y divide-border">
          {ACTIVE_USERS.map(user => (
            <div key={user.id} className="p-4 flex items-center gap-4 hover:bg-muted/20 transition-colors">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                <span className="text-sm font-semibold text-primary">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.company}</p>
              </div>
              <div className="hidden sm:block text-sm text-foreground">{user.action}</div>
              <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {user.location}
              </div>
              <div className="flex items-center gap-2">
                {user.device === "desktop" && <Monitor className="w-4 h-4 text-muted-foreground" />}
                {user.device === "mobile" && <Smartphone className="w-4 h-4 text-muted-foreground" />}
                {user.device === "tablet" && <Monitor className="w-4 h-4 text-muted-foreground" />}
                <span className="text-xs text-muted-foreground">{user.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
