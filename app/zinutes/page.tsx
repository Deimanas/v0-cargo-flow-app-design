"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  Send,
  Paperclip,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  ChevronLeft,
  Check,
  CheckCheck,
  Image as ImageIcon,
  FileText,
  Smile,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock conversations data
const CONVERSATIONS = [
  {
    id: "1",
    name: "UAB Transportas",
    avatar: null,
    lastMessage: "Puiku, tada sutariam dėl pakrovimo penktadienį 8:00",
    lastMessageTime: "10:32",
    unread: 2,
    online: true,
    cargoRef: "Vilnius → Berlin",
  },
  {
    id: "2",
    name: "Jonas Jonaitis",
    avatar: null,
    lastMessage: "Ar galėtumėte patvirtinti pristatymo adresą?",
    lastMessageTime: "vakar",
    unread: 0,
    online: false,
    cargoRef: "Kaunas → Warszawa",
  },
  {
    id: "3",
    name: "Baldų fabrikas",
    avatar: null,
    lastMessage: "Krovinys sėkmingai pristatytas, ačiū!",
    lastMessageTime: "04-01",
    unread: 0,
    online: true,
    cargoRef: "Klaipėda → Amsterdam",
  },
  {
    id: "4",
    name: "Logistikos centras",
    avatar: null,
    lastMessage: "Siūlau 850 EUR už šį maršrutą",
    lastMessageTime: "03-30",
    unread: 0,
    online: false,
    cargoRef: "Šiauliai → Praha",
  },
]

// Mock messages for selected conversation
const MESSAGES = [
  {
    id: "1",
    senderId: "other",
    text: "Sveiki, ar dar aktualus krovinys į Berlyną?",
    time: "09:15",
    status: "read",
  },
  {
    id: "2",
    senderId: "me",
    text: "Sveiki! Taip, krovinys vis dar aktualus. Ar jus domina?",
    time: "09:18",
    status: "read",
  },
  {
    id: "3",
    senderId: "other",
    text: "Taip, galiu pasiūlyti 2200 EUR. Turiu laisvą tentinę priekabą, galiu pakrauti penktadienį.",
    time: "09:45",
    status: "read",
  },
  {
    id: "4",
    senderId: "me",
    text: "Kaina priimtina. Pakrovimas Vilniuje, Ukmergės g. 280. Ar tinka 8:00?",
    time: "10:02",
    status: "read",
  },
  {
    id: "5",
    senderId: "other",
    text: "Puiku, tada sutariam dėl pakrovimo penktadienį 8:00",
    time: "10:32",
    status: "delivered",
  },
]

function Avatar({ name, online, size = "md" }: { name: string; online?: boolean; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  }

  return (
    <div className="relative">
      <div className={cn(
        "rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary",
        sizeClasses[size]
      )}>
        {name.charAt(0).toUpperCase()}
      </div>
      {online !== undefined && (
        <span className={cn(
          "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
          online ? "bg-emerald-500" : "bg-slate-400"
        )} />
      )}
    </div>
  )
}

export default function ZinutesPage() {
  const [selectedConversation, setSelectedConversation] = useState(CONVERSATIONS[0])
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [selectedConversation])

  const filteredConversations = CONVERSATIONS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (!messageText.trim()) return
    // In real app, send message to backend
    setMessageText("")
  }

  const handleSelectConversation = (conv: typeof CONVERSATIONS[0]) => {
    setSelectedConversation(conv)
    setShowMobileChat(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />

      <main className="lg:pl-60 pt-14 lg:pt-0">
        <div className="h-[calc(100vh-56px)] lg:h-screen flex">
          {/* Conversations list */}
          <aside className={cn(
            "w-full lg:w-80 border-r border-border flex flex-col bg-card",
            showMobileChat ? "hidden lg:flex" : "flex"
          )}>
            {/* Header */}
            <div className="p-4 border-b border-border shrink-0">
              <h1 className="text-lg font-bold text-foreground mb-3">Žinutės</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Ieškoti pokalbių..."
                  className="w-full pl-9 pr-3 py-2 bg-muted rounded-lg text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={cn(
                    "flex items-start gap-3 p-3 cursor-pointer transition-colors border-b border-border",
                    selectedConversation.id === conv.id
                      ? "bg-primary/5"
                      : "hover:bg-muted"
                  )}
                >
                  <Avatar name={conv.name} online={conv.online} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-semibold text-foreground truncate">{conv.name}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{conv.cargoRef}</p>
                    <p className={cn(
                      "text-xs truncate mt-0.5",
                      conv.unread > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Chat area */}
          <div className={cn(
            "flex-1 flex flex-col bg-background",
            !showMobileChat ? "hidden lg:flex" : "flex"
          )}>
            {/* Chat header */}
            <div className="h-16 px-4 flex items-center justify-between border-b border-border bg-card shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowMobileChat(false)}
                  className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <Avatar name={selectedConversation.name} online={selectedConversation.online} />
                <div>
                  <p className="text-sm font-semibold text-foreground">{selectedConversation.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.online ? "Prisijungęs" : "Neprisijungęs"}
                    <span className="mx-1.5">•</span>
                    {selectedConversation.cargoRef}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </button>
                <button type="button" className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Video className="w-4 h-4 text-muted-foreground" />
                </button>
                <button type="button" className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {MESSAGES.map(msg => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.senderId === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[75%] px-4 py-2.5 rounded-2xl",
                    msg.senderId === "me"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card border border-border rounded-bl-md"
                  )}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={cn(
                      "flex items-center justify-end gap-1 mt-1",
                      msg.senderId === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.senderId === "me" && (
                        msg.status === "read"
                          ? <CheckCheck className="w-3 h-3" />
                          : <Check className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-border bg-card shrink-0">
              <div className="flex items-end gap-2">
                <div className="flex gap-1">
                  <button type="button" className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button type="button" className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
                <div className="flex-1 relative">
                  <textarea
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    placeholder="Rašyti žinutę..."
                    rows={1}
                    className="w-full px-4 py-2.5 bg-muted rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className={cn(
                    "p-2.5 rounded-xl transition-colors",
                    messageText.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
