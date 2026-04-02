"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState, useTransition } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Euro,
  Upload,
  Plus,
  Trash2,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CARGO_TYPES = [
  { id: "bendras", label: "Bendras krovinys" },
  { id: "saldomas", label: "Šaldomas" },
  { id: "adr", label: "Pavojingas (ADR)" },
  { id: "negabaritinis", label: "Negabaritinis" },
  { id: "skystis", label: "Skystis" },
  { id: "biri", label: "Biri medžiaga" },
]

const TRANSPORT_TYPES = [
  { id: "tentine", label: "Tentinė" },
  { id: "refrizeratorius", label: "Refrižeratorius" },
  { id: "mega", label: "Mega priekaba" },
  { id: "platforma", label: "Platforma" },
  { id: "cisterna", label: "Cisterna" },
  { id: "konteinervezis", label: "Konteinerinis" },
]

const LOADING_TYPES = [
  { id: "back", label: "Iš galo" },
  { id: "side", label: "Iš šono" },
  { id: "top", label: "Iš viršaus" },
  { id: "any", label: "Bet koks" },
]

function SectionTitle({ children, number }: { children: React.ReactNode; number: number }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
        {number}
      </span>
      <h2 className="text-base font-semibold text-foreground">{children}</h2>
    </div>
  )
}

function InputLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-foreground mb-1.5">
      {children}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
  )
}

