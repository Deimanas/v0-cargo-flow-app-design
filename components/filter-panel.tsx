"use client"

import { useState } from "react"
import { X, RefreshCw, MapPin, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  onClose?: () => void
  className?: string
  isModal?: boolean
}

const cargoTypes = [
  { id: "bendras", label: "Bendras" },
  { id: "saldomas", label: "Šaldomas" },
  { id: "adr", label: "ADR" },
  { id: "negabaritinis", label: "Negabaritinis" },
  { id: "skystis", label: "Skystis" },
  { id: "biri", label: "Biri" },
]

export function FilterPanel({ onClose, className, isModal }: FilterPanelProps) {
  const [partialLoading, setPartialLoading] = useState(false)
  const [adrOnly, setAdrOnly] = useState(false)
  const [selectedCargoTypes, setSelectedCargoTypes] = useState<string[]>([])

  const toggleCargoType = (id: string) => {
    setSelectedCargoTypes(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  return (
    <div className={cn(
      "bg-card h-full flex flex-col",
      !isModal && "rounded-2xl border border-border",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-4 border-b border-border shrink-0",
        isModal && "sticky top-0 bg-card z-10"
      )}>
        {isModal ? (
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-foreground" />
          </button>
        ) : (
          <h3 className="text-sm font-semibold text-foreground">Filtrai</h3>
        )}
        {isModal && <h2 className="font-semibold text-foreground">Filtrai</h2>}
        <button className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
          <RefreshCw className="w-3 h-3" />
          Išvalyti
        </button>
      </div>

      <div className={cn(
        "flex-1 overflow-y-auto p-4 space-y-5",
        isModal ? "pb-32" : ""
      )}>
        
        {/* Origin */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Kilmė
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Šalis"
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Miestas"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Spindulys km"
                className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Paskirtis
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Šalis"
                className="w-full px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Miestas"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Spindulys km"
                className="flex-1 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Cargo Type */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Krovinio tipas
          </label>
          <div className="flex flex-wrap gap-2">
            {cargoTypes.map(type => (
              <button
                key={type.id}
                onClick={() => toggleCargoType(type.id)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors",
                  selectedCargoTypes.includes(type.id)
                    ? "bg-primary/15 border-primary/30 text-primary"
                    : "bg-secondary border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Dates */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Pakrovimo dienos
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
            <span className="text-muted-foreground text-xs">—</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Delivery Dates */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Pristatymo dienos
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
            <span className="text-muted-foreground text-xs">—</span>
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="date"
                className="w-full pl-9 pr-3 py-2.5 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 [&::-webkit-calendar-picker-indicator]:opacity-50"
              />
            </div>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Svoris (t)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              placeholder="Iki"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Volume */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Tūris (m³)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              placeholder="Iki"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Kaina (EUR)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="number"
              placeholder="Iki"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div className="pt-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Papildomi
          </label>
          
          <div className="space-y-3">
            {/* Partial Loading Toggle */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Dalinis pakrovimas</p>
                <p className="text-xs text-muted-foreground">Rodyti tik dalinius</p>
              </div>
              <button
                onClick={() => setPartialLoading(!partialLoading)}
                className={cn(
                  "shrink-0 w-11 h-6 rounded-full transition-colors relative",
                  partialLoading ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    partialLoading ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>

            {/* ADR Toggle */}
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">ADR kroviniai</p>
                <p className="text-xs text-muted-foreground">Tik pavojingi kroviniai</p>
              </div>
              <button
                onClick={() => setAdrOnly(!adrOnly)}
                className={cn(
                  "shrink-0 w-11 h-6 rounded-full transition-colors relative",
                  adrOnly ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    adrOnly ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Apply button for non-modal */}
        {!isModal && (
          <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors mt-4">
            Taikyti filtrus
          </button>
        )}
      </div>

      {/* Apply Button - fixed at bottom for modal */}
      {isModal && (
        <div className="shrink-0 p-4 bg-card border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Taikyti filtrus
          </button>
        </div>
      )}


    </div>
  )
}
