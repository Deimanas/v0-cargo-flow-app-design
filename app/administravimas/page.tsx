"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  Users,
  Clock,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Package,
  Activity,
  ArrowUpRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STATS = [
  { label: "Aktyvios įmonės", value: "1,234", change: "+12%", trend: "up" as const, icon: Building2, color: "bg-blue-500" },
  { label: "Aktyvūs vartotojai", value: "3,891", change: "+8%", trend: "up" as const, icon: Users, color: "bg-emerald-500" },
  { label: "Laukiantys patvirtinimo", value: "23", change: "-5", trend: "down" as const, icon: Clock, color: "bg-amber-500" },
  { label: "Atviri ginčai", value: "7", change: "+2", trend: "up" as const, icon: AlertTriangle, color: "bg-red-500" },
]

const PENDING_COMPANIES = [
  { id: 1, name: "UAB Greitas Pervežimas", code: "305123456", submitted: "2024-04-01", type: "Vežėjas", docs: 3 },
  { id: 2, name: "MB Kroviniai LT", code: "305789012", submitted: "2024-04-01", type: "Ekspeditorius", docs: 2 },
  { id: 3, name: "UAB Baltic Transport", code: "305345678", submitted: "2024-03-31", type: "Vežėjas", docs: 4 },
  { id: 4, name: "UAB Logistika Pro", code: "305901234", submitted: "2024-03-30", type: "Vežėjas", docs: 3 },
]

const OPEN_DISPUTES = [
  { id: "D-089", parties: "UAB Greitas vs MB Kroviniai", type: "Mokėjimas", priority: "high", days: 3 },
  { id: "D-088", parties: "UAB Baltic vs UAB Express", type: "Sugadintas krovinys", priority: "medium", days: 5 },
  { id: "D-087", parties: "MB Trans vs UAB Cargo", type: "Vėlavimas", priority: "low", days: 7 },
]

const RECENT_CARGO = [
  { id: "CG-1234", route: "Vilnius → Klaipėda", company: "UAB Greitas", price: "1,320 EUR", status: "active" },
  { id: "CG-1233", route: "Kaunas → Berlin", company: "MB Kroviniai", price: "2,450 EUR", status: "pending" },
  { id: "CG-1232", route: "Riga → Warsaw", company: "UAB Baltic", price: "890 EUR", status: "completed" },
]

const LIVE_ACTIVITY = [
  { user: "Jonas P.", company: "UAB Greitas", action: "Sukūrė naują krovinį", time: "dabar", type: "cargo" },
  { user: "Petras K.", company: "MB Kroviniai", action: "Pateikė pasiūlymą", time: "prieš 2 min", type: "offer" },
  { user: "Ona S.", company: "UAB Baltic", action: "Užbaigė pervežimą", time: "prieš 5 min", type: "complete" },
  { user: "Mindaugas R.", company: "UAB Express", action: "Prisijungė prie sistemos", time: "prieš 8 min", type: "login" },
]

const QUICK_ACTIONS = [
  { label: "Patvirtinti įmonę", href: "/administravimas/imones?status=pending", count: 23 },
  { label: "Išspręsti ginčą", href: "/administravimas/gincai?status=open", count: 7 },
  { label: "Peržiūrėti reportą", href: "/administravimas/reportai?status=new", count: 12 },
  { label: "Audit log", href: "/administravimas/audit" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Administravimo skydelis</h1>
          <p className="text-sm text-muted-foreground mt-1">Bendra sistemos apžvalga ir greiti veiksmai</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>128 vartotojai prisijungę dabar</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center", stat.color)}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
              )}>
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {action.label}
            </span>
            {action.count ? (
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {action.count}
              </span>
            ) : (
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Companies */}
        <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Laukiančios įmonės</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Reikalauja patvirtinimo</p>
            </div>
            <Link 
              href="/administravimas/imones?status=pending"
              className="text-xs font-medium text-primary hover:underline"
            >
              Visos ({PENDING_COMPANIES.length})
            </Link>
          </div>
          <div className="divide-y divide-border">
            {PENDING_COMPANIES.slice(0, 3).map(company => (
              <Link
                key={company.id}
                href={`/administravimas/imones/${company.id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.type} · {company.code}</p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs font-medium text-foreground">{company.docs} dokumentai</p>
                  <p className="text-xs text-muted-foreground">{company.submitted}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Live Activity */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-semibold text-foreground">Gyvas aktyvumas</h3>
          </div>
          <div className="divide-y divide-border">
            {LIVE_ACTIVITY.map((item, i) => (
              <div key={i} className="p-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-2 h-2 rounded-full mt-1.5 shrink-0",
                    item.type === "cargo" && "bg-blue-500",
                    item.type === "offer" && "bg-amber-500",
                    item.type === "complete" && "bg-emerald-500",
                    item.type === "login" && "bg-slate-400"
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{item.user}</span>
                      <span className="text-muted-foreground"> · {item.company}</span>
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{item.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border">
            <Link
              href="/administravimas/aktyvumas"
              className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              Daugiau aktyvumo
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Open Disputes */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <h3 className="text-sm font-semibold text-foreground">Atviri ginčai</h3>
            </div>
            <Link 
              href="/administravimas/gincai"
              className="text-xs font-medium text-primary hover:underline"
            >
              Visi ({OPEN_DISPUTES.length})
            </Link>
          </div>
          <div className="divide-y divide-border">
            {OPEN_DISPUTES.map(dispute => (
              <Link
                key={dispute.id}
                href={`/administravimas/gincai/${dispute.id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  dispute.priority === "high" && "bg-red-50",
                  dispute.priority === "medium" && "bg-amber-50",
                  dispute.priority === "low" && "bg-slate-50"
                )}>
                  <AlertTriangle className={cn(
                    "w-5 h-5",
                    dispute.priority === "high" && "text-red-500",
                    dispute.priority === "medium" && "text-amber-500",
                    dispute.priority === "low" && "text-slate-400"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{dispute.parties}</p>
                  <p className="text-xs text-muted-foreground">{dispute.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    dispute.priority === "high" && "bg-red-50 text-red-600",
                    dispute.priority === "medium" && "bg-amber-50 text-amber-600",
                    dispute.priority === "low" && "bg-slate-100 text-slate-600"
                  )}>
                    {dispute.days} d.
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Cargo */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Naujausi kroviniai</h3>
            </div>
            <Link 
              href="/administravimas/kroviniai"
              className="text-xs font-medium text-primary hover:underline"
            >
              Visi
            </Link>
          </div>
          <div className="divide-y divide-border">
            {RECENT_CARGO.map(cargo => (
              <Link
                key={cargo.id}
                href={`/administravimas/kroviniai/${cargo.id}`}
                className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{cargo.route}</p>
                  <p className="text-xs text-muted-foreground">{cargo.company} · {cargo.id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-foreground">{cargo.price}</p>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    cargo.status === "active" && "bg-emerald-50 text-emerald-600",
                    cargo.status === "pending" && "bg-amber-50 text-amber-600",
                    cargo.status === "completed" && "bg-slate-100 text-slate-600"
                  )}>
                    {cargo.status === "active" ? "Aktyvus" : cargo.status === "pending" ? "Laukia" : "Užbaigtas"}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
