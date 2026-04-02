"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Ban,
  CheckCircle,
  XCircle,
  Edit,
  MoreHorizontal,
  MessageSquare,
  FileText,
  Package,
  Truck,
  Star,
  AlertTriangle,
  Activity,
  Key,
  Trash2,
  RefreshCw,
  Send,
  Eye,
  Download,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock user data
const USER_DATA = {
  id: 1,
  name: "Jonas Jonaitis",
  email: "jonas@greitaspervezimas.lt",
  phone: "+370 612 34567",
  avatar: null,
  company: {
    id: 1,
    name: "UAB Greitas Pervežimas",
    code: "304567891",
    vatCode: "LT100004567891",
  },
  role: "admin",
  status: "active",
  verified: true,
  createdAt: "2023-06-15",
  lastLogin: "2024-04-02 14:32",
  lastActivity: "2024-04-02 14:45",
  loginCount: 487,
  responseRate: 98,
  rating: 4.8,
  reviewCount: 156,
  address: "Vilniaus g. 15, Vilnius",
  language: "lt",
  timezone: "Europe/Vilnius",
  twoFactorEnabled: true,
  emailNotifications: true,
  pushNotifications: true,
  statistics: {
    publishedCargos: 234,
    completedDeliveries: 198,
    activeOffers: 12,
    disputes: 2,
    avgResponseTime: "15 min",
  },
}

const ACTIVITY_LOG = [
  { id: 1, action: "Prisijungė prie sistemos", date: "2024-04-02 14:32", ip: "192.168.1.100" },
  { id: 2, action: "Paskelbė naują krovinį #4521", date: "2024-04-02 14:15", ip: "192.168.1.100" },
  { id: 3, action: "Atnaujino profilio informaciją", date: "2024-04-02 10:30", ip: "192.168.1.100" },
  { id: 4, action: "Priėmė transporto pasiūlymą #3892", date: "2024-04-01 16:45", ip: "192.168.1.100" },
  { id: 5, action: "Parašė atsiliepimą vežėjui", date: "2024-04-01 15:20", ip: "192.168.1.100" },
  { id: 6, action: "Prisijungė prie sistemos", date: "2024-04-01 09:15", ip: "192.168.1.100" },
]

const RECENT_CARGOS = [
  { id: 4521, route: "Vilnius → Klaipėda", status: "active", price: 1320, date: "2024-04-02" },
  { id: 4498, route: "Kaunas → Šiauliai", status: "completed", price: 890, date: "2024-04-01" },
  { id: 4472, route: "Panevėžys → Vilnius", status: "completed", price: 650, date: "2024-03-30" },
]

