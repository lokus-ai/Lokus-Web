import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Trash2, Plus } from 'lucide-react';
import { createToken, deleteToken } from '../../actions';
import GenerateTokenForm from './generate-token-form';

export default async function TokensPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // Get publisher ID
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single();

    if (!publisher) {
        redirect('/dashboard/onboarding');
    }

    // Fetch tokens
    const { data: tokens } = await supabase
        .from('api_keys')
        .select('*')
        .eq('publisher_id', publisher.id)
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Access Tokens</h2>
                    <p className="text-muted-foreground">
                        Manage Personal Access Tokens for the Lokus CLI.
                    </p>
                </div>
            </div>

            <GenerateTokenForm />

            <div className="space-y-4">
                <h3 className="font-semibold">Active Tokens</h3>
                {tokens && tokens.length > 0 ? (
                    <div className="border rounded-lg divide-y">
                        {tokens.map((token) => (
                            <div key={token.id} className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{token.label}</p>
                                    <p className="text-xs text-muted-foreground">
                                        Created on {new Date(token.created_at).toLocaleDateString()}
                                        {token.last_used_at && ` • Last used ${new Date(token.last_used_at).toLocaleDateString()}`}
                                    </p>
                                </div>
                                <form action={deleteToken}>
                                    <input type="hidden" name="id" value={token.id} />
                                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </form>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 border rounded-lg border-dashed text-muted-foreground">
                        No active tokens found. Generate one to use the CLI.
                    </div>
                )}
            </div>
        </div>
    );
}
