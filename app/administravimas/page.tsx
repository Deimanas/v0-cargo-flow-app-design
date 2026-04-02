"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  AlertTriangle,
  Flag,
  Boxes,
  Truck,
  ToggleLeft,
  FileText,
  History,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Ban,
  Check,
  X,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Admin navigation items
const ADMIN_SECTIONS = [
  { id: "dashboard", name: "Skydelis", icon: LayoutDashboard },
  { id: "activity", name: "Aktyvumas", icon: Activity },
  { id: "companies", name: "Įmonės", icon: Building2 },
  { id: "users", name: "Vartotojai", icon: Users },
  { id: "cargo", name: "Kroviniai", icon: Package },
  { id: "disputes", name: "Ginčai", icon: AlertTriangle },
  { id: "reports", name: "Reportai", icon: Flag },
  { id: "cargo-types", name: "Krovinio rūšys", icon: Boxes },
  { id: "transport-types", name: "Transporto tipai", icon: Truck },
  { id: "modules", name: "Moduliai", icon: ToggleLeft },
  { id: "legal", name: "Teisiniai tekstai", icon: FileText },
  { id: "audit", name: "Audit log", icon: History },
]

// Stats data
const STATS = [
  { label: "Aktyvios įmonės", value: "1,234", change: "+12%", trend: "up", icon: Building2 },
  { label: "Aktyvūs vartotojai", value: "3,891", change: "+8%", trend: "up", icon: Users },
  { label: "Laukiantys patvirtinimo", value: "23", change: "-5", trend: "down", icon: Clock },
  { label: "Atviri ginčai", value: "7", change: "+2", trend: "up", icon: AlertTriangle },
]

// Pending companies
const PENDING_COMPANIES = [
  { id: 1, name: "UAB Greitas Pervežimas", code: "305123456", submitted: "2024-04-01", type: "Vežėjas" },
  { id: 2, name: "MB Kroviniai LT", code: "305789012", submitted: "2024-04-01", type: "Ekspeditorius" },
  { id: 3, name: "UAB Baltic Transport", code: "305345678", submitted: "2024-03-31", type: "Vežėjas" },
]

// Recent cargo
const RECENT_CARGO = [
  { id: "CG-2024-1234", route: "Vilnius → Klaipėda", status: "active", price: "1,320 EUR", date: "2024-04-02" },
  { id: "CG-2024-1233", route: "Kaunas → Berlin", status: "pending", price: "2,450 EUR", date: "2024-04-02" },
  { id: "CG-2024-1232", route: "Riga → Warsaw", status: "completed", price: "890 EUR", date: "2024-04-01" },
]

// Open disputes
const OPEN_DISPUTES = [
  { id: "D-2024-089", parties: "UAB Greitas vs MB Kroviniai", type: "Mokėjimas", status: "open", priority: "high" },
  { id: "D-2024-088", parties: "UAB Baltic vs UAB Express", type: "Sugadintas krovinys", status: "investigating", priority: "medium" },
]

// Active users now
const ACTIVE_USERS_NOW = [
  { name: "Jonas P.", company: "UAB Greitas", action: "Peržiūri krovinį CG-2024-1234", time: "dabar" },
  { name: "Petras K.", company: "MB Kroviniai", action: "Redaguoja transporto pasiūlymą", time: "prieš 2 min" },
  { name: "Ona S.", company: "UAB Baltic", action: "Kuria naują skelbimą", time: "prieš 5 min" },
]

function StatCard({ stat }: { stat: typeof STATS[0] }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <stat.icon className="w-5 h-5 text-primary" />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
        )}>
          {stat.change}
        </span>
      </div>
      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
      <p className="text-sm text-muted-foreground">{stat.label}</p>
    </div>
  )
}

