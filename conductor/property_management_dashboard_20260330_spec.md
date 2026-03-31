**Specification: Property Management Dashboard Refactor**

**1. Overview**
Refactor `app/dashboard/page.tsx` to implement a high-fidelity, professional property management dashboard. This track replaces the current client-side implementation with a server-side (RSC) approach, connected to Supabase, and aligned with the `property_management_dashboard` design system.

**2. Functional Requirements**
- **Authentication & Access:** 
  - Restrict access to authenticated users only.
  - Verify the user session on the server before rendering.
- **Data Fetching (Server-Side):**
  - Fetch user profile data from the `profiles` table.
  - Fetch only properties owned by the authenticated user from the `properties` table (filtered by `owner_id`).
- **Dashboard Layout:**
  - **Header:** Display user's profile information (name, avatar) and a summary of property metrics (Total, Active, etc.).
  - **Property Grid:** A visually appealing card-based grid of the user's properties.
  - **Property Details:** Each card should show the primary image, title, address, beds/baths/sqft, price, and current status.
- **Management Actions:**
  - **Add Property:** Navigation link to the "Add Property" form.
  - **Edit/Delete:** Contextual actions for each property.
  - **Deletions:** Implement a "Real Delete" with confirmation and a "Soft Delete/Archive" option.
- **UI States:**
  - **Loading:** Display professional skeleton loaders while data is being fetched.
  - **Empty State:** A premium "No Properties Found" illustration with a call-to-action to add the first listing.

**3. Non-Functional Requirements**
- **Architecture:** Transition to React Server Components (RSC) for data fetching.
- **Visual Design:** Strictly follow the `property_management_dashboard` resource tokens (colors, shadows, whitespace).
- **Performance:** Optimize images using `next/image` and minimize client-side bundle size.
- **Responsiveness:** Ensure a seamless dashboard experience on desktop, tablet, and mobile.

**4. Acceptance Criteria**
- The dashboard is fully populated with real data from Supabase.
- Only properties belonging to the logged-in user are visible.
- Actions (Edit, Delete) are correctly wired to their respective routes or logic.
- Visual fidelity matches the `screen.png` and `code.html` design resources.

**5. Out of Scope**
- Complex multi-agent permissions (handled in future tracks).
- Advanced analytics or historical tracking beyond basic property metrics.
