-- ============================================================================
-- COMPLETE SCHEMA FIX FOR PLUGIN PERMISSION SYSTEM
-- Enterprise-grade plugin registry with proper constraints and validation
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- PART 1: Fix plugins table - add missing columns
-- ============================================================================

-- Add slug column with unique constraint
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS slug TEXT;

-- Create unique index on slug (more flexible than constraint for NULL handling)
CREATE UNIQUE INDEX IF NOT EXISTS idx_plugins_slug_unique
ON public.plugins(slug)
WHERE slug IS NOT NULL;

-- Add metadata columns
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS license TEXT;
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS repository_url TEXT;
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS homepage_url TEXT;
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS rating DECIMAL(3,2) DEFAULT 0;
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS rating_count INTEGER DEFAULT 0;

-- Add permissions column with proper default
ALTER TABLE public.plugins ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;

-- Add CHECK constraint for permissions format (must be array)
-- Drop if exists first to allow re-running
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'valid_permissions') THEN
    ALTER TABLE public.plugins DROP CONSTRAINT valid_permissions;
  END IF;
END
$$;

ALTER TABLE public.plugins ADD CONSTRAINT valid_permissions
  CHECK (permissions IS NULL OR jsonb_typeof(permissions) = 'array');

-- Add CHECK constraint for tags format (must be array)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'valid_tags') THEN
    ALTER TABLE public.plugins DROP CONSTRAINT valid_tags;
  END IF;
END
$$;

ALTER TABLE public.plugins ADD CONSTRAINT valid_tags
  CHECK (tags IS NULL OR jsonb_typeof(tags) = 'array');

-- Create GIN index for fast permission-based queries
CREATE INDEX IF NOT EXISTS idx_plugins_permissions
ON public.plugins USING GIN(permissions);

-- Create GIN index for tag-based queries
CREATE INDEX IF NOT EXISTS idx_plugins_tags
ON public.plugins USING GIN(tags);

-- ============================================================================
-- PART 2: Fix plugin_versions table - add permissions column
-- ============================================================================

ALTER TABLE public.plugin_versions ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '[]'::jsonb;

-- Add CHECK constraint for version permissions
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'valid_version_permissions') THEN
    ALTER TABLE public.plugin_versions DROP CONSTRAINT valid_version_permissions;
  END IF;
END
$$;

ALTER TABLE public.plugin_versions ADD CONSTRAINT valid_version_permissions
  CHECK (permissions IS NULL OR jsonb_typeof(permissions) = 'array');

-- Create index for version permissions
CREATE INDEX IF NOT EXISTS idx_plugin_versions_permissions
ON public.plugin_versions USING GIN(permissions);

-- ============================================================================
-- PART 3: Create plugin_ratings table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.plugin_ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plugin_id TEXT REFERENCES public.plugins(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL,
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Each user can only rate a plugin once
  CONSTRAINT unique_user_plugin_rating UNIQUE(plugin_id, user_id),

  -- Rating must be 1-5
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5)
);

-- RLS for plugin_ratings
ALTER TABLE public.plugin_ratings ENABLE ROW LEVEL SECURITY;

-- Everyone can view ratings
CREATE POLICY IF NOT EXISTS "Ratings are viewable by everyone"
  ON public.plugin_ratings FOR SELECT
  USING (true);

-- Users can insert their own ratings
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create their own ratings') THEN
    CREATE POLICY "Users can create their own ratings"
      ON public.plugin_ratings FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

-- Users can update their own ratings
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own ratings') THEN
    CREATE POLICY "Users can update their own ratings"
      ON public.plugin_ratings FOR UPDATE
      USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Users can delete their own ratings
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete their own ratings') THEN
    CREATE POLICY "Users can delete their own ratings"
      ON public.plugin_ratings FOR DELETE
      USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Index for fast plugin rating lookups
CREATE INDEX IF NOT EXISTS idx_plugin_ratings_plugin
ON public.plugin_ratings(plugin_id);

CREATE INDEX IF NOT EXISTS idx_plugin_ratings_user
ON public.plugin_ratings(user_id);

-- ============================================================================
-- PART 4: Create plugin_questions table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.plugin_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plugin_id TEXT REFERENCES public.plugins(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  question TEXT NOT NULL,
  answer TEXT,
  answered_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  answered_at TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT true,
  upvotes INTEGER DEFAULT 0,

  -- Question must have content
  CONSTRAINT question_not_empty CHECK (char_length(question) > 0)
);

-- RLS for plugin_questions
ALTER TABLE public.plugin_questions ENABLE ROW LEVEL SECURITY;

-- Public questions viewable by everyone
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public questions are viewable by everyone') THEN
    CREATE POLICY "Public questions are viewable by everyone"
      ON public.plugin_questions FOR SELECT
      USING (is_public = true);
  END IF;
