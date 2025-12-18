import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Package, ExternalLink, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

// Star rating display component
function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
    const sizeClass = size === 'sm' ? 'h-3 w-3' : 'h-4 w-4';
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`${sizeClass} ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                />
            ))}
        </div>
    );
}

export default async function PluginDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: slug } = await params;
    const supabase = await createClient();

    // Fetch plugin details by slug
    const { data: plugin } = await supabase
        .from('plugins')
        .select('*, publishers(display_name, website_url, github_handle)')
        .eq('slug', slug)
        .single();

    if (!plugin) {
        notFound();
    }

    // Fetch all versions
    const { data: versions } = await supabase
        .from('plugin_versions')
        .select('*')
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    // Fetch ratings
    const { data: ratings } = await supabase
        .from('plugin_ratings')
        .select('rating, review, created_at')
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    // Fetch questions
    const { data: questions } = await supabase
        .from('plugin_questions')
        .select('question, answer, created_at, answered_at')
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    const latestVersion = versions?.[0];
    const totalRatings = ratings?.length || 0;
    const avgRating = totalRatings > 0
        ? ratings!.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    return (
        <div className="space-y-8 pb-16">
            <Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
                <Link href="/marketplace" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Marketplace
                </Link>
            </Button>

            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="flex gap-6 items-start">
                        <div className="h-28 w-28 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center shrink-0 border">
                            {plugin.icon_url ? (
                                <img src={plugin.icon_url} alt={plugin.name} className="h-20 w-20 object-contain rounded-xl" />
                            ) : (
                                <Package className="h-14 w-14 text-primary" />
                            )}
                        </div>
                        <div className="space-y-3">
                            <div>
                                <h1 className="text-3xl font-bold">{plugin.name}</h1>
                                <p className="text-muted-foreground mt-1">{plugin.description}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <Link href={`/marketplace/search?q=${plugin.publishers?.display_name}`} className="text-primary hover:underline font-medium">
                                    {plugin.publishers?.display_name}
                                </Link>
                                <span className="text-muted-foreground">•</span>
                                {totalRatings > 0 && (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <StarRating rating={Math.round(avgRating)} size="sm" />
                                            <span className="text-muted-foreground">({totalRatings})</span>
                                        </div>
                                        <span className="text-muted-foreground">•</span>
                                    </>
                                )}
                                <span className="text-muted-foreground">{plugin.downloads.toLocaleString()} downloads</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:w-80 space-y-4">
                    <Button className="w-full h-12 text-base gap-2" asChild>
                        <a href={`lokus://install/${plugin.slug}`}>
                            <ExternalLink className="h-5 w-5" />
                            Open in Lokus
                        </a>
                    </Button>
                    
                    <Button variant="outline" className="w-full gap-2" asChild>
                        <a href={`/api/v1/registry/download/${plugin.slug}/${plugin.latest_version}`}>
                            <Download className="h-4 w-4" />
                            Download v{plugin.latest_version}
                        </a>
                    </Button>

                    <div className="bg-secondary/50 p-4 rounded-lg space-y-2">
                        <p className="text-xs text-muted-foreground">Or install via CLI:</p>
                        <code className="text-sm font-mono block bg-background p-2 rounded border">
                            lokus install {plugin.slug}
                        </code>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                    <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Overview</TabsTrigger>
                    <TabsTrigger value="changelog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Changelog</TabsTrigger>
                    <TabsTrigger value="ratings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Ratings ({totalRatings})</TabsTrigger>
                    <TabsTrigger value="qa" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent">Q&A ({questions?.length || 0})</TabsTrigger>
                </TabsList>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
                    <div className="lg:col-span-3">
                        <TabsContent value="overview" className="mt-0">
                            <div className="border rounded-xl p-6">
                                <div className="prose dark:prose-invert max-w-none">
                                    {latestVersion?.readme ? (
                                        <MarkdownRenderer content={latestVersion.readme} />
                                    ) : (
                                        <p className="text-muted-foreground italic">No README provided.</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="changelog" className="mt-0">
                            <div className="border rounded-xl p-6">
                                <div className="prose dark:prose-invert max-w-none">
                                    {latestVersion?.changelog ? (
                                        <MarkdownRenderer content={latestVersion.changelog} />
                                    ) : (
                                        <p className="text-muted-foreground italic">No changelog available.</p>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="ratings" className="mt-0">
                            <div className="border rounded-xl p-6 space-y-6">
                                <div className="flex items-center gap-6 pb-6 border-b">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold">{avgRating.toFixed(1)}</div>
                                        <StarRating rating={Math.round(avgRating)} />
                                        <div className="text-sm text-muted-foreground mt-1">{totalRatings} ratings</div>
                                    </div>
                                </div>
                                {ratings && ratings.length > 0 ? (
                                    <div className="space-y-4">
                                        {ratings.map((r, i) => (
                                            <div key={i} className="border-b pb-4 last:border-0">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <StarRating rating={r.rating} size="sm" />
                                                    <span className="text-sm text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</span>
                                                </div>
                                                {r.review && <p className="text-sm">{r.review}</p>}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">No ratings yet. Be the first to rate!</p>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="qa" className="mt-0">
                            <div className="border rounded-xl p-6 space-y-6">
                                {questions && questions.length > 0 ? (
                                    <div className="space-y-4">
                                        {questions.map((q, i) => (
                                            <div key={i} className="border-b pb-4 last:border-0">
                                                <div className="flex items-start gap-2">
                                                    <MessageCircle className="h-4 w-4 mt-1 text-primary" />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{q.question}</p>
                                                        <span className="text-xs text-muted-foreground">Asked {new Date(q.created_at).toLocaleDateString()}</span>
                                                        {q.answer && (
                                                            <div className="mt-2 pl-4 border-l-2 border-primary/30">
                                                                <p className="text-sm">{q.answer}</p>
                                                                <span className="text-xs text-muted-foreground">Answered {new Date(q.answered_at!).toLocaleDateString()}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">No questions yet. Be the first to ask!</p>
                                )}
                            </div>
                        </TabsContent>
                    </div>

                    <div className="space-y-6">
                        <div className="border rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold">Details</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-muted-foreground">Version</span><span className="font-medium">{plugin.latest_version}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Downloads</span><span className="font-medium">{plugin.downloads.toLocaleString()}</span></div>
                                <div className="flex justify-between"><span className="text-muted-foreground">Updated</span><span className="font-medium">{new Date(plugin.updated_at).toLocaleDateString()}</span></div>
                            </div>
                        </div>
                        <div className="border rounded-xl p-5 space-y-4">
                            <h3 className="font-semibold">Publisher</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><Link href={`/marketplace/search?q=${plugin.publishers?.display_name}`} className="text-primary hover:underline">{plugin.publishers?.display_name}</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
