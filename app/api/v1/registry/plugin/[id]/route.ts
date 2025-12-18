import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const supabase = await createClient();

    // Try to fetch by slug first, then by id
    let plugin;
    let pluginError;

    // First try slug
    ({ data: plugin, error: pluginError } = await supabase
        .from('plugins')
        .select(`
            *,
            publisher:publishers(display_name, id, owner_id)
        `)
        .eq('slug', id)
        .single());

    // If not found by slug, try by id
    if (pluginError || !plugin) {
        ({ data: plugin, error: pluginError } = await supabase
            .from('plugins')
            .select(`
                *,
                publisher:publishers(display_name, id, owner_id)
            `)
            .eq('id', id)
            .single());
    }

    if (pluginError || !plugin) {
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
    }

    // Fetch versions
    const { data: versions, error: versionsError } = await supabase
        .from('plugin_versions')
        .select('*')
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    if (versionsError) {
        return NextResponse.json({ error: versionsError.message }, { status: 500 });
    }

    // Format response
    const response = {
        id: plugin.id,
        slug: plugin.slug,
        name: plugin.name,
        description: plugin.description,
        latest_version: plugin.latest_version,
        author: plugin.publisher?.display_name || plugin.publisher_id,
        publisher_id: plugin.publisher_id,
        downloads: plugin.downloads,
        icon: plugin.icon_url,
        updated_at: plugin.updated_at,
        tags: plugin.tags,
        versions: versions.map(v => ({
            version: v.version,
            created_at: v.created_at,
            changelog: v.changelog
        })),
        readme: versions[0]?.readme
    };

    return NextResponse.json(response);
}
