"use client"

import { useState } from "react"
import { X, RefreshCw, MapPin, Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  onClose?: () => void
  className?: string
  isModal?: boolean
}

const CARGO_TYPES = [
  { id: "bendras",       label: "Bendras" },
  { id: "saldomas",      label: "Šaldomas" },
  { id: "adr",           label: "ADR" },
  { id: "negabaritinis", label: "Negabaritas" },
  { id: "skystis",       label: "Skystis" },
  { id: "biri",          label: "Biri" },
]

function InputField({ placeholder, type = "text", icon }: { placeholder: string; type?: string; icon?: React.ReactNode }) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full py-2 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
          icon ? "pl-8 pr-3" : "px-3"
        )}
      />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
      {children}
    </p>
  )
}

export function FilterPanel({ onClose, className, isModal }: FilterPanelProps) {
  const [partialLoading, setPartialLoading] = useState(false)
  const [adrOnly, setAdrOnly] = useState(false)
  const [selectedCargoTypes, setSelectedCargoTypes] = useState<string[]>([])

  const toggleType = (id: string) =>
    setSelectedCargoTypes(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])

  return (
    <div className={cn(
      "bg-card h-full flex flex-col font-sans",
      !isModal && "rounded-xl border border-border",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-border shrink-0",
        isModal && "sticky top-0 bg-card z-10"
      )}>
        <div className="flex items-center gap-2">
          {isModal && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted transition-colors -ml-1 mr-1">
              <X className="w-4 h-4 text-foreground" />
            </button>
          )}
          <h3 className="text-sm font-semibold text-foreground">Filtrai</h3>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-primary font-medium hover:text-primary/80 transition-colors">
          <RefreshCw className="w-3 h-3" />
          Išvalyti
        </button>
      </div>

      {/* Body */}
      <div className={cn("flex-1 overflow-y-auto px-4 py-4 space-y-5", isModal && "pb-28")}>

        {/* Origin */}
        <div>
          <SectionLabel>Kilmė</SectionLabel>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <InputField placeholder="Šalis" />
            <InputField placeholder="Miestas" icon={<MapPin className="w-3.5 h-3.5" />} />
          </div>
          <InputField placeholder="Spindulys, km" type="number" />
        </div>

        {/* Destination */}
        <div>
          <SectionLabel>Paskirtis</SectionLabel>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <InputField placeholder="Šalis" />
            <InputField placeholder="Miestas" icon={<MapPin className="w-3.5 h-3.5" />} />
          </div>
          <InputField placeholder="Spindulys, km" type="number" />
        </div>

        {/* Cargo type chips */}
        <div>
          <SectionLabel>Krovinio tipas</SectionLabel>
          <div className="flex flex-wrap gap-1.5">
            {CARGO_TYPES.map(t => (
              <button
                key={t.id}
                onClick={() => toggleType(t.id)}
                className={cn(
                  "px-2.5 py-1 rounded-md text-xs font-medium border transition-colors",
                  selectedCargoTypes.includes(t.id)
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-background border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading dates */}
        <div>
          <SectionLabel>Pakrovimo datos</SectionLabel>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="date" className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-40" />
            </div>
            <span className="text-muted-foreground text-xs">—</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="date" className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-40" />
            </div>
          </div>
        </div>

        {/* Delivery dates */}
        <div>
          <SectionLabel>Pristatymo datos</SectionLabel>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="date" className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-40" />
            </div>
            <span className="text-muted-foreground text-xs">—</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input type="date" className="w-full pl-8 pr-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-40" />
            </div>
          </div>
        </div>

        {/* Weight / Volume range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionLabel>Svoris (t)</SectionLabel>
            <div className="flex items-center gap-1.5">
              <InputField placeholder="Nuo" type="number" />
              <span className="text-muted-foreground text-xs shrink-0">—</span>
              <InputField placeholder="Iki" type="number" />
            </div>
          </div>
          <div>
            <SectionLabel>Tūris (m³)</SectionLabel>
            <div className="flex items-center gap-1.5">
              <InputField placeholder="Nuo" type="number" />
              <span className="text-muted-foreground text-xs shrink-0">—</span>
              <InputField placeholder="Iki" type="number" />
            </div>
          </div>
        </div>

        {/* Price range */}
        <div>
          <SectionLabel>Kaina (EUR)</SectionLabel>
          <div className="flex items-center gap-1.5">
            <InputField placeholder="Nuo" type="number" />
            <span className="text-muted-foreground text-xs shrink-0">—</span>
            <InputField placeholder="Iki" type="number" />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-1 space-y-3">
          <SectionLabel>Papildomi</SectionLabel>
          {[
            { value: partialLoading, set: setPartialLoading, title: "Dalinis pakrovimas", desc: "Rodyti tik dalinius" },
            { value: adrOnly, set: setAdrOnly, title: "ADR kroviniai", desc: "Tik pavojingi kroviniai" },
          ].map(({ value, set, title, desc }) => (
            <div key={title} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button
                onClick={() => set(v => !v)}
                role="switch"
                aria-checked={value}
                className={cn(
                  "shrink-0 w-10 h-5.5 rounded-full transition-colors relative",
                  value ? "bg-primary" : "bg-muted"
                )}
              >
                <span className={cn(
                  "absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform",
                  value ? "translate-x-5" : "translate-x-0.5"
                )} />
              </button>
            </div>
          ))}
        </div>

        {!isModal && (
          <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            Taikyti filtrus
          </button>
        )}
      </div>

      {/* Modal footer */}
      {isModal && (
        <div className="shrink-0 px-4 py-4 bg-card border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            Taikyti filtrus
          </button>
        </div>
      )}
    </div>
  )
}
