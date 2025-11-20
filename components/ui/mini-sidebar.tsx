'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FolderOpen,
  LayoutGrid,
  Puzzle,
  Database,
  Network,
  Calendar,
  Mail,
  LucideIcon
} from 'lucide-react';
import { Logo } from './logo';

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  id: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: FolderOpen, label: 'Files', id: 'files' },
  { icon: LayoutGrid, label: 'Dashboard', id: 'dashboard' },
  { icon: Puzzle, label: 'Extensions', id: 'extensions' },
  { icon: Database, label: 'Database', id: 'database' },
  { icon: Network, label: 'Network', id: 'network' },
  { icon: Calendar, label: 'Calendar', id: 'calendar' },
  { icon: Mail, label: 'Mail', id: 'mail' },
];

export function MiniSidebar() {
  const [activeItem, setActiveItem] = useState<string>('files');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed left-0 top-0 h-screen w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 z-40"
    >
      {/* Logo at top */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8 cursor-pointer"
      >
        <Logo size={32} animated={false} />
      </motion.div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-center gap-2 w-full px-2">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <div key={item.id} className="relative w-full">
              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute left-full ml-2 px-3 py-1.5 bg-popover border border-border rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none"
                  style={{ top: '50%', transform: 'translateY(-50%)' }}
                >
                  <span className="text-sm font-medium text-popover-foreground">
                    {item.label}
                  </span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-popover" />
                </motion.div>
              )}

              <motion.button
                onClick={() => setActiveItem(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`relative w-full h-12 rounded-xl flex items-center justify-center transition-all group ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-sidebar-foreground hover:bg-accent/10'
                }`}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 transition-all ${
                    isActive ? 'scale-110' : 'group-hover:scale-110'
                  }`}
                />

                {/* Hover glow effect */}
                {isHovered && !isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 blur-sm -z-10"
                  />
                )}
              </motion.button>
            </div>
          );
        })}
      </nav>

      {/* Bottom indicator */}
      <div className="mt-auto pt-4 border-t border-sidebar-border w-full flex justify-center">
        <div className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
      </div>
    </motion.div>
  );
}
