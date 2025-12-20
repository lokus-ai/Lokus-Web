import { createAdminClient } from '@/lib/supabase/admin';
import { NextRequest, NextResponse } from 'next/server';

// =============================================================================
// VALID PERMISSIONS - Must match PermissionEnforcer.js PERMISSION_MAP
// =============================================================================
const VALID_PERMISSIONS = [
    // Filesystem permissions
    'filesystem:read',
    'filesystem:write',

    // Editor permissions
    'editor:read',
    'editor:write',

    // UI permissions
    'ui:notifications',
    'ui:dialogs',
    'ui:create',
    'ui:menus',
    'ui:toolbars',

    // Workspace permissions
    'workspace:read',
    'workspace:write',

    // Storage permissions
    'storage:read',
    'storage:write',

    // Command permissions
    'commands:register',
    'commands:execute',
    'commands:list',

    // Network permissions
    'network:http',

    // Clipboard permissions
    'clipboard:read',
    'clipboard:write',

    // Terminal permissions (HIGH RISK)
    'terminal:create',
    'terminal:write',
    'terminal:read',

    // Events permissions
    'events:listen',
    'events:emit',

    // Configuration permissions
    'config:read',
    'config:write',

    // Language permissions
    'languages:read',
    'languages:register',

    // Theme permissions
    'themes:read',
    'themes:register',
    'themes:set',

    // Debug permissions (HIGH RISK)
    'debug:session',
    'debug:register',
] as const;

type ValidPermission = typeof VALID_PERMISSIONS[number];

// HIGH RISK permissions that should trigger warnings in UI
const HIGH_RISK_PERMISSIONS = [
    'filesystem:write',
    'terminal:create',
    'terminal:write',
    'debug:session',
    'network:http',
    'config:write',
] as const;

/**
 * Validate plugin permissions
 * Returns { valid: true } or { valid: false, errors: string[] }
 */
function validatePermissions(permissions: unknown): { valid: true; permissions: string[] } | { valid: false; errors: string[] } {
    const errors: string[] = [];

    // Must be an array
    if (!Array.isArray(permissions)) {
        return { valid: false, errors: ['permissions must be an array'] };
    }

    // Validate each permission
    const validatedPermissions: string[] = [];
    for (let i = 0; i < permissions.length; i++) {
        const perm = permissions[i];

        // Must be a string
        if (typeof perm !== 'string') {
            errors.push(`permissions[${i}] must be a string, got ${typeof perm}`);
            continue;
        }

        // Must not be empty
        if (perm.trim() === '') {
            errors.push(`permissions[${i}] cannot be empty`);
            continue;
        }

        // Must be a known permission
        if (!VALID_PERMISSIONS.includes(perm as ValidPermission)) {
            errors.push(`Unknown permission: "${perm}". Valid permissions are: ${VALID_PERMISSIONS.join(', ')}`);
            continue;
        }

        // Check for duplicates
        if (validatedPermissions.includes(perm)) {
            // Silently ignore duplicates instead of erroring
            continue;
        }

        validatedPermissions.push(perm);
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true, permissions: validatedPermissions };
}

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
            .select('id, latest_version, slug, permissions')
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

        // Extract and validate permissions from manifest
        const permissionResult = validatePermissions(manifest.permissions ?? []);
        if (!permissionResult.valid) {
            return NextResponse.json({
                error: 'Invalid permissions in manifest',
                details: permissionResult.errors
            }, { status: 422 });
        }
        const permissions = permissionResult.permissions;

        // Track high-risk permissions for audit/warning
        const highRiskRequested = permissions.filter(p =>
            HIGH_RISK_PERMISSIONS.includes(p as typeof HIGH_RISK_PERMISSIONS[number])
        );
        if (highRiskRequested.length > 0) {
            console.log(`[SECURITY] Plugin ${manifest.name} requests high-risk permissions:`, highRiskRequested);
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
                    permissions: permissions,
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
                permissions: permissions,
            });

        if (versionError) throw new Error(`Failed to record version: ${versionError.message}`);

        // 6. Track permission changes for audit
        const oldPermissions = existingPlugin?.permissions || [];
        const permissionsChanged = JSON.stringify(oldPermissions.sort()) !== JSON.stringify(permissions.sort());

        if (permissionsChanged && existingPlugin) {
            // Log permission change to audit table
            const { error: auditError } = await supabase
                .from('plugin_permission_history')
                .insert({
                    plugin_id: pluginId,
                    version: manifest.version,
                    old_permissions: oldPermissions,
                    new_permissions: permissions,
                });

            if (auditError) {
                console.error('[AUDIT] Failed to log permission change:', auditError);
                // Don't fail the publish for audit log errors
            } else {
                console.log(`[AUDIT] Permission change logged for ${pluginId}: ${oldPermissions.length} -> ${permissions.length} permissions`);
            }
        }

        // 7. Update Plugin Latest Version, permissions & icon if provided
        const updateData: any = {
            latest_version: manifest.version,
            updated_at: new Date().toISOString(),
            permissions: permissions,
        };
        if (iconUrl) updateData.icon_url = iconUrl;

        await supabase
            .from('plugins')
            .update(updateData)
            .eq('id', pluginId);

        // Return success with additional metadata
        return NextResponse.json({
            success: true,
            pluginId,
            slug,
            version: manifest.version,
            permissions: permissions,
            highRiskPermissions: highRiskRequested,
            permissionsChanged: permissionsChanged && existingPlugin ? true : false
        });

    } catch (error: any) {
        console.error('Publish error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
