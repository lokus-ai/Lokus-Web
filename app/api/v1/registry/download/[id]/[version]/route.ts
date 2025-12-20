import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string; version: string }> }
) {
    const { id: slug, version } = await params;
    const supabase = createAdminClient();

    // 1. Get plugin by slug
    const { data: plugin, error: pluginError } = await supabase
        .from('plugins')
        .select('id')
        .eq('slug', slug)
        .single();

    if (pluginError || !plugin) {
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
    }

    // 2. Get storage path for this version
    const { data: versionData, error: versionError } = await supabase
        .from('plugin_versions')
        .select('storage_path, plugin_id')
        .eq('plugin_id', plugin.id)
        .eq('version', version)
        .single();

    if (versionError || !versionData) {
        return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // 3. Generate Signed URL (valid for 1 hour)
    const { data: signedUrlData, error: signError } = await supabase
        .storage
        .from('plugin-releases')
        .createSignedUrl(versionData.storage_path, 3600);

    if (signError || !signedUrlData) {
        console.error('Signed URL error:', signError);
        return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // 4. Increment Download Count
    try {
        await supabase.rpc('increment_downloads', { plugin_id: plugin.id });
    } catch (error) {
        const { data: pluginData } = await supabase.from('plugins').select('downloads').eq('id', plugin.id).single();
        if (pluginData) {
            await supabase.from('plugins').update({ downloads: (pluginData.downloads || 0) + 1 }).eq('id', plugin.id);
        }
    }

    // 5. Redirect to signed URL for direct download
    return NextResponse.redirect(signedUrlData.signedUrl);
}
