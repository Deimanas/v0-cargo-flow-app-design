"use client"

import { useState } from "react"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  onClose?: () => void
  className?: string
}

const cargoTypes = [
  { id: "bendras", label: "Bendras" },
  { id: "saldomas", label: "Šaldomas" },
  { id: "adr", label: "ADR" },
  { id: "negabaritinis", label: "Negabaritinis" },
  { id: "skystis", label: "Skystis" },
  { id: "biri", label: "Biri" },
]

export function FilterPanel({ onClose, className }: FilterPanelProps) {
  const [sortBy, setSortBy] = useState("naujausi")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const toggleType = (id: string) => {
    setSelectedTypes((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    )
  }

  return (
    <div className={cn("bg-card rounded-2xl border border-border p-5", className)}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">Filtrai</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          Išvalyti
        </button>
      </div>

      {/* Sort */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Rūšiavimas
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="naujausi">Naujausi</option>
            <option value="kaina-asc">Kaina (mažiausia)</option>
            <option value="kaina-desc">Kaina (didžiausia)</option>
            <option value="atstumas">Atstumas</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Cargo Type */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Krovinio tipas
        </label>
        <div className="space-y-2">
          {cargoTypes.map((type) => (
            <label
              key={type.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors",
                  selectedTypes.includes(type.id)
                    ? "bg-primary border-primary"
                    : "border-border group-hover:border-primary/50"
                )}
              >
                {selectedTypes.includes(type.id) && (
                  <svg
                    className="w-3 h-3 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-foreground">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Country */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Šalis
        </label>
        <input
          type="text"
          placeholder="Kilmė (pvz. LT)"
          className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 mb-2"
        />
        <input
          type="text"
          placeholder="Paskirties (pvz. DE)"
          className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {/* Weight */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Svoris (kg)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nuo"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Iki"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Volume */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Tūris (m³)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nuo"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Iki"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Pallets */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Paletės
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nuo"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Iki"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Kaina (€)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Nuo"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="text"
            placeholder="Iki"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Loading Date */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Pakrovimo dienos
        </label>
        <div className="flex gap-2">
          <input
            type="date"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="date"
            className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Special */}
      <div className="mb-5">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
          Specialūs
        </label>
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className="w-5 h-5 rounded-md border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-colors">
          </div>
          <span className="text-sm text-foreground">Tik ADR</span>
        </label>
      </div>

      {/* Apply Button (mobile) */}
      {onClose && (
        <button
          onClick={onClose}
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Taikyti filtrus
        </button>
      )}
    </div>
  )
}
