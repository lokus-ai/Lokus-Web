import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Package, Plus, Settings } from 'lucide-react'
import Link from 'next/link'

export async function MarketplaceWidget() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null

    const { data: publisher } = await supabase
        .from('publishers')
        .select('display_name')
        .eq('owner_id', user.id)
        .single()

    return (
        <div className="bg-gray-900/50 rounded-xl p-8 border border-gray-800 mb-12">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Package className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Plugin Marketplace</h3>
                    <p className="text-gray-400">
                        {publisher
                            ? `Welcome back, ${publisher.display_name}. Manage your plugins and releases.`
                            : 'Build and publish plugins for the Lokus community.'}
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                {publisher ? (
                    <>
                        <Button asChild className="bg-white text-black hover:bg-gray-200">
                            <Link href="/dashboard/publish/new">
                                <Plus className="w-4 h-4 mr-2" />
                                Publish New Plugin
                            </Link>
                        </Button>
                        <Button asChild variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                            <Link href="/dashboard/settings/tokens">
                                <Settings className="w-4 h-4 mr-2" />
                                Manage Access Tokens
                            </Link>
                        </Button>
                    </>
                ) : (
                    <Button asChild className="bg-white text-black hover:bg-gray-200">
                        <Link href="/dashboard/onboarding">
                            <Package className="w-4 h-4 mr-2" />
                            Register as Developer
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}
