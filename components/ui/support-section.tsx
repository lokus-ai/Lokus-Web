"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { Heart, Check, ExternalLink, Sparkles } from "lucide-react"
import { MouseEvent } from "react"

// Lokus support plans
const lokusPlans = [
  {
    name: "Supporter",
    price: "$5",
    period: "one-time",
    features: [
      "Support open-source development",
      "Help keep Lokus free forever",
      "Community recognition",
      "Feel good about supporting privacy"
    ],
    description: "Show your appreciation for Lokus",
    buttonText: "Support Once",
    href: "https://opencollective.com/lokus/contribute/supporter-70862/checkout",
    gradient: "from-blue-500/20 to-cyan-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
  },
  {
    name: "Backer",
    price: "$10",
    period: "monthly",
    features: [
      "Everything in Supporter",
      "Priority bug reports & feedback",
      "Monthly development updates",
      "Community badge & recognition",
      "Early access to beta features"
    ],
    description: "Ongoing support for development",
    buttonText: "Become a Backer",
    href: "https://opencollective.com/lokus/contribute/backer-70863/checkout",
    popular: true,
    gradient: "from-purple-500/20 to-pink-500/20",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]"
  }
]

function CardPattern({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100 backdrop-blur-xl" />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </motion.div>
    </div>
  )
}

function PremiumCard({ plan, custom = false }: { plan?: any, custom?: boolean }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  if (custom) {
    return (
      <div
        onMouseMove={onMouseMove}
        className="group relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:scale-[1.02]"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} />

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
            href="https://opencollective.com/lokus"
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
      onMouseMove={onMouseMove}
      className={`group relative flex flex-col rounded-2xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-white/20 hover:scale-[1.02] ${plan.glow}`}
    >
      <CardPattern mouseX={mouseX} mouseY={mouseY} />

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
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            Support <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lokus</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-lg text-zinc-400"
          >
            Help us build the future of knowledge management. Your support keeps Lokus free, open-source, and privacy-focused forever.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {lokusPlans.map((plan, i) => (
            <PremiumCard key={i} plan={plan} />
          ))}
          <PremiumCard custom />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
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
        </motion.div>
      </div>
    </section>
  )
}