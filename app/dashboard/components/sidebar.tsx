"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    LayoutDashboard,
    Plus,
    Settings,
    Key,
    Package,
    LogOut,
    User
} from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

const publisherItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    { icon: Plus, label: 'New Plugin', href: '/dashboard/publish/new' },
    { icon: Package, label: 'My Plugins', href: '/dashboard/plugins' }, // New list view
    { icon: Key, label: 'Access Tokens', href: '/dashboard/settings/tokens' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings/profile' },
];

const userItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
    // Users will see a "Become a Publisher" CTA in the main view, so sidebar can be simple
];

export function DashboardSidebar({ isPublisher }: { isPublisher: boolean }) {
    const pathname = usePathname();
    const { signOut } = useAuth();
    const items = isPublisher ? publisherItems : userItems;

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl pt-24 pb-8 transition-all duration-300">
            <div className="flex h-full flex-col px-4">
                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-[0_0_20px_rgba(0,0,0,0.2)]"
                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Icon className={cn("h-5 w-5 transition-transform duration-200", isActive ? "scale-110" : "group-hover:scale-110")} />
                                <span>{item.label}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute left-0 h-8 w-1 rounded-r-full bg-primary"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="mt-auto border-t border-white/10 pt-4 space-y-2">
                    <button
                        onClick={() => signOut()}
                        className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-red-500/10 hover:text-red-500"
                    >
                        <LogOut className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
