'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, Check, ChevronDown } from 'lucide-react';

export function ThemeEditor() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themeOptions = Object.values(availableThemes);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Theme Panel */}
      <div
        className={`absolute bottom-16 right-0 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-background/50">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Live Theme Editor
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Choose your perfect color scheme
          </p>
        </div>

        {/* Theme List */}
        <div className="p-2 max-h-96 overflow-y-auto">
          {themeOptions.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setTheme(theme.name)}
              className={`w-full p-3 rounded-xl mb-2 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                currentTheme === theme.name
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-background/50 border-2 border-transparent hover:border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  {theme.label}
                </span>
                {currentTheme === theme.name && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </div>

              {/* Color Preview Swatches */}
              <div className="flex gap-1.5">
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: `hsl(${theme.colors.background})` }}
                  title="Background"
                />
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                  title="Primary"
                />
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                  title="Accent"
                />
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                  title="Secondary"
                />
                <div
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: `hsl(${theme.colors.destructive})` }}
                  title="Destructive"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2 border-t border-border bg-background/50">
          <p className="text-xs text-muted-foreground">
            Theme persists across sessions
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-primary text-primary-foreground'
            : 'bg-card/95 backdrop-blur-xl border border-border text-foreground hover:bg-primary/10'
        }`}
      >
        <div
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <Palette className="w-6 h-6" />
          )}
        </div>
      </button>

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
