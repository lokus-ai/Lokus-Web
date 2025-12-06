import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const supabase = await createClient();

    // 1. Authenticate
    const { createHash } = await import('crypto');
    const keyHash = createHash('sha256').update(token).digest('hex');

    const { data: apiKey } = await supabase
        .from('api_keys')
        .select('publisher_id')
        .eq('key_hash', keyHash)
        .single();

    if (!apiKey) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const manifestJson = formData.get('manifest') as string;
        const file = formData.get('file') as File;

        if (!manifestJson || !file) {
            return NextResponse.json({ error: 'Missing manifest or file' }, { status: 400 });
        }

        const manifest = JSON.parse(manifestJson);
        const publisherId = apiKey.publisher_id;

        // 2. Validate Manifest
        if (!manifest.name || !manifest.version) {
            return NextResponse.json({ error: 'Invalid manifest: missing name or version' }, { status: 400 });
        }

        // Ensure plugin ID matches publisher
        // Expected ID format: publisher.plugin-name
        // But manifest might just have "name": "pomodoro"
        // We should probably enforce ID in manifest or construct it.
        // For V2 manifest, we might expect "publisher": "lokus-team" and "name": "pomodoro".

        if (manifest.publisher !== publisherId) {
            return NextResponse.json({
                error: `Manifest publisher '${manifest.publisher}' does not match authenticated publisher '${publisherId}'`
            }, { status: 403 });
        }

        const pluginId = `${manifest.publisher}.${manifest.name}`;

        // 3. Check if plugin exists, create if not
        const { data: existingPlugin } = await supabase
            .from('plugins')
            .select('id, latest_version')
            .eq('id', pluginId)
            .single();

        if (!existingPlugin) {
            // Create new plugin
            const { error: createError } = await supabase
                .from('plugins')
                .insert({
                    id: pluginId,
                    publisher_id: publisherId,
                    name: manifest.displayName || manifest.name,
                    description: manifest.description,
                    latest_version: manifest.version,
                });

            if (createError) throw new Error(`Failed to create plugin: ${createError.message}`);
        } else {
            // Check version
            // TODO: proper semver comparison. For now, just string check or assume CLI did it.
            if (existingPlugin.latest_version === manifest.version) {
                return NextResponse.json({ error: 'Version already exists' }, { status: 409 });
            }
        }

        // 4. Upload to Storage
        const filePath = `${publisherId}/${manifest.name}/${manifest.version}.zip`;
        const { error: uploadError } = await supabase
            .storage
            .from('plugin-releases')
            .upload(filePath, file, {
                contentType: 'application/zip',
                upsert: false
            });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        // 5. Create Version Record
        const { error: versionError } = await supabase
            .from('plugin_versions')
            .insert({
                plugin_id: pluginId,
                version: manifest.version,
                storage_path: filePath,
                readme: manifest.readme || '', // CLI should send readme content
                changelog: manifest.changelog || '',
            });

        if (versionError) throw new Error(`Failed to record version: ${versionError.message}`);

        // 6. Update Plugin Latest Version
        await supabase
            .from('plugins')
            .update({
                latest_version: manifest.version,
                updated_at: new Date().toISOString()
            })
            .eq('id', pluginId);

        return NextResponse.json({ success: true, pluginId, version: manifest.version });

    } catch (error: any) {
        console.error('Publish error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
