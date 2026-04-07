"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Package,
  Truck,
  Shield,
  Zap,
  Users,
  Globe,
  ArrowRight,
  Check,
  Star,
  MapPin,
  Clock,
  TrendingUp,
  ChevronRight,
  Menu,
  X,
  Play,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Stats data
const STATS = [
  { value: "15,000+", label: "Aktyvių krovinių", sublabel: "kasdien" },
  { value: "8,500+", label: "Patikimų vežėjų", sublabel: "platformoje" },
  { value: "99.2%", label: "Pristatymų", sublabel: "laiku" },
  { value: "32", label: "Europos šalys", sublabel: "aptarnaujamos" },
]

// Features for carriers
const CARRIER_FEATURES = [
  {
    icon: Package,
    title: "Krovinių paieška",
    description: "Raskite krovinius atitinkančius jūsų maršrutus ir transporto tipą realiuoju laiku.",
  },
  {
    icon: TrendingUp,
    title: "Konkurencingos kainos",
    description: "Gaukite geriausias kainas per skaidrią pasiūlymų sistemą.",
  },
  {
    icon: Clock,
    title: "Greitas atsiskaitymas",
    description: "Garantuotas mokėjimas per 7-14 dienų nuo pristatymo patvirtinimo.",
  },
]

// Features for shippers
const SHIPPER_FEATURES = [
  {
    icon: Truck,
    title: "Transporto paieška",
    description: "Raskite patikimus vežėjus su įvertinimais ir atsiliepimais per kelias minutes.",
  },
  {
    icon: Shield,
    title: "Draudimo apsauga",
    description: "Visi pervežimai apdrausti iki 100,000 EUR krovinio vertės.",
  },
  {
    icon: Globe,
    title: "Sekimas realiu laiku",
    description: "Stebėkite savo krovinio kelionę nuo pakrovimo iki pristatymo.",
  },
]

// Testimonials
const TESTIMONIALS = [
  {
    quote: "Per CargoFlow radome patikimus partnerius, kurie nuolat užtikrina savalaikius pristatymus. Mūsų logistikos kaštai sumažėjo 23%.",
    author: "Andrius Kazlauskas",
    role: "Logistikos vadovas",
    company: "Baltic Logistics UAB",
    rating: 5,
  },
  {
    quote: "Platforma pakeitė mūsų darbo būdą. Dabar turime nuolatinių užsakymų ir nereikia ieškoti krovinių kitose biržose.",
    author: "Tomas Petrauskas",
    role: "Vežėjas",
    company: "TransEuropa",
    rating: 5,
  },
  {
    quote: "Paprasta, greita ir patikima. Rekomenduoju visiems, kas ieško efektyvaus būdo valdyti krovinių pervežimus.",
    author: "Laura Stankevičienė",
    role: "Operacijų direktorė",
    company: "FastCargo",
    rating: 5,
  },
]

// How it works steps
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Registruokitės",
    description: "Sukurkite paskyrą per 2 minutes. Patvirtinsime jūsų įmonę per 24 val.",
  },
  {
    step: "02",
    title: "Paskelbkite arba ieškokite",
    description: "Siuntėjai skelbia krovinius, vežėjai ieško atitinkančių užsakymų.",
  },
  {
    step: "03",
    title: "Susitarkite",
    description: "Gaukite pasiūlymus, derėkitės dėl kainos ir patvirtinkite užsakymą.",
  },
  {
    step: "04",
    title: "Vežkite ir uždirbkite",
    description: "Atlikite pervežimą ir gaukite mokėjimą per garantuotą sistemą.",
  },
]

