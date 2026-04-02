"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState } from "react"
import { 
  MapPin, 
  Calendar, 
  ChevronDown,
  Truck,
  RefreshCw,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

const mockTransports = [
  {
    id: "1",
    from: { city: "Utena", country: "LT", address: "Utena, Lietuva, 28193, LT" },
    to: { city: "Klaipėda", country: "LT", address: "Klaipėda, Lietuva, 91100, LT" },
    loadDate: "2026-04-02",
    unloadDate: "2026-04-02 – 2026-04-03",
    price: 950,
    priceNegotiable: true,
    company: "UAB \"VARLE\"",
    rating: 0,
    distance: 331,
    matchingCargo: 1,
  },
]

const countryFlags: Record<string, string> = {
  LT: "🇱🇹",
  LV: "🇱🇻",
  EE: "🇪🇪",
  PL: "🇵🇱",
  DE: "🇩🇪",
}

export default function TransportasPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Transportas</h1>
                <p className="text-sm text-muted-foreground">Jūsų transporto pasiūlymai</p>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Truck className="w-4 h-4" />
                Siūlyti savo transportą
              </button>
            </div>

            {/* Form */}
            {showForm && (
              <div className="bg-card rounded-2xl border border-border p-5 mb-6">
                <h2 className="font-semibold text-foreground mb-4">Siūlyti savo transportą</h2>
                
                {/* Recurring Route */}
                <div className="p-4 bg-muted/50 rounded-xl mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Pasikartojantis maršrutas
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Greitas maršruto užpildymas ir automatinis savaitinis skelbimas
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Dar neturite išsaugotų maršrutų.
                  </p>
                  <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    Išsaugoti dabartinę formą kaip maršrutą
                  </button>
                </div>

                {/* Loading */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Pakrovimas
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">Šalis *</label>
                      <div className="relative">
                        <select className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                          <option>🇱🇹 LT</option>
                          <option>🇱🇻 LV</option>
                          <option>🇪🇪 EE</option>
                          <option>🇵🇱 PL</option>
                          <option>🇩🇪 DE</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">Miestas *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Vilnius..."
                          className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                          <MapPin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Pakrovimo datos *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Pasirinkite datą"
                        className="w-full pl-10 pr-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Delivery */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Pristatymas
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">Šalis *</label>
                      <div className="relative">
                        <select className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                          <option>🇱🇹 LT</option>
                          <option>🇱🇻 LV</option>
                          <option>🇪🇪 EE</option>
                          <option>🇵🇱 PL</option>
                          <option>🇩🇪 DE</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">Miestas *</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Berlin..."
                          className="flex-1 px-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors">
                          <MapPin className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Pristatymo datos *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Pasirinkite datą"
                        className="w-full pl-10 pr-4 py-2.5 bg-muted border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Vehicle Capacity */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Transporto talpinimas
                  </p>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Krovinio rūšis *</label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 bg-muted border-0 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Pasirinkite...</option>
                      <option>Bendras</option>
                      <option>Šaldomas</option>
                      <option>ADR</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <button className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Truck className="w-5 h-5" />
                  Siūlyti savo transportą
                </button>
              </div>
            )}

            {/* Transport List */}
            <div className="space-y-4">
              {mockTransports.map((transport) => (
                <div key={transport.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                  {/* Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          Paskelbtas
                        </span>
                        <span className="text-xs text-muted-foreground">2026-03-28 10:33</span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Eye className="w-3.5 h-3.5" /> 0
                        </span>
                      </div>
                    </div>
                    <p className="font-medium text-foreground">{transport.company} ★ — (0)</p>
                    <p className="text-xl font-bold text-foreground mt-2">
                      💶 {transport.price} € <span className="text-sm font-normal text-muted-foreground">Derinama</span>
                    </p>
                  </div>

                  {/* Route */}
                  <div className="p-4 border-b border-border">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <div className="w-0.5 h-12 bg-border my-1" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase">Pakrovimas</p>
                          <p className="font-semibold text-foreground">{transport.from.city}</p>
                          <p className="text-sm text-muted-foreground">{transport.from.address}</p>
                          <p className="text-sm text-muted-foreground">{transport.loadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase">Pristatymas</p>
                          <p className="font-semibold text-foreground">{transport.to.city}</p>
                          <p className="text-sm text-muted-foreground">{transport.to.address}</p>
                          <p className="text-sm text-muted-foreground">{transport.unloadDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">Žemėlapio vaizdas</p>
                  </div>

                  {/* Matching Cargo */}
                  {transport.matchingCargo > 0 && (
                    <div className="p-4 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        Atitinkantys kroviniai ({transport.matchingCargo})
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Rodomi kroviniai, kurie šiuo metu atitinka šį transporto pasiūlymą.
                      </p>
                      <Link 
                        href="/kroviniai/6"
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-xl hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium text-foreground">Utena → Klaipėda</p>
                          <p className="text-sm text-muted-foreground">UAB dfsdfsdsf</p>
                          <p className="text-xs text-muted-foreground">★ — (0) · Bendroji · 7.6 t · balandžio 2 d.</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">💶 1 040 € Derinama</p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
