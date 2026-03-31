**Implementation Plan: Property Management Dashboard Refactor**

**Phase 1: Schema & Data Access**
- [ ] Task: Create a Supabase migration to add `owner_id` to the `properties` table (UUID referencing `auth.users.id`).
- [ ] Task: Update the `supabase.ts` types and library functions to reflect the schema changes.
- [ ] Task: Implement a server-side helper to fetch properties for a specific user.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Schema & Data Access' (Protocol in workflow.md)

**Phase 2: Server-Side Logic & Layout**
- [ ] Task: Refactor `app/dashboard/page.tsx` from a client component (`'use client'`) to a server component (RSC).
- [ ] Task: Implement server-side authentication check using `lib/auth.tsx`.
- [ ] Task: Fetch initial user data (profile) and filtered property list on the server.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Server-Side Logic & Layout' (Protocol in workflow.md)

**Phase 3: Dashboard UI Components**
- [ ] Task: Create a `DashboardHeader` component to display the user profile and metric summaries.
- [ ] Task: Create a `PropertyGrid` component for the user's property listings.
- [ ] Task: Implement a refined `DashboardPropertyCard` with the action menu (Edit, Delete, Archive).
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Dashboard UI Components' (Protocol in workflow.md)

**Phase 4: Management Actions & Interaction**
- [ ] Task: Implement a server action for "Real Delete" (removing property from database).
- [ ] Task: Implement a server action for "Soft Delete/Archive" (updating property status).
- [ ] Task: Implement a client-side confirmation modal for the delete actions.
- [ ] Task: Add navigation links for the "Add New Property" and "Edit" routes.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Management Actions & Interaction' (Protocol in workflow.md)

**Phase 5: UI States & Final Polishing**
- [ ] Task: Implement a high-fidelity `DashboardSkeleton` for the initial loading state.
- [ ] Task: Implement a premium "Empty State" illustration for users with no properties.
- [ ] Task: Perform a final visual audit against `screen.png` and `code.html` to ensure 100% design fidelity.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: UI States & Final Polishing' (Protocol in workflow.md)
