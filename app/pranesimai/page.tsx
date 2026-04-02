"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { cn } from "@/lib/utils"
import { Check, Clock } from "lucide-react"

const mockNotifications = [
  {
    id: "1",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 10 val.",
    read: false,
    type: "warning",
  },
  {
    id: "2",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 13 val.",
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 1 d.",
    read: false,
    type: "warning",
  },
  {
    id: "4",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 1 d.",
    read: false,
    type: "warning",
  },
  {
    id: "5",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 1 d.",
    read: false,
    type: "warning",
  },
  {
    id: "6",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 2 d.",
    read: true,
    type: "warning",
  },
  {
    id: "7",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 2 d.",
    read: true,
    type: "warning",
  },
  {
    id: "8",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 2 d.",
    read: true,
    type: "warning",
  },
  {
    id: "9",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 2 d.",
    read: true,
    type: "warning",
  },
  {
    id: "10",
    title: "Krovinio galiojimas baigėsi",
    description: "Krovinio skelbimo galiojimas pasibaigė",
    time: "prieš 3 d.",
    read: true,
    type: "warning",
  },
]

export default function PranesimaiPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-64 pt-16 lg:pt-0">
        <div className="p-4 lg:p-6">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Pranešimai</h1>
                <p className="text-sm text-muted-foreground">{unreadCount} neperskaityti</p>
              </div>
              <button className="text-sm text-primary font-medium hover:underline">
                Visi perskaityti
              </button>
            </div>

            {/* Notifications */}
            <div className="space-y-2">
              {mockNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-xl transition-colors cursor-pointer",
                    notification.read
                      ? "bg-card hover:bg-muted/50"
                      : "bg-muted/50 hover:bg-muted"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    notification.read ? "bg-muted" : "bg-yellow-100"
                  )}>
                    <Clock className={cn(
                      "w-5 h-5",
                      notification.read ? "text-muted-foreground" : "text-yellow-600"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium",
                      notification.read ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {notification.time}
                    </span>
                    {notification.read && (
                      <Check className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
