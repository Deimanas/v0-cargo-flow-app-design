"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Eye,
  Ban,
  Download,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

const STATUS_OPTIONS = [
  { value: "all", label: "Visos" },
  { value: "active", label: "Aktyvios" },
  { value: "pending", label: "Laukiančios" },
  { value: "blocked", label: "Užblokuotos" },
  { value: "rejected", label: "Atmestos" },
]

const TYPE_OPTIONS = [
  { value: "all", label: "Visi tipai" },
  { value: "carrier", label: "Vežėjas" },
  { value: "forwarder", label: "Ekspeditorius" },
  { value: "sender", label: "Siuntėjas" },
]

const COMPANIES = [
  { id: 1, name: "UAB Greitas Pervežimas", code: "305123456", type: "carrier", status: "active", users: 12, cargo: 45, rating: 4.8, created: "2023-05-12" },
  { id: 2, name: "MB Kroviniai LT", code: "305789012", type: "forwarder", status: "pending", users: 3, cargo: 0, rating: null, created: "2024-04-01" },
  { id: 3, name: "UAB Baltic Transport", code: "305345678", type: "carrier", status: "active", users: 8, cargo: 123, rating: 4.5, created: "2022-11-20" },
  { id: 4, name: "UAB Logistika Pro", code: "305901234", type: "forwarder", status: "pending", users: 2, cargo: 0, rating: null, created: "2024-03-30" },
  { id: 5, name: "MB Express Cargo", code: "305567890", type: "carrier", status: "blocked", users: 5, cargo: 67, rating: 3.2, created: "2023-02-15" },
  { id: 6, name: "UAB Siuntų Centras", code: "305234567", type: "sender", status: "active", users: 15, cargo: 234, rating: 4.9, created: "2021-08-03" },
  { id: 7, name: "MB Greitas Pristatymas", code: "305678901", type: "carrier", status: "rejected", users: 1, cargo: 0, rating: null, created: "2024-03-25" },
  { id: 8, name: "UAB Cargo Master", code: "305012345", type: "forwarder", status: "active", users: 7, cargo: 89, rating: 4.3, created: "2023-09-10" },
]

const STATUS_CONFIG = {
  active: { label: "Aktyvi", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "Laukia", class: "bg-amber-50 text-amber-700 border-amber-200" },
  blocked: { label: "Užblokuota", class: "bg-red-50 text-red-700 border-red-200" },
  rejected: { label: "Atmesta", class: "bg-slate-100 text-slate-600 border-slate-200" },
}

const TYPE_CONFIG = {
  carrier: { label: "Vežėjas" },
  forwarder: { label: "Ekspeditorius" },
  sender: { label: "Siuntėjas" },
}

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([])

  const filteredCompanies = COMPANIES.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          company.code.includes(searchQuery)
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    const matchesType = typeFilter === "all" || company.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const toggleSelect = (id: number) => {
    setSelectedCompanies(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(filteredCompanies.map(c => c.id))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Įmonės</h1>
          <p className="text-sm text-muted-foreground mt-1">Valdykite registruotas įmones</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Eksportuoti
          </button>
          <button className="px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Pridėti įmonę
          </button>
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
            placeholder="Ieškoti pagal pavadinimą ar kodą..."
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

      {/* Bulk Actions */}
      {selectedCompanies.length > 0 && (
        <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <span className="text-sm font-medium text-foreground">
            Pasirinkta: {selectedCompanies.length}
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
                    checked={selectedCompanies.length === filteredCompanies.length && filteredCompanies.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-border"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Įmonė
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Tipas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Statusas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Vartotojai
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Kroviniai
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Reitingas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Registracija
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCompanies.map(company => {
                const status = STATUS_CONFIG[company.status as keyof typeof STATUS_CONFIG]
                const type = TYPE_CONFIG[company.type as keyof typeof TYPE_CONFIG]
                return (
                  <tr key={company.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(company.id)}
                        onChange={() => toggleSelect(company.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/administravimas/imones/${company.id}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            {company.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{company.code}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{type.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                        status.class
                      )}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{company.users}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{company.cargo}</span>
                    </td>
                    <td className="px-4 py-3">
                      {company.rating ? (
                        <span className="text-sm font-medium text-foreground">{company.rating}</span>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">{company.created}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/administravimas/imones/${company.id}`}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Peržiūrėti"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Link>
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
            Rodoma {filteredCompanies.length} iš {COMPANIES.length} įmonių
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted rounded-lg transition-colors">
              3
            </button>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
