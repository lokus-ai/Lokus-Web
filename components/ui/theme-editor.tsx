'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, ChevronDown } from 'lucide-react';

export function ThemeEditor() {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = Object.values(availableThemes);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-72 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
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
                <motion.button
                  key={theme.name}
                  onClick={() => setTheme(theme.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full p-3 rounded-xl mb-2 text-left transition-all ${
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
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
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
                </motion.button>
              ))}
            </div>

            {/* Footer Info */}
            <div className="px-4 py-2 border-t border-border bg-background/50">
              <p className="text-xs text-muted-foreground">
                Theme persists across sessions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all ${
          isOpen
            ? 'bg-primary text-primary-foreground'
            : 'bg-card/95 backdrop-blur-xl border border-border text-foreground hover:bg-primary/10'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6" />
          ) : (
            <Palette className="w-6 h-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
