# Implementation Plan: Admin User Directory

---

## Phase 1: Database & Security
Establish the foundational data structure and security layer for administrative access.

- [ ] Task: Extend Database Schema
    - [ ] Create a migration to add `role` (enum or text) and `status` columns to `public.profiles`.
    - [ ] Seed the first `Admin` user to ensure access during development.
- [ ] Task: Implement Admin Middleware
    - [ ] Update `middleware.ts` to protect all routes under `/admin/*`.
    - [ ] Ensure only users with `role === 'admin'` in their `profiles` table can proceed; otherwise, redirect to `/dashboard`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: User Creation Flow
Develop the backend logic and initial UI for direct user creation.

- [ ] Task: Create Server Action for User Management
    - [ ] Implement a server action to create a new user account (using Supabase Auth Admin API).
    - [ ] Integrate Zod validation for `email`, `name`, and initial `role`.
- [ ] Task: Build "Add User" Dialog
    - [ ] Implement a `@shadcn` Dialog component with a form for direct user creation.
    - [ ] Add success/error toast notifications.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Directory UI & Metrics
Construct the main directory view with real-time metrics and filtering.

- [ ] Task: Implement Directory Metrics Header
    - [ ] Create a Server Component to fetch and display Total Users, Active Now, and Role Counts.
- [ ] Task: Build User Search & Tabs Filter
    - [ ] Implement a client component with a search input and `@shadcn` Tabs for role filtering.
    - [ ] Sync filter state with the URL for shareability.
- [ ] Task: Develop User Card Grid
    - [ ] Create a responsive grid of user cards displaying avatar, name, email, role, and status.
    - [ ] Implement pagination for large user lists.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: User Actions & Polish
Finalize the administrative controls and refine the overall experience.

- [ ] Task: Implement User Action Menu
    - [ ] Add a `@shadcn` DropdownMenu to each user card with actions: "Change Role", "Suspend User".
    - [ ] Create server actions for updating role and status in `public.profiles`.
- [ ] Task: Integration & Polish
    - [ ] Ensure all design tokens (Nordic Dark, Luxe Green) are correctly applied.
    - [ ] Final audit of error states and loading skeletons.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
