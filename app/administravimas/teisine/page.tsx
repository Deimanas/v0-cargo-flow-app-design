"use client"

import { useState } from "react"
import {
  FileText,
  Save,
  Eye,
  History,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

const LEGAL_DOCUMENTS = [
  { 
    id: "terms",
    name: "Naudojimo taisyklės", 
    lastUpdated: "2024-03-15",
    updatedBy: "Admin",
    status: "published",
  },
  { 
    id: "privacy",
    name: "Privatumo politika", 
    lastUpdated: "2024-03-10",
    updatedBy: "Admin",
    status: "published",
  },
  { 
    id: "cookies",
    name: "Slapukų politika", 
    lastUpdated: "2024-02-28",
    updatedBy: "Admin",
    status: "published",
  },
  { 
    id: "gdpr",
    name: "GDPR informacija", 
    lastUpdated: "2024-01-15",
    updatedBy: "Admin",
    status: "draft",
  },
]

const SAMPLE_CONTENT = `# Naudojimo taisyklės

## 1. Bendrosios nuostatos

1.1. Šios naudojimo taisyklės (toliau – Taisyklės) reglamentuoja CargoFlow platformos (toliau – Platforma) naudojimo sąlygas.

1.2. Platforma yra skirta krovinių vežimo paslaugų teikėjams ir užsakovams susirasti.

## 2. Registracija ir paskyros

2.1. Norint naudotis Platforma, vartotojas privalo užsiregistruoti ir susikurti paskyrą.

2.2. Vartotojas įsipareigoja pateikti teisingą informaciją registracijos metu.

## 3. Vartotojų teisės ir pareigos

3.1. Vartotojas turi teisę:
- Skelbti krovinių pervežimo skelbimus
- Teikti pasiūlymus dėl krovinių pervežimo
- Naudotis kitomis Platformos funkcijomis

3.2. Vartotojas įsipareigoja:
- Laikytis šių Taisyklių
- Nepažeisti kitų vartotojų teisių
- Neskelbti melagingos informacijos

## 4. Atsakomybė

4.1. Platforma neatsako už vartotojų tarpusavio susitarimus ir jų vykdymą.

4.2. Vartotojai patys atsako už savo skelbiamą informaciją.`

const STATUS_CONFIG = {
  published: { label: "Publikuota", class: "bg-emerald-50 text-emerald-700" },
  draft: { label: "Juodraštis", class: "bg-amber-50 text-amber-700" },
}

export default function LegalPage() {
  const [selectedDoc, setSelectedDoc] = useState(LEGAL_DOCUMENTS[0])
  const [content, setContent] = useState(SAMPLE_CONTENT)
  const [isEditing, setIsEditing] = useState(false)
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)

  const handleSave = () => {
    setShowSaveConfirm(true)
    setTimeout(() => setShowSaveConfirm(false), 2000)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Teisiniai tekstai</h1>
        <p className="text-sm text-muted-foreground mt-1">Redaguokite platformos teisinius dokumentus</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Document List */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Dokumentai</h3>
            </div>
            <div className="divide-y divide-border">
              {LEGAL_DOCUMENTS.map(doc => {
                const status = STATUS_CONFIG[doc.status as keyof typeof STATUS_CONFIG]
                return (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={cn(
                      "w-full p-4 text-left hover:bg-muted/30 transition-colors",
                      selectedDoc.id === doc.id && "bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={cn(
                        "w-4 h-4 shrink-0",
                        selectedDoc.id === doc.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-medium truncate",
                          selectedDoc.id === doc.id ? "text-primary" : "text-foreground"
                        )}>
                          {doc.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", status.class)}>
                            {status.label}
                          </span>
                          <span className="text-[10px] text-muted-foreground">{doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Editor Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{selectedDoc.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Atnaujinta: {selectedDoc.lastUpdated} · {selectedDoc.updatedBy}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {showSaveConfirm && (
                  <span className="flex items-center gap-1 text-xs text-emerald-600">
                    <Check className="w-3.5 h-3.5" />
                    Išsaugota
                  </span>
                )}
                <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Peržiūra">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors" title="Istorija">
                  <History className="w-4 h-4 text-muted-foreground" />
                </button>
                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Išsaugoti
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Redaguoti
                  </button>
                )}
              </div>
            </div>

            {/* Editor Content */}
            <div className="p-4">
              {isEditing ? (
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full h-[500px] px-4 py-3 bg-secondary border border-border rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ) : (
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-sm text-foreground bg-muted/30 rounded-lg p-4 h-[500px] overflow-y-auto">
                    {content}
                  </div>
                </div>
              )}
            </div>

            {/* Editor Footer */}
            <div className="p-4 border-t border-border bg-muted/20 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Markdown formatas palaikomas
              </div>
              <div className="flex items-center gap-3">
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Publikuoti juodraštį
                </button>
                <button className="text-xs text-red-500 hover:text-red-600 transition-colors">
                  Atšaukti pakeitimus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
