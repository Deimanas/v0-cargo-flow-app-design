"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Building2,
  ChevronLeft,
  Users,
  Package,
  FileText,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  Check,
  X,
  Ban,
  MoreHorizontal,
  Download,
  ExternalLink,
  AlertTriangle,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

const COMPANY = {
  id: 1,
  name: "UAB Greitas Pervežimas",
  code: "305123456",
  vatCode: "LT100005123456",
  type: "carrier",
  status: "pending",
  rating: 4.8,
  reviewCount: 156,
  address: "Gedimino pr. 28, Vilnius, LT-01104",
  phone: "+370 5 212 3456",
  email: "info@greitaspervezimas.lt",
  website: "www.greitaspervezimas.lt",
  created: "2024-04-01",
  description: "Tarptautinių krovinių pervežimo įmonė, teikianti paslaugas visoje Europoje nuo 2015 metų.",
}

const MEMBERS = [
  { id: 1, name: "Jonas Jonaitis", email: "jonas@greitaspervezimas.lt", role: "admin", status: "active", lastLogin: "2024-04-02 14:32" },
  { id: 2, name: "Petras Petraitis", email: "petras@greitaspervezimas.lt", role: "manager", status: "active", lastLogin: "2024-04-02 09:15" },
  { id: 3, name: "Ona Onaitė", email: "ona@greitaspervezimas.lt", role: "driver", status: "active", lastLogin: "2024-04-01 18:45" },
]

const DOCUMENTS = [
  { id: 1, name: "Registracijos pažymėjimas", type: "PDF", size: "1.2 MB", status: "verified", uploaded: "2024-04-01" },
  { id: 2, name: "PVM mokėtojo pažyma", type: "PDF", size: "0.8 MB", status: "verified", uploaded: "2024-04-01" },
  { id: 3, name: "CMR draudimas", type: "PDF", size: "2.1 MB", status: "pending", uploaded: "2024-04-01" },
  { id: 4, name: "Veiklos licencija", type: "PDF", size: "1.5 MB", status: "pending", uploaded: "2024-04-01" },
]

const RECENT_CARGO = [
  { id: "CG-1234", route: "Vilnius → Berlin", price: "1,850 EUR", status: "completed", date: "2024-03-28" },
  { id: "CG-1198", route: "Klaipėda → Warsaw", price: "920 EUR", status: "completed", date: "2024-03-25" },
  { id: "CG-1156", route: "Riga → Hamburg", price: "2,340 EUR", status: "completed", date: "2024-03-20" },
]

