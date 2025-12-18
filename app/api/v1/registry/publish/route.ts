import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

// Generate URL-safe slug from name
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export async function POST(req: NextRequest) {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Use admin client to bypass RLS
    const supabase = createAdminClient();

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
        const iconFile = formData.get('icon') as File | null;

        if (!manifestJson || !file) {
            return NextResponse.json({ error: 'Missing manifest or file' }, { status: 400 });
        }

        const manifest = JSON.parse(manifestJson);
        const publisherId = apiKey.publisher_id;

        // 2. Validate Manifest
        if (!manifest.name || !manifest.version) {
            return NextResponse.json({ error: 'Invalid manifest: missing name or version' }, { status: 400 });
        }

        // Check publisher match (if publisher field exists in manifest)
        if (manifest.publisher && manifest.publisher !== publisherId) {
            return NextResponse.json({
                error: `Manifest publisher '${manifest.publisher}' does not match authenticated publisher '${publisherId}'`
            }, { status: 403 });
        }

        const pluginId = manifest.publisher ? `${manifest.publisher}.${manifest.name}` : `${publisherId}.${manifest.name}`;
        const pluginName = manifest.displayName || manifest.name;
        const slug = generateSlug(pluginName);

        // 3. Check if plugin exists, create if not
        const { data: existingPlugin } = await supabase
            .from('plugins')
            .select('id, latest_version, slug')
            .eq('id', pluginId)
            .single();

        // Check if slug is taken by another plugin
        if (!existingPlugin) {
            const { data: slugExists } = await supabase
                .from('plugins')
                .select('id')
                .eq('slug', slug)
                .single();
            
            if (slugExists) {
                return NextResponse.json({ 
                    error: `Slug '${slug}' is already taken by another plugin` 
                }, { status: 409 });
            }
        }

        // Upload icon if provided
        let iconUrl = null;
        if (iconFile) {
            const iconPath = `icons/${publisherId}/${slug}.${iconFile.name.split('.').pop()}`;
            const { error: iconError } = await supabase
                .storage
                .from('plugin-releases')
                .upload(iconPath, iconFile, {
                    contentType: iconFile.type,
                    upsert: true
                });

            if (!iconError) {
                const { data: { publicUrl } } = supabase
                    .storage
                    .from('plugin-releases')
                    .getPublicUrl(iconPath);
                iconUrl = publicUrl;
            }
        }

        if (!existingPlugin) {
            // Create new plugin
            const { error: createError } = await supabase
                .from('plugins')
                .insert({
                    id: pluginId,
                    slug: slug,
                    publisher_id: publisherId,
                    name: pluginName,
                    description: manifest.description,
                    latest_version: manifest.version,
                    icon_url: iconUrl,
                });

            if (createError) throw new Error(`Failed to create plugin: ${createError.message}`);
        } else {
            // Check version
            if (existingPlugin.latest_version === manifest.version) {
                return NextResponse.json({ error: 'Version already exists' }, { status: 409 });
            }
        }

        // 4. Upload to Storage
        const filePath = `${publisherId}/${slug}/${manifest.version}.zip`;
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
                readme: manifest.readme || '',
                changelog: manifest.changelog || '',
            });

        if (versionError) throw new Error(`Failed to record version: ${versionError.message}`);

        // 6. Update Plugin Latest Version & icon if provided
        const updateData: any = {
            latest_version: manifest.version,
            updated_at: new Date().toISOString()
        };
        if (iconUrl) updateData.icon_url = iconUrl;

        await supabase
            .from('plugins')
            .update(updateData)
            .eq('id', pluginId);

        return NextResponse.json({ success: true, pluginId, slug, version: manifest.version });

    } catch (error: any) {
        console.error('Publish error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
