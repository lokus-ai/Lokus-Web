import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string; version: string } }
) {
    const { id, version } = params;
    const supabase = await createClient();

    // 1. Get storage path for this version
    const { data: versionData, error: versionError } = await supabase
        .from('plugin_versions')
        .select('storage_path, plugin_id')
        .eq('plugin_id', id)
        .eq('version', version)
        .single();

    if (versionError || !versionData) {
        return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // 2. Generate Signed URL
    const { data: signedUrlData, error: signError } = await supabase
        .storage
        .from('plugin-releases')
        .createSignedUrl(versionData.storage_path, 60); // Valid for 60 seconds

    if (signError || !signedUrlData) {
        return NextResponse.json({ error: 'Failed to generate download link' }, { status: 500 });
    }

    // 3. Increment Download Count (Async, don't block)
    // We use rpc if available, or just update. 
    // Since we don't have an increment RPC, we'll read and write (race condition possible but acceptable for MVP)
    // Or better: create a simple RPC function later. For now, let's just ignore the race condition risk.

    // Actually, let's try to be safe and just fire-and-forget the update if possible, 
    // but Next.js serverless functions might kill the process.
    // We'll await it for safety.

    /* 
       Ideally: 
       create function increment_downloads(plugin_id text) returns void as $$
       update plugins set downloads = downloads + 1 where id = plugin_id;
       $$ language sql;
    */

    // For now, we will just proceed.
    try {
        await supabase.rpc('increment_downloads', { plugin_id: id });
    } catch (error) {
        // Fallback if RPC doesn't exist
        const { data: plugin } = await supabase.from('plugins').select('downloads').eq('id', id).single();
        if (plugin) {
            await supabase.from('plugins').update({ downloads: (plugin.downloads || 0) + 1 }).eq('id', id);
        }
    }

    // 4. Return signed URL as JSON
    return NextResponse.json({ url: signedUrlData.signedUrl });
}