END
$$;

-- Users can see their own questions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own questions') THEN
    CREATE POLICY "Users can view their own questions"
      ON public.plugin_questions FOR SELECT
      USING (auth.uid() = user_id);
  END IF;
END
$$;

-- Users can create questions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create questions') THEN
    CREATE POLICY "Users can create questions"
      ON public.plugin_questions FOR INSERT
      WITH CHECK (auth.uid() = user_id);
  END IF;
END
$$;

-- Plugin publishers can answer questions
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Publishers can answer questions') THEN
    CREATE POLICY "Publishers can answer questions"
      ON public.plugin_questions FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM public.plugins p
          JOIN public.publishers pub ON p.publisher_id = pub.id
          WHERE p.id = plugin_id AND pub.owner_id = auth.uid()
        )
      );
  END IF;
END
$$;

-- Indexes for questions
CREATE INDEX IF NOT EXISTS idx_plugin_questions_plugin
ON public.plugin_questions(plugin_id);

CREATE INDEX IF NOT EXISTS idx_plugin_questions_user
ON public.plugin_questions(user_id);

CREATE INDEX IF NOT EXISTS idx_plugin_questions_answered
ON public.plugin_questions(answered_at)
WHERE answered_at IS NOT NULL;

-- ============================================================================
-- PART 5: Create function to update plugin rating aggregates
-- ============================================================================

CREATE OR REPLACE FUNCTION update_plugin_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Update the plugin's aggregate rating
  UPDATE public.plugins
  SET
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM public.plugin_ratings
      WHERE plugin_id = COALESCE(NEW.plugin_id, OLD.plugin_id)
    ),
    rating_count = (
      SELECT COUNT(*)
      FROM public.plugin_ratings
      WHERE plugin_id = COALESCE(NEW.plugin_id, OLD.plugin_id)
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.plugin_id, OLD.plugin_id);

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger for rating updates
DROP TRIGGER IF EXISTS trigger_update_plugin_rating ON public.plugin_ratings;

CREATE TRIGGER trigger_update_plugin_rating
AFTER INSERT OR UPDATE OR DELETE ON public.plugin_ratings
FOR EACH ROW
EXECUTE FUNCTION update_plugin_rating();

-- ============================================================================
-- PART 6: Add comments for documentation
-- ============================================================================

COMMENT ON COLUMN public.plugins.slug IS 'URL-friendly unique identifier for the plugin';
COMMENT ON COLUMN public.plugins.tags IS 'Array of category/tag strings for categorization';
COMMENT ON COLUMN public.plugins.permissions IS 'Array of permission strings required by this plugin (e.g., ["filesystem:read", "ui:notifications"])';
COMMENT ON COLUMN public.plugins.rating IS 'Average rating (1-5) calculated from plugin_ratings';
COMMENT ON COLUMN public.plugins.rating_count IS 'Number of ratings for this plugin';

COMMENT ON COLUMN public.plugin_versions.permissions IS 'Permissions for this specific version (allows tracking permission changes across versions)';

COMMENT ON TABLE public.plugin_ratings IS 'User ratings and reviews for plugins';
COMMENT ON TABLE public.plugin_questions IS 'Q&A for plugins, answerable by publishers';

-- ============================================================================
-- PART 7: Create permission audit table for tracking permission changes
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.plugin_permission_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  plugin_id TEXT REFERENCES public.plugins(id) ON DELETE CASCADE NOT NULL,
  version TEXT NOT NULL,
  old_permissions JSONB,
  new_permissions JSONB NOT NULL,
  changed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  changed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- RLS for permission history
ALTER TABLE public.plugin_permission_history ENABLE ROW LEVEL SECURITY;

-- Everyone can view permission history (transparency)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Permission history is viewable by everyone') THEN
    CREATE POLICY "Permission history is viewable by everyone"
      ON public.plugin_permission_history FOR SELECT
      USING (true);
  END IF;
END
$$;

-- Only publishers can insert (via API)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Publishers can log permission changes') THEN
    CREATE POLICY "Publishers can log permission changes"
      ON public.plugin_permission_history FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM public.plugins p
          JOIN public.publishers pub ON p.publisher_id = pub.id
          WHERE p.id = plugin_id AND pub.owner_id = auth.uid()
        )
      );
  END IF;
END
$$;

CREATE INDEX IF NOT EXISTS idx_permission_history_plugin
ON public.plugin_permission_history(plugin_id);

CREATE INDEX IF NOT EXISTS idx_permission_history_time
ON public.plugin_permission_history(changed_at DESC);

COMMENT ON TABLE public.plugin_permission_history IS 'Audit trail of permission changes for each plugin version';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
