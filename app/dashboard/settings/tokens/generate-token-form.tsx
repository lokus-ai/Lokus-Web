'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Copy, Check } from 'lucide-react';
import { createToken } from '../../actions';

export default function GenerateTokenForm() {
    const [newToken, setNewToken] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isPending, setIsPending] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        try {
            const result = await createToken(formData);
            if (result && result.token) {
                setNewToken(result.token);
            }
        } catch (error) {
            console.error('Failed to create token:', error);
        } finally {
            setIsPending(false);
        }
    }

    const copyToClipboard = () => {
        if (newToken) {
            navigator.clipboard.writeText(newToken);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (newToken) {
        return (
            <div className="border border-green-900/50 bg-green-900/20 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-green-400">Token Generated!</h3>
                <p className="text-sm text-green-300">
                    Make sure to copy your personal access token now. You won't be able to see it again!
                </p>
                <div className="flex gap-2">
                    <Input
                        value={newToken}
                        readOnly
                        className="font-mono bg-zinc-900 border-zinc-700 text-zinc-300"
                        onClick={(e) => e.currentTarget.select()}
                    />
                    <Button onClick={copyToClipboard} variant="outline" size="icon" className="shrink-0 border-zinc-700 hover:bg-zinc-800 hover:text-white">
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setNewToken(null)}
                    className="text-green-400 hover:text-green-300 hover:bg-green-900/30"
                >
                    Generate another
                </Button>
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-6 space-y-6">
            <h3 className="font-semibold">Generate New Token</h3>
            <form action={handleSubmit} className="flex gap-4 items-end">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="label">Token Label</Label>
                    <Input type="text" id="label" name="label" placeholder="e.g. MacBook Pro CLI" required disabled={isPending} />
                </div>
                <Button type="submit" disabled={isPending}>
                    <Plus className="h-4 w-4 mr-2" />
                    {isPending ? 'Generating...' : 'Generate'}
                </Button>
            </form>
        </div>
    );
}
