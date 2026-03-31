**Implementation Plan: Social Login and Registration Refactor**

**Phase 1: OAuth Infrastructure & Configuration**
- [ ] Task: Configure Supabase OAuth providers (Google and GitHub) in the Supabase Dashboard.
- [ ] Task: Add necessary environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, etc.) if not already present.
- [ ] Task: Write unit tests for `lib/auth.tsx` OAuth functions using Vitest.
- [ ] Task: Update `lib/auth.tsx` to include `signInWithGoogle` and `signInWithGitHub` helper functions.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: OAuth Infrastructure & Configuration' (Protocol in workflow.md)

**Phase 2: Visual Redesign (Auth Pages & Components)**
- [ ] Task: Create a placeholder test for the redesigned `LoginForm` and `SignupForm` using React Testing Library.
- [ ] Task: Refactor `components/LoginForm.tsx` and `components/SignupForm.tsx` to align with the PRD's high-fidelity design.
- [ ] Task: Redesign `app/auth/login/page.tsx` and `app/auth/signup/page.tsx` using Tailwind CSS 4 for premium visual quality.
- [ ] Task: Implement loading states and error feedback for both Social and Email/Password auth.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Visual Redesign (Auth Pages & Components)' (Protocol in workflow.md)

**Phase 3: Registration Data & Post-Auth Workflow**
- [ ] Task: Write a test case for the Profile Setup Flow redirection logic.
- [ ] Task: Implement the **Profile Setup Flow** (capturing Role, Phone Number, and Property Preferences) for first-time signups.
- [ ] Task: Update the `profiles` table schema (via a new migration if needed) to include the new data points.
- [ ] Task: Ensure the post-auth redirect correctly identifies new users vs. returning users.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Registration Data & Post-Auth Workflow' (Protocol in workflow.md)

**Phase 4: Integration & Quality Assurance**
- [ ] Task: Create integration tests to verify the complete end-to-end OAuth registration flow.
- [ ] Task: Perform a final visual audit against PRD resources (`screen.png` and `code.html`).
- [ ] Task: Optimize image assets and loading performance using `next/image`.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Integration & Quality Assurance' (Protocol in workflow.md)
