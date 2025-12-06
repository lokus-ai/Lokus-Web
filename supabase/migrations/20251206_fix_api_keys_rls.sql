-- Enable RLS on api_keys if not already enabled
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any to avoid conflicts
DROP POLICY IF EXISTS "Publishers can view their own keys" ON public.api_keys;
DROP POLICY IF EXISTS "Publishers can insert their own keys" ON public.api_keys;
DROP POLICY IF EXISTS "Publishers can delete their own keys" ON public.api_keys;

-- Policy for SELECT
CREATE POLICY "Publishers can view their own keys"
ON public.api_keys
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.publishers
    WHERE id = api_keys.publisher_id
    AND owner_id = auth.uid()
  )
);

-- Policy for INSERT
CREATE POLICY "Publishers can insert their own keys"
ON public.api_keys
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.publishers
    WHERE id = api_keys.publisher_id
    AND owner_id = auth.uid()
  )
);

-- Policy for DELETE
CREATE POLICY "Publishers can delete their own keys"
ON public.api_keys
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.publishers
    WHERE id = api_keys.publisher_id
    AND owner_id = auth.uid()
  )
);