function CompanyApprovalModal({ company, onClose, onApprove, onReject }: {
  company: typeof PENDING_COMPANIES[0]
  onClose: () => void
  onApprove: () => void
  onReject: () => void
}) {
  const [rejectReason, setRejectReason] = useState("")
  const [showReject, setShowReject] = useState(false)

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl z-50">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Įmonės patvirtinimas</h2>
          <p className="text-sm text-muted-foreground mt-1">Peržiūrėkite ir patvirtinkite arba atmeskite įmonę</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Įmonės pavadinimas</p>
              <p className="text-sm font-medium text-foreground">{company.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Įmonės kodas</p>
              <p className="text-sm font-medium text-foreground">{company.code}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Tipas</p>
              <p className="text-sm font-medium text-foreground">{company.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Pateikta</p>
              <p className="text-sm font-medium text-foreground">{company.submitted}</p>
            </div>
          </div>

          {showReject && (
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Atmetimo priežastis</label>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                placeholder="Įveskite atmetimo priežastį..."
                className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Atšaukti
          </button>
          <div className="flex-1" />
          {!showReject ? (
            <>
              <button
                onClick={() => setShowReject(true)}
                className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Atmesti
              </button>
              <button
                onClick={onApprove}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Patvirtinti
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowReject(false)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Grįžti
              </button>
              <button
                onClick={onReject}
                className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Atmesti įmonę
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}

function DisputeModal({ dispute, onClose }: {
  dispute: typeof OPEN_DISPUTES[0]
  onClose: () => void
}) {
  const [resolution, setResolution] = useState("")

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-card border border-border rounded-2xl shadow-xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Ginčo detalės</h2>
              <p className="text-sm text-muted-foreground mt-1">{dispute.id}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Šalys</p>
              <p className="text-sm font-medium text-foreground">{dispute.parties}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Tipas</p>
              <p className="text-sm font-medium text-foreground">{dispute.type}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Statusas</p>
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                dispute.status === "open" ? "bg-yellow-50 text-yellow-700" : "bg-blue-50 text-blue-700"
              )}>
                {dispute.status === "open" ? "Atidarytas" : "Tiriamas"}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Prioritetas</p>
              <span className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                dispute.priority === "high" ? "bg-red-50 text-red-700" : "bg-orange-50 text-orange-700"
              )}>
                {dispute.priority === "high" ? "Aukštas" : "Vidutinis"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2">Ginčo aprašymas</p>
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-foreground">
              Krovinys pristatytas su 2 dienų vėlavimu. Užsakovas reikalauja kompensacijos už patirtus nuostolius 
              dėl pavėluoto pristatymo. Vežėjas teigia, kad vėlavimas įvyko dėl nenumatytų kelio darbų.
            </div>
          </div>

          <div>
            <label className="text-xs text-muted-foreground mb-1.5 block">Sprendimas</label>
            <textarea
              value={resolution}
              onChange={e => setResolution(e.target.value)}
              placeholder="Įveskite ginčo sprendimą..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="p-6 border-t border-border shrink-0 flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Atšaukti
          </button>
          <div className="flex-1" />
          <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
            Išsaugoti juodraštį
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Išspręsti ginčą
          </button>
        </div>
      </div>
    </>
  )
}

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [selectedCompany, setSelectedCompany] = useState<typeof PENDING_COMPANIES[0] | null>(null)
  const [selectedDispute, setSelectedDispute] = useState<typeof OPEN_DISPUTES[0] | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="flex">
          {/* Admin sub-navigation */}
          <aside className="hidden xl:block w-56 border-r border-border bg-card min-h-screen shrink-0">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Administravimas</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Sistemos valdymas</p>
            </div>
            <nav className="p-2">
              {ADMIN_SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <section.icon className="w-4 h-4 shrink-0" />
                  <span>{section.name}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0 p-6">
            {/* Mobile section selector */}
            <div className="xl:hidden mb-6">
              <select
                value={activeSection}
                onChange={e => setActiveSection(e.target.value)}
                className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {ADMIN_SECTIONS.map(section => (
                  <option key={section.id} value={section.id}>{section.name}</option>
                ))}
              </select>
            </div>

            {/* Dashboard content */}
            {activeSection === "dashboard" && (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Administravimo skydelis</h1>
                  <p className="text-sm text-muted-foreground mt-1">Bendra sistemos apžvalga ir greiti veiksmai</p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {STATS.map((stat, i) => (
                    <StatCard key={i} stat={stat} />
                  ))}
                </div>

                {/* Two column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pending companies */}
                  <div className="bg-card border border-border rounded-xl">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Laukiančios įmonės</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Reikalauja patvirtinimo</p>
                      </div>
                      <span className="text-xs font-medium bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full">
                        {PENDING_COMPANIES.length} naujos
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {PENDING_COMPANIES.map(company => (
                        <div
                          key={company.id}
                          className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedCompany(company)}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{company.name}</p>
                            <p className="text-xs text-muted-foreground">{company.type} · {company.code}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-muted-foreground">{company.submitted}</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        Peržiūrėti visas
                      </button>
                    </div>
                  </div>

                  {/* Open disputes */}
                  <div className="bg-card border border-border rounded-xl">
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Atviri ginčai</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Reikalauja dėmesio</p>
                      </div>
                      <span className="text-xs font-medium bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                        {OPEN_DISPUTES.length} atviri
                      </span>
                    </div>
                    <div className="divide-y divide-border">
                      {OPEN_DISPUTES.map(dispute => (
                        <div
                          key={dispute.id}
                          className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedDispute(dispute)}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                            dispute.priority === "high" ? "bg-red-50" : "bg-orange-50"
                          )}>
                            <AlertTriangle className={cn(
                              "w-5 h-5",
                              dispute.priority === "high" ? "text-red-600" : "text-orange-600"
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{dispute.parties}</p>
                            <p className="text-xs text-muted-foreground">{dispute.type}</p>
                          </div>
                          <span className={cn(
                            "text-xs font-medium px-2 py-0.5 rounded-full shrink-0",
                            dispute.status === "open" ? "bg-yellow-50 text-yellow-700" : "bg-blue-50 text-blue-700"
                          )}>
                            {dispute.status === "open" ? "Atidarytas" : "Tiriamas"}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-border">
                      <button className="w-full py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors">
                        Peržiūrėti visus
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent cargo */}
                <div className="bg-card border border-border rounded-xl">
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Naujausi kroviniai</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">Paskutiniai sukurti skelbimai</p>
                    </div>
                    <button className="text-xs font-medium text-primary hover:underline">
                      Žiūrėti visus
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">ID</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Maršrutas</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Statusas</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Kaina</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Data</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Veiksmai</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {RECENT_CARGO.map(cargo => (
                          <tr key={cargo.id} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 text-sm font-medium text-primary">{cargo.id}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{cargo.route}</td>
                            <td className="px-4 py-3">
                              <span className={cn(
                                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                                cargo.status === "active" ? "bg-emerald-50 text-emerald-700" :
                                cargo.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                                "bg-muted text-muted-foreground"
                              )}>
                                {cargo.status === "active" ? "Aktyvus" :
                                 cargo.status === "pending" ? "Laukia" : "Baigtas"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-foreground">{cargo.price}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{cargo.date}</td>
                            <td className="px-4 py-3 text-right">
                              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Naujas vartotojas", icon: Plus, color: "bg-blue-50 text-blue-600" },
                    { label: "Blokuoti vartotoją", icon: Ban, color: "bg-red-50 text-red-600" },
                    { label: "Eksportuoti duomenis", icon: FileText, color: "bg-emerald-50 text-emerald-600" },
                    { label: "Sistemos nustatymai", icon: ToggleLeft, color: "bg-purple-50 text-purple-600" },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all text-left group"
                    >
                      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", action.color)}>
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Activity section */}
            {activeSection === "activity" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Aktyvumas</h1>
                  <p className="text-sm text-muted-foreground mt-1">Realaus laiko sistemos aktyvumas</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Active now */}
                  <div className="bg-card border border-border rounded-xl">
                    <div className="p-4 border-b border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <h3 className="text-sm font-semibold text-foreground">Prisijungę dabar</h3>
                      </div>
                      <p className="text-2xl font-bold text-foreground mt-2">127</p>
                    </div>
                    <div className="p-4 space-y-3">
                      {ACTIVE_USERS_NOW.map((user, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{user.action}</p>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">{user.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <h3 className="text-sm font-semibold text-foreground mb-4">Aktyvumo statistika</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">1,234</p>
                        <p className="text-xs text-muted-foreground">Šiandien prisijungė</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">89</p>
                        <p className="text-xs text-muted-foreground">Nauji vartotojai</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">456</p>
                        <p className="text-xs text-muted-foreground">Skelbimai sukurti</p>
                      </div>
                      <div className="text-center p-4 bg-muted/30 rounded-lg">
                        <p className="text-2xl font-bold text-foreground">23</p>
                        <p className="text-xs text-muted-foreground">Sandoriai</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Companies section */}
            {activeSection === "companies" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Įmonės</h1>
                    <p className="text-sm text-muted-foreground mt-1">Visų įmonių valdymas</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    Pridėti įmonę
                  </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Ieškoti įmonių..."
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <select className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Visi statusai</option>
                    <option>Aktyvios</option>
                    <option>Laukiančios</option>
                    <option>Užblokuotos</option>
                  </select>
                  <select className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Visi tipai</option>
                    <option>Vežėjas</option>
                    <option>Ekspeditorius</option>
                    <option>Siuntėjas</option>
                  </select>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Įmonė</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Tipas</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Statusas</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Skelbimai</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Registracija</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Veiksmai</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { name: "UAB Greitas Pervežimas", code: "305123456", type: "Vežėjas", status: "active", posts: 45, date: "2023-05-15" },
                        { name: "MB Kroviniai LT", code: "305789012", type: "Ekspeditorius", status: "pending", posts: 0, date: "2024-04-01" },
                        { name: "UAB Baltic Transport", code: "305345678", type: "Vežėjas", status: "active", posts: 128, date: "2022-11-20" },
                        { name: "UAB Express Logistics", code: "305901234", type: "Ekspeditorius", status: "blocked", posts: 23, date: "2023-02-10" },
                      ].map((company, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-sm font-medium text-foreground">{company.name}</p>
                              <p className="text-xs text-muted-foreground">{company.code}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{company.type}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              company.status === "active" ? "bg-emerald-50 text-emerald-700" :
                              company.status === "pending" ? "bg-yellow-50 text-yellow-700" :
                              "bg-red-50 text-red-700"
                            )}>
                              {company.status === "active" ? "Aktyvi" :
                               company.status === "pending" ? "Laukia" : "Užblokuota"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{company.posts}</td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{company.date}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Peržiūrėti">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Daugiau">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users section */}
            {activeSection === "users" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">Vartotojai</h1>
                    <p className="text-sm text-muted-foreground mt-1">Vartotojų valdymas ir rolės</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" />
                    Naujas vartotojas
                  </button>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Ieškoti vartotojų..."
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <select className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Visos rolės</option>
                    <option>Administratorius</option>
                    <option>Moderatorius</option>
                    <option>Vartotojas</option>
                  </select>
                  <select className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Visi statusai</option>
                    <option>Aktyvūs</option>
                    <option>Sustabdyti</option>
                    <option>Užblokuoti</option>
                  </select>
                </div>

                {/* Table */}
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Vartotojas</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Įmonė</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Rolė</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Statusas</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Paskutinis prisijungimas</th>
                        <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground">Veiksmai</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {[
                        { name: "Jonas Petrauskas", email: "jonas@greitas.lt", company: "UAB Greitas", role: "admin", status: "active", lastLogin: "Prieš 5 min" },
                        { name: "Ona Kazlauskienė", email: "ona@baltic.lt", company: "UAB Baltic", role: "user", status: "active", lastLogin: "Prieš 2 val" },
                        { name: "Petras Jonaitis", email: "petras@kroviniai.lt", company: "MB Kroviniai", role: "moderator", status: "suspended", lastLogin: "Prieš 3 d" },
                      ].map((user, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-xs font-semibold text-primary">{user.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{user.company}</td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              user.role === "admin" ? "bg-purple-50 text-purple-700" :
                              user.role === "moderator" ? "bg-blue-50 text-blue-700" :
                              "bg-muted text-muted-foreground"
                            )}>
                              {user.role === "admin" ? "Admin" :
                               user.role === "moderator" ? "Moderatorius" : "Vartotojas"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={cn(
                              "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                              user.status === "active" ? "bg-emerald-50 text-emerald-700" :
                              "bg-yellow-50 text-yellow-700"
                            )}>
                              {user.status === "active" ? "Aktyvus" : "Sustabdytas"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{user.lastLogin}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Peržiūrėti">
                                <Eye className="w-4 h-4 text-muted-foreground" />
                              </button>
                              <button className="p-1.5 hover:bg-muted rounded-lg transition-colors" title="Daugiau">
                                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Modules section */}
            {activeSection === "modules" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Modulių valdymas</h1>
                  <p className="text-sm text-muted-foreground mt-1">Feature flags ir funkcionalumo valdymas</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Realaus laiko pranešimai", description: "Push pranešimai naršyklėje", enabled: true },
                    { name: "AI kainų siūlymai", description: "Automatiniai kainos pasiūlymai pagal istoriją", enabled: false },
                    { name: "Žemėlapio integracija", description: "Interaktyvus maršrutų žemėlapis", enabled: true },
                    { name: "Dokumentų skenavimas", description: "CMR ir sąskaitų OCR nuskaitymas", enabled: true },
                    { name: "Mokėjimo sistema", description: "Integruoti mokėjimai per platformą", enabled: false },
                    { name: "Beta funkcijos", description: "Ankstyvos prieigos funkcionalumas", enabled: false },
                  ].map((module, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{module.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{module.description}</p>
                      </div>
                      <button
                        className={cn(
                          "relative w-12 h-6 rounded-full transition-colors shrink-0",
                          module.enabled ? "bg-primary" : "bg-muted"
                        )}
                      >
                        <span className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                          module.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Audit log section */}
            {activeSection === "audit" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Audit log</h1>
                  <p className="text-sm text-muted-foreground mt-1">Sistemos veiksmų istorija</p>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Ieškoti veiksmų..."
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <select className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Visi veiksmai</option>
                    <option>Prisijungimai</option>
                    <option>Pakeitimai</option>
                    <option>Ištrynimas</option>
                  </select>
                  <input
                    type="date"
                    className="px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Log entries */}
                <div className="bg-card border border-border rounded-xl divide-y divide-border">
                  {[
                    { action: "Vartotojas prisijungė", user: "jonas@greitas.lt", ip: "192.168.1.1", time: "2024-04-02 14:32:15" },
                    { action: "Įmonė patvirtinta", user: "admin@cargoflow.lt", ip: "192.168.1.2", time: "2024-04-02 14:28:00" },
                    { action: "Krovinys sukurtas", user: "petras@baltic.lt", ip: "192.168.1.3", time: "2024-04-02 14:15:30" },
                    { action: "Vartotojas užblokuotas", user: "admin@cargoflow.lt", ip: "192.168.1.2", time: "2024-04-02 13:45:00" },
                    { action: "Slaptažodis pakeistas", user: "ona@kroviniai.lt", ip: "192.168.1.4", time: "2024-04-02 12:30:00" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 p-4">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.user} · {log.ip}</p>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Default for other sections */}
            {!["dashboard", "activity", "companies", "users", "modules", "audit"].includes(activeSection) && (
              <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {ADMIN_SECTIONS.find(s => s.id === activeSection)?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">Šis skyrius dar kuriamas</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      {selectedCompany && (
        <CompanyApprovalModal
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
          onApprove={() => setSelectedCompany(null)}
          onReject={() => setSelectedCompany(null)}
        />
      )}

      {selectedDispute && (
        <DisputeModal
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
        />
      )}
    </div>
  )
}
