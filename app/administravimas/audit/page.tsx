"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Building2,
  Package,
  Shield,
  AlertTriangle,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogIn,
  LogOut,
  Ban,
  Check,
  X,
  RefreshCw,
  FileText,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Audit log event types
const EVENT_TYPES = {
  auth: { label: "Autentifikacija", icon: LogIn, color: "bg-slate-500" },
  user: { label: "Vartotojas", icon: User, color: "bg-blue-500" },
  company: { label: "Įmonė", icon: Building2, color: "bg-emerald-500" },
  cargo: { label: "Krovinys", icon: Package, color: "bg-amber-500" },
  dispute: { label: "Ginčas", icon: AlertTriangle, color: "bg-red-500" },
  admin: { label: "Administravimas", icon: Shield, color: "bg-purple-500" },
  system: { label: "Sistema", icon: Settings, color: "bg-slate-400" },
}

const ACTIONS = {
  create: { label: "Sukurta", icon: Plus, color: "text-emerald-600 bg-emerald-50" },
  update: { label: "Atnaujinta", icon: Edit, color: "text-blue-600 bg-blue-50" },
  delete: { label: "Ištrinta", icon: Trash2, color: "text-red-600 bg-red-50" },
  view: { label: "Peržiūrėta", icon: Eye, color: "text-slate-600 bg-slate-50" },
  login: { label: "Prisijungimas", icon: LogIn, color: "text-emerald-600 bg-emerald-50" },
  logout: { label: "Atsijungimas", icon: LogOut, color: "text-slate-600 bg-slate-50" },
  approve: { label: "Patvirtinta", icon: Check, color: "text-emerald-600 bg-emerald-50" },
  reject: { label: "Atmesta", icon: X, color: "text-red-600 bg-red-50" },
  block: { label: "Užblokuota", icon: Ban, color: "text-red-600 bg-red-50" },
  unblock: { label: "Atblokuota", icon: RefreshCw, color: "text-emerald-600 bg-emerald-50" },
  export: { label: "Eksportuota", icon: Download, color: "text-blue-600 bg-blue-50" },
}

// Mock audit log data
const AUDIT_LOGS = [
  {
    id: "AL-001",
    timestamp: "2024-04-02 14:32:15",
    type: "company" as const,
    action: "approve" as const,
    actor: { id: "U-001", name: "Admin Petras", role: "admin" },
    target: { type: "company", id: "C-123", name: "UAB Greitas Pervežimas" },
    details: "Patvirtinta įmonės registracija",
    ip: "192.168.1.100",
    userAgent: "Chrome 122 / Windows",
    changes: { status: { from: "pending", to: "active" } },
  },
  {
    id: "AL-002",
    timestamp: "2024-04-02 14:28:43",
    type: "user" as const,
    action: "block" as const,
    actor: { id: "U-001", name: "Admin Petras", role: "admin" },
    target: { type: "user", id: "U-456", name: "Jonas Jonaitis" },
    details: "Vartotojas užblokuotas dėl pažeidimų",
    ip: "192.168.1.100",
    userAgent: "Chrome 122 / Windows",
    changes: { status: { from: "active", to: "blocked" }, reason: "Pakartotiniai mokėjimo pažeidimai" },
  },
  {
    id: "AL-003",
    timestamp: "2024-04-02 14:15:22",
    type: "cargo" as const,
    action: "delete" as const,
    actor: { id: "U-002", name: "Moderator Ona", role: "moderator" },
    target: { type: "cargo", id: "CG-789", name: "Vilnius → Berlin" },
    details: "Pašalintas netinkamas skelbimas",
    ip: "192.168.1.105",
    userAgent: "Firefox 123 / macOS",
    changes: null,
  },
  {
    id: "AL-004",
    timestamp: "2024-04-02 13:45:10",
    type: "auth" as const,
    action: "login" as const,
    actor: { id: "U-001", name: "Admin Petras", role: "admin" },
    target: null,
    details: "Sėkmingas prisijungimas",
    ip: "192.168.1.100",
    userAgent: "Chrome 122 / Windows",
    changes: null,
  },
  {
    id: "AL-005",
    timestamp: "2024-04-02 13:30:55",
    type: "dispute" as const,
    action: "update" as const,
    actor: { id: "U-002", name: "Moderator Ona", role: "moderator" },
    target: { type: "dispute", id: "D-089", name: "UAB Greitas vs MB Kroviniai" },
    details: "Atnaujintas ginčo statusas",
    ip: "192.168.1.105",
    userAgent: "Firefox 123 / macOS",
    changes: { status: { from: "open", to: "in_review" }, assignee: { from: null, to: "Moderator Ona" } },
  },
  {
    id: "AL-006",
    timestamp: "2024-04-02 12:20:33",
    type: "admin" as const,
    action: "update" as const,
    actor: { id: "U-003", name: "Super Admin", role: "superadmin" },
    target: { type: "settings", id: "MOD-001", name: "Modulių nustatymai" },
    details: "Įjungtas naujas modulis: ADR kroviniai",
    ip: "192.168.1.1",
    userAgent: "Chrome 122 / Linux",
    changes: { "modules.adr": { from: false, to: true } },
  },
  {
    id: "AL-007",
    timestamp: "2024-04-02 11:55:18",
    type: "company" as const,
    action: "reject" as const,
    actor: { id: "U-001", name: "Admin Petras", role: "admin" },
    target: { type: "company", id: "C-124", name: "UAB Fake Transport" },
    details: "Atmesta įmonės registracija - netikri dokumentai",
    ip: "192.168.1.100",
    userAgent: "Chrome 122 / Windows",
    changes: { status: { from: "pending", to: "rejected" }, reason: "Dokumentai neatitinka" },
  },
  {
    id: "AL-008",
    timestamp: "2024-04-02 11:30:00",
    type: "user" as const,
    action: "create" as const,
    actor: { id: "SYSTEM", name: "Sistema", role: "system" },
    target: { type: "user", id: "U-789", name: "naujas@vartotojas.lt" },
    details: "Naujas vartotojas užsiregistravo",
    ip: "85.206.xxx.xxx",
    userAgent: "Safari 17 / iOS",
    changes: null,
  },
  {
    id: "AL-009",
    timestamp: "2024-04-02 10:45:22",
    type: "cargo" as const,
    action: "create" as const,
    actor: { id: "U-456", name: "Jonas Jonaitis", role: "user" },
    target: { type: "cargo", id: "CG-1234", name: "Vilnius → Klaipėda" },
    details: "Sukurtas naujas krovinys",
    ip: "78.60.xxx.xxx",
    userAgent: "Chrome 122 / Android",
    changes: null,
  },
  {
    id: "AL-010",
    timestamp: "2024-04-02 10:15:00",
    type: "system" as const,
    action: "export" as const,
    actor: { id: "U-003", name: "Super Admin", role: "superadmin" },
    target: { type: "report", id: "RPT-001", name: "Mėnesinė ataskaita" },
    details: "Eksportuota mėnesinė ataskaita",
    ip: "192.168.1.1",
    userAgent: "Chrome 122 / Linux",
    changes: null,
  },
]

