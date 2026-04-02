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
      "bg-card h-full",
      !isModal && "rounded-2xl border border-border",
      className
    )}>
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-4 border-b border-border",
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
        <button className="text-xs text-primary font-medium hover:underline">
          Išvalyti
        </button>
      </div>

      <div className={cn("p-4 space-y-4 overflow-y-auto", isModal ? "pb-24 max-h-[calc(100vh-140px)]" : "max-h-[calc(100vh-200px)]")}>
        {/* Date Selection */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Data
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Pasirinkite datą"
              className="w-full pl-9 pr-8 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Svoris (kg)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="text"
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
              type="text"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="text"
              placeholder="Iki"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Pallets */}
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 block">
            Paletės
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="text"
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
              type="text"
              placeholder="Nuo"
              className="flex-1 min-w-0 px-3 py-2.5 bg-secondary border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <span className="text-muted-foreground text-xs">—</span>
            <input
              type="text"
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
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
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
