"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/ui/hero-section";
import { UsedBy } from "@/components/ui/used-by";
import { SparkIdeas } from "@/components/ui/spark-ideas";
import { DataControl } from "@/components/ui/data-control";
import { PowerfulFeatures } from "@/components/ui/publish-instantly";
import { SupportSection } from "@/components/ui/support-section";
import { DownloadSection } from "@/components/ui/download-section";
import { VideoShowcase } from "@/components/ui/video-showcase";
import { LatestUpdate } from "@/components/ui/latest-update";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />

      <div className="pt-24 pb-4">
        <LatestUpdate />
      </div>

      <HeroSection />

      <div className="relative z-10 space-y-12 pb-24">
        <VideoShowcase />
        <UsedBy />
        <SparkIdeas />
        <DataControl />
        <PowerfulFeatures />
        <SupportSection />
        <DownloadSection />
      </div>

      <Footer />
    </main>
  );
}