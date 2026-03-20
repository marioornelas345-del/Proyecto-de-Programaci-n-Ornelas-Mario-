# Track Specification: Set up Supabase Database

## Objective
The goal of this track is to transition the LuxeEstate platform from mock JSON data to a production-ready **Supabase** backend. This includes setting up the database schema, migrating existing mock properties, and implementing real authentication.

## Scope
### In Scope
-   **Database Setup**: Initialize Supabase project and link it to the CLI.
-   **Schema Design**: Create `properties`, `users`, and `favorites` tables with appropriate types and relations.
-   **Data Migration**: Migrate mock properties from `data/properties.json` to the live Postgres database.
-   **Auth Integration**: Transition the mock `lib/auth.tsx` to use Supabase Auth.
-   **API Adaptation**: Update existing components (`FeaturedListings`, `PropertyPage`, `Dashboard`) to fetch data from Supabase instead of JSON.

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

## Key Deliverables
1.  Supabase migration files (`supabase/migrations/`).
2.  Updated `lib/auth.tsx` with Supabase integration.
3.  Updated data fetching logic in the App Router.
4.  Generated types in `types/database.ts`.

## Success Criteria
-   All 5 mock properties successfully migrated to the database.
-   Login and Signup flows are functional with real database persistence.
-   The application loads all data from the database with no regressions.
