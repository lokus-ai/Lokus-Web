"use client";

import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { UsedBy } from "@/components/ui/used-by";
import { SparkIdeas } from "@/components/ui/spark-ideas";
import { DataControl } from "@/components/ui/data-control";
import { PowerfulFeatures } from "@/components/ui/publish-instantly";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DownloadSection } from "@/components/ui/download-section";
import { VideoShowcase } from "@/components/ui/video-showcase";

export default function LandingPage() {
  const ref = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <>
      <Navbar />
      <div className="bg-black">
        <div
          className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
          ref={ref}
        >
          <GoogleGeminiEffect
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
            title="Welcome to Lokus"
            description="Experience lightning-fast note-taking with intelligent linking and native macOS performance. Crafted for developers who think in connections."
          />
        </div>
        <VideoShowcase />
        <UsedBy />
        <SparkIdeas />
        <DataControl />
        <PowerfulFeatures />
        <DownloadSection />
      </div>
      <Footer />
    </>
  );
}