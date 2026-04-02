"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoDetail } from "@/components/cargo-detail"
import { use } from "react"

const mockCargo = {
  id: "6",
  status: "active" as const,
  publishedAt: "2026-03-28 10:44",
  views: 3,
  title: "dfsdfsdsf",
  company: "test test",
  rating: 0,
  price: 1040,
  priceNegotiable: true,
  description: "Vidutinio dydzio krovinys i uosta.",
  requirements: "Pageidautinas pakrovimas ryte.",
  from: {
    city: "Utena",
    country: "LT",
    address: "J. Basanavičiaus g. 85, Utena, Lietuva, 28142, LT",
    date: "2026-04-02",
  },
  to: {
    city: "Klaipėda",
    country: "LT",
    address: "Liepajų g. 18, Klaipėda, Lietuva, 92191, LT",
    date: "2026-04-02",
  },
  cargo: {
    type: "Bendroji",
    weight: 7.6,
    volume: 32.0,
    pallets: 10,
    ldm: 5.9,
    loadingType: "Galas, Šonas",
  },
  vehicle: "Tentinė",
  distance: 331,
  tags: ["Bendroji", "Tentinė", "7.6 t"],
}

export default function CargoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          <CargoDetail cargo={mockCargo} />
        </div>
      </main>
    </div>
  )
}
