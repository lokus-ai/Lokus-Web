
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Package, Download } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    const query = searchParams.q || '';
    const category = searchParams.category || 'All';
    const supabase = await createClient();

    let dbQuery = supabase
        .from('plugins')
        .select('*, publishers(display_name)')
        .order('downloads', { ascending: false });

    if (query) {
        dbQuery = dbQuery.ilike('name', `% ${query}% `);
    }

    // TODO: Add category filtering once we have categories in DB
    // if (category && category !== 'All') {
    //   dbQuery = dbQuery.eq('category', category);
    // }

    const { data: plugins } = await dbQuery;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <h1 className="text-3xl font-bold">Browse Plugins</h1>
                <form className="flex w-full md:w-auto gap-2">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            name="q"
                            defaultValue={query}
                            placeholder="Search..."
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <aside className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Categories</h3>
                        <div className="space-y-1">
                            {['All', 'Productivity', 'Themes', 'Developer Tools', 'Integrations'].map((cat) => (
                                <Button
                                    key={cat}
                                    variant={category === cat ? "secondary" : "ghost"}
                                    className="w-full justify-start h-8 px-2"
                                    asChild
                                >
                                    <Link href={`/ marketplace / search ? category = ${cat}& q=${query} `}>
                                        {cat}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plugins && plugins.length > 0 ? (
                        plugins.map((plugin) => (
                            <Link href={`/ marketplace / plugin / ${plugin.id} `} key={plugin.id} className="block group">
                                <div className="border rounded-lg p-6 space-y-4 hover:border-primary/50 transition-colors h-full bg-card">
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
                                        <span>{plugin.publishers?.display_name}</span>
                                        <span className="flex items-center gap-1">
                                            <Download className="h-3 w-3" />
                                            {plugin.downloads}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                            <p>No plugins found matching "{query}".</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

