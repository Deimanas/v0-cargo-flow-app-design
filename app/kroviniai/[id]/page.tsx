"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { CargoDetail } from "@/components/cargo-detail"
import { use } from "react"

const mockCargo = {
  id: "6",
  title: "Buitinė technika Klaipėda - Kaunas",
  from: {
    city: "Klaipėda",
    country: "LT",
    address: "Šilutės pl. 5, Klaipėda, Lietuva",
    date: "2026-03-31",
    time: "10:00 - 12:00",
  },
  to: {
    city: "Kaunas",
    country: "LT",
    address: "Ateities pl. 45, Kaunas, Lietuva",
    date: "2026-03-31",
    time: "16:00 - 21:00",
  },
  price: 1490,
  priceNegotiable: true,
  status: "negotiable" as const,
  views: 6,
  publishedAt: "2026-03-28 10:44",
  description: "Pilnas krovinys į Kauno sandėlį.",
  requirements: "Reikalingas ilgesnis tentas.",
  cargo: {
    type: "Bendras krovinys",
    weight: 16.0,
    volume: 68.0,
    pallets: 20,
    ldm: 10.2,
    loadingType: "Galinis",
  },
  vehicle: "Mega priekaba",
  distance: 213,
  publisher: {
    name: "dfsdfsdsf",
    company: "test test",
    phone: "+37062650778",
    email: "deimanas.s@gmail.com",
  },
  reference: "LT-CG-260328-103",
  tags: ["Bendras krovinys", "Mega priekaba"],
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
