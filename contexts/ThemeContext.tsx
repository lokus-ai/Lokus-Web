'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, themes, applyTheme } from '@/lib/themes';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeName: string) => void;
  availableThemes: typeof themes;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage on client side to match inline script
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lokus-theme') || 'default';
    }
    return 'default';
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Theme already applied by inline script in layout, just sync state
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('lokus-theme') || 'default';
      if (savedTheme !== currentTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    if (themes[themeName] && typeof window !== 'undefined') {
      setCurrentTheme(themeName);
      applyTheme(themes[themeName]);
      localStorage.setItem('lokus-theme', themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
