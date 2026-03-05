"use client";

import React, { lazy, Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";

// Lazy load below-the-fold components for better initial page load
const UsedBy = lazy(() => import("@/components/ui/used-by").then(m => ({ default: m.UsedBy })));
const SparkIdeas = lazy(() => import("@/components/ui/spark-ideas").then(m => ({ default: m.SparkIdeas })));
// Using lightweight screenshot versions instead of heavy animated ones
const DataControl = lazy(() => import("@/components/ui/data-control-simple").then(m => ({ default: m.DataControl })));
const PowerfulFeatures = lazy(() => import("@/components/ui/powerful-features-simple").then(m => ({ default: m.PowerfulFeatures })));
const SupportSection = lazy(() => import("@/components/ui/support-section").then(m => ({ default: m.SupportSection })));
const DownloadSection = lazy(() => import("@/components/ui/download-section").then(m => ({ default: m.DownloadSection })));

// Simple loading placeholder
const SectionLoader = () => (
  <div className="w-full h-96 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />

      <HeroSection />

      <div className="relative z-10 space-y-12 pb-24">
        <Suspense fallback={<SectionLoader />}>
          <UsedBy />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SparkIdeas />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DataControl />
        </Suspense>

        {/* Mid-page CTA */}
        <section className="relative py-20 bg-indigo-600/90 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/60 via-indigo-600/60 to-purple-700/60" />
          <div className="relative z-10 container max-w-3xl mx-auto px-4 text-center">
            <a
              href="#download"
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector('#download');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="inline-flex h-14 items-center justify-center rounded-xl bg-white px-10 text-lg font-semibold text-indigo-700 transition-all duration-300 hover:bg-zinc-100 hover:scale-105 active:scale-95 shadow-xl shadow-black/30 cursor-pointer"
            >
              Download Free — No Account Required
            </a>
          </div>
        </section>

        <Suspense fallback={<SectionLoader />}>
          <PowerfulFeatures />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DownloadSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SupportSection />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}