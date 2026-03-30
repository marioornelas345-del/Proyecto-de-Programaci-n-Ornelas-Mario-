# Implementation Plan: Dynamic Home Screen Data Fetching (`fetch_home_data_20260327`)

## Phase 1: Foundation & Setup
- [x] **Task: Environment & UI Components Preparation** (Completed)
    - [x] Install Shadcn UI components: `pagination`, `skeleton`, and `toast`. (Done: Installed pagination, skeleton, and sonner)
    - [x] Verify Supabase client configuration and environment variables. (Verified: URL found, but ANON_KEY is missing in .env.local)
    - [x] Ensure TypeScript types for `properties` are up-to-date with the database schema. (Done: Updated manually)
- [ ] **Task: Conductor - User Manual Verification 'Foundation & Setup' (Protocol in workflow.md)**

## Phase 2: Featured Collections (Random SSR)
- [ ] **Task: Server-Side Random Fetching Logic**
    - [ ] Create a server action or utility function to fetch 2 random properties from Supabase.
    - [ ] Write a unit test to verify the randomization and data integrity.
- [ ] **Task: Featured Collections UI Integration**
    - [ ] Integrate the random fetch logic directly into the `Home` component (`app/page.tsx`).
    - [ ] Pass dynamic data to the `FeaturedListings` component.
    - [ ] Ensure `PropertyCard` handles dynamic property data correctly (including fallback states).
- [ ] **Task: Conductor - User Manual Verification 'Featured Collections' (Protocol in workflow.md)**

## Phase 3: New in Market (Pagination & 'Load More')
- [ ] **Task: Paginating Fetch Logic**
    - [ ] Create a server action for fetching properties in batches of 8, ordered by `created_at` DESC.
    - [ ] Write unit tests for the pagination logic (offsets and limit).
- [ ] **Task: 'Load More' Interactivity**
    - [ ] Develop a client-side `LoadMore` component using Shadcn elements.
    - [ ] Implement state management to append newly fetched properties to the existing list.
    - [ ] Integrate the initial batch fetch in `app/page.tsx` and the `LoadMore` component below the list.
- [ ] **Task: Conductor - User Manual Verification 'New in Market' (Protocol in workflow.md)**

## Phase 4: Optimization & Refinement
- [ ] **Task: Performance & Feedback Implementation**
    - [ ] Configure `next/image` in `PropertyCard` with an aggressive TTL and appropriate `deviceSizes`.
    - [ ] Add `Skeleton` loaders for the "New in Market" section during asynchronous "Load More" actions.
    - [ ] Implement `Toast` notifications for data-fetching error scenarios.
- [ ] **Task: Final Validation**
    - [ ] Run `npm run lint` and all unit tests to ensure no regressions.
    - [ ] Verify alignment with the design reference at `prd/resource/home_discover_screen/screen.png`.
- [ ] **Task: Conductor - User Manual Verification 'Optimization & Refinement' (Protocol in workflow.md)**

## Phase 5: Final Review & Checkpoint
- [ ] **Task: Documentation & Final Handover**
    - [ ] Update any relevant technical documentation or comments regarding the data-fetching strategy.
    - [ ] Conduct a final manual walkthrough of the Home Screen features.
- [ ] **Task: Conductor - User Manual Verification 'Final Review & Checkpoint' (Protocol in workflow.md)**
