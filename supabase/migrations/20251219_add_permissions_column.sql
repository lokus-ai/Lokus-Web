-- Add permissions column to plugins table
-- Stores the plugin's required permissions as a JSONB array

ALTER TABLE public.plugins
ADD COLUMN IF NOT EXISTS permissions jsonb DEFAULT '[]'::jsonb;

-- Add permissions column to plugin_versions table as well
-- So we can track permission changes across versions
ALTER TABLE public.plugin_versions
ADD COLUMN IF NOT EXISTS permissions jsonb DEFAULT '[]'::jsonb;

-- Create index for faster permission-based queries
CREATE INDEX IF NOT EXISTS idx_plugins_permissions
ON public.plugins USING gin (permissions);

-- Comment for documentation
COMMENT ON COLUMN public.plugins.permissions IS 'Array of permission strings required by this plugin (e.g., ["filesystem:read", "ui:notifications"])';
COMMENT ON COLUMN public.plugin_versions.permissions IS 'Permissions for this specific version (allows tracking permission changes)';
