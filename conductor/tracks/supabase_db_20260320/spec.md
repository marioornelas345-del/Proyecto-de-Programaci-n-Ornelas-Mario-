# Track Specification: Set up Supabase Database

## Objective
The goal of this track is to transition the LuxeEstate platform from mock JSON data to a production-ready **Supabase** backend. This includes setting up the database schema, migrating existing mock properties, and implementing real authentication.

## Scope
### In Scope
-   **Database Setup**: Initialize Supabase project and link it to the CLI. (Note: `.env.local` already exists with necessary environment variables).
-   **Schema Design**: Create `properties`, `users`, and `favorites` tables. The `properties` schema must support:
    -   **Multiple Images**: Array of image URLs (min 5 per property).
    -   **Geolocation**: Latitude/Longitude data for map integration.
    -   **Amenities**: List of property features (e.g., Pool, Smart Home).
    -   **SEO Friendly**: `slug` column for pretty URLs.
-   **Seed Data**: Generate and seed at least **30 realistic properties** with:
    -   High-quality random Unsplash images (5+ per property).
    -   Realistic addresses and geolocations.
    -   Varied ssamenities, types (Villa, Apartment), and statuses (Sale/Rent).
-   **Auth Integration**: Transition the mock `lib/auth.tsx` to use Supabase Auth.
-   **API Adaptation**: Update components to fetch data from Supabase.
    -   Implement **SLUG-based navigation** for property details.

### Out of Scope
-   Advanced RLS (Row Level Security) beyond basic protection.
-   Image upload functionality (Storage).
-   Real-time subscriptions.
-   External social login providers (OAuth).

## Technical Requirements
-   **Database**: Postgres (managed by Supabase).
-   **Auth**: Supabase Auth (Email/Password).
-   **Library**: `@supabase/supabase-js`.
-   **Type Safety**: Generate TypeScript types from the database schema.
-   **Navigation**: Dynamic routes using `[slug]` instead of `[id]`.

## Key Deliverables
1.  Supabase migration files (`supabase/migrations/`).
2.  **Seed Script**: `supabase/seed.ts` (or SQL) to populate 30+ properties.
3.  Updated `lib/auth.tsx` with Supabase integration.
4.  Updated data fetching logic in the App Router (using slugs).
5.  Generated types in `types/database.ts`.

## Success Criteria
-   Database populated with **30+ realistic properties**, each having 5+ images and geolocation data.
-   Property Details page accessible via friendly URL (e.g., `/property/glass-pavilion-beverly-hills`).
-   Login and Signup flows are functional with real database persistence.
-   The application loads all data from the database with no regressions.
