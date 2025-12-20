
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Package, ArrowRight, Star, Download } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function MarketplacePage() {
    const supabase = await createClient();

    // Fetch top downloaded plugins
    const { data: featuredPlugins } = await supabase
        .from('plugins')
        .select('*, slug, publishers(display_name)')
        .order('downloads', { ascending: false })
        .limit(3);

    return (
        <div className="space-y-16 pb-16">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background -z-10" />
                <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        Discover Extensions for <span className="text-primary">Lokus</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Enhance your workflow with community-built plugins, themes, and integrations.
                    </p>

                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                            className="h-14 pl-12 rounded-full text-lg shadow-lg border-primary/20 focus-visible:ring-primary"
                            placeholder="Search for plugins..."
                        />
                        <Button className="absolute right-2 top-2 rounded-full px-6" size="sm">
                            Search
                        </Button>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 pt-4">
                        {['Productivity', 'Themes', 'Developer Tools', 'Integrations'].map((cat) => (
                            <Button key={cat} variant="outline" className="rounded-full" asChild>
                                <Link href={`/marketplace/search?category=${cat}`}>{cat}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Plugins */}
            <section className="container px-4 md:px-6 mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold">Featured Plugins</h2>
                    <Button variant="ghost" className="gap-2" asChild>
                        <Link href="/marketplace/search">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredPlugins && featuredPlugins.length > 0 ? (
                        featuredPlugins.map((plugin) => (
                            <Link href={`/marketplace/plugin/${plugin.slug}`} key={plugin.id} className="group">
                                <div className="border rounded-xl p-6 space-y-4 hover:border-primary/50 hover:shadow-lg transition-all h-full bg-card">
                                    <div className="flex items-start justify-between">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                            {plugin.icon_url ? (
                                                <img src={plugin.icon_url} alt={plugin.name} className="h-8 w-8 object-contain" />
                                            ) : (
                                                <Package className="h-6 w-6 text-primary" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium bg-secondary px-2 py-1 rounded">v{plugin.latest_version}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{plugin.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                            {plugin.description || 'No description provided.'}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground border-t">
                                        <span className="flex items-center gap-1">
                                            <UserIcon className="h-3 w-3" />
                                            {plugin.publishers?.display_name || 'Unknown'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            {plugin.downloads}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-xl">
                            <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No plugins found. Be the first to publish one!</p>
                            <Button variant="link" asChild className="mt-2">
                                <Link href="/marketplace/publish">Publish a Plugin</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="container px-4 md:px-6 mx-auto">
                <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center space-y-6">
                    <h2 className="text-3xl font-bold">Build for Lokus</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Create your own plugins and share them with thousands of users. Our API is powerful and easy to use.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button size="lg" asChild>
                            <Link href="/marketplace/publish">Start Building</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/docs/api">Read the Docs</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

function UserIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

