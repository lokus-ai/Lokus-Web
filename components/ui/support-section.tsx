"use client"

import { motion } from "framer-motion"
import { Heart, Check, ExternalLink, MessageCircle } from "lucide-react"

// Lokus support plans - first 2 fixed, 3rd custom
const lokusPlans = [
  {
    name: "Supporter",
    price: "$5",
    period: "one-time",
    features: [
      "Support open-source development",
      "Help keep Lokus free forever",
      "Community recognition",
      "Feel good about supporting privacy-first tools"
    ],
    description: "Show your appreciation for Lokus",
    buttonText: "Support Once",
    href: "https://opencollective.com/lokus/contribute/supporter-70862/checkout",
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
  }
]

function Star({ index }: { index: number }) {
  // Use seeded random based on index to ensure consistent SSR/client rendering
  const seedRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }
  
  const topPos = seedRandom(index * 1) * 100
  const leftPos = seedRandom(index * 2) * 100
  const size = 1 + seedRandom(index * 3) * 2
  const duration = 2 + seedRandom(index * 4) * 3
  const delay = seedRandom(index * 5) * 5

  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        top: `${topPos}%`,
        left: `${leftPos}%`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
      }}
    />
  )
}

export function SupportSection() {
  return (
    <section className="relative py-24 bg-black overflow-hidden">
      {/* Starfield background matching your site */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px]" />
        {Array.from({ length: 150 }).map((_, i) => (
          <Star key={`star-${i}`} index={i} />
        ))}
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Support Lokus
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Help us build the future of note-taking. Your support enables us to keep Lokus 
            <span className="text-white font-medium"> free, open-source, and privacy-focused</span> forever.
          </p>
        </motion.div>

        {/* Support cards - 2 fixed + 1 custom */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* First 2 fixed plans */}
          {lokusPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-white/5 border rounded-2xl p-10 hover:bg-white/10 transition-all duration-300 flex flex-col min-h-[520px] ${
                plan.popular 
                  ? 'border-white/20 ring-1 ring-white/20' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-white text-black px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-10">
                <h3 className="text-2xl font-semibold text-white mb-4">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2 text-lg">/{plan.period}</span>
                </div>
                <p className="text-gray-400 text-base">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <a 
                href={plan.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 px-6 rounded-xl font-medium text-center transition-all duration-300 text-base ${
                  plan.popular
                    ? 'bg-white text-black hover:bg-gray-200'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                }`}
              >
                {plan.buttonText}
              </a>
            </motion.div>
          ))}

          {/* Custom 3rd card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-10 hover:bg-white/10 transition-all duration-300 flex flex-col min-h-[520px]"
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-semibold text-white mb-4">Custom Amount</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white">$</span>
                <span className="text-xl text-gray-400 ml-2">Any amount</span>
              </div>
              <p className="text-gray-400 text-base">Choose what works for you</p>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {[
                "Support at your comfort level",
                "Every contribution matters",
                "Flexible payment options",
                "Help sustain development"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>

            <a 
              href="https://opencollective.com/lokus"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-xl font-medium text-center bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-all duration-300 text-base"
            >
              Choose Amount
            </a>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <motion.a
            href="https://opencollective.com/lokus"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-gray-200 font-semibold rounded-xl transition-all duration-300 group"
          >
            <Heart className="w-5 h-5" />
            <span>View on OpenCollective</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          <p className="text-sm text-gray-500 mt-4">
            Join our community of supporters building the future of knowledge management
          </p>
        </motion.div>
      </div>
    </section>
  )
}