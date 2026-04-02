"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState, useCallback } from "react"
import Link from "next/link"
import {
  Bell,
  Package,
  MessageCircle,
  AlertTriangle,
  DollarSign,
  Truck,
  User,
  Settings,
  Check,
  Trash2,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const NOTIFICATION_TYPES = {
  offer: { icon: DollarSign, color: "bg-emerald-100 text-emerald-600" },
  message: { icon: MessageCircle, color: "bg-blue-100 text-blue-600" },
  cargo: { icon: Package, color: "bg-purple-100 text-purple-600" },
  delivery: { icon: Truck, color: "bg-amber-100 text-amber-600" },
  dispute: { icon: AlertTriangle, color: "bg-red-100 text-red-600" },
  system: { icon: Bell, color: "bg-slate-100 text-slate-600" },
  user: { icon: User, color: "bg-cyan-100 text-cyan-600" },
}

const NOTIFICATIONS = [
  {
    id: "1",
    type: "offer" as const,
    title: "Naujas kainos pasiūlymas",
    description: "UAB Transportas pasiūlė 2200 EUR už krovinį Vilnius → Berlin",
    time: "prieš 10 min.",
    read: false,
    link: "/pasiulymai",
  },
  {
    id: "2",
    type: "message" as const,
    title: "Nauja žinutė",
    description: "Jonas Jonaitis: \"Ar galėtumėte patvirtinti pristatymo adresą?\"",
    time: "prieš 25 min.",
    read: false,
    link: "/zinutes",
  },
  {
    id: "3",
    type: "delivery" as const,
    title: "Krovinys pristatytas",
    description: "Krovinys #1245 sėkmingai pristatytas į Amsterdamą",
    time: "prieš 2 val.",
    read: false,
    link: "/kroviniai/3",
  },
  {
    id: "4",
    type: "cargo" as const,
    title: "Jūsų krovinys peržiūrėtas",
    description: "47 vežėjai peržiūrėjo jūsų krovinį Vilnius → Berlin",
    time: "prieš 3 val.",
    read: true,
    link: "/kroviniai/1",
  },
  {
    id: "5",
    type: "offer" as const,
    title: "Pasiūlymas priimtas",
    description: "Jūsų pasiūlymas 580 EUR priimtas! Krovinys priskirtas.",
    time: "prieš 1 d.",
    read: true,
    link: "/pasiulymai",
  },
  {
    id: "6",
    type: "dispute" as const,
    title: "Atidarytas ginčas",
    description: "Vežėjas atidarė ginčą dėl krovinio #1189 vėlavimo",
    time: "prieš 2 d.",
    read: true,
    link: "/gincai",
  },
  {
    id: "7",
    type: "system" as const,
    title: "Sistemos atnaujinimas",
    description: "Nauja funkcija: Dabar galite filtruoti krovinius pagal ADR klasę",
    time: "prieš 3 d.",
    read: true,
    link: null,
  },
  {
    id: "8",
    type: "user" as const,
    title: "Profilio patvirtinimas",
    description: "Jūsų įmonės profilis sėkmingai patvirtintas",
    time: "prieš 1 sav.",
    read: true,
    link: "/profilis",
  },
]

const FILTER_TABS = [
  { key: "all", label: "Visi" },
  { key: "unread", label: "Neskaityti" },
  { key: "offers", label: "Pasiūlymai" },
  { key: "messages", label: "Žinutės" },
  { key: "cargo", label: "Kroviniai" },
]

function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  onDelete 
}: { 
  notification: typeof NOTIFICATIONS[0]
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  const typeConfig = NOTIFICATION_TYPES[notification.type]
  const Icon = typeConfig.icon

  const content = (
    <div
      className={cn(
        "group relative flex items-start gap-4 p-4 rounded-xl border transition-all",
        notification.read
          ? "bg-card border-border hover:border-primary/30"
          : "bg-primary/5 border-primary/20 hover:border-primary/40"
      )}
    >
      {/* Unread indicator */}
      {!notification.read && (
        <div className="absolute left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
      )}

      {/* Icon */}
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
        typeConfig.color
      )}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <p className={cn(
            "text-sm",
            notification.read ? "font-medium text-foreground" : "font-semibold text-foreground"
          )}>
            {notification.title}
          </p>
          <span className="text-xs text-muted-foreground shrink-0">
            {notification.time}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {notification.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {!notification.read && (
          <button
            type="button"
            onClick={e => { e.preventDefault(); e.stopPropagation(); onMarkAsRead(notification.id) }}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors"
            title="Pažymėti kaip skaitytą"
          >
            <Check className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        <button
          type="button"
          onClick={e => { e.preventDefault(); e.stopPropagation(); onDelete(notification.id) }}
          className="p-1.5 hover:bg-destructive/10 rounded-lg transition-colors"
          title="Ištrinti"
        >
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
        </button>
        {notification.link && (
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </div>
    </div>
  )

  if (notification.link) {
    return (
      <Link 
        href={notification.link} 
        className="block cursor-pointer"
        onClick={() => onMarkAsRead(notification.id)}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className="cursor-default" onClick={() => onMarkAsRead(notification.id)}>
      {content}
    </div>
  )
}

export default function PranesimuPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notifications, setNotifications] = useState(NOTIFICATIONS)

  const unreadCount = notifications.filter(n => !n.read).length

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !n.read
    if (activeTab === "offers") return n.type === "offer"
    if (activeTab === "messages") return n.type === "message"
    if (activeTab === "cargo") return n.type === "cargo" || n.type === "delivery"
    return true
  })

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="p-4 lg:p-6 max-w-3xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Pranešimai</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount > 0 ? `${unreadCount} neskaityti pranešimai` : "Visi pranešimai perskaityti"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Pažymėti visus
                </button>
              )}
              <button
                type="button"
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </header>

          {/* Filter tabs */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
            {FILTER_TABS.map(tab => {
              const count = tab.key === "all" ? notifications.length :
                           tab.key === "unread" ? notifications.filter(n => !n.read).length :
                           tab.key === "offers" ? notifications.filter(n => n.type === "offer").length :
                           tab.key === "messages" ? notifications.filter(n => n.type === "message").length :
                           notifications.filter(n => n.type === "cargo" || n.type === "delivery").length

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border whitespace-nowrap",
                    activeTab === tab.key
                      ? "bg-foreground text-background border-foreground"
                      : "bg-card border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                  {count > 0 && (
                    <span className={cn(
                      "ml-1.5 text-xs",
                      activeTab === tab.key ? "text-background/70" : "text-muted-foreground"
                    )}>
                      ({count})
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Notifications list */}
          <div className="space-y-2">
            {filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}

            {filteredNotifications.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">Pranešimų nėra</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "unread"
                    ? "Visi pranešimai perskaityti"
                    : "Šioje kategorijoje pranešimų nėra"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
