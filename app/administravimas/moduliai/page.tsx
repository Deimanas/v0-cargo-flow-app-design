"use client"

import { useState } from "react"
import {
  ToggleLeft,
  Shield,
  Bell,
  Map,
  MessageSquare,
  CreditCard,
  Star,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const FEATURE_FLAGS = [
  { 
    id: "new_cargo_form",
    name: "Naujas krovinio skelbimo forma", 
    description: "Atnaujinta krovinio skelbimo forma su papildomais laukais ir geresniu UX",
    icon: Package,
    status: "beta",
    enabled: true,
    users: "100%",
  },
  { 
    id: "live_tracking",
    name: "Gyvas sekimas", 
    description: "GPS pagrindu veikiantis krovinių sekimas realiu laiku",
    icon: Map,
    status: "stable",
    enabled: true,
    users: "100%",
  },
  { 
    id: "instant_messaging",
    name: "Momentiniai pranešimai", 
    description: "Tiesioginis susirašinėjimas tarp vežėjų ir užsakovų",
    icon: MessageSquare,
    status: "stable",
    enabled: true,
    users: "100%",
  },
  { 
    id: "stripe_payments",
    name: "Stripe mokėjimai", 
    description: "Mokėjimų priėmimas per Stripe platformą",
    icon: CreditCard,
    status: "beta",
    enabled: false,
    users: "0%",
  },
  { 
    id: "advanced_ratings",
    name: "Išplėstiniai reitingai", 
    description: "Detalesni vartotojų vertinimai su kategorijomis",
    icon: Star,
    status: "alpha",
    enabled: false,
    users: "0%",
  },
  { 
    id: "company_verification",
    name: "Automatinis įmonių tikrinimas", 
    description: "Automatinis įmonių patikrinimas per valstybės registrus",
    icon: Shield,
    status: "stable",
    enabled: true,
    users: "100%",
  },
  { 
    id: "push_notifications",
    name: "Push pranešimai", 
    description: "Naršyklės push pranešimai apie naujus krovinius",
    icon: Bell,
    status: "beta",
    enabled: true,
    users: "50%",
  },
  { 
    id: "team_accounts",
    name: "Komandos paskyros", 
    description: "Kelių vartotojų valdymas vienoje įmonės paskyroje",
    icon: Users,
    status: "stable",
    enabled: true,
    users: "100%",
  },
  { 
    id: "dispute_automation",
    name: "Ginčų automatizavimas", 
    description: "AI pagrindu veikiantis ginčų sprendimo siūlymas",
    icon: AlertTriangle,
    status: "alpha",
    enabled: false,
    users: "0%",
  },
]

const STATUS_CONFIG = {
  stable: { label: "Stabilus", class: "bg-emerald-50 text-emerald-700" },
  beta: { label: "Beta", class: "bg-blue-50 text-blue-700" },
  alpha: { label: "Alpha", class: "bg-amber-50 text-amber-700" },
  deprecated: { label: "Pasenęs", class: "bg-red-50 text-red-700" },
}

export default function ModulesPage() {
  const [features, setFeatures] = useState(FEATURE_FLAGS)
  const [filter, setFilter] = useState<"all" | "enabled" | "disabled">("all")

  const toggleFeature = (id: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === id ? { ...f, enabled: !f.enabled, users: f.enabled ? "0%" : "100%" } : f
    ))
  }

  const filteredFeatures = features.filter(f => {
    if (filter === "enabled") return f.enabled
    if (filter === "disabled") return !f.enabled
    return true
  })

  const enabledCount = features.filter(f => f.enabled).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Moduliai</h1>
          <p className="text-sm text-muted-foreground mt-1">Valdykite sistemos funkcionalumo modulius</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{enabledCount} / {features.length} įjungti</span>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        {[
          { value: "all", label: "Visi" },
          { value: "enabled", label: "Įjungti" },
          { value: "disabled", label: "Išjungti" },
        ].map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value as typeof filter)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              filter === opt.value
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredFeatures.map(feature => {
          const status = STATUS_CONFIG[feature.status as keyof typeof STATUS_CONFIG]
          return (
            <div
              key={feature.id}
              className={cn(
                "bg-card border rounded-xl p-5 transition-all",
                feature.enabled ? "border-primary/30" : "border-border"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  feature.enabled ? "bg-primary/10" : "bg-muted"
                )}>
                  <feature.icon className={cn(
                    "w-6 h-6",
                    feature.enabled ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground">{feature.name}</h3>
                    <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", status.class)}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-muted-foreground">
                        Vartotojai: <span className="font-medium text-foreground">{feature.users}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFeature(feature.id)}
                      className={cn(
                        "w-12 h-7 rounded-full transition-colors relative",
                        feature.enabled ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span className={cn(
                        "absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm",
                        feature.enabled ? "left-6" : "left-1"
                      )} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
