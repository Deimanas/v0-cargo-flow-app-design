"use client"

import { useState } from "react"
import {
  Flag,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Check,
  Ban,
  AlertTriangle,
  MessageSquare,
  User,
  Package,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const REPORTS = [
  { 
    id: 1, 
    type: "spam",
    typeLabel: "Šlamštas",
    targetType: "cargo",
    target: "CG-2024-1234",
    targetName: "Krovinys: Vilnius → Berlin",
    reporter: "Jonas Jonaitis",
    reporterCompany: "UAB Greitas",
    reason: "Skelbimas yra dublikatas, ta pati informacija pakartota kelis kartus.",
    status: "new",
    created: "2024-04-02 14:32",
  },
  { 
    id: 2, 
    type: "fraud",
    typeLabel: "Sukčiavimas",
    targetType: "company",
    target: "305123456",
    targetName: "UAB Fiktyvus Pervežimas",
    reporter: "Petras Petraitis",
    reporterCompany: "MB Kroviniai",
    reason: "Įmonė reikalauja avanso, bet nevykdo sutarties. Manau, kad tai sukčiai.",
    status: "investigating",
    created: "2024-04-01 09:15",
  },
  { 
    id: 3, 
    type: "inappropriate",
    typeLabel: "Netinkamas turinys",
    targetType: "user",
    target: "user-456",
    targetName: "Mindaugas M.",
    reporter: "Ona Onaitė",
    reporterCompany: "UAB Baltic",
    reason: "Vartotojas žinutėse naudoja necenzūrinius žodžius ir grasina.",
    status: "new",
    created: "2024-04-01 16:45",
  },
  { 
    id: 4, 
    type: "other",
    typeLabel: "Kita",
    targetType: "cargo",
    target: "CG-2024-1198",
    targetName: "Krovinys: Kaunas → Warsaw",
    reporter: "Gintarė G.",
    reporterCompany: "UAB Logistika",
    reason: "Skelbime nurodyta klaidinga kaina, tikroji kaina žymiai didesnė.",
    status: "resolved",
    created: "2024-03-30 11:00",
    resolution: "Skelbimas pataisytas, vartotojas įspėtas.",
  },
]

const STATUS_OPTIONS = [
  { value: "all", label: "Visi" },
  { value: "new", label: "Nauji" },
  { value: "investigating", label: "Tiriami" },
  { value: "resolved", label: "Išspręsti" },
  { value: "dismissed", label: "Atmesti" },
]

const TYPE_OPTIONS = [
  { value: "all", label: "Visi tipai" },
  { value: "spam", label: "Šlamštas" },
  { value: "fraud", label: "Sukčiavimas" },
  { value: "inappropriate", label: "Netinkamas turinys" },
  { value: "other", label: "Kita" },
]

const STATUS_CONFIG = {
  new: { label: "Naujas", class: "bg-red-50 text-red-700" },
  investigating: { label: "Tiriamas", class: "bg-blue-50 text-blue-700" },
  resolved: { label: "Išspręstas", class: "bg-emerald-50 text-emerald-700" },
  dismissed: { label: "Atmestas", class: "bg-slate-100 text-slate-600" },
}

const TYPE_CONFIG = {
  spam: { icon: MessageSquare, class: "bg-amber-50 text-amber-600" },
  fraud: { icon: AlertTriangle, class: "bg-red-50 text-red-600" },
  inappropriate: { icon: Ban, class: "bg-purple-50 text-purple-600" },
  other: { icon: Flag, class: "bg-slate-100 text-slate-600" },
}

const TARGET_ICON = {
  cargo: Package,
  company: Building2,
  user: User,
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<typeof REPORTS[0] | null>(null)
  const [resolution, setResolution] = useState("")

  const filteredReports = REPORTS.filter(report => {
    const matchesSearch = report.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          report.reporter.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reportai</h1>
        <p className="text-sm text-muted-foreground mt-1">Peržiūrėkite ir administruokite vartotojų skundus</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">45</p>
          <p className="text-sm text-muted-foreground">Viso reportų</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-red-600">12</p>
          <p className="text-sm text-muted-foreground">Nauji</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-600">8</p>
          <p className="text-sm text-muted-foreground">Tiriami</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-600">25</p>
          <p className="text-sm text-muted-foreground">Išspręsti</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Ieškoti..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {TYPE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Reports List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {filteredReports.map(report => {
            const status = STATUS_CONFIG[report.status as keyof typeof STATUS_CONFIG]
            const type = TYPE_CONFIG[report.type as keyof typeof TYPE_CONFIG]
            const TargetIcon = TARGET_ICON[report.targetType as keyof typeof TARGET_ICON]
            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-4 hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", type.class)}>
                    <type.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-medium text-foreground">{report.typeLabel}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", status.class)}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <TargetIcon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-foreground">{report.targetName}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{report.reason}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-muted-foreground">{report.created}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pranešė: {report.reporter}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Rodoma {filteredReports.length} iš {REPORTS.length} reportų
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">1</button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSelectedReport(null)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  TYPE_CONFIG[selectedReport.type as keyof typeof TYPE_CONFIG].class
                )}>
                  {(() => {
                    const Icon = TYPE_CONFIG[selectedReport.type as keyof typeof TYPE_CONFIG].icon
                    return <Icon className="w-5 h-5" />
                  })()}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{selectedReport.typeLabel}</h2>
                  <p className="text-sm text-muted-foreground">Reportas #{selectedReport.id}</p>
                </div>
              </div>
              <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  STATUS_CONFIG[selectedReport.status as keyof typeof STATUS_CONFIG].class
                )}>
                  {STATUS_CONFIG[selectedReport.status as keyof typeof STATUS_CONFIG].label}
                </span>
              </div>

              <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Pranešimo objektas</p>
                <div className="flex items-center gap-2">
                  {(() => {
                    const Icon = TARGET_ICON[selectedReport.targetType as keyof typeof TARGET_ICON]
                    return <Icon className="w-4 h-4 text-muted-foreground" />
                  })()}
                  <span className="text-sm font-medium text-foreground">{selectedReport.targetName}</span>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Pranešė</p>
                <p className="text-sm text-foreground">{selectedReport.reporter}</p>
                <p className="text-xs text-muted-foreground">{selectedReport.reporterCompany}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Priežastis</p>
                <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">{selectedReport.reason}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Pateikta</p>
                <p className="text-sm text-foreground">{selectedReport.created}</p>
              </div>

              {selectedReport.resolution && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">Sprendimas</p>
                  </div>
                  <p className="text-sm text-emerald-700">{selectedReport.resolution}</p>
                </div>
              )}

              {selectedReport.status !== "resolved" && selectedReport.status !== "dismissed" && (
                <div className="space-y-3">
                  <textarea
                    value={resolution}
                    onChange={e => setResolution(e.target.value)}
                    placeholder="Įveskite sprendimą..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}
            </div>

            {selectedReport.status !== "resolved" && selectedReport.status !== "dismissed" && (
              <div className="p-4 border-t border-border flex items-center gap-3 shrink-0">
                <button className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
                  Atmesti
                </button>
                <button className="flex-1 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  Peržiūrėti objektą
                </button>
                <button className="flex-1 py-2.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  Išspręsti
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
