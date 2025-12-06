'use client';

import React, { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createPublisher } from '../actions';

const initialState = {
    error: '',
};

export default function PublisherOnboardingPage() {
    const [state, formAction, isPending] = useActionState(createPublisher, initialState);

    return (
        <div className="max-w-md mx-auto space-y-8 py-12">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Become a Publisher</h1>
                <p className="text-muted-foreground">
                    Create a publisher profile to start sharing your plugins with the world.
                </p>
            </div>

            <div className="border rounded-lg p-6 bg-card">
                <form action={formAction} className="space-y-6">
                    {state?.error && (
                        <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-md border border-red-500/20">
                            {state.error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="handle">Publisher Handle</Label>
                        <Input
                            id="handle"
                            name="handle"
                            placeholder="e.g. lokus-team"
                            required
                            pattern="^[a-z0-9_-]+$"
                            title="Lowercase letters, numbers, underscores, and hyphens only."
                        />
                        <p className="text-xs text-muted-foreground">
                            This will be your unique identifier (e.g., <code>handle.plugin-name</code>). Cannot be changed later.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" name="displayName" placeholder="Lokus Team" required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input id="contactEmail" name="contactEmail" type="email" placeholder="contact@example.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website (Optional)</Label>
                        <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://example.com" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="githubHandle">GitHub Handle (Optional)</Label>
                        <Input id="githubHandle" name="githubHandle" placeholder="lokus-team" />
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? 'Creating Profile...' : 'Create Profile'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