const STATUS_CONFIG = {
  active: { label: "Aktyvus", class: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  pending: { label: "Laukia", class: "bg-amber-50 text-amber-700 border-amber-200" },
  blocked: { label: "Užblokuotas", class: "bg-red-50 text-red-700 border-red-200" },
  suspended: { label: "Sustabdytas", class: "bg-slate-100 text-slate-600 border-slate-200" },
}

const ROLE_CONFIG = {
  admin: { label: "Administratorius", class: "bg-purple-50 text-purple-700" },
  manager: { label: "Vadybininkas", class: "bg-blue-50 text-blue-700" },
  driver: { label: "Vairuotojas", class: "bg-slate-100 text-slate-600" },
}

export default function UserDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "activity" | "cargos" | "settings">("overview")
  const [showBlockModal, setShowBlockModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [blockReason, setBlockReason] = useState("")
  const [message, setMessage] = useState("")

  const user = USER_DATA
  const status = STATUS_CONFIG[user.status as keyof typeof STATUS_CONFIG]
  const role = ROLE_CONFIG[user.role as keyof typeof ROLE_CONFIG]

  const tabs = [
    { id: "overview", label: "Apžvalga", icon: User },
    { id: "activity", label: "Veikla", icon: Activity },
    { id: "cargos", label: "Kroviniai", icon: Package },
    { id: "settings", label: "Nustatymai", icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium border", status.class)}>
              {status.label}
            </span>
            {user.verified && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Patvirtintas
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMessageModal(true)}
            className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Rašyti
          </button>
          {user.status === "active" ? (
            <button
              onClick={() => setShowBlockModal(true)}
              className="px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Ban className="w-4 h-4" />
              Blokuoti
            </button>
          ) : (
            <button className="px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Atblokuoti
            </button>
          )}
          <button className="p-2 hover:bg-muted rounded-lg transition-colors border border-border">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary">
                {user.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <span className={cn("inline-flex px-2 py-0.5 rounded-full text-xs font-medium", role.class)}>
                  {role.label}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {user.address}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="w-4 h-4" />
                <span 
                  onClick={() => router.push(`/administravimas/imones/${user.company.id}`)}
                  className="text-primary hover:underline cursor-pointer"
                >
                  {user.company.name}
                </span>
                <span className="text-muted-foreground">({user.company.code})</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:ml-auto lg:max-w-xl">
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{user.statistics.publishedCargos}</p>
              <p className="text-xs text-muted-foreground mt-1">Krovinių</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{user.statistics.completedDeliveries}</p>
              <p className="text-xs text-muted-foreground mt-1">Pervežimų</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-bold text-foreground">{user.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{user.reviewCount} atsiliepimai</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-emerald-600">{user.responseRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">Atsako rodiklis</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-1 py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Info */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Paskyros informacija</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Registracijos data</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {user.createdAt}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Paskutinis prisijungimas</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {user.lastLogin}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Prisijungimų skaičius</p>
                  <p className="text-sm font-medium text-foreground">{user.loginCount}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Vidutinis atsakymo laikas</p>
                  <p className="text-sm font-medium text-foreground">{user.statistics.avgResponseTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Kalba</p>
                  <p className="text-sm font-medium text-foreground">Lietuvių</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Laiko juosta</p>
                  <p className="text-sm font-medium text-foreground">{user.timezone}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Naujausia veikla</h3>
                <button 
                  onClick={() => setActiveTab("activity")}
                  className="text-xs text-primary hover:underline"
                >
                  Rodyti visą
                </button>
              </div>
              <div className="space-y-3">
                {ACTIVITY_LOG.slice(0, 4).map(log => (
                  <div key={log.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm text-foreground">{log.action}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{log.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Cargos */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Naujausi kroviniai</h3>
                <button
                  onClick={() => setActiveTab("cargos")}
                  className="text-xs text-primary hover:underline"
                >
                  Rodyti visus
                </button>
              </div>
              <div className="space-y-2">
                {RECENT_CARGOS.map(cargo => (
                  <div key={cargo.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">#{cargo.id}</p>
                        <p className="text-xs text-muted-foreground">{cargo.route}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{cargo.price} EUR</p>
                      <span className={cn(
                        "text-xs",
                        cargo.status === "active" ? "text-emerald-600" : "text-muted-foreground"
                      )}>
                        {cargo.status === "active" ? "Aktyvus" : "Baigtas"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Greiti veiksmai</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowMessageModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span>Siųsti pranešimą</span>
                </button>
                <button
                  onClick={() => setShowResetPasswordModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors"
                >
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <span>Atstatyti slaptažodį</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-muted-foreground" />
                  <span>Redaguoti profilį</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-muted-foreground" />
                  <span>Eksportuoti duomenis</span>
                </button>
                <button
                  onClick={() => setShowBlockModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <Ban className="w-4 h-4" />
                  <span>Blokuoti vartotoją</span>
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full flex items-center gap-3 p-3 text-sm text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Ištrinti paskyrą</span>
                </button>
              </div>
            </div>

            {/* Security */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Saugumas</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">2FA autentifikacija</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    user.twoFactorEnabled
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  )}>
                    {user.twoFactorEnabled ? "Įjungta" : "Išjungta"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">El. pašto patvirtinimas</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Patvirtintas
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Telefono patvirtinimas</span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Patvirtintas
                  </span>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="text-sm font-semibold text-foreground mb-4">Pranešimai</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">El. pašto pranešimai</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    user.emailNotifications
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  )}>
                    {user.emailNotifications ? "Įjungti" : "Išjungti"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Push pranešimai</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    user.pushNotifications
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  )}>
                    {user.pushNotifications ? "Įjungti" : "Išjungti"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="bg-card border border-border rounded-xl">
          <div className="p-5 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Veiklos istorija</h3>
          </div>
          <div className="divide-y divide-border">
            {ACTIVITY_LOG.map(log => (
              <div key={log.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Activity className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">IP: {log.ip}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{log.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "cargos" && (
        <div className="bg-card border border-border rounded-xl">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Vartotojo kroviniai</h3>
            <div className="flex items-center gap-2">
              <select className="px-3 py-1.5 bg-muted border border-border rounded-lg text-sm">
                <option>Visi statusai</option>
                <option>Aktyvūs</option>
                <option>Baigti</option>
                <option>Atšaukti</option>
              </select>
            </div>
          </div>
          <div className="divide-y divide-border">
            {RECENT_CARGOS.map(cargo => (
              <div key={cargo.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Krovinys #{cargo.id}</p>
                    <p className="text-xs text-muted-foreground">{cargo.route}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm text-muted-foreground">{cargo.date}</span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    cargo.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                  )}>
                    {cargo.status === "active" ? "Aktyvus" : "Baigtas"}
                  </span>
                  <span className="text-sm font-semibold text-foreground w-20 text-right">{cargo.price} EUR</span>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Rolės ir teisės</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Vartotojo rolė</label>
                <select className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-sm">
                  <option value="admin">Administratorius</option>
                  <option value="manager">Vadybininkas</option>
                  <option value="driver">Vairuotojas</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Papildomos teisės</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-foreground">Gali kurti naujus krovinius</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-foreground">Gali siūlyti transportą</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm text-foreground">Gali valdyti įmonės narius</span>
                  </label>
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Išsaugoti pakeitimus
              </button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">Paskyros veiksmai</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowResetPasswordModal(true)}
                className="w-full flex items-center justify-between p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors border border-border"
              >
                <div className="flex items-center gap-3">
                  <Key className="w-4 h-4 text-muted-foreground" />
                  <span>Atstatyti slaptažodį</span>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 text-sm text-left hover:bg-muted rounded-lg transition-colors border border-border">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  <span>Atnaujinti 2FA</span>
                </div>
                <span className="text-muted-foreground">&rarr;</span>
              </button>
              <button
                onClick={() => setShowBlockModal(true)}
                className="w-full flex items-center justify-between p-3 text-sm text-left hover:bg-red-50 rounded-lg transition-colors border border-red-200 text-red-600"
              >
                <div className="flex items-center gap-3">
                  <Ban className="w-4 h-4" />
                  <span>Blokuoti paskyrą</span>
                </div>
                <span>&rarr;</span>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-3 text-sm text-left hover:bg-red-50 rounded-lg transition-colors border border-red-200 text-red-600"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="w-4 h-4" />
                  <span>Ištrinti paskyrą</span>
                </div>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Modal */}
      {showBlockModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowBlockModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Ban className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Blokuoti vartotoją?</h2>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Užblokuotas vartotojas nebegalės prisijungti prie sistemos ir atlikti jokių veiksmų.
            </p>
            <textarea
              value={blockReason}
              onChange={e => setBlockReason(e.target.value)}
              placeholder="Blokavimo priežastis..."
              className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBlockModal(false)}
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowDeleteModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Ištrinti paskyrą?</h2>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              <strong className="text-foreground">Dėmesio!</strong> Ši operacija yra negrįžtama. Visi vartotojo duomenys, kroviniai ir istorija bus ištrinti.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Ištrinti
              </button>
            </div>
          </div>
        </>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowResetPasswordModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <Key className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Atstatyti slaptažodį</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Vartotojui bus išsiųstas el. laiškas su nuoroda slaptažodžio atstatymui.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowResetPasswordModal(false)}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Siųsti nuorodą
              </button>
            </div>
          </div>
        </>
      )}

      {/* Message Modal */}
      {showMessageModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowMessageModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Siųsti pranešimą</h2>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Jūsų pranešimas..."
              className="w-full px-3 py-2.5 bg-muted border border-border rounded-lg text-sm resize-none h-32 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setShowMessageModal(false)
                  setMessage("")
                }}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Siųsti
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
