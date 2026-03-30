# Implementation Plan: Property Management Form (Add/Edit)

---

## Phase 1: Foundation (Schemas & Routes)
Set up the core data structure and navigation for the property management form.

- [ ] Task: Define Property Validation Schema with **Zod**
    - [ ] Create a shared schema for both client and server validation.
    - [ ] Include fields for `title`, `description`, `price`, `address`, `beds`, `baths`, `sqft`, `type`, `status`, `amenities`, `images`, `slug`.
- [ ] Task: Scaffold Creation and Edition Routes
    - [ ] Create `app/dashboard/properties/new/page.tsx`.
    - [ ] Create `app/dashboard/properties/[id]/edit/page.tsx`.
    - [ ] Add basic navigation links from the property management dashboard to these pages.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Form Component & Basic UI
Build the reusable form component with premium styling.

- [ ] Task: Create Reusable `PropertyForm` Component
    - [ ] Build the form using **React Hook Form** and **Zod** integration.
    - [ ] Implement input sections for basic info, technical details, and publication status.
    - [ ] Apply the editorial, high-end design system (Clear Day background, Nordic Dark text, Luxe Green accents).
- [ ] Task: Implement Specialized Input Controls
    - [ ] Build a custom multi-select selector for amenities.
    - [ ] Implement toggle switches for `is_featured`, `is_exclusive`, and `is_new_arrival`.
    - [ ] Integrate automatic slug generation based on the `title` field.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Logic & Data Integration
Connect the form to Supabase via Server Actions and dynamic data fetching.

- [ ] Task: Implement Property Mutations with Server Actions
    - [ ] Create a server action to insert new property records.
    - [ ] Create a server action to update existing property records.
    - [ ] Integrate error handling and toast notifications for success/failure.
- [ ] Task: Implement Dynamic Amenities & Pre-loading
    - [ ] Fetch unique amenity values from the database to populate the selector.
    - [ ] Implement server-side data fetching to pre-load property data in edit mode.
    - [ ] Set up the redirection flow back to the dashboard upon successful mutation.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Polish & Testing
Finalize the feature with thorough validation and premium styling.

- [ ] Task: Refine Media Management & Gallery
    - [ ] Build a simple interface for adding and reordering image URLs.
    - [ ] Add previsualizations for the images provided via URL.
- [ ] Task: Final Validation & Accessibility Audit
    - [ ] Verify form behavior across different screen sizes.
    - [ ] Conduct an accessibility check for keyboard navigation and screen readers.
    - [ ] Run a final set of tests for the mutation logic and redirection flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
