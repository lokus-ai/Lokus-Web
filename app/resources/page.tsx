import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { AssetSection } from "@/components/resources/AssetSection"
import { AssetCard } from "@/components/resources/AssetCard"
import { ColorSwatch } from "@/components/resources/ColorSwatch"
import { TextCopyCard } from "@/components/resources/TextCopyCard"
import { logos, brandColors, brandDescriptions, typography } from "@/lib/resources-data"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resources - Lokus",
  description: "Brand assets, logos, and media resources for Lokus. Download logos, view brand guidelines, and access official media materials.",
}

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30">
      <Navbar />

      <section className="relative pt-32 pb-20 min-h-screen">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none opacity-30" />

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
              Brand Resources
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Official brand assets, logos, colors, and guidelines for media use. All resources are free to download and use.
            </p>
          </div>

          {/* Logos Section */}
          <AssetSection
            title="Logos"
            description="Download Lokus logos in various formats. Available in SVG and PNG, optimized for both light and dark backgrounds."
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {logos.map((logo) => (
                <AssetCard
                  key={logo.id}
                  title={logo.title}
                  description={logo.description}
                  format={logo.format}
                  size={logo.size}
                  downloadUrl={logo.downloadUrl}
                  previewUrl={logo.previewUrl}
                  dimensions={logo.dimensions}
                  type={logo.category}
                />
              ))}
            </div>
          </AssetSection>

          {/* Brand Colors Section */}
          <AssetSection
            title="Brand Colors"
            description="Our color palette defines the visual identity of Lokus. Click any color to copy its HEX value."
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brandColors.map((color) => (
                <ColorSwatch
                  key={color.hex}
                  name={color.name}
                  hex={color.hex}
                  rgb={color.rgb}
                  usage={color.usage}
                />
              ))}
            </div>
          </AssetSection>

          {/* Typography Section */}
          <AssetSection
            title="Typography"
            description="Our typography system uses a carefully selected font stack for optimal readability and brand consistency."
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {typography.map((font) => (
                <div
                  key={font.name}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all"
                >
                  <h3 className="font-bold text-white mb-2">{font.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div>
                      <span className="text-xs text-zinc-500">Family:</span>
                      <p className="text-sm text-zinc-300 font-mono">{font.family}</p>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500">Weights:</span>
                      <p className="text-sm text-zinc-300">{font.weights.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500">Usage:</span>
                      <p className="text-sm text-zinc-400">{font.usage}</p>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-4 border border-white/5">
                    <p className="text-zinc-300" style={{ fontFamily: font.family }}>
                      {font.example}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </AssetSection>

          {/* Brand Descriptions Section */}
          <AssetSection
            title="Brand Descriptions"
            description="Pre-written descriptions in various lengths for different use cases. Click the copy button to use them in your materials."
          >
            <div className="space-y-6">
              {brandDescriptions.map((desc) => (
                <TextCopyCard
                  key={desc.variant}
                  title={desc.title}
                  content={desc.content}
                  variant={desc.variant}
                />
              ))}
            </div>
          </AssetSection>

          {/* Usage Guidelines */}
          <AssetSection
            title="Usage Guidelines"
            description="Please follow these guidelines when using Lokus brand assets."
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Do</h3>
                  <ul className="space-y-2 text-zinc-400">
                    <li>✓ Use official logo files provided on this page</li>
                    <li>✓ Maintain adequate clear space around the logo</li>
                    <li>✓ Use approved color combinations</li>
                    <li>✓ Preserve the original aspect ratio of logos</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Don&apos;t</h3>
                  <ul className="space-y-2 text-zinc-400">
                    <li>✗ Modify, distort, or recreate the logo</li>
                    <li>✗ Change the logo colors</li>
                    <li>✗ Add effects, shadows, or outlines to the logo</li>
                    <li>✗ Use the logo on busy or conflicting backgrounds</li>
                  </ul>
                </div>
              </div>
            </div>
          </AssetSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