export default function NaujasKrovinysPage() {
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showADRWarning, setShowADRWarning] = useState(false)

  // Form state
  const [cargoType, setCargoType] = useState("")
  const [transportType, setTransportType] = useState("")
  const [loadingType, setLoadingType] = useState<string[]>([])
  const [stops, setStops] = useState([
    { id: "1", type: "loading", country: "", city: "", address: "", date: "", timeFrom: "", timeTo: "" },
    { id: "2", type: "unloading", country: "", city: "", address: "", date: "", timeFrom: "", timeTo: "" },
  ])

  const toggleLoadingType = (id: string) => {
    setLoadingType(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])
  }

  const addStop = () => {
    const newId = (stops.length + 1).toString()
    const insertIndex = stops.length - 1 // Insert before last (unloading) stop
    setStops([
      ...stops.slice(0, insertIndex),
      { id: newId, type: "stop", country: "", city: "", address: "", date: "", timeFrom: "", timeTo: "" },
      ...stops.slice(insertIndex),
    ])
  }

  const removeStop = (id: string) => {
    setStops(prev => prev.filter(s => s.id !== id))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    // Redirect handled by form action or window.location
    window.location.href = "/kroviniai"
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-3xl mx-auto pb-24">
          {/* Header */}
          <header className="flex items-center gap-4 mb-6">
            <Link
              href="/kroviniai"
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">Naujas krovinys</h1>
              <p className="text-sm text-muted-foreground">Užpildykite informaciją apie krovinį</p>
            </div>
          </header>

          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); handleSubmit() }} className="space-y-8">
            {/* Section 1: Route */}
            <section className="bg-card border border-border rounded-xl p-5">
              <SectionTitle number={1}>Maršrutas</SectionTitle>

              <div className="space-y-4">
                {stops.map((stop, index) => (
                  <div key={stop.id} className="relative">
                    {/* Connection line */}
                    {index < stops.length - 1 && (
                      <div className="absolute left-3.5 top-14 bottom-0 w-0.5 bg-border -translate-x-1/2 z-0" />
                    )}

                    <div className="relative z-10 bg-card">
                      <div className="flex items-center gap-2 mb-3">
                        <div className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                          stop.type === "loading" ? "bg-emerald-100 text-emerald-700" :
                          stop.type === "unloading" ? "bg-red-100 text-red-700" :
                          "bg-blue-100 text-blue-700"
                        )}>
                          {stop.type === "loading" ? "P" : stop.type === "unloading" ? "I" : (index)}
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {stop.type === "loading" ? "Pakrovimas" :
                           stop.type === "unloading" ? "Iškrovimas" :
                           `Tarpinė stotelė ${index}`}
                        </span>
                        {stop.type === "stop" && (
                          <button
                            type="button"
                            onClick={() => removeStop(stop.id)}
                            className="ml-auto p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div>
                          <InputLabel required>Šalis</InputLabel>
                          <select className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40">
                            <option value="">Pasirinkite</option>
                            <option value="LT">Lietuva</option>
                            <option value="LV">Latvija</option>
                            <option value="EE">Estija</option>
                            <option value="PL">Lenkija</option>
                            <option value="DE">Vokietija</option>
                            <option value="NL">Olandija</option>
                          </select>
                        </div>
                        <div>
                          <InputLabel required>Miestas</InputLabel>
                          <input
                            type="text"
                            placeholder="Įveskite miestą"
                            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <InputLabel>Adresas</InputLabel>
                        <input
                          type="text"
                          placeholder="Gatvė, namo nr. (neprivaloma)"
                          className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <InputLabel required>Data</InputLabel>
                          <input
                            type="date"
                            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                          />
                        </div>
                        <div>
                          <InputLabel>Laikas nuo</InputLabel>
                          <input
                            type="time"
                            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                          />
                        </div>
                        <div>
                          <InputLabel>Laikas iki</InputLabel>
                          <input
                            type="time"
                            className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addStop}
                  className="w-full py-2.5 border-2 border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Pridėti tarpinę stotelę
                </button>
              </div>
            </section>

            {/* Section 2: Cargo details */}
            <section className="bg-card border border-border rounded-xl p-5">
              <SectionTitle number={2}>Krovinio informacija</SectionTitle>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <InputLabel required>Krovinio tipas</InputLabel>
                  <select
                    value={cargoType}
                    onChange={e => {
                      setCargoType(e.target.value)
                      setShowADRWarning(e.target.value === "adr")
                    }}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  >
                    <option value="">Pasirinkite</option>
                    {CARGO_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <InputLabel required>Transporto tipas</InputLabel>
                  <select
                    value={transportType}
                    onChange={e => setTransportType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  >
                    <option value="">Pasirinkite</option>
                    {TRANSPORT_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {showADRWarning && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">Pavojingas krovinys (ADR)</p>
                    <p className="text-xs text-amber-700 mt-0.5">
                      Privaloma nurodyti ADR klasę ir turėti atitinkamus dokumentus
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <InputLabel required>Svoris (t)</InputLabel>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div>
                  <InputLabel>Tūris (m³)</InputLabel>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div>
                  <InputLabel>Ilgis (m)</InputLabel>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
                <div>
                  <InputLabel>Paletės</InputLabel>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>

              <div className="mb-4">
                <InputLabel>Pakrovimo būdas</InputLabel>
                <div className="flex flex-wrap gap-2">
                  {LOADING_TYPES.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleLoadingType(t.id)}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium border transition-colors",
                        loadingType.includes(t.id)
                          ? "bg-primary/10 border-primary/30 text-primary"
                          : "bg-background border-border text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <InputLabel>Aprašymas</InputLabel>
                <textarea
                  rows={3}
                  placeholder="Papildoma informacija apie krovinį, specialūs reikalavimai..."
                  className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 resize-none"
                />
              </div>
            </section>

            {/* Section 3: Price */}
            <section className="bg-card border border-border rounded-xl p-5">
              <SectionTitle number={3}>Kaina ir apmokėjimas</SectionTitle>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <InputLabel>Kaina (EUR)</InputLabel>
                  <div className="relative">
                    <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Palikite tuščią jei norite gauti pasiūlymus
                  </p>
                </div>
                <div>
                  <InputLabel>Apmokėjimo terminas</InputLabel>
                  <select className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40">
                    <option value="immediate">Iš karto</option>
                    <option value="7">7 dienos</option>
                    <option value="14">14 dienų</option>
                    <option value="30">30 dienų</option>
                    <option value="45">45 dienos</option>
                    <option value="60">60 dienų</option>
                  </select>
                </div>
              </div>

              <div>
                <InputLabel>Dokumentai</InputLabel>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/40 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    Įkelkite dokumentus
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, JPG, PNG iki 10MB
                  </p>
                </div>
              </div>
            </section>
          </form>

          {/* Fixed bottom actions */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-60 bg-card border-t border-border p-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
              <Link
                href="/kroviniai"
                className="px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atšaukti
              </Link>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  Išsaugoti juodraštį
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Skelbiama..." : "Paskelbti krovinį"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
