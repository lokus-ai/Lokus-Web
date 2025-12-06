import { Button } from '@/components/ui/button';
import { Plus, Download, Package, Activity } from 'lucide-react';
import Link from 'next/link';

interface PublisherViewProps {
    publisher: any;
    plugins: any[];
}

export function PublisherView({ publisher, plugins }: PublisherViewProps) {
    const totalDownloads = plugins?.reduce((acc, plugin) => acc + (plugin.downloads || 0), 0) || 0;

    return (
        <div className="space-y-8 pb-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Publisher Dashboard</h1>
                    <p className="text-gray-400">Welcome back, {publisher.display_name}</p>
                </div>
                <Button asChild className="bg-white text-black hover:bg-gray-200">
                    <Link href="/dashboard/publish/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Plugin
                    </Link>
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Download className="w-5 h-5 text-blue-500" />
                        </div>
                        <span className="text-gray-400 font-medium">Total Downloads</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{totalDownloads.toLocaleString()}</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <Package className="w-5 h-5 text-purple-500" />
                        </div>
                        <span className="text-gray-400 font-medium">Active Plugins</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{plugins?.length || 0}</p>
                </div>

                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Activity className="w-5 h-5 text-green-500" />
                        </div>
                        <span className="text-gray-400 font-medium">Status</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <p className="text-lg font-bold text-white">Verified Publisher</p>
                    </div>
                </div>
            </div>

            {/* Plugins List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-white">Your Plugins</h2>
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
                                        <h3 className="font-semibold text-white">{plugin.name}</h3>
                                        <p className="text-sm text-gray-400">{plugin.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Downloads</p>
                                        <p className="font-medium text-white">{plugin.downloads}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400">Version</p>
                                        <p className="font-medium text-white">{plugin.latest_version || '0.0.0'}</p>
                                    </div>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/dashboard/publish/${plugin.id}`}>
                                            Manage
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-900/30 border border-gray-800 rounded-xl border-dashed">
                        <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-white mb-2">No plugins yet</h3>
                        <p className="text-gray-400 mb-6">Create your first plugin to get started</p>
                        <Button asChild>
                            <Link href="/dashboard/publish/new">
                                Create Plugin
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
