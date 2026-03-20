# Implementation Plan - Track: Set up Supabase Database

## Phase 1: Supabase Initialization & Project Config
- [ ] Task: Install Supabase CLI and project dependencies (`@supabase/supabase-js`).
- [ ] Task: Link the project to a live Supabase project.
- [ ] Task: Set up environment variables (`.env.local`) for Supabase URL and Anon Key.
- [ ] Task: Create `lib/supabase.ts` for the client instance.
- [ ] Task: Conductor - User Manual Verification 'Supabase Initialization' (Protocol in workflow.md)

## Phase 2: Schema Design & Database Setup
- [ ] Task: Design and create the database schema using SQL migrations.
    - [ ] Create `properties` table (id, title, price, address, beds, baths, sqft, description, images, amenities, isFeatured).
    - [ ] Create `profiles` table (id references auth.users, name).
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
- [ ] Task: Create a script to migrate data from `data/properties.json` to the Supabase `properties` table.
- [ ] Task: Update `FeaturedListings` and `PropertyPage` to fetch data from the database.
- [ ] Task: Implement basic search query using Supabase client in the App Router.
- [ ] Task: Conductor - User Manual Verification 'Data Migration' (Protocol in workflow.md)

## Phase 5: Verification & Cleanup
- [ ] Task: Run the test suite and update tests where necessary to account for asynchronous database calls.
- [ ] Task: Perform a manual end-to-end flow: Signup -> Login -> Browse Listings -> Property Detail.
- [ ] Task: Deprecate `data/properties.json` and remove mock auth logic.
- [ ] Task: Conductor - User Manual Verification 'Verification & Cleanup' (Protocol in workflow.md)
