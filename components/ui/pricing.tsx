"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star, Heart } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

export function Pricing({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: ["#6366f1", "#a78bfa", "#818cf8", "#c4b5fd"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  // Check if any plan has different yearly price (to show toggle)
  const hasYearlyDiscount = plans.some(p => p.price !== p.yearlyPrice && p.price !== "0");

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              {title.split(" ").slice(-1)}
            </span>
          </h2>
          <p className="text-zinc-400 text-lg whitespace-pre-line max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {hasYearlyDiscount && (
          <div className="flex justify-center items-center gap-3 mb-12">
            <span className={cn("text-sm font-medium", isMonthly ? "text-white" : "text-zinc-500")}>
              Monthly
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <Label>
                <Switch
                  ref={switchRef as any}
                  checked={!isMonthly}
                  onCheckedChange={handleToggle}
                  className="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:bg-zinc-700"
                />
              </Label>
            </label>
            <span className={cn("text-sm font-medium", !isMonthly ? "text-white" : "text-zinc-500")}>
              Annual <span className="text-indigo-400 text-xs">(Save 20%)</span>
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { y: 0, opacity: 1 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "rounded-2xl border p-6 text-center lg:flex lg:flex-col lg:justify-center relative",
                "flex flex-col backdrop-blur-sm",
                plan.isPopular
                  ? "bg-gradient-to-b from-zinc-900 to-black border-indigo-500/50 border-2 shadow-xl shadow-indigo-500/10"
                  : "bg-zinc-900/50 border-zinc-800",
                !plan.isPopular && "mt-5",
                index === 0 || index === 2
                  ? "z-0 transform translate-x-0 translate-y-0"
                  : "z-10",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-indigo-500 py-0.5 px-2 rounded-bl-xl rounded-tr-xl flex items-center">
                  <Star className="text-white h-4 w-4 fill-current" />
                  <span className="text-white ml-1 font-semibold text-xs">
                    Popular
                  </span>
                </div>
              )}
              <div className="flex-1 flex flex-col">
                <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                  {plan.name}
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    {plan.price === "0" ? (
                      "Free"
                    ) : (
                      <NumberFlow
                        value={
                          isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                        }
                        format={{
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }}
                        transformTiming={{
                          duration: 500,
                          easing: "ease-out",
                        }}
                        willChange
                        className="tabular-nums"
                      />
                    )}
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-sm font-medium text-zinc-500">
                      / {plan.period}
                    </span>
                  )}
                </div>

                {plan.price !== "0" ? (
                  <p className="text-xs text-zinc-500 mt-1">
                    {isMonthly ? "billed monthly" : "billed annually"}
                  </p>
                ) : (
                  <p className="text-xs text-zinc-500 mt-1">forever</p>
                )}

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-left">
                      <Check className="h-5 w-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="w-full my-6 border-zinc-800" />

                <Link
                  href={plan.href}
                  className={cn(
                    "group relative w-full gap-2 overflow-hidden text-sm font-semibold tracking-tight py-3 rounded-xl",
                    "transform-gpu transition-all duration-300 ease-out",
                    "hover:ring-2 hover:ring-indigo-500 hover:ring-offset-1 hover:ring-offset-black",
                    plan.isPopular
                      ? "bg-indigo-500 text-white hover:bg-indigo-600"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                  )}
                >
                  {plan.buttonText}
                </Link>
                <p className="mt-4 text-xs text-zinc-500">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Lokus Support Plans
export const lokusSupportPlans: PricingPlan[] = [
  {
    name: "FREE FOREVER",
    price: "0",
    yearlyPrice: "0",
    period: "forever",
    features: [
      "Unlimited local notes",
      "Full markdown editor",
      "Wiki links & backlinks",
      "Graph view (2D & 3D)",
      "Infinite canvas",
      "Template system",
      "Plugin marketplace",
      "100% offline capable",
    ],
    description: "All features included. No paywalls. Ever.",
    buttonText: "Download Now",
    href: "https://github.com/lokus-ai/lokus/releases",
    isPopular: true,
  },
  {
    name: "SUPPORTER",
    price: "5",
    yearlyPrice: "5",
    period: "month",
    features: [
      "Support open source development",
      "Early access to new features",
      "Supporter badge in app",
      "Priority bug fixes",
      "Vote on roadmap priorities",
      "Discord supporter role",
      "Our eternal gratitude",
    ],
    description: "Help us keep Lokus free for everyone",
    buttonText: "Become a Supporter",
    href: "https://opencollective.com/lokus",
    isPopular: false,
  },
  {
    name: "SPONSOR",
    price: "25",
    yearlyPrice: "25",
    period: "month",
    features: [
      "Everything in Supporter",
      "Logo on GitHub README",
      "Logo on lokusmd.com",
      "Direct line to maintainers",
      "Feature request priority",
      "Sponsor shoutouts",
      "Custom integration support",
    ],
    description: "For companies that love open source",
    buttonText: "Become a Sponsor",
    href: "https://opencollective.com/lokus",
    isPopular: false,
  },
];

// Lokus Support Component
export function LokusPricing() {
  return (
    <Pricing
      plans={lokusSupportPlans}
      title="Support Lokus"
      description="Lokus is 100% free and open source.
Support our mission to keep knowledge tools accessible to everyone."
    />
  );
}
