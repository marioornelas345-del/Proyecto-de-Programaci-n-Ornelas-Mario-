**Implementation Plan: Property Details High-Fidelity Refactor**

**Phase 1: Data Strategy & Core Logic**
- [ ] Task: Create or update unit tests for `app/property/[slug]/page.tsx` data fetching using Vitest.
- [ ] Task: Refactor the data fetching logic in `app/property/[slug]/page.tsx` to use Supabase and handle `notFound()` gracefully.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Data Strategy & Core Logic' (Protocol in workflow.md)

**Phase 2: Layout & Visual Foundations**
- [ ] Task: Implement the main editorial layout structure using Tailwind CSS 4, including the content area and sidebar grid.
- [ ] Task: Apply the project's premium color palette and spacing tokens to the page background and main containers.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Layout & Visual Foundations' (Protocol in workflow.md)

**Phase 3: Hero Image Gallery**
- [ ] Task: Implement the `ModernCarousel` image gallery component based on the approved specification.
- [ ] Task: Add the "View All Photos" UI element and its associated interactive behavior.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Hero Image Gallery' (Protocol in workflow.md)

**Phase 4: Property Information & Attributes**
- [ ] Task: Design and implement the information header (Price, Address, and property attribute badges).
- [ ] Task: Build the structured amenities grid with consistent icons and styling.
- [ ] Task: Implement the minimalist location card with an external link fallback for maps.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Property Information & Attributes' (Protocol in workflow.md)

**Phase 5: Sticky Interaction & Contact Integration**
- [ ] Task: Implement the sticky behavior for the sidebar on desktop screens.
- [ ] Task: Integrate the agent profile fallback, `ContactForm`, and Quick Info summary card into the sidebar.
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Sticky Interaction & Contact Integration' (Protocol in workflow.md)

**Phase 6: Quality Assurance & Optimization**
- [ ] Task: Conduct a visual audit against PRD resources (`screen.png` and `code.html`) to ensure 100% fidelity.
- [ ] Task: Optimize image loading and rendering performance using `next/image` and RSC.
- [ ] Task: Final verification of all interactive elements and responsive behavior.
- [ ] Task: Conductor - User Manual Verification 'Phase 6: Quality Assurance & Optimization' (Protocol in workflow.md)
