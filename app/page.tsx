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
        <Suspense fallback={<SectionLoader />}>
          <PowerfulFeatures />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SupportSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <DownloadSection />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}