const FILTER_TYPES = [
  { id: "all", label: "Visi" },
  { id: "auth", label: "Autentifikacija" },
  { id: "user", label: "Vartotojai" },
  { id: "company", label: "Įmonės" },
  { id: "cargo", label: "Kroviniai" },
  { id: "dispute", label: "Ginčai" },
  { id: "admin", label: "Administravimas" },
  { id: "system", label: "Sistema" },
]

const FILTER_ACTIONS = [
  { id: "all", label: "Visi veiksmai" },
  { id: "create", label: "Sukurta" },
  { id: "update", label: "Atnaujinta" },
  { id: "delete", label: "Ištrinta" },
  { id: "approve", label: "Patvirtinta" },
  { id: "reject", label: "Atmesta" },
  { id: "block", label: "Užblokuota" },
  { id: "login", label: "Prisijungimas" },
]

export default function AuditLogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [expandedLog, setExpandedLog] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const filteredLogs = AUDIT_LOGS.filter(log => {
    if (typeFilter !== "all" && log.type !== typeFilter) return false
    if (actionFilter !== "all" && log.action !== actionFilter) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const matchesActor = log.actor.name.toLowerCase().includes(q)
      const matchesTarget = log.target?.name?.toLowerCase().includes(q) || false
      const matchesDetails = log.details.toLowerCase().includes(q)
      const matchesId = log.id.toLowerCase().includes(q)
      if (!matchesActor && !matchesTarget && !matchesDetails && !matchesId) return false
    }
    return true
  })

  const totalPages = Math.ceil(filteredLogs.length / 10)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Sistemos veiksmų istorija ir stebėjimas</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            Eksportuoti
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">{AUDIT_LOGS.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Viso įrašų šiandien</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">{AUDIT_LOGS.filter(l => l.action === "login").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Prisijungimai</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">{AUDIT_LOGS.filter(l => ["create", "update", "delete"].includes(l.action)).length}</p>
          <p className="text-xs text-muted-foreground mt-1">Pakeitimai</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">{AUDIT_LOGS.filter(l => l.actor.role === "admin" || l.actor.role === "superadmin").length}</p>
          <p className="text-xs text-muted-foreground mt-1">Admin veiksmai</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Ieškoti pagal vartotoją, veiksmą, ID..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Type filter */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="appearance-none w-full lg:w-44 pl-3 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {FILTER_TYPES.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Action filter */}
          <div className="relative">
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="appearance-none w-full lg:w-44 pl-3 pr-10 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
            >
              {FILTER_ACTIONS.map(action => (
                <option key={action.id} value={action.id}>{action.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full lg:w-36 pl-10 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <span className="text-muted-foreground">—</span>
            <input
              type="date"
              value={dateTo}
              onChange={e => setDateTo(e.target.value)}
              className="w-full lg:w-36 px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Active filters */}
        {(typeFilter !== "all" || actionFilter !== "all" || searchQuery) && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Aktyvūs filtrai:</span>
            {typeFilter !== "all" && (
              <button
                type="button"
                onClick={() => setTypeFilter("all")}
                className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {FILTER_TYPES.find(t => t.id === typeFilter)?.label}
                <X className="w-3 h-3" />
              </button>
            )}
            {actionFilter !== "all" && (
              <button
                type="button"
                onClick={() => setActionFilter("all")}
                className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                {FILTER_ACTIONS.find(a => a.id === actionFilter)?.label}
                <X className="w-3 h-3" />
              </button>
            )}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
              >
                &quot;{searchQuery}&quot;
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              onClick={() => { setTypeFilter("all"); setActionFilter("all"); setSearchQuery(""); setDateFrom(""); setDateTo("") }}
              className="text-xs text-muted-foreground hover:text-foreground ml-2"
            >
              Išvalyti viską
            </button>
          </div>
        )}
      </div>

      {/* Audit Log Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Laikas</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Tipas</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Veiksmas</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Vartotojas</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">Objektas</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">IP</th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLogs.map(log => {
                const eventType = EVENT_TYPES[log.type]
                const actionType = ACTIONS[log.action]
                const isExpanded = expandedLog === log.id

                return (
                  <>
                    <tr 
                      key={log.id}
                      className={cn(
                        "hover:bg-muted/30 transition-colors cursor-pointer",
                        isExpanded && "bg-muted/20"
                      )}
                      onClick={() => setExpandedLog(isExpanded ? null : log.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                          <div>
                            <p className="text-sm text-foreground font-medium">{log.timestamp.split(" ")[1]}</p>
                            <p className="text-xs text-muted-foreground">{log.timestamp.split(" ")[0]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", eventType.color)}>
                            <eventType.icon className="w-3.5 h-3.5 text-white" />
                          </div>
                          <span className="text-sm text-foreground">{eventType.label}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", actionType.color)}>
                          <actionType.icon className="w-3 h-3" />
                          {actionType.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{log.actor.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">{log.actor.role}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {log.target ? (
                          <div>
                            <p className="text-sm text-foreground truncate max-w-[200px]">{log.target.name}</p>
                            <p className="text-xs text-muted-foreground">{log.target.id}</p>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground font-mono">{log.ip}</span>
                      </td>
                      <td className="px-4 py-3">
                        <ChevronDown className={cn(
                          "w-4 h-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-180"
                        )} />
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr key={`${log.id}-details`} className="bg-muted/10">
                        <td colSpan={7} className="px-4 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Details */}
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Aprašymas</h4>
                              <p className="text-sm text-foreground">{log.details}</p>
                              <p className="text-xs text-muted-foreground mt-2">ID: {log.id}</p>
                            </div>

                            {/* Device */}
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Įrenginys</h4>
                              <p className="text-sm text-foreground">{log.userAgent}</p>
                              <p className="text-xs text-muted-foreground mt-1">IP: {log.ip}</p>
                            </div>

                            {/* Changes */}
                            <div>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Pakeitimai</h4>
                              {log.changes ? (
                                <div className="space-y-1.5">
                                  {Object.entries(log.changes).map(([key, value]) => {
                                    if (typeof value === "object" && value !== null && "from" in value && "to" in value) {
                                      return (
                                        <div key={key} className="text-sm">
                                          <span className="text-muted-foreground">{key}: </span>
                                          <span className="text-red-500 line-through">{String(value.from) || "null"}</span>
                                          <span className="text-muted-foreground mx-1">→</span>
                                          <span className="text-emerald-600 font-medium">{String(value.to)}</span>
                                        </div>
                                      )
                                    }
                                    return (
                                      <div key={key} className="text-sm">
                                        <span className="text-muted-foreground">{key}: </span>
                                        <span className="text-foreground">{String(value)}</span>
                                      </div>
                                    )
                                  })}
                                </div>
                              ) : (
                                <p className="text-xs text-muted-foreground">Nėra pakeitimų</p>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Rodoma <span className="font-medium text-foreground">{filteredLogs.length}</span> iš <span className="font-medium text-foreground">{AUDIT_LOGS.length}</span> įrašų
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-muted-foreground">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
