"use client"

import { useState } from "react"
import { ChevronDown, Calendar, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  onClose?: () => void
  className?: string
  isModal?: boolean
}

export function FilterPanel({ onClose, className, isModal }: FilterPanelProps) {
  const [partialLoading, setPartialLoading] = useState(false)
  const [adrOnly, setAdrOnly] = useState(false)

  return (
    <div className={cn(
      "bg-card",
      !isModal && "rounded-2xl border border-border",
      className
    )}>
      {/* Header - only for modal */}
      {isModal && (
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-foreground" />
          </button>
          <h2 className="font-semibold text-foreground">Filtrai</h2>
          <button className="text-sm text-primary font-medium">
            Išvalyti
          </button>
        </div>
      )}

      <div className={cn("p-5 space-y-6", isModal && "pb-24")}>
        {/* Date Selection */}
        <div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pasirinkite datą"
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Svoris (kg)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="text"
              placeholder="Iki"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Volume */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Tūris (m³)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="text"
              placeholder="Iki"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Pallets */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Paletės
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="text"
              placeholder="Iki"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Kaina (EUR)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground">—</span>
            <input
              type="text"
              placeholder="Iki"
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
            Papildomi
          </label>
          
          <div className="space-y-4">
            {/* Partial Loading Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Dalinis pakrovimas</p>
                <p className="text-xs text-muted-foreground">Rodyti tik dalinius</p>
              </div>
              <button
                onClick={() => setPartialLoading(!partialLoading)}
                className={cn(
                  "w-12 h-7 rounded-full transition-colors relative",
                  partialLoading ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    partialLoading ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* ADR Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">ADR kroviniai</p>
                <p className="text-xs text-muted-foreground">Tik pavojingi kroviniai</p>
              </div>
              <button
                onClick={() => setAdrOnly(!adrOnly)}
                className={cn(
                  "w-12 h-7 rounded-full transition-colors relative",
                  adrOnly ? "bg-primary" : "bg-muted"
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform",
                    adrOnly ? "translate-x-6" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button - fixed at bottom for modal */}
      {isModal && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Taikyti filtrus
          </button>
        </div>
      )}
    </div>
  )
}
