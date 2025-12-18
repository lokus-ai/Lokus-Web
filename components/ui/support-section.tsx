"use client"

import { Heart, Check, ExternalLink, Sparkles } from "lucide-react"

// Lokus support plans from Open Collective
const lokusPlans = [
  {
    name: "Knowledge Seeker",
    price: "$5",
    period: "month",
    features: [
      "Name in README contributors list",
      "Special Discord badge",
      "Early access to feature announcements",
      "Support open-source development"
    ],
    description: "Start your journey with Lokus",
    buttonText: "Become a Knowledge Seeker",
    href: "https://opencollective.com/lokus/contribute/backers-93670/checkout?interval=month&amount=5&contributeAs=me",
    gradient: "from-blue-500/20 to-cyan-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
  },
  {
    name: "Archivist",
    price: "$15",
    period: "month",
    features: [
      "All Knowledge Seeker perks",
      "Monthly feature priority polls",
      "Exclusive Discord channel access",
      "Name displayed in app's About section"
    ],
    description: "Help shape Lokus's future",
    buttonText: "Become an Archivist",
    href: "https://opencollective.com/lokus/contribute/archivist-96016/checkout?interval=month&amount=15&contributeAs=me",
    popular: true,
    gradient: "from-purple-500/20 to-pink-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]"
  },
  {
    name: "Curator",
    price: "$50",
    period: "month",
    features: [
      "All Archivist perks",
      "One quarterly feature request",
      "Monthly office hours with developer",
      "Exclusive roadmap updates"
    ],
    description: "Direct influence on development",
    buttonText: "Become a Curator",
    href: "https://opencollective.com/lokus",
    gradient: "from-indigo-500/20 to-purple-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)]"
  },
  {
    name: "Institutional Partner",
    price: "$200",
    period: "month",
    features: [
      "Company logo in README and release notes",
      "Priority bug reports",
      "All individual tier perks",
      "Direct access and feature voting"
    ],
    description: "Enterprise support & recognition",
    buttonText: "Become a Partner",
    href: "https://opencollective.com/lokus",
    gradient: "from-amber-500/20 to-orange-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(251,146,60,0.5)]"
  }
]

function CardPattern() {
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition opacity-0 group-hover:opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition group-hover:opacity-100 backdrop-blur-xl" />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 backdrop-blur-xl transition group-hover:opacity-100" />
      <div className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  )
}

function PremiumCard({ plan, custom = false }: { plan?: any, custom?: boolean }) {

  if (custom) {
    return (
      <div
        className="group relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all hover:border-white/20 hover:scale-[1.02]"
      >
        <CardPattern />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <Sparkles className="mr-1 h-3 w-3" /> Flexible
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">Custom Amount</h3>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">$</span>
              <span className="text-xl text-white/60">Any</span>
            </div>
            <p className="text-sm text-zinc-400">Choose what works for you</p>
          </div>

          <ul className="mb-8 flex-1 space-y-4">
            {[
              "Support at your comfort level",
              "Every contribution matters",
              "Flexible payment options",
              "Help sustain development"
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                  <Check className="h-3.5 w-3.5" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <a
            href="https://opencollective.com/lokus/donate?interval=oneTime&amount=20&contributeAs=me"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex w-full items-center justify-center rounded-xl bg-white/5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/20 border border-white/10"
          >
            Choose Amount
          </a>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all hover:border-white/20 hover:scale-[1.02] ${plan.glow}`}
    >
      <CardPattern />

      {plan.popular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-1 text-xs font-bold text-white shadow-lg shadow-purple-500/20">
          MOST POPULAR
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-8">
          <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
          <div className="mb-2 flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            <span className="text-xl text-white/60">/{plan.period}</span>
          </div>
          <p className="text-sm text-zinc-400">{plan.description}</p>
        </div>

        <ul className="mb-8 flex-1 space-y-4">
          {plan.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 ${plan.popular ? 'text-purple-400' : 'text-blue-400'}`}>
                <Check className="h-3.5 w-3.5" />
              </div>
              {feature}
            </li>
          ))}
        </ul>

        <a
          href={plan.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex w-full items-center justify-center rounded-xl py-4 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg ${plan.popular
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 hover:shadow-purple-500/25'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:shadow-blue-500/20'
            }`}
        >
          {plan.buttonText}
        </a>
      </div>
    </div>
  )
}

export function SupportSection() {
  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-20 text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lokus</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Help us build the future of knowledge management. Your support keeps Lokus free, open-source, and privacy-focused forever.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          <PremiumCard plan={lokusPlans[0]} />
          <PremiumCard plan={lokusPlans[1]} />
          <PremiumCard custom />
        </div>

        <div className="mt-20 text-center">
          <a
            href="https://opencollective.com/lokus"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <Heart className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:text-red-500" />
            <span>View full transparency on OpenCollective</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}