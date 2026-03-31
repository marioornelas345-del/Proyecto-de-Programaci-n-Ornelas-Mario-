# Implementation Plan: Advanced Search and Filters

---

## Phase 1: Foundation & Data Fetching (Server-Side)
Implement the core filtering logic in the `app/search/page.tsx` server component to ensure data integrity and performance.

- [ ] Task: Refactor `SearchPage` for Full Parameter Support
    - [ ] Update `SearchPageProps` to include all relevant `searchParams`.
    - [ ] Refactor `supabase.from('properties').select()` to dynamically build filters based on all active parameters (`q`, `location`, `type`, `status`, `minPrice`, `maxPrice`, `beds`, `baths`, `amenities`).
    - [ ] Implement `ilike` search for both `title` and `address` fields simultaneously.
    - [ ] Add array-based filtering for `amenities` using `.contains()`.
- [ ] Task: Implement Skeleton State for Data Fetching
    - [ ] Create a `SearchSkeleton` component that mimics the results grid layout.
    - [ ] Integrate the skeleton in `app/search/page.tsx` using Next.js `loading.tsx` or a custom suspense boundary.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: UI Components & Client-Side Logic
Develop the interactive filter panel and specialized input components following the premium design system.

- [ ] Task: Build `SearchFiltersSidebar` Component
    - [ ] Implement a responsive layout: persistent sidebar for desktop, collapsible drawer/modal for mobile.
    - [ ] Use `@shadcn/ui` for high-quality interactions and accessibility.
    - [ ] Include section headers and clear separation between filter categories.
- [ ] Task: Create Specialized Filter Inputs
    - [ ] Implement `NumericPriceInput` for `minPrice` and `maxPrice` with validation.
    - [ ] Create `AmenitiesSelector` using a multi-select chip or checkbox grid based on the "Gourmet Kitchen", "Private Dock", etc., list.
    - [ ] Build a `BedsBathsSelector` with minimum value selection.
- [ ] Task: Implement 'Clear Filters' Functionality
    - [ ] Create a button to reset all active filters and the URL state to the default search.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Integration & State Synchronization
Connect the UI components to the URL state for seamless navigation and shareability.

- [ ] Task: URL Synchronization Logic
    - [ ] Develop a client-side hook or utility to update `searchParams` without a full page reload (using `router.push` or `replace` with `scroll: false`).
    - [ ] Ensure all filter inputs reflect the current state of the URL on initial load and navigation changes.
- [ ] Task: Premium Empty State Implementation
    - [ ] Design and build a visually sophisticated "No results found" section.
    - [ ] Integrate "Reset All Filters", "Browse All", and "Contact an Agent" call-to-actions.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Polish, Testing & Optimization
Finalize the feature with high-quality styling, thorough testing, and performance audits.

- [ ] Task: Styling & Responsive Audit
    - [ ] Ensure all components strictly adhere to the Tailwind 4.x design tokens (Nordic Dark, Mosque, etc.).
    - [ ] Verify sub-second response times for all filter combinations.
- [ ] Task: Integration & Unit Testing (TDD-Lite)
    - [ ] **Red**: Write failing Vitest cases for complex filter combinations (e.g., price range + specific amenities).
    - [ ] **Green**: Verify all tests pass with the final implementation.
    - [ ] **Refactor**: Optimize database queries and component rendering for maximum performance.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
