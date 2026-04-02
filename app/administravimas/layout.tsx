"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  AlertTriangle,
  Flag,
  Boxes,
  Truck,
  ToggleLeft,
  FileText,
  History,
  Activity,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

const ADMIN_NAV = [
  { href: "/administravimas", label: "Skydelis", icon: LayoutDashboard, exact: true },
  { href: "/administravimas/aktyvumas", label: "Aktyvumas", icon: Activity },
  { href: "/administravimas/imones", label: "Įmonės", icon: Building2 },
  { href: "/administravimas/vartotojai", label: "Vartotojai", icon: Users },
  { href: "/administravimas/kroviniai", label: "Kroviniai", icon: Package },
  { href: "/administravimas/gincai", label: "Ginčai", icon: AlertTriangle },
  { href: "/administravimas/reportai", label: "Reportai", icon: Flag },
  { href: "/administravimas/katalogas", label: "Katalogas", icon: Boxes },
  { href: "/administravimas/moduliai", label: "Moduliai", icon: ToggleLeft },
  { href: "/administravimas/teisine", label: "Teisiniai tekstai", icon: FileText },
  { href: "/administravimas/audit", label: "Audit log", icon: History },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (item: typeof ADMIN_NAV[0]) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }

  const currentSection = ADMIN_NAV.find(item => isActive(item))

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      
      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside className="hidden xl:flex flex-col w-56 border-r border-border bg-card shrink-0 sticky top-0 h-screen">
            <div className="p-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground">Administravimas</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Sistemos valdymas</p>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              {ADMIN_NAV.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5",
                    isActive(item)
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Section Selector */}
            <div className="xl:hidden sticky top-14 lg:top-0 z-30 bg-background border-b border-border">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  {currentSection && <currentSection.icon className="w-4 h-4 text-primary" />}
                  <span className="text-sm font-medium text-foreground">
                    {currentSection?.label || "Administravimas"}
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-4 h-4 text-muted-foreground transition-transform",
                  mobileMenuOpen && "rotate-180"
                )} />
              </button>
              
              {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg">
                  {ADMIN_NAV.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-sm transition-colors border-l-2",
                        isActive(item)
                          ? "bg-primary/5 text-primary border-l-primary font-medium"
                          : "text-muted-foreground hover:bg-muted border-l-transparent"
                      )}
                    >
                      <item.icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Page Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
