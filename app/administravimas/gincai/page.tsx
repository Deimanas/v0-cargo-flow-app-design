"use client"

import { useState } from "react"
import {
  AlertTriangle,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  MessageSquare,
  FileText,
  Clock,
  Check,
  User,
  Building2,
  Package,
} from "lucide-react"
import { cn } from "@/lib/utils"

const DISPUTES = [
  { 
    id: "D-2024-089", 
    parties: { plaintiff: "UAB Greitas Pervežimas", defendant: "MB Kroviniai LT" },
    type: "payment",
    typeLabel: "Mokėjimas",
    status: "open",
    priority: "high",
    amount: "2,450 EUR",
    cargoId: "CG-1234",
    created: "2024-04-01",
    lastUpdate: "2024-04-02 14:32",
    description: "Vežėjas atlikęs pervežimą, tačiau mokėjimas nebuvo gautas per sutartą terminą.",
  },
  { 
    id: "D-2024-088", 
    parties: { plaintiff: "UAB Baltic Transport", defendant: "UAB Express Cargo" },
    type: "damage",
    typeLabel: "Sugadintas krovinys",
    status: "investigating",
    priority: "high",
    amount: "5,200 EUR",
    cargoId: "CG-1198",
    created: "2024-03-28",
    lastUpdate: "2024-04-01 09:15",
    description: "Krovinys pristatytas sugadintas. Užsakovas reikalauja kompensacijos.",
  },
  { 
    id: "D-2024-087", 
    parties: { plaintiff: "MB Trans Express", defendant: "UAB Cargo Master" },
    type: "delay",
    typeLabel: "Vėlavimas",
    status: "pending_response",
    priority: "medium",
    amount: "890 EUR",
    cargoId: "CG-1156",
    created: "2024-03-25",
    lastUpdate: "2024-03-30 16:45",
    description: "Krovinys pristatytas su 3 dienų vėlavimu, dėl ko užsakovas patyrė nuostolių.",
  },
  { 
    id: "D-2024-086", 
    parties: { plaintiff: "UAB Logistika Pro", defendant: "MB Greitas Pristatymas" },
    type: "contract",
    typeLabel: "Sutarties pažeidimas",
    status: "resolved",
    priority: "low",
    amount: "1,200 EUR",
    cargoId: "CG-1089",
    created: "2024-03-20",
    lastUpdate: "2024-03-28 11:00",
    description: "Ginčas dėl sutarties sąlygų nesilaikymo.",
    resolution: "Šalys susitarė dėl dalinės kompensacijos (600 EUR).",
  },
]

const MESSAGES = [
  { id: 1, author: "Jonas Jonaitis", company: "UAB Greitas Pervežimas", role: "plaintiff", text: "Krovinys buvo pristatytas 2024-03-28, tačiau mokėjimas iki šiol negautas.", time: "2024-04-01 10:15" },
  { id: 2, author: "Petras Petraitis", company: "MB Kroviniai LT", role: "defendant", text: "Mokėjimo terminas yra 30 dienų nuo sąskaitos gavimo. Sąskaita gauta tik 2024-03-30.", time: "2024-04-01 14:32" },
  { id: 3, author: "Admin", company: "CargoFlow", role: "admin", text: "Prašome pateikti sąskaitos išrašymo ir išsiuntimo patvirtinimą.", time: "2024-04-02 09:00" },
]

const STATUS_OPTIONS = [
  { value: "all", label: "Visi" },
  { value: "open", label: "Atidaryti" },
  { value: "investigating", label: "Tiriami" },
  { value: "pending_response", label: "Laukia atsakymo" },
  { value: "resolved", label: "Išspręsti" },
]

const TYPE_OPTIONS = [
  { value: "all", label: "Visi tipai" },
  { value: "payment", label: "Mokėjimas" },
  { value: "damage", label: "Sugadintas krovinys" },
  { value: "delay", label: "Vėlavimas" },
  { value: "contract", label: "Sutartis" },
]

const STATUS_CONFIG = {
  open: { label: "Atidarytas", class: "bg-red-50 text-red-700" },
  investigating: { label: "Tiriamas", class: "bg-blue-50 text-blue-700" },
  pending_response: { label: "Laukia atsakymo", class: "bg-amber-50 text-amber-700" },
  resolved: { label: "Išspręstas", class: "bg-emerald-50 text-emerald-700" },
}

const PRIORITY_CONFIG = {
  high: { label: "Aukštas", class: "bg-red-500" },
  medium: { label: "Vidutinis", class: "bg-amber-500" },
  low: { label: "Žemas", class: "bg-slate-400" },
}

