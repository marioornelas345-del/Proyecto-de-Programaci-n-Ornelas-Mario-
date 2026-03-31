-- Extend profiles table with new data points for LuxeEstate
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Buyer',
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- Update RLS policies to allow users to update these new fields
-- (Existing policies might already cover this, but we'll ensure it)
DROP POLICY IF EXISTS "Allow users to update their own profiles" ON public.profiles;
CREATE POLICY "Allow users to update their own profiles" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);
