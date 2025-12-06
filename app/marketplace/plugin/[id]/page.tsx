
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Star, Share2, Package, Terminal } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function PluginDetailsPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const supabase = await createClient();

    // Fetch plugin details
    const { data: plugin } = await supabase
        .from('plugins')
        .select('*, publishers(display_name, website_url, github_handle)')
        .eq('id', id)
        .single();

    if (!plugin) {
        notFound();
    }

    // Fetch latest version details (including readme)
    const { data: version } = await supabase
        .from('plugin_versions')
        .select('*')
        .eq('plugin_id', id)
        .eq('version', plugin.latest_version)
        .single();

    return (
        <div className="space-y-8 pb-16">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                <Link href="/marketplace/search" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Search
                </Link>
            </Button>

            {/* Header */}
            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                <div className="flex gap-6">
                    <div className="h-24 w-24 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        {plugin.icon_url ? (
                            <img src={plugin.icon_url} alt={plugin.name} className="h-12 w-12 object-contain" />
                        ) : (
                            <Package className="h-12 w-12 text-primary" />
                        )}
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{plugin.name}</h1>
                        <p className="text-lg text-muted-foreground">{plugin.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>By <span className="font-medium text-foreground">{plugin.publishers?.display_name}</span></span>
                            <span>•</span>
                            <span>v{plugin.latest_version}</span>
                            <span>•</span>
                            <span>Updated {new Date(plugin.updated_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3 min-w-[200px]">
                    <div className="flex gap-3">
                        <Button className="flex-1 gap-2" asChild>
                            <a href={`/ api / v1 / registry / download / ${plugin.id}/${plugin.latest_version}`}>
                                <Download className="h-4 w-4" />
                                Download
                            </a >
                        </Button >
                        <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div >
                    <div className="bg-secondary/50 p-3 rounded-lg flex items-center gap-3 text-xs font-mono text-muted-foreground">
                        <Terminal className="h-3 w-3" />
                        <span>lokus install {plugin.id}</span>
                    </div>
                </div >
            </div >

            {/* Content */}
            < div className="grid grid-cols-1 md:grid-cols-3 gap-8" >
                <div className="md:col-span-2 space-y-8">
                    <div className="prose dark:prose-invert max-w-none">
                        {version?.readme ? (
                            <MDXRemote source={version.readme} />
                        ) : (
                            <p className="text-muted-foreground italic">No README provided.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold">Details</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Downloads</span>
                                <span className="font-medium">{plugin.downloads}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Version</span>
                                <span className="font-medium">{plugin.latest_version}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Publisher</span>
                                <Link href={`/marketplace/search?q=${plugin.publishers?.display_name}`} className="text-primary hover:underline">
                                    {plugin.publishers?.display_name}
                                </Link>
                            </div>
                            {plugin.publishers?.website_url && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Website</span>
                                    <a href={plugin.publishers.website_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        Visit
                                    </a>
                                </div>
                            )}
                            {plugin.publishers?.github_handle && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">GitHub</span>
                                    <a href={`https://github.com/${plugin.publishers.github_handle}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                        @{plugin.publishers.github_handle}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}

