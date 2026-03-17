# Implementation Plan - Track: Build MVP Core

## Phase 1: Project Setup & Design System
- [ ] Task: Initialize Project Structure & Configuration
    - [ ] Create `components/`, `lib/`, `types/`, `data/` directories.
    - [ ] Configure `tailwind.config.ts` with custom colors (`Luxe Mint`, `Mosque`) and fonts (`Geist`, `Inter`).
    - [ ] Create `data/properties.json` with realistic mock data for at least 5 luxury properties.
- [ ] Task: Base UI Components (Atoms)
    - [ ] Create `Button` component (variants: primary, outline, ghost).
    - [ ] Create `Input` component (text, password, search).
    - [ ] Create `Card` component (base container style).
- [ ] Task: Conductor - User Manual Verification 'Project Setup & Design System' (Protocol in workflow.md)

## Phase 2: Landing Page Implementation
- [ ] Task: Hero Section
    - [ ] Write Test: Verify Hero renders with title, subtitle, and CTA.
    - [ ] Implement `Hero` component with background image/video support.
- [ ] Task: Featured Listings Grid
    - [ ] Write Test: Verify it renders a list of property cards.
    - [ ] Implement `FeaturedListings` component fetching data from `data/properties.json`.
- [ ] Task: Search Functionality (Client Component)
    - [ ] Write Test: Verify input accepts text and triggers search action.
    - [ ] Implement `SearchBar` component.
- [ ] Task: Compose Landing Page
    - [ ] Assemble `app/page.tsx` with Hero, Search, and Featured Listings.
- [ ] Task: Conductor - User Manual Verification 'Landing Page Implementation' (Protocol in workflow.md)

## Phase 3: Property Details Page
- [ ] Task: Dynamic Route Setup
    - [ ] Create `app/property/[id]/page.tsx` and `layout.tsx`.
    - [ ] Implement `generateStaticParams` (optional for SSG) or dynamic fetching logic.
- [ ] Task: Image Gallery Component
    - [ ] Write Test: Verify gallery renders main image and thumbnails.
    - [ ] Implement `ImageGallery` component.
- [ ] Task: Property Details Layout
    - [ ] Write Test: Verify all property details (price, address, specs) are displayed.
    - [ ] Implement the details view with description and specs list.
- [ ] Task: Contact Agent Form
    - [ ] Write Test: Verify form validation and submission.
    - [ ] Implement `ContactForm` component (logs to console on submit).
- [ ] Task: Conductor - User Manual Verification 'Property Details Page' (Protocol in workflow.md)

## Phase 4: Authentication & Dashboard
- [ ] Task: Mock Authentication Logic
    - [ ] Create `lib/auth.ts` (or context) to manage mock session state.
    - [ ] Implement `login`, `logout`, and `signup` functions (simulated delay).
- [ ] Task: Auth Forms
    - [ ] Write Test: Verify login form submission handling.
    - [ ] Implement `LoginForm` and `SignupForm` components.
- [ ] Task: User Dashboard
    - [ ] Create `app/dashboard/page.tsx`.
    - [ ] Implement protected route logic (redirect if not logged in).
    - [ ] Display user profile and mock "Saved Properties".
- [ ] Task: Conductor - User Manual Verification 'Authentication & Dashboard' (Protocol in workflow.md)

## Phase 5: Verification & Polish
- [ ] Task: End-to-End Walkthrough
    - [ ] Manually verify the full user flow: Landing -> Search -> Details -> Contact -> Login -> Dashboard.
- [ ] Task: Performance Optimization
    - [ ] Run Lighthouse audit on Landing and Details pages.
    - [ ] Optimize images (use `next/image`) and fix layout shifts (CLS).
- [ ] Task: Final Code Review
    - [ ] Ensure all code adheres to `conductor/code_styleguides/`.
    - [ ] Verify test coverage meets the >80% goal.
- [ ] Task: Conductor - User Manual Verification 'Verification & Polish' (Protocol in workflow.md)
