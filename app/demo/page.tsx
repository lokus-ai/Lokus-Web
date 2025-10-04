'use client';

import Link from 'next/link';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        {/* Back to Home Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 19l-7-7 7-7v4h8v6h-8v4z"/>
          </svg>
          <span>Back to Home</span>
        </Link>

        {/* Coming Soon Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white mb-2">Coming Soon</h1>
            <p className="text-2xl text-gray-400">Interactive Demo</p>
          </div>

          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            We&apos;re working on an interactive browser demo so you can try Lokus without downloading.
            In the meantime, download the desktop app to experience the full power of Lokus.
          </p>

          <div className="flex gap-4 justify-center mt-8">
            <Link
              href="/#download"
              className="px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 text-gray-900 font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Download Desktop App
            </Link>
            <Link
              href="https://docs.lokusmd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}