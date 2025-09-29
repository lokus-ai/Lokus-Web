"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface SectionImageProps {
  src: string;
  alt: string;
  fadeDirection: "left" | "right";
  className?: string;
}

export function SectionImage({ src, alt, fadeDirection, className = "" }: SectionImageProps) {
  const fadeX = fadeDirection === "right" ? 100 : -100;

  return (
    <motion.div
      initial={{ opacity: 0, x: fadeX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-gray-900/20" />
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </motion.div>
  );
}