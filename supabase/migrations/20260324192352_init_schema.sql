-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    address TEXT NOT NULL,
    beds INTEGER,
    baths NUMERIC,
    sqft INTEGER,
    images TEXT[] DEFAULT '{}',
    amenities TEXT[] DEFAULT '{}',
    geolocation JSONB,
    type TEXT,
    status TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    is_exclusive BOOLEAN DEFAULT FALSE,
    is_new_arrival BOOLEAN DEFAULT FALSE,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS public.favorites (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    PRIMARY KEY (user_id, property_id)
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- Set up RLS policies (Basic)
-- Properties: Anyone can read
CREATE POLICY "Allow public read access to properties" ON public.properties
    FOR SELECT USING (true);

-- Profiles: Users can read all, but only edit their own
CREATE POLICY "Allow public read access to profiles" ON public.profiles
    FOR SELECT USING (true);
CREATE POLICY "Allow users to update their own profiles" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Favorites: Users can only see and manage their own favorites
CREATE POLICY "Allow users to manage their own favorites" ON public.favorites
    FOR ALL USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_properties_updated_at
    BEFORE UPDATE ON public.properties
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();
