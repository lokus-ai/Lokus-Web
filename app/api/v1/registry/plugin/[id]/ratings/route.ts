import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, User-Agent',
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

// GET - Fetch ratings for a plugin
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: slug } = await params;
    const supabase = createAdminClient();

    // Get plugin by slug
    const { data: plugin } = await supabase
        .from('plugins')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!plugin) {
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404, headers: corsHeaders });
    }

    // Fetch ratings with user info
    const { data: ratings, error } = await supabase
        .from('plugin_ratings')
        .select(`
            id,
            rating,
            review,
            created_at,
            updated_at,
            user:user_id (
                id,
                email,
                raw_user_meta_data
            )
        `)
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }

    // Calculate average rating
    const totalRatings = ratings?.length || 0;
    const avgRating = totalRatings > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
        : 0;

    // Count by star
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings?.forEach(r => {
        ratingCounts[r.rating as keyof typeof ratingCounts]++;
    });

    return NextResponse.json({
        ratings: ratings?.map(r => ({
            id: r.id,
            rating: r.rating,
            review: r.review,
            created_at: r.created_at,
            updated_at: r.updated_at,
            user: {
                id: r.user?.id,
                name: r.user?.raw_user_meta_data?.name || r.user?.raw_user_meta_data?.full_name || 'Anonymous',
                avatar: r.user?.raw_user_meta_data?.avatar_url
            }
        })) || [],
        summary: {
            average: Math.round(avgRating * 10) / 10,
            total: totalRatings,
            counts: ratingCounts
        }
    }, { headers: corsHeaders });
}

// POST - Submit a rating
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: slug } = await params;

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get plugin by slug
    const adminClient = createAdminClient();
    const { data: plugin } = await adminClient
        .from('plugins')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!plugin) {
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
    }

    // Parse body
    const body = await request.json();
    const { rating, review } = body;

    if (!rating || rating < 1 || rating > 5) {
        return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Upsert rating (update if exists, insert if not)
    const { data, error } = await adminClient
        .from('plugin_ratings')
        .upsert({
            plugin_id: plugin.id,
            user_id: user.id,
            rating,
            review: review || null,
            updated_at: new Date().toISOString()
        }, {
            onConflict: 'plugin_id,user_id'
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, rating: data });
}

// DELETE - Remove a rating
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: slug } = await params;

    // Get authenticated user
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get plugin by slug
    const adminClient = createAdminClient();
    const { data: plugin } = await adminClient
        .from('plugins')
        .select('id')
        .eq('slug', slug)
        .single();

    if (!plugin) {
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
    }

    // Delete user's rating
    const { error } = await adminClient
        .from('plugin_ratings')
        .delete()
        .eq('plugin_id', plugin.id)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
