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
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const MAIN_NAV = [
  { name: "Valdymo skydas", href: "/",           icon: LayoutDashboard },
  { name: "Kroviniai",       href: "/kroviniai",  icon: Package },
  { name: "Transportas",     href: "/transportas", icon: Truck },
  { name: "Žemėlapis",       href: "/zemelapis",  icon: Map },
]

const INBOX_NAV = [
  { name: "Žinutės",     href: "/zinutes",    icon: MessageCircle, badge: 3 },
  { name: "Ginčai",      href: "/gincai",     icon: AlertTriangle },
  { name: "Pranešimai",  href: "/pranesimai", icon: Bell, badge: 5 },
]

const ACCOUNT_NAV = [
  { name: "Profilis",         href: "/profilis",       icon: User },
  { name: "Administravimas",  href: "/administravimas", icon: Settings },
]

function CargoFlowLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="w-8 h-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="oklch(0.546 0.245 262.881)" />
      <path d="M7 16.5h11M13 12l5 4.5L13 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="23" cy="16.5" r="2.5" fill="white" fillOpacity="0.85" />
    </svg>
  )
}

function NavGroup({ label, items, pathname, onNavigate }: {
  label: string
  items: typeof MAIN_NAV
  pathname: string
  onNavigate: () => void
}) {
  return (
    <div className="mb-4">
      <p className="px-3 mb-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        {label}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href))
          const badge = "badge" in item ? (item as { badge?: number }).badge : undefined
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.name}</span>
                {badge && !isActive && (
                  <span className="ml-auto text-[10px] font-bold bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 leading-none">
                    {badge}
                  </span>
                )}
                {!isActive && (
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function AppSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const close = () => setMobileOpen(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CargoFlowLogo />
          <div>
            <span className="font-bold text-foreground text-sm">CargoFlow</span>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(o => !o)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Atidaryti meniu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={close} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-40 h-screen w-60 bg-card border-r border-border flex flex-col transition-transform duration-200",
        "lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Wordmark */}
        <div className="h-14 flex items-center gap-3 px-4 border-b border-border shrink-0">
          <CargoFlowLogo />
          <div>
            <p className="font-bold text-foreground text-sm leading-tight">CargoFlow</p>
            <p className="text-[10px] text-muted-foreground leading-tight">Krovinių birža</p>
          </div>
        </div>



        {/* Nav */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <NavGroup label="Birža"    items={MAIN_NAV}    pathname={pathname} onNavigate={close} />
          <NavGroup label="Gautukai" items={INBOX_NAV}   pathname={pathname} onNavigate={close} />
          <NavGroup label="Paskyra"  items={ACCOUNT_NAV} pathname={pathname} onNavigate={close} />
        </nav>

        {/* User footer */}
        <div className="shrink-0 px-3 py-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary/10 overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_8515-TT3KyeQ9Cpm3pMIayISPdf5rPDVhmN.webp"
                alt="Profilis"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Deimanas S.</p>
              <p className="text-[10px] text-muted-foreground truncate">Vežėjas · Pro</p>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Prisijungęs" />
          </div>
        </div>
      </aside>
    </>
  )
}
