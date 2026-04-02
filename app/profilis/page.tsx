"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import { 
  User, 
  Building2, 
  FileText, 
  Users, 
  Ban,
  Bell,
  Star,
  Globe,
  ChevronRight,
  LogOut,
  Camera
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "account" | "company"

const accountSettings = [
  {
    icon: User,
    title: "Paskyros informacija",
    description: "El. paštas, telefonas ir slaptažodžio keitimas",
    href: "#",
  },
  {
    icon: Bell,
    title: "Pranešimai",
    description: "El. pašto ir programėlės pranešimų nustatymai",
    href: "#",
  },
  {
    icon: Star,
    title: "Gauti atsiliepimai",
    description: "Peržiūrėkite jums paliktus atsiliepimus",
    href: "#",
  },
  {
    icon: Globe,
    title: "Kalba",
    description: "Programos ir pokalbių vertimo kalba",
    href: "#",
  },
]

const companySettings = [
  {
    icon: Building2,
    title: "Įmonės informacija",
    description: "Rekvizitai, kontaktai ir įmonės redagavimas",
    href: "#",
  },
  {
    icon: FileText,
    title: "Dokumentai",
    description: "Įkelti dokumentai, statusas ir pateikimas peržiūrai",
    href: "#",
  },
  {
    icon: Users,
    title: "Įmonės nariai",
    description: "Narių valdymas, kvietimai ir darbo laikas",
    href: "#",
  },
  {
    icon: Ban,
    title: "Užblokuotos įmonės",
    description: "Įmonės, kurių skelbimai jums nesirodo",
    href: "#",
  },
]

export default function ProfilisPage() {
  const [activeTab, setActiveTab] = useState<TabType>("account")

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-6">Mano profilis</h1>
              
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-semibold text-foreground">Deimanas Sutkevičius</h2>
              <span className="inline-block mt-2 px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                Vežėjas
              </span>
            </div>

            {/* Tabs */}
            <div className="flex bg-muted rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveTab("account")}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === "account"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Paskyros informacija
              </button>
              <button
                onClick={() => setActiveTab("company")}
                className={cn(
                  "flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  activeTab === "company"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Įmonės informacija
              </button>
            </div>

            {/* Content */}
            {activeTab === "account" && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-3">
                  Paskyros nustatymai
                </p>
                {accountSettings.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            )}

            {activeTab === "company" && (
              <div className="space-y-2">
                {/* Owner Badge */}
                <div className="flex items-center gap-3 p-4 bg-accent/50 rounded-xl mb-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">Jūs esate įmonės savininkas</span>
                </div>

                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1 mb-3">
                  Įmonės informacija
                </p>
                {companySettings.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </a>
                ))}
              </div>
            )}

            {/* Logout */}
            <button className="w-full mt-8 flex items-center justify-center gap-2 py-3 border border-destructive/30 text-destructive rounded-xl font-medium hover:bg-destructive/5 transition-colors">
              <LogOut className="w-5 h-5" />
              Atsijungti
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
