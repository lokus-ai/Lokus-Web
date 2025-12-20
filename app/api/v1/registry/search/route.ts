import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const sort = searchParams.get('sort') || 'downloads'; // downloads, updated, newest
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = await createClient();

    let dbQuery = supabase
        .from('plugins')
        .select(`
            *,
            publisher:publishers(display_name, id)
        `);

    if (query) {
        dbQuery = dbQuery.ilike('name', `%${query}%`);
    }

    if (category && category !== 'all') {
        dbQuery = dbQuery.contains('tags', [category]);
    }

    // Sorting
    if (sort === 'downloads') {
        dbQuery = dbQuery.order('downloads', { ascending: false });
    } else if (sort === 'updated') {
        dbQuery = dbQuery.order('updated_at', { ascending: false });
    } else if (sort === 'newest') {
        dbQuery = dbQuery.order('created_at', { ascending: false });
    }

    dbQuery = dbQuery.limit(limit);

    const { data: plugins, error } = await dbQuery;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }

    // Transform to match expected format if needed
    const formattedPlugins = plugins.map(p => ({
        id: p.id,
        slug: p.slug,
        name: p.name,
        description: p.description,
        version: p.latest_version,
        author: p.publisher?.display_name || p.publisher_id,
        publisher_id: p.publisher_id,
        downloads: p.downloads,
        icon: p.icon_url,
        updated_at: p.updated_at,
        tags: p.tags,
        permissions: p.permissions || []
    }));

    return NextResponse.json(formattedPlugins, { headers: corsHeaders });
}
