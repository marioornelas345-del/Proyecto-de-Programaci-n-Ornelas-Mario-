# Implementation Plan - Track: Set up Supabase Database

## Phase 1: Supabase Initialization & Project Config
- [x] Task: Install Supabase CLI and project dependencies (`@supabase/supabase-js`).
- [x] Task: Link the project to a live Supabase project. (Completed: Project ref found in .temp)
- [x] Task: Set up environment variables (`.env.local`) for Supabase URL and Anon Key. (Completed: .env.local already exists)
- [x] Task: Create `lib/supabase.ts` for the client instance.
- [x] Task: Conductor - User Manual Verification 'Supabase Initialization' (Protocol in workflow.md)

## Phase 2: Schema Design & Database Setup
- [ ] Task: Design and create the database schema using SQL migrations.
    - [ ] Create `properties` table:
        -   Core: `id` (uuid), `title`, `description`, `price`, `address`.
        -   Specs: `beds`, `baths`, `sqft`.
        -   Media: `images` (text[] - min 5 per property).
        -   Features: `amenities` (text[]/jsonb), `geolocation` (jsonb/point).
        -   Status: `type` (e.g., Villa), `status` (Sale/Rent), `is_featured`, `is_exclusive`, `is_new_arrival`.
        -   SEO: `slug` (text, unique).
    - [ ] Create `profiles` table (id references auth.users, name, avatar_url).
    - [ ] Create `favorites` table (user_id, property_id).
- [ ] Task: Set up basic RLS (Row Level Security) policies.
- [ ] Task: Generate TypeScript types from the database schema.
- [ ] Task: Conductor - User Manual Verification 'Schema Design' (Protocol in workflow.md)

## Phase 3: Auth Integration (Transition from Mock)
- [ ] Task: Transition `lib/auth.tsx` to use Supabase Auth.
- [ ] Task: Update `LoginForm` and `SignupForm` for real authentication.
- [ ] Task: Update the Dashboard to fetch user profile data from the `profiles` table.
- [ ] Task: Conductor - User Manual Verification 'Auth Integration' (Protocol in workflow.md)

## Phase 4: Data Migration & API Adaptation
- [ ] Task: Create a robust seed script (`supabase/seed.ts`) to generate **30+ realistic properties**.
    -   Must include: High-quality Unsplash images (5+), realistic coords, amenities, slugs.
- [ ] Task: Update `FeaturedListings` to fetch featured/exclusive properties from DB.
- [ ] Task: Update `PropertyPage` to fetch data by `slug` instead of `id`.
- [ ] Task: Implement basic search query using Supabase client (filter by type, status, price).
- [ ] Task: Conductor - User Manual Verification 'Data Migration' (Protocol in workflow.md)

## Phase 5: Verification & Cleanup
- [ ] Task: Run the test suite and update tests where necessary to account for asynchronous database calls.
- [ ] Task: Perform a manual end-to-end flow: Signup -> Login -> Browse Listings -> Property Detail.
- [ ] Task: Deprecate `data/properties.json` and remove mock auth logic.
- [ ] Task: Conductor - User Manual Verification 'Verification & Cleanup' (Protocol in workflow.md)
