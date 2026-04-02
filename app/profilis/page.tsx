"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import {
  User, Building2, FileText, Users, Ban, Bell, Star,
  Globe, ChevronRight, LogOut, Camera, Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "account" | "company"

const ACCOUNT_SETTINGS = [
  { icon: User,     title: "Paskyros informacija", description: "El. paštas, telefonas ir slaptažodžio keitimas" },
  { icon: Bell,     title: "Pranešimai",            description: "El. pašto ir programėlės pranešimų nustatymai" },
  { icon: Star,     title: "Gauti atsiliepimai",    description: "Peržiūrėkite jums paliktus atsiliepimus" },
  { icon: Globe,    title: "Kalba",                 description: "Programos ir pokalbių vertimo kalba" },
  { icon: Shield,   title: "Saugumas",              description: "Dviejų veiksnių autentifikavimas ir sesijos" },
]

const COMPANY_SETTINGS = [
  { icon: Building2, title: "Įmonės informacija", description: "Rekvizitai, kontaktai ir įmonės redagavimas" },
  { icon: FileText,  title: "Dokumentai",          description: "Įkelti dokumentai, statusas ir pateikimas peržiūrai" },
  { icon: Users,     title: "Įmonės nariai",        description: "Narių valdymas, kvietimai ir darbo laikas" },
  { icon: Ban,       title: "Užblokuotos įmonės",   description: "Įmonės, kurių skelbimai jums nesirodo" },
]

export default function ProfilisPage() {
  const [activeTab, setActiveTab] = useState<TabType>("account")

  const settings = activeTab === "account" ? ACCOUNT_SETTINGS : COMPANY_SETTINGS

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">
          <div className="max-w-xl">

            {/* Page title */}
            <h1 className="text-xl font-bold text-foreground tracking-tight mb-6">Mano profilis</h1>

            {/* Profile card */}
            <div className="bg-card border border-border rounded-xl p-5 mb-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full bg-muted overflow-hidden border-2 border-border">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8515-TT3KyeQ9Cpm3pMIayISPdf5rPDVhmN.webp"
                      alt="Profilio nuotrauka"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm border border-card">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-foreground">Deimanas Sutkevičius</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">deimanas.s@gmail.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs font-medium">
                      Vežėjas
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-xs font-medium border border-emerald-200">
                      Pro planas
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-0.5 justify-end mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-3.5 h-3.5", i < 4 ? "text-amber-400 fill-amber-400" : "text-muted-foreground")} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">4.0 reitingas</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-muted rounded-xl p-1 mb-4 gap-1">
              {(["account", "company"] as TabType[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-2 rounded-lg text-xs font-medium transition-colors",
                    activeTab === tab
                      ? "bg-card text-foreground shadow-sm border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab === "account" ? "Paskyra" : "Įmonė"}
                </button>
              ))}
            </div>

            {/* Company owner badge */}
            {activeTab === "company" && (
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl mb-3">
                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-emerald-800">Jūs esate įmonės savininkas</span>
              </div>
            )}

            {/* Settings list */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {settings.map((item, i) => (
                <a
                  key={item.title}
                  href="#"
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 hover:bg-secondary/60 transition-colors group",
                    i < settings.length - 1 && "border-b border-border"
                  )}
                >
                  <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </a>
              ))}
            </div>

            {/* Logout */}
            <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 border border-destructive/25 text-destructive rounded-xl text-sm font-medium hover:bg-destructive/5 transition-colors">
              <LogOut className="w-4 h-4" />
              Atsijungti
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
