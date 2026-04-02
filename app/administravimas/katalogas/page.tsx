"use client"

import { useState } from "react"
import {
  Boxes,
  Truck,
  Plus,
  Pencil,
  Trash2,
  GripVertical,
  Check,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CARGO_TYPES = [
  { id: 1, name: "Bendri kroviniai", code: "general", count: 456, active: true },
  { id: 2, name: "Šaldyti kroviniai", code: "refrigerated", count: 123, active: true },
  { id: 3, name: "Pavojingi kroviniai (ADR)", code: "adr", count: 45, active: true },
  { id: 4, name: "Skystieji kroviniai", code: "liquid", count: 67, active: true },
  { id: 5, name: "Negabaritiniai kroviniai", code: "oversized", count: 34, active: true },
  { id: 6, name: "Automobilių transportavimas", code: "vehicles", count: 89, active: true },
  { id: 7, name: "Konteineriai", code: "container", count: 156, active: true },
  { id: 8, name: "Daliniai kroviniai (LTL)", code: "ltl", count: 234, active: true },
]

const TRANSPORT_TYPES = [
  { id: 1, name: "Tentinis", code: "tilt", count: 567, active: true },
  { id: 2, name: "Refrižeratorius", code: "reefer", count: 234, active: true },
  { id: 3, name: "Platforminis", code: "flatbed", count: 123, active: true },
  { id: 4, name: "Konteineris", code: "container", count: 189, active: true },
  { id: 5, name: "Cisterna", code: "tank", count: 45, active: true },
  { id: 6, name: "Autovežis", code: "car_carrier", count: 67, active: true },
  { id: 7, name: "Mega/Jumbo", code: "mega", count: 98, active: true },
  { id: 8, name: "Furgoninis", code: "van", count: 345, active: true },
]

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState<"cargo" | "transport">("cargo")
  const [cargoTypes, setCargoTypes] = useState(CARGO_TYPES)
  const [transportTypes, setTransportTypes] = useState(TRANSPORT_TYPES)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editValue, setEditValue] = useState("")
  const [newItemName, setNewItemName] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const currentItems = activeTab === "cargo" ? cargoTypes : transportTypes
  const setCurrentItems = activeTab === "cargo" ? setCargoTypes : setTransportTypes

  const handleEdit = (item: typeof CARGO_TYPES[0]) => {
    setEditingId(item.id)
    setEditValue(item.name)
  }

  const handleSaveEdit = (id: number) => {
    setCurrentItems(prev => prev.map(item => 
      item.id === id ? { ...item, name: editValue } : item
    ))
    setEditingId(null)
    setEditValue("")
  }

  const handleToggleActive = (id: number) => {
    setCurrentItems(prev => prev.map(item => 
      item.id === id ? { ...item, active: !item.active } : item
    ))
  }

  const handleDelete = (id: number) => {
    if (confirm("Ar tikrai norite ištrinti šį elementą?")) {
      setCurrentItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handleAddNew = () => {
    if (!newItemName.trim()) return
    const newItem = {
      id: Date.now(),
      name: newItemName,
      code: newItemName.toLowerCase().replace(/\s+/g, "_"),
      count: 0,
      active: true,
    }
    setCurrentItems(prev => [...prev, newItem])
    setNewItemName("")
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Katalogas</h1>
        <p className="text-sm text-muted-foreground mt-1">Valdykite krovinio rūšis ir transporto tipus</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("cargo")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === "cargo"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Boxes className="w-4 h-4" />
          Krovinio rūšys
          <span className="px-1.5 py-0.5 text-xs bg-muted rounded-full">{cargoTypes.length}</span>
        </button>
        <button
          onClick={() => setActiveTab("transport")}
          className={cn(
            "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors",
            activeTab === "transport"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Truck className="w-4 h-4" />
          Transporto tipai
          <span className="px-1.5 py-0.5 text-xs bg-muted rounded-full">{transportTypes.length}</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {activeTab === "cargo" ? "Krovinio rūšys" : "Transporto tipai"}
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Pridėti
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
              placeholder={activeTab === "cargo" ? "Naujos rūšies pavadinimas..." : "Naujo tipo pavadinimas..."}
              className="flex-1 px-3 py-2 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <button
              onClick={handleAddNew}
              className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewItemName("")
              }}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* List */}
        <div className="divide-y divide-border">
          {currentItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-muted/20 transition-colors group">
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                activeTab === "cargo" ? "bg-blue-50" : "bg-amber-50"
              )}>
                {activeTab === "cargo" 
                  ? <Boxes className="w-5 h-5 text-blue-600" />
                  : <Truck className="w-5 h-5 text-amber-600" />
                }
              </div>

              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      className="flex-1 px-2 py-1 bg-secondary border border-border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveEdit(item.id)}
                      className="p-1.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null)
                        setEditValue("")
                      }}
                      className="p-1.5 hover:bg-muted rounded transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Kodas: {item.code}</p>
                  </>
                )}
              </div>

              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-foreground">{item.count}</p>
                <p className="text-xs text-muted-foreground">skelbimų</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggleActive(item.id)}
                  className={cn(
                    "w-10 h-6 rounded-full transition-colors relative",
                    item.active ? "bg-emerald-500" : "bg-muted"
                  )}
                >
                  <span className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                    item.active ? "left-5" : "left-1"
                  )} />
                </button>

                <button
                  onClick={() => handleEdit(item)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
