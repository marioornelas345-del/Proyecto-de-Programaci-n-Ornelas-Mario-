**Specification: Social Login and Registration Refactor**

**1. Overview**
Implement a premium authentication experience for LuxeEstate, integrating Social Login (Google and GitHub OAuth) using Supabase Auth. The goal is to provide a seamless registration and login flow that aligns with the "LuxeEstate" boutique design aesthetic and transitions new users into a personalized profile setup experience.

**2. Functional Requirements**
- **Social Authentication (OAuth):**
    - Integrate Google OAuth and GitHub OAuth using `supabase.auth.signInWithOAuth`.
    - Handle OAuth callbacks and redirects back to the application.
- **Enhanced Registration Flow:**
    - Extend the registration process to capture:
        - **User Role:** (e.g., Buyer, Seller, Agent).
        - **Phone Number:** For verification purposes.
        - **Property Preferences:** To personalize the discovery experience.
- **Post-Authentication Workflow:**
    - Direct new users (first-time signups) to a **Profile Setup Flow** to complete their details.
    - Ensure returning users are redirected to the main dashboard.
- **Visual Redesign:**
    - Update `app/auth/login/page.tsx` and `app/auth/signup/page.tsx` to match the high-fidelity design resources in `prd/resource/social_login_and_registration/`.
    - Redesign `components/LoginForm.tsx` and `components/SignupForm.tsx` for premium visual quality.

**3. Non-Functional Requirements**
- **Balanced Implementation:** Ensure both visual fidelity (premium look and feel) and technical robustness (error handling, secure redirects).
- **Performance:** Optimized loading states and smooth transitions using Next.js App Router and React 19.
- **Security:** Rigorous validation and handling of sensitive authentication data.

**4. Acceptance Criteria**
- Successful login and registration via Google and GitHub providers.
- New users are correctly prompted to complete the Profile Setup Flow.
- Collected metadata (Role, Phone, Preferences) is accurately saved in the `profiles` table.
- Visual and functional alignment with `social_login_and_registration` PRD.

**5. Out of Scope**
- Integration of additional social providers (e.g., LinkedIn, Apple).
- Implementing a full multi-factor authentication (MFA) system (if not already provided by Supabase).
- Modification of existing email/password logic unless required for OAuth compatibility.
