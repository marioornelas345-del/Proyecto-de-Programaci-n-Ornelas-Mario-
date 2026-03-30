# Specification: Admin User Directory

---

## Overview
Implement a premium, secure user management directory for LuxeEstate administrators. This interface will allow admins to view, search, and manage user roles and statuses with a focus on ease of use and professional aesthetics.

## Functional Requirements
1.  **Administrative Route:**
    - `app/admin/users/page.tsx`: The primary dashboard for managing users.
2.  **Role & User Management:**
    - **Database Column:** Add a `role` column (e.g., `Admin`, `Agent`, `Broker`) to the `public.profiles` table to store and query roles efficiently.
    - **Search:** Search users by name or email.
    - **Filter:** Tab-based filtering for user roles (`All`, `Admins`, `Agents`, `Brokers`).
    - **Actions:** Update user roles, change account status (Active/Pending/Suspended).
3.  **Metrics Header:**
    - Display key metrics: Total Users, Active Now, and Role Counts (e.g., 5 Admins, 12 Agents).
4.  **Add User Flow:**
    - **Direct Creation:** Administrators can create new accounts directly with a temporary password from the admin panel.
5.  **Access Control:**
    - **Middleware Protection:** The entire `/admin` route will be protected using Next.js Middleware to ensure only authorized admins can access the directory.
6.  **UI/UX (Premium):**
    - Responsive card-based grid layout using `@shadcn` components.
    - Consistent styling with LuxeEstate's premium color palette (Nordic Dark, Luxe Green, Mosque).

## Non-Functional Requirements
- **Security:** Ensure all database mutations are authorized and validated on the server.
- **Performance:** Efficient querying of `profiles` and `auth.users` tables.
- **Scalability:** The directory should handle hundreds of users gracefully with pagination.

## Acceptance Criteria
- [ ] Only users with the `Admin` role can access `/admin/users`.
- [ ] Admins can see a list of all users with their avatar, name, email, role, and status.
- [ ] Admins can create a new user account directly from the panel.
- [ ] Admins can change a user's role or suspend their account.
- [ ] Metrics are correctly calculated and displayed in the header.

## Out of Scope
- Detailed activity logs for each user (to be addressed in a future track).
- Bulk import of users via CSV.
