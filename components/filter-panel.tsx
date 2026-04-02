"use client"

import { useState } from "react"
import { X, RefreshCw, MapPin, Calendar as CalendarIcon, Bookmark, Save } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  onClose?: () => void
  className?: string
  isModal?: boolean
}

const SAVED_SEARCHES = [
  { id: "ss1", label: "LT → DE", newCount: 3 },
  { id: "ss2", label: "Šaldomieji", newCount: 1 },
  { id: "ss3", label: "ADR kroviniai", newCount: 0 },
]

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
  const [activeSavedSearch, setActiveSavedSearch] = useState<string | null>(null)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [newSearchName, setNewSearchName] = useState("")

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

        {/* Saved Searches */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <SectionLabel>Išsaugotos paieškos</SectionLabel>
            <button 
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="flex items-center gap-1 text-xs text-primary font-medium hover:text-primary/80 transition-colors"
            >
              <Save className="w-3 h-3" />
              Išsaugoti
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SAVED_SEARCHES.map(ss => (
              <button
                key={ss.id}
                type="button"
                onClick={() => setActiveSavedSearch(activeSavedSearch === ss.id ? null : ss.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  activeSavedSearch === ss.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Bookmark className={cn("w-3 h-3", activeSavedSearch === ss.id && "fill-current")} />
                {ss.label}
                {ss.newCount > 0 && (
                  <span className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                    activeSavedSearch === ss.id
                      ? "bg-white/20 text-white"
                      : "bg-primary text-primary-foreground"
                  )}>
                    +{ss.newCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

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

      {/* Save search modal */}
      {showSaveModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setShowSaveModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-card border border-border rounded-xl p-5 z-50 shadow-xl">
            <h3 className="text-base font-semibold text-foreground mb-1">Išsaugoti paiešką</h3>
            <p className="text-xs text-muted-foreground mb-4">Įveskite paieškos pavadinimą</p>
            <input
              type="text"
              value={newSearchName}
              onChange={e => setNewSearchName(e.target.value)}
              placeholder="Pvz.: LT → DE kroviniai"
              className="w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 mb-4"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setShowSaveModal(false); setNewSearchName("") }}
                className="flex-1 py-2.5 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors"
              >
                Atšaukti
              </button>
              <button
                type="button"
                onClick={() => { setShowSaveModal(false); setNewSearchName("") }}
                className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Išsaugoti
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
