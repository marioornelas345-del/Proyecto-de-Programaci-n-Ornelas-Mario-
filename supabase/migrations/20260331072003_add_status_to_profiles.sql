-- Add status to profiles and update role logic
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Pending', 'Suspended'));

-- Optional: Add a comment to describe roles
COMMENT ON COLUMN public.profiles.role IS 'User roles: Buyer, Seller, Agent, Admin, Broker';
