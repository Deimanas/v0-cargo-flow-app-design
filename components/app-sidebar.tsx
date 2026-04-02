"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Truck,
  Map,
  MessageCircle,
  AlertTriangle,
  Bell,
  User,
  Settings,
  Search,
  Menu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const NAV_ITEMS = [
  { name: "Valdymo skydas", href: "/", icon: LayoutDashboard },
  { name: "Kroviniai", href: "/kroviniai", icon: Package },
  { name: "Transportas", href: "/transportas", icon: Truck },
  { name: "Žemėlapis", href: "/zemelapis", icon: Map },
  { name: "Žinutės", href: "/zinutes", icon: MessageCircle },
  { name: "Ginčai", href: "/gincai", icon: AlertTriangle },
  { name: "Pranešimai", href: "/pranesimai", icon: Bell },
  { name: "Profilis", href: "/profilis", icon: User },
  { name: "Administravimas", href: "/administravimas", icon: Settings },
]

function CargoFlowLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#F97316" />
      <path
        d="M12 20C12 15.5817 15.5817 12 20 12C24.4183 12 28 15.5817 28 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M28 20C28 24.4183 24.4183 28 20 28C15.5817 28 12 24.4183 12 20"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <circle cx="20" cy="20" r="3" fill="white" />
    </svg>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CargoFlowLogo className="w-8 h-8" />
          <span className="font-semibold text-foreground">CargoFlow</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg hover:bg-muted"
          aria-label="Atidaryti meniu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <CargoFlowLogo className="w-10 h-10" />
          <div>
            <p className="font-semibold text-foreground leading-tight">CargoFlow</p>
            <p className="text-xs text-muted-foreground">Krovinių birža</p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Ieškoti krovinių, maršrutų..."
              className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigacija
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-full overflow-hidden shrink-0">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8515-TT3KyeQ9Cpm3pMIayISPdf5rPDVhmN.webp"
                alt="Profilio nuotrauka"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">Deimanas S.</p>
              <p className="text-xs text-muted-foreground truncate">deimanas.s@gmail.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
