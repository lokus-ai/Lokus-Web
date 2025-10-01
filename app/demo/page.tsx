'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the demo when the component mounts
    const initDemo = async () => {
      try {
        // The Lokus demo will be loaded from the build output
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize demo:', err);
        setError(err instanceof Error ? err.message : 'Failed to load demo');
        setIsLoading(false);
      }
    };

    initDemo();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 19l-7-7 7-7v4h8v6h-8v4z"/>
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="h-6 w-px bg-border"></div>
            <span className="text-sm text-muted-foreground">Live Demo</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const iframe = document.querySelector('iframe[title="Lokus Demo"]') as HTMLIFrameElement;
                if (iframe && iframe.contentWindow) {
                  try {
                    (iframe.contentWindow as any).resetLokusDemo?.();
                  } catch (e) {
                    console.log('Reset function not available yet');
                  }
                }
              }}
              className="px-4 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
            >
              Reset Demo
            </button>
            <Link 
              href="/#download"
              className="px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
            >
              Download Desktop App
            </Link>
          </div>
        </div>
      </div>

      {/* Demo Container */}
      <div className="pt-16 h-screen">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading Lokus demo...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-md">
              <div className="text-red-500 mb-4">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" className="mx-auto">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Demo Failed to Load</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <iframe
            src="/lokus-demo/index-web.html"
            className="w-full h-full border-0"
            title="Lokus Demo"
            allow="clipboard-write"
          />
        )}
      </div>

      {/* Info Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-amber-500/10 border-t border-amber-500/20 backdrop-blur">
        <div className="container mx-auto px-4 py-2">
          <p className="text-sm text-center text-amber-700 dark:text-amber-300">
            This is a demo version running in your browser. 
            <span className="mx-1">•</span>
            Your data is stored locally and persists across sessions.
            <span className="mx-1">•</span>
            For full features, download the desktop app.
          </p>
        </div>
      </div>
    </div>
  );
}

// Extend window type for demo functions
declare global {
  interface Window {
    resetLokusDemo?: () => void;
  }
}