import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Use admin client to bypass RLS
    const supabase = createAdminClient();

    // Hash the token to compare with stored hash
    const { createHash } = await import('crypto');
    const keyHash = createHash('sha256').update(token).digest('hex');

    const { data: apiKey } = await supabase
        .from('api_keys')
        .select('publisher_id, publishers(id, display_name)')
        .eq('key_hash', keyHash)
        .single();

    if (!apiKey) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Update last_used_at
    await supabase
        .from('api_keys')
        .update({ last_used_at: new Date().toISOString() })
        .eq('key_hash', keyHash);

    return NextResponse.json({
        authenticated: true,
        publisher: apiKey.publishers,
    });
}