export default function DisputesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedDispute, setSelectedDispute] = useState<typeof DISPUTES[0] | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [resolution, setResolution] = useState("")

  const filteredDisputes = DISPUTES.filter(dispute => {
    const matchesSearch = dispute.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dispute.parties.plaintiff.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dispute.parties.defendant.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dispute.status === statusFilter
    const matchesType = typeFilter === "all" || dispute.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Ginčai</h1>
        <p className="text-sm text-muted-foreground mt-1">Valdykite ir spręskite sistemos ginčus</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">23</p>
          <p className="text-sm text-muted-foreground">Viso ginčų</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-red-600">7</p>
          <p className="text-sm text-muted-foreground">Atidaryti</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-blue-600">5</p>
          <p className="text-sm text-muted-foreground">Tiriami</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-600">11</p>
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
            placeholder="Ieškoti pagal ID ar įmonę..."
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

      {/* Disputes List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="divide-y divide-border">
          {filteredDisputes.map(dispute => {
            const status = STATUS_CONFIG[dispute.status as keyof typeof STATUS_CONFIG]
            const priority = PRIORITY_CONFIG[dispute.priority as keyof typeof PRIORITY_CONFIG]
            return (
              <div
                key={dispute.id}
                onClick={() => setSelectedDispute(dispute)}
                className="p-4 hover:bg-muted/20 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className={cn("w-1 h-16 rounded-full shrink-0", priority.class)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold text-foreground">{dispute.id}</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", status.class)}>
                        {status.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{dispute.typeLabel}</span>
                    </div>
                    <p className="text-sm text-foreground mb-1">
                      {dispute.parties.plaintiff} <span className="text-muted-foreground">vs</span> {dispute.parties.defendant}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{dispute.description}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-sm font-semibold text-foreground">{dispute.amount}</p>
                    <p className="text-xs text-muted-foreground">{dispute.created}</p>
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
            Rodoma {filteredDisputes.length} iš {DISPUTES.length} ginčų
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

      {/* Dispute Detail Sidebar */}
      {selectedDispute && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setSelectedDispute(null)} />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-xl bg-card border-l border-border shadow-xl z-50 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-semibold text-foreground">{selectedDispute.id}</h2>
                <p className="text-sm text-muted-foreground">{selectedDispute.typeLabel}</p>
              </div>
              <button onClick={() => setSelectedDispute(null)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Status & Priority */}
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  STATUS_CONFIG[selectedDispute.status as keyof typeof STATUS_CONFIG].class
                )}>
                  {STATUS_CONFIG[selectedDispute.status as keyof typeof STATUS_CONFIG].label}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className={cn("w-2 h-2 rounded-full", PRIORITY_CONFIG[selectedDispute.priority as keyof typeof PRIORITY_CONFIG].class)} />
                  {PRIORITY_CONFIG[selectedDispute.priority as keyof typeof PRIORITY_CONFIG].label} prioritetas
                </span>
              </div>

              {/* Parties */}
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ieškovas</p>
                    <p className="text-sm font-medium text-foreground">{selectedDispute.parties.plaintiff}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Atsakovas</p>
                    <p className="text-sm font-medium text-foreground">{selectedDispute.parties.defendant}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Suma</p>
                  <p className="text-lg font-semibold text-foreground">{selectedDispute.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Krovinys</p>
                  <p className="text-sm font-medium text-primary">{selectedDispute.cargoId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Sukurta</p>
                  <p className="text-sm text-foreground">{selectedDispute.created}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Atnaujinta</p>
                  <p className="text-sm text-foreground">{selectedDispute.lastUpdate}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Aprašymas</p>
                <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">{selectedDispute.description}</p>
              </div>

              {/* Resolution if exists */}
              {selectedDispute.resolution && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-700">Sprendimas</p>
                  </div>
                  <p className="text-sm text-emerald-700">{selectedDispute.resolution}</p>
                </div>
              )}

              {/* Messages */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <p className="text-sm font-medium text-foreground">Diskusija</p>
                </div>
                <div className="space-y-3">
                  {MESSAGES.map(msg => (
                    <div key={msg.id} className={cn(
                      "rounded-xl p-3",
                      msg.role === "admin" ? "bg-primary/5 border border-primary/20" : "bg-muted/30"
                    )}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{msg.author}</span>
                        <span className="text-xs text-muted-foreground">{msg.company}</span>
                      </div>
                      <p className="text-sm text-foreground">{msg.text}</p>
                      <p className="text-xs text-muted-foreground mt-2">{msg.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Message */}
              {selectedDispute.status !== "resolved" && (
                <div>
                  <textarea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Rašyti žinutę..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="mt-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                    Siųsti žinutę
                  </button>
                </div>
              )}

              {/* Resolve */}
              {selectedDispute.status !== "resolved" && (
                <div className="border-t border-border pt-6">
                  <p className="text-sm font-medium text-foreground mb-2">Išspręsti ginčą</p>
                  <textarea
                    value={resolution}
                    onChange={e => setResolution(e.target.value)}
                    placeholder="Įveskite ginčo sprendimą..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button className="mt-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Pažymėti kaip išspręstą
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
