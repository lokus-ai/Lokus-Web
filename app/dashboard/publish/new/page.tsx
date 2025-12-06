import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assuming this component exists or I'll use standard textarea
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Upload } from 'lucide-react';

export default async function PublishPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?next=/dashboard/publish/new');
    }

    // Check if user has a publisher profile
    const { data: publisher } = await supabase
        .from('publishers')
        .select('id')
        .eq('owner_id', user.id)
        .single();

    if (!publisher) {
        redirect('/dashboard/onboarding');
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Publish a Plugin</h1>
                <p className="text-muted-foreground">
                    Share your plugin with the Lokus community. Make sure your manifest is valid before uploading.
                </p>
            </div>

            <div className="border rounded-lg p-8 space-y-6">
                <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center text-center space-y-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <p className="font-medium">Drag and drop your plugin .zip here</p>
                            <p className="text-sm text-muted-foreground">or click to browse files</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="manifest">Manifest JSON (Optional override)</Label>
                        <textarea
                            id="manifest"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Paste your plugin.json here to validate it before uploading..."
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button className="w-full" size="lg">
                        Upload & Publish
                    </Button>
                </div>
            </div>
        </div>
    );
}
