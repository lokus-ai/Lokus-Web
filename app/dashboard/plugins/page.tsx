import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Plus, Package, Download, Calendar } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function PluginsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Get publisher
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single();

    if (!publisher) {
        redirect('/dashboard/onboarding');
    }

    // Fetch plugins
    const { data: plugins } = await supabase
        .from('plugins')
        .select('*')
        .eq('publisher_id', publisher.id)
        .order('updated_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">My Plugins</h1>
                    <p className="text-gray-400">Manage your published plugins and releases.</p>
                </div>
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                    <Link href="/dashboard/publish/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Plugin
                    </Link>
                </Button>
            </div>

            {plugins && plugins.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {plugins.map((plugin) => (
                        <div
                            key={plugin.id}
                            className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 flex items-center justify-between hover:border-gray-700 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                                    {plugin.icon_url ? (
                                        <img src={plugin.icon_url} alt={plugin.name} className="w-8 h-8 rounded" />
                                    ) : (
                                        <Package className="w-6 h-6 text-gray-400" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-lg">{plugin.name}</h3>
                                    <p className="text-sm text-gray-400 font-mono">{plugin.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm text-gray-400 flex items-center justify-end gap-1">
                                        <Download className="w-3 h-3" /> Downloads
                                    </p>
                                    <p className="font-medium text-white">{plugin.downloads}</p>
                                </div>
                                <div className="text-right hidden md:block">
                                    <p className="text-sm text-gray-400 flex items-center justify-end gap-1">
                                        <Calendar className="w-3 h-3" /> Updated
                                    </p>
                                    <p className="font-medium text-white">
                                        {new Date(plugin.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-400">Version</p>
                                    <p className="font-medium text-white">{plugin.latest_version || '0.0.0'}</p>
                                </div>
                                <Button variant="outline" asChild>
                                    <Link href={`/dashboard/publish/${plugin.id}`}>
                                        Manage
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-900/30 border border-gray-800 rounded-xl border-dashed">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-8 h-8 text-gray-600" />
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">No plugins yet</h3>
                    <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                        You haven't published any plugins yet. Create your first plugin to start sharing with the community.
                    </p>
                    <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                        <Link href="/dashboard/publish/new">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Plugin
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
