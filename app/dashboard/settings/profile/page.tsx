import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';

export default async function PublisherSettingsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: publisher } = await supabase
        .from('publishers')
        .select('*')
        .eq('owner_id', user.id)
        .single();

    if (!publisher) {
        redirect('/dashboard/onboarding');
    }

    async function updateProfile(formData: FormData) {
        'use server';

        const displayName = formData.get('displayName') as string;
        const contactEmail = formData.get('contactEmail') as string;
        const websiteUrl = formData.get('websiteUrl') as string;
        const githubHandle = formData.get('githubHandle') as string;

        const supabase = await createClient();

        await supabase
            .from('publishers')
            .update({
                display_name: displayName,
                contact_email: contactEmail,
                website_url: websiteUrl,
                github_handle: githubHandle,
            })
            .eq('id', publisher.id);

        redirect('/dashboard/settings/profile');
    }

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Publisher Settings</h1>
                <p className="text-gray-400">Manage your public profile and contact information.</p>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
                <form action={updateProfile} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="handle">Publisher Handle</Label>
                        <Input
                            id="handle"
                            value={publisher.id}
                            disabled
                            className="bg-gray-900 border-gray-700 text-gray-500"
                        />
                        <p className="text-xs text-gray-500">Your handle cannot be changed.</p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input
                            id="displayName"
                            name="displayName"
                            defaultValue={publisher.display_name}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            defaultValue={publisher.contact_email}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input
                            id="websiteUrl"
                            name="websiteUrl"
                            type="url"
                            defaultValue={publisher.website_url}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="githubHandle">GitHub Handle</Label>
                        <Input
                            id="githubHandle"
                            name="githubHandle"
                            defaultValue={publisher.github_handle}
                            placeholder="username"
                        />
                    </div>

                    <div className="pt-4">
                        <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
