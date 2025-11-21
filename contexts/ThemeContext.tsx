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
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved theme from localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('lokus-theme') || 'default';
      setCurrentTheme(savedTheme);
      applyTheme(themes[savedTheme]);
    }
  }, []);

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
