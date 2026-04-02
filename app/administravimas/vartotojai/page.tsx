"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  Search,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  Ban,
  Mail,
  Shield,
  Eye,
  Download,
  X,
  UserCog,
} from "lucide-react"
import { cn } from "@/lib/utils"

const USERS = [
  { id: 1, name: "Jonas Jonaitis", email: "jonas@greitaspervezimas.lt", company: "UAB Greitas Pervežimas", role: "admin", status: "active", responseRate: 98, lastLogin: "2024-04-02 14:32" },
  { id: 2, name: "Petras Petraitis", email: "petras@kroviniai.lt", company: "MB Kroviniai LT", role: "manager", status: "active", responseRate: 95, lastLogin: "2024-04-02 09:15" },
  { id: 3, name: "Ona Onaitė", email: "ona@baltic.lt", company: "UAB Baltic Transport", role: "driver", status: "active", responseRate: 87, lastLogin: "2024-04-01 18:45" },
  { id: 4, name: "Mindaugas Mindaugaitis", email: "mindaugas@express.lt", company: "UAB Express Cargo", role: "admin", status: "blocked", responseRate: 45, lastLogin: "2024-03-15 10:20" },
  { id: 5, name: "Gintarė Gintaraitė", email: "gintare@logistika.lt", company: "UAB Logistika Pro", role: "manager", status: "pending", responseRate: null, lastLogin: null },
  { id: 6, name: "Vytautas Vytautaitis", email: "vytautas@cargo.lt", company: "UAB Cargo Master", role: "driver", status: "active", responseRate: 92, lastLogin: "2024-04-02 16:00" },
  { id: 7, name: "Rasa Rasaitė", email: "rasa@siuntai.lt", company: "UAB Siuntų Centras", role: "admin", status: "active", responseRate: 99, lastLogin: "2024-04-02 11:45" },
  { id: 8, name: "Darius Dariaitis", email: "darius@trans.lt", company: "MB Trans Express", role: "manager", status: "suspended", responseRate: 78, lastLogin: "2024-03-28 09:30" },
]

const STATUS_OPTIONS = [
  { value: "all", label: "Visi" },
  { value: "active", label: "Aktyvūs" },
  { value: "pending", label: "Laukiantys" },
  { value: "blocked", label: "Užblokuoti" },
  { value: "suspended", label: "Sustabdyti" },
]

const ROLE_OPTIONS = [
  { value: "all", label: "Visos rolės" },
  { value: "admin", label: "Administratorius" },
  { value: "manager", label: "Vadybininkas" },
  { value: "driver", label: "Vairuotojas" },
]

const STATUS_CONFIG = {
  active: { label: "Aktyvus", class: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Laukia", class: "bg-amber-50 text-amber-700" },
  blocked: { label: "Užblokuotas", class: "bg-red-50 text-red-700" },
  suspended: { label: "Sustabdytas", class: "bg-slate-100 text-slate-600" },
}

const ROLE_CONFIG = {
  admin: { label: "Admin", class: "bg-purple-50 text-purple-700" },
  manager: { label: "Vadybininkas", class: "bg-blue-50 text-blue-700" },
  driver: { label: "Vairuotojas", class: "bg-slate-100 text-slate-600" },
}

export default function UsersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<typeof USERS[0] | null>(null)
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [blockReason, setBlockReason] = useState("")

  const filteredUsers = USERS.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleBlockUser = (user: typeof USERS[0]) => {
    setSelectedUser(user)
    setShowBlockModal(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Vartotojai</h1>
          <p className="text-sm text-muted-foreground mt-1">Valdykite sistemos vartotojus ir jų teises</p>
        </div>
        <button className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Eksportuoti
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">3,891</p>
          <p className="text-sm text-muted-foreground">Viso vartotojų</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-emerald-600">3,542</p>
          <p className="text-sm text-muted-foreground">Aktyvūs</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-amber-600">156</p>
          <p className="text-sm text-muted-foreground">Laukiantys</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-red-600">193</p>
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
            placeholder="Ieškoti pagal vardą, el. paštą ar įmonę..."
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
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {ROLE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Vartotojas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Įmonė
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Rolė
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Statusas
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Atsako rodiklis
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Paskutinis prisijungimas
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Veiksmai
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map(user => {
                const status = STATUS_CONFIG[user.status as keyof typeof STATUS_CONFIG]
                const role = ROLE_CONFIG[user.role as keyof typeof ROLE_CONFIG]
                return (
                    <tr 
                      key={user.id} 
                      onClick={() => router.push(`/administravimas/vartotojai/${user.id}`)}
                      className="hover:bg-muted/20 transition-colors cursor-pointer"
                    >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                          <span className="text-sm font-semibold text-primary">
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{user.company}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", role.class)}>
                        {role.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", status.class)}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user.responseRate !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                user.responseRate >= 90 ? "bg-emerald-500" :
                                user.responseRate >= 70 ? "bg-amber-500" : "bg-red-500"
                              )}
                              style={{ width: `${user.responseRate}%` }}
                            />
                          </div>
                          <span className="text-sm text-foreground">{user.responseRate}%</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-muted-foreground">
                        {user.lastLogin || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => router.push(`/administravimas/vartotojai/${user.id}`)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors" 
                          title="Peržiūrėti"
                        >
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Siųsti pranešimą">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {user.status === "active" && (
                          <button 
                            onClick={() => handleBlockUser(user)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                            title="Blokuoti"
                          >
                            <Ban className="w-4 h-4 text-red-500" />
                          </button>
                        )}
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
            Rodoma {filteredUsers.length} iš {USERS.length} vartotojų
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

      {/* Block User Modal */}
      {showBlockModal && selectedUser && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowBlockModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Blokuoti vartotoją?</h2>
                <p className="text-sm text-muted-foreground">{selectedUser.name}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Užblokuotas vartotojas nebegalės prisijungti prie sistemos. Nurodykite blokavimo priežastį.
            </p>
            <textarea
              value={blockReason}
              onChange={e => setBlockReason(e.target.value)}
              placeholder="Blokavimo priežastis..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowBlockModal(false)
                  setBlockReason("")
                  setSelectedUser(null)
                }}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Blokuoti
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