const STATUS_CONFIG = {
  active: { label: "Aktyvi", class: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Laukia patvirtinimo", class: "bg-amber-50 text-amber-700" },
  blocked: { label: "Užblokuota", class: "bg-red-50 text-red-700" },
}

const DOC_STATUS = {
  verified: { label: "Patvirtintas", class: "bg-emerald-50 text-emerald-700" },
  pending: { label: "Laukia", class: "bg-amber-50 text-amber-700" },
  rejected: { label: "Atmestas", class: "bg-red-50 text-red-700" },
}

export default function CompanyDetailPage() {
  const [activeTab, setActiveTab] = useState<"info" | "members" | "documents" | "cargo" | "blocked">("info")
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const status = STATUS_CONFIG[COMPANY.status as keyof typeof STATUS_CONFIG]

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/administravimas/imones"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Grįžti į įmonių sąrašą
      </Link>

      {/* Header */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{COMPANY.name}</h1>
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium", status.class)}>
                {status.label}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span>Įmonės kodas: {COMPANY.code}</span>
              <span>PVM kodas: {COMPANY.vatCode}</span>
              {COMPANY.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  {COMPANY.rating} ({COMPANY.reviewCount} atsiliepimai)
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {COMPANY.status === "pending" && (
              <>
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Atmesti
                </button>
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Patvirtinti
                </button>
              </>
            )}
            {COMPANY.status === "active" && (
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2">
                <Ban className="w-4 h-4" />
                Blokuoti
              </button>
            )}
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border overflow-x-auto pb-px">
        {[
          { id: "info", label: "Informacija", icon: Building2 },
          { id: "members", label: "Nariai", icon: Users, count: MEMBERS.length },
          { id: "documents", label: "Dokumentai", icon: FileText, count: DOCUMENTS.length },
          { id: "cargo", label: "Kroviniai", icon: Package },
          { id: "blocked", label: "Užblokuotos", icon: Shield },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.count !== undefined && (
              <span className="px-1.5 py-0.5 text-xs bg-muted rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "info" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Company Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Įmonės informacija</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Adresas</p>
                    <p className="text-sm text-foreground">{COMPANY.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefonas</p>
                    <p className="text-sm text-foreground">{COMPANY.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">El. paštas</p>
                    <p className="text-sm text-foreground">{COMPANY.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Svetainė</p>
                    <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                      {COMPANY.website}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Registracijos data</p>
                    <p className="text-sm text-foreground">{COMPANY.created}</p>
                  </div>
                </div>
              </div>
              {COMPANY.description && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Aprašymas</p>
                  <p className="text-sm text-foreground">{COMPANY.description}</p>
                </div>
              )}
            </div>

            {/* Registry Check */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Registro patikra</h3>
                <button className="text-xs text-primary hover:underline">Atnaujinti</button>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700">Juridinių asmenų registras</span>
                  </div>
                  <span className="text-xs text-emerald-600">Patvirtinta</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-700">PVM mokėtojų registras</span>
                  </div>
                  <span className="text-xs text-emerald-600">Patvirtinta</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm text-amber-700">Skolų registras</span>
                  </div>
                  <span className="text-xs text-amber-600">Tikrinama</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Statistika</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Nariai</span>
                  <span className="text-sm font-medium text-foreground">{MEMBERS.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Kroviniai</span>
                  <span className="text-sm font-medium text-foreground">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sėkmingi sandoriai</span>
                  <span className="text-sm font-medium text-foreground">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Atsakymo laikas</span>
                  <span className="text-sm font-medium text-foreground">2.4 val.</span>
                </div>
              </div>
            </div>

            {/* Recent Cargo */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-semibold text-foreground">Paskutiniai kroviniai</h3>
              </div>
              <div className="divide-y divide-border">
                {RECENT_CARGO.map(cargo => (
                  <div key={cargo.id} className="p-4">
                    <p className="text-sm font-medium text-foreground">{cargo.route}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{cargo.date}</span>
                      <span className="text-xs font-medium text-foreground">{cargo.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "members" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Įmonės nariai</h3>
            <button className="text-xs text-primary hover:underline">Pridėti narį</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Vardas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">El. paštas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Rolė</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Paskutinis prisijungimas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Veiksmai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MEMBERS.map(member => (
                <tr key={member.id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{member.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{member.email}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground capitalize">{member.role}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground">{member.lastLogin}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Dokumentai</h3>
            <button className="text-xs text-primary hover:underline">Įkelti dokumentą</button>
          </div>
          <div className="divide-y divide-border">
            {DOCUMENTS.map(doc => {
              const docStatus = DOC_STATUS[doc.status as keyof typeof DOC_STATUS]
              return (
                <div key={doc.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.type} · {doc.size} · {doc.uploaded}</p>
                  </div>
                  <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium", docStatus.class)}>
                    {docStatus.label}
                  </span>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === "cargo" && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Krovinių sąrašas</h3>
          <p className="text-sm text-muted-foreground">Čia bus rodomi visi įmonės kroviniai su filtrais ir valdymo veiksmais.</p>
        </div>
      )}

      {activeTab === "blocked" && (
        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Užblokuotos įmonės</h3>
          <p className="text-sm text-muted-foreground">Įmonės, kurių skelbimai šiai įmonei nerodomi.</p>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowApproveModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Patvirtinti įmonę?</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Įmonė <strong>{COMPANY.name}</strong> bus patvirtinta ir galės naudotis visomis platformos funkcijomis.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                Patvirtinti
              </button>
            </div>
          </div>
        </>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setShowRejectModal(false)} />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 p-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Atmesti įmonę?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Nurodykite atmetimo priežastį. Ji bus išsiųsta įmonės administratoriui.
            </p>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Atmetimo priežastis..."
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </button>
              <button className="flex-1 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Atmesti
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