// Pricing plans
const PRICING = [
  {
    name: "Starter",
    price: "0",
    period: "mėn.",
    description: "Pradėkite nemokamai",
    features: [
      "Iki 5 krovinių per mėnesį",
      "Bazinė paieška",
      "El. pašto palaikymas",
      "Standartiniai atsiskaitymai",
    ],
    cta: "Pradėti nemokamai",
    popular: false,
  },
  {
    name: "Professional",
    price: "49",
    period: "mėn.",
    description: "Augančiam verslui",
    features: [
      "Neriboti skelbimai",
      "Išplėstinė paieška ir filtrai",
      "Prioritetinis palaikymas",
      "Greitas atsiskaitymas (7d)",
      "API prieiga",
      "Analitikos dashboard",
    ],
    cta: "Išbandyti 14 dienų",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Individualu",
    period: "",
    description: "Didelėms įmonėms",
    features: [
      "Viskas iš Professional",
      "Dedikuotas vadybininkas",
      "SLA garantija 99.9%",
      "Individualios integracijos",
      "Mokymai komandai",
      "Prioritetinis ginčų sprendimas",
    ],
    cta: "Susisiekti",
    popular: false,
  },
]

// Trusted companies
const TRUSTED_BY = [
  "Girteka Logistics",
  "Vlantana",
  "Hegelmann Group",
  "Transimeksa",
  "Nagel-Group",
  "Rhenus Logistics",
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4 text-center text-sm">
        <span className="font-medium">Naujiena:</span> Dabar palaikome krovinių sekimą realiu laiku!{" "}
        <Link href="/prisijungti" className="underline underline-offset-2 font-semibold hover:no-underline">
          Sužinoti daugiau
        </Link>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Cargo<span className="text-primary">Flow</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#funkcijos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Funkcijos
              </Link>
              <Link href="#kaip-veikia" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Kaip veikia
              </Link>
              <Link href="#kainos" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Kainos
              </Link>
              <Link href="#atsiliepimai" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Atsiliepimai
              </Link>
            </div>

            {/* CTA buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/prisijungti"
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                Prisijungti
              </Link>
              <Link
                href="/registracija"
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Registruotis
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-2">
                <Link href="#funkcijos" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  Funkcijos
                </Link>
                <Link href="#kaip-veikia" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  Kaip veikia
                </Link>
                <Link href="#kainos" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  Kainos
                </Link>
                <Link href="#atsiliepimai" className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  Atsiliepimai
                </Link>
                <div className="flex flex-col gap-2 pt-4 border-t border-border mt-2">
                  <Link href="/prisijungti" className="px-4 py-2.5 text-sm font-medium text-center text-foreground hover:bg-muted rounded-lg transition-colors">
                    Prisijungti
                  </Link>
                  <Link href="/registracija" className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold text-center hover:bg-primary/90 transition-colors">
                    Registruotis
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              15,247 aktyvių krovinių dabar
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight text-balance leading-tight mb-6">
              Krovinių birža,{" "}
              <span className="text-primary">sukurta augimui</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
              Sujungiame vežėjus ir siuntėjus vienoje platformoje. Raskite krovinius, sutaupykite laiką ir uždirbkite daugiau.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/registracija"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-base font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
              >
                Pradėti nemokamai
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-card border border-border rounded-xl text-base font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <Play className="w-4 h-4" />
                Žiūrėti demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-success" />
                Nemokamas 14 dienų bandymas
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-success" />
                Nereikia banko kortelės
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-success" />
                Atšaukti bet kada
              </div>
            </div>
          </div>

          {/* Hero image/mockup placeholder */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="aspect-[16/9] bg-gradient-to-br from-card to-muted rounded-2xl border border-border shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
              <div className="p-6 lg:p-8">
                {/* Mock dashboard preview */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="h-20 bg-background/80 rounded-xl border border-border/50" />
                  <div className="h-20 bg-background/80 rounded-xl border border-border/50" />
                  <div className="h-20 bg-background/80 rounded-xl border border-border/50" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3 h-48 bg-background/80 rounded-xl border border-border/50" />
                  <div className="h-48 bg-background/80 rounded-xl border border-border/50" />
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -left-4 top-1/3 bg-card border border-border rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Krovinys pristatytas</p>
                  <p className="text-xs text-muted-foreground">Vilnius → Berlin</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-1/4 bg-card border border-border rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">+23% šį mėnesį</p>
                  <p className="text-xs text-muted-foreground">Užsakymų augimas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm font-medium text-foreground">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Section */}
      <section className="py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Mumis pasitiki pirmaujančios logistikos įmonės
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {TRUSTED_BY.map((company, i) => (
              <span key={i} className="text-lg font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funkcijos" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Viena platforma, dvi perspektyvos
            </h2>
            <p className="text-lg text-muted-foreground">
              Nesvarbu, ar esate vežėjas ieškantis krovinių, ar siuntėjas ieškantis transporto — CargoFlow turi viską, ko jums reikia.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Carriers features */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Vežėjams</h3>
                  <p className="text-sm text-muted-foreground">Raskite krovinius ir uždirbkite daugiau</p>
                </div>
              </div>
              <div className="space-y-6">
                {CARRIER_FEATURES.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/registracija?type=vezejas"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Registruotis kaip vežėjas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Shippers features */}
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Siuntėjams</h3>
                  <p className="text-sm text-muted-foreground">Raskite patikimus vežėjus greitai</p>
                </div>
              </div>
              <div className="space-y-6">
                {SHIPPER_FEATURES.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/registracija?type=siuntejas"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Registruotis kaip siuntėjas
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="kaip-veikia" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Kaip tai veikia?
            </h2>
            <p className="text-lg text-muted-foreground">
              Pradėkite per kelias minutes ir jau šiandien gaukite pirmuosius užsakymus.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2" />
                )}
                <div className="bg-card border border-border rounded-2xl p-6 relative">
                  <span className="text-5xl font-bold text-primary/10 absolute top-4 right-4">
                    {step.step}
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-xl flex items-center justify-center text-lg font-bold mb-4">
                      {parseInt(step.step)}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="kainos" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Paprasta ir skaidri kainodara
            </h2>
            <p className="text-lg text-muted-foreground">
              Pradėkite nemokamai arba pasirinkite planą, kuris atitinka jūsų poreikius.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {PRICING.map((plan, i) => (
              <div
                key={i}
                className={cn(
                  "relative bg-card border rounded-2xl p-8 flex flex-col",
                  plan.popular
                    ? "border-primary shadow-xl shadow-primary/10 scale-105"
                    : "border-border"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    Populiariausias
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price === "Individualu" ? "" : "€"}{plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/registracija"
                  className={cn(
                    "w-full py-3 rounded-xl text-sm font-semibold text-center transition-colors",
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  )}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="atsiliepimai" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ką sako mūsų klientai
            </h2>
            <p className="text-lg text-muted-foreground">
              Tūkstančiai logistikos profesionalų jau naudojasi CargoFlow kasdien.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-warning text-warning" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 text-pretty">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.author.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-primary rounded-3xl p-12 lg:p-16 text-center overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
                Pasiruošę augti kartu?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                Prisijunkite prie tūkstančių logistikos profesionalų, kurie jau naudojasi CargoFlow. Pradėkite nemokamai šiandien.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/registracija"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary rounded-xl text-base font-semibold hover:bg-white/90 transition-colors"
                >
                  Pradėti nemokamai
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/kontaktai"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 rounded-xl text-base font-semibold hover:bg-primary-foreground/20 transition-colors"
                >
                  Susisiekti su mumis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo column */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-background">
                  Cargo<span className="text-primary">Flow</span>
                </span>
              </Link>
              <p className="text-sm text-background/60 mb-4">
                Krovinių birža naujai kartai. Sujungiame vežėjus ir siuntėjus.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-background mb-4">Produktas</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li><Link href="#" className="hover:text-background transition-colors">Funkcijos</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Kainos</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Integracijos</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">API</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-background mb-4">Įmonė</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li><Link href="#" className="hover:text-background transition-colors">Apie mus</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Karjera</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Kontaktai</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Partneriai</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-background mb-4">Resursai</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li><Link href="#" className="hover:text-background transition-colors">Pagalbos centras</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Dokumentacija</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Blogas</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Naujienlaiškis</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-background mb-4">Teisinė info</h4>
              <ul className="space-y-2.5 text-sm text-background/60">
                <li><Link href="#" className="hover:text-background transition-colors">Privatumo politika</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Naudojimo sąlygos</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">Slapukai</Link></li>
                <li><Link href="#" className="hover:text-background transition-colors">BDAR</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © 2024 CargoFlow. Visos teisės saugomos.
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-background/60">
                <MapPin className="w-4 h-4" />
                Vilnius, Lietuva
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
