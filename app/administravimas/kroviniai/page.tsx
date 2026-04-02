"use client"

import { useState } from "react"
import {
  Package,
  Search,
  ChevronRight,
  ChevronLeft,
  Eye,
  Ban,
  Check,
  MoreHorizontal,
  Download,
  MapPin,
  Calendar,
  Truck,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CARGO = [
  { id: "CG-2024-1234", from: "Vilnius, LT", to: "Berlin, DE", company: "UAB Greitas", type: "Tentinis", weight: "12 t", price: "1,850 EUR", status: "active", created: "2024-04-02", expires: "2024-04-09" },
  { id: "CG-2024-1233", from: "Kaunas, LT", to: "Warsaw, PL", company: "MB Kroviniai", type: "Refri", weight: "8 t", price: "920 EUR", status: "pending", created: "2024-04-02", expires: "2024-04-08" },
  { id: "CG-2024-1232", from: "Klaipėda, LT", to: "Hamburg, DE", company: "UAB Baltic", type: "Konteineris", weight: "20 t", price: "2,340 EUR", status: "active", created: "2024-04-01", expires: "2024-04-10" },
  { id: "CG-2024-1231", from: "Riga, LV", to: "Munich, DE", company: "UAB Express", type: "Tentinis", weight: "15 t", price: "1,560 EUR", status: "completed", created: "2024-03-30", expires: "2024-04-05" },
  { id: "CG-2024-1230", from: "Tallinn, EE", to: "Prague, CZ", company: "MB Trans", type: "Platforminis", weight: "25 t", price: "2,890 EUR", status: "blocked", created: "2024-03-29", expires: "2024-04-04" },
  { id: "CG-2024-1229", from: "Vilnius, LT", to: "Amsterdam, NL", company: "UAB Logistika", type: "Tentinis", weight: "10 t", price: "1,450 EUR", status: "active", created: "2024-03-28", expires: "2024-04-06" },
]

const STATUS_OPTIONS = [
  { value: "all", label: "Visi" },
  { value: "active", label: "Aktyvūs" },
  { value: "pending", label: "Laukiantys" },
  { value: "completed", label: "Užbaigti" },
  { value: "blocked", label: "Užblokuoti" },
]

const STATUS_CONFIG = {
  active: { label: "Aktyvus", class: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Laukia", class: "bg-amber-50 text-amber-700" },
  completed: { label: "Užbaigtas", class: "bg-slate-100 text-slate-600" },
  blocked: { label: "Užblokuotas", class: "bg-red-50 text-red-700" },
}

export default function AdminCargoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCargo, setSelectedCargo] = useState<string[]>([])

  const filteredCargo = CARGO.filter(cargo => {
    const matchesSearch = cargo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cargo.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cargo.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          cargo.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || cargo.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelect = (id: string) => {
    setSelectedCargo(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const toggleSelectAll = () => {
    if (selectedCargo.length === filteredCargo.length) {
      setSelectedCargo([])
    } else {
      setSelectedCargo(filteredCargo.map(c => c.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kroviniai</h1>
          <p className="text-sm text-muted-foreground mt-1">Administratoriaus krovinių valdymas</p>
        </div>
        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Eksportuoti
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">1,234</p>
          <p className="text-sm text-muted-foreground">Viso krovinių</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-600">456</p>
          <p className="text-sm text-muted-foreground">Aktyvūs</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-600">78</p>
          <p className="text-sm text-muted-foreground">Laukiantys</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-red-600">12</p>
          <p className="text-sm text-muted-foreground">Užblokuoti</p>
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
            placeholder="Ieškoti pagal ID, maršrutą ar įmonę..."
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
      </div>

      {/* Bulk Actions */}
      {selectedCargo.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            Pasirinkta: {selectedCargo.length}
          </span>
          <div className="flex-1" />
          <button className="px-3 py-1.5 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            Patvirtinti
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5">
            <Ban className="w-4 h-4" />
            Blokuoti
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCargo.length === filteredCargo.length && filteredCargo.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  ID / Maršrutas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Įmonė
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tipas / Svoris
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Kaina
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Statusas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Galioja iki
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCargo.map(cargo => {
                const status = STATUS_CONFIG[cargo.status as keyof typeof STATUS_CONFIG]
                return (
                  <tr key={cargo.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCargo.includes(cargo.id)}
                        onChange={() => toggleSelect(cargo.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{cargo.id}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {cargo.from} → {cargo.to}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{cargo.company}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-foreground">{cargo.type}</p>
                          <p className="text-xs text-muted-foreground">{cargo.weight}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-foreground">{cargo.price}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", status.class)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {cargo.expires}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Peržiūrėti">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Daugiau">
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Rodoma {filteredCargo.length} iš {CARGO.length} krovinių
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">1</button>
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg">2</button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
