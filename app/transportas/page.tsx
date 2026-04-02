"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import { MapPin, Calendar, ChevronDown, RefreshCw, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const LOADING_TYPES = [
  { id: "galas",  label: "Galas" },
  { id: "virsus", label: "Viršus" },
  { id: "sonas",  label: "Šonas" },
]
const PACKING_TYPES = [
  { id: "pilnas",   label: "Pilnas" },
  { id: "dalinis",  label: "Dalinis" },
]
const FEATURES = [
  { id: "adr",           label: "ADR" },
  { id: "tir",           label: "TIR" },
  { id: "liftas",        label: "Liftas" },
  { id: "manipuliatorius", label: "Manipuliatorius" },
]
const PRICE_TYPES = [
  { id: "fiksuota",      label: "Fiksuota" },
  { id: "derinama",      label: "Derinama" },
  { id: "pagal_uzklausa", label: "Pagal užklausą" },
]

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-muted/40 border-b border-border">
        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </div>
  )
}

function FormInput({ label, placeholder, type = "text", icon, required }: {
  label: string; placeholder: string; type?: string; icon?: React.ReactNode; required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={cn(
            "w-full py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors",
            icon ? "pl-9 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  )
}

function ChipSelector({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: { id: string; label: string }[]
  value: string | string[]
  onChange: (v: string | string[]) => void
  multi?: boolean
}) {
  const isActive = (id: string) => Array.isArray(value) ? value.includes(id) : value === id

  const toggle = (id: string) => {
    if (multi && Array.isArray(value)) {
      onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id])
    } else {
      onChange(id)
    }
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map(opt => (
        <button
          key={opt.id}
          type="button"
          onClick={() => toggle(opt.id)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
            isActive(opt.id)
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default function TransportasPage() {
  const [loadingTypes, setLoadingTypes] = useState<string[]>(["galas"])
  const [packingType, setPackingType] = useState("pilnas")
  const [features, setFeatures] = useState<string[]>([])
  const [priceType, setPriceType] = useState("fiksuota")
  const [price, setPrice] = useState("500")

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-[1440px] mx-auto">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Atgal
            </Link>
            <span className="text-border">|</span>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Siūlyti transportą</h1>
          </div>

          <div className="max-w-xl space-y-4">

            {/* Recurring route */}
            <FormSection title="Pasikartojantis maršrutas">
              <p className="text-sm text-muted-foreground">
                Dar neturite išsaugotų maršrutų. Užpildykite formą ir išsaugokite.
              </p>
              <button
                type="button"
                className="flex items-center gap-2 w-full justify-center py-2.5 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Išsaugoti kaip maršrutą
              </button>
            </FormSection>

            {/* Loading */}
            <FormSection title="Pakrovimas">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Šalis <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-background border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
                      <span className="text-base">🇱🇹</span>
                      <span className="text-sm text-foreground font-medium">LT</span>
                    </div>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <FormInput label="Miestas" placeholder="Vilnius…" required
                  icon={<MapPin className="w-3.5 h-3.5" />} />
              </div>
              <FormInput label="Pakrovimo data" placeholder="Pasirinkite datą…" required
                icon={<Calendar className="w-3.5 h-3.5" />} />
            </FormSection>

            {/* Delivery */}
            <FormSection title="Pristatymas">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Šalis <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <div className="flex items-center gap-2 px-3 py-2.5 bg-background border border-border rounded-lg cursor-pointer hover:border-primary/40 transition-colors">
                      <span className="text-base">🇩🇪</span>
                      <span className="text-sm text-foreground font-medium">DE</span>
                    </div>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <FormInput label="Miestas" placeholder="Berlin…" required
                  icon={<MapPin className="w-3.5 h-3.5" />} />
              </div>
              <FormInput label="Pristatymo data" placeholder="Pasirinkite datą…" required
                icon={<Calendar className="w-3.5 h-3.5" />} />
            </FormSection>

            {/* Capacity */}
            <FormSection title="Transporto talpinimas">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Krovinio rūšis <span className="text-destructive">*</span></label>
                <div className="relative">
                  <select className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Pasirinkite…</option>
                    <option>Bendras</option>
                    <option>Šaldomas</option>
                    <option>ADR</option>
                    <option>Negabaritinis</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Pakrovimo rūšis <span className="text-destructive">*</span></label>
                <ChipSelector options={LOADING_TYPES} value={loadingTypes}
                  onChange={v => setLoadingTypes(v as string[])} multi />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Pakrovimo tipas <span className="text-destructive">*</span></label>
                <ChipSelector options={PACKING_TYPES} value={packingType}
                  onChange={v => setPackingType(v as string)} />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Savybės</label>
                <ChipSelector options={FEATURES} value={features}
                  onChange={v => setFeatures(v as string[])} multi />
              </div>
            </FormSection>

            {/* Price */}
            <FormSection title="Kaina">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Suma (EUR)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">€</span>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Kainos tipas</label>
                <ChipSelector options={PRICE_TYPES} value={priceType}
                  onChange={v => setPriceType(v as string)} />
              </div>
            </FormSection>

            {/* Description */}
            <FormSection title="Aprašymas">
              <div>
                <textarea
                  rows={4}
                  placeholder="Papildoma informacija apie transporto pasiūlymą…"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
                <p className="text-[10px] text-muted-foreground text-right mt-1">0/300</p>
              </div>
            </FormSection>

            {/* Submit */}
            <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Siūlyti savo transportą
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
