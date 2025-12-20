import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch questions for a plugin
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
        return NextResponse.json({ error: 'Plugin not found' }, { status: 404 });
    }

    // Fetch questions with user info
    const { data: questions, error } = await supabase
        .from('plugin_questions')
        .select(`
            id,
            question,
            answer,
            created_at,
            answered_at,
            user:user_id (
                id,
                raw_user_meta_data
            ),
            answerer:answered_by (
                id,
                raw_user_meta_data
            )
        `)
        .eq('plugin_id', plugin.id)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
        questions: questions?.map(q => ({
            id: q.id,
            question: q.question,
            answer: q.answer,
            createdAt: q.created_at,
            answeredAt: q.answered_at,
            user: {
                id: q.user?.id,
                name: q.user?.raw_user_meta_data?.name || q.user?.raw_user_meta_data?.full_name || 'Anonymous',
                avatar: q.user?.raw_user_meta_data?.avatar_url
            },
            answeredBy: q.answerer ? {
                id: q.answerer.id,
                name: q.answerer.raw_user_meta_data?.name || q.answerer.raw_user_meta_data?.full_name || 'Anonymous',
                avatar: q.answerer.raw_user_meta_data?.avatar_url
            } : null
        })) || [],
        total: questions?.length || 0
    });
}

// POST - Submit a question
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
    const { question } = body;

    if (!question || question.trim().length === 0) {
        return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    // Insert question
    const { data, error } = await adminClient
        .from('plugin_questions')
        .insert({
            plugin_id: plugin.id,
            user_id: user.id,
            question: question.trim()
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, question: data });
}
