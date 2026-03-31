**Specification: Property Details High-Fidelity Refactor**

**1. Overview**
Refactor `app/property/[slug]/page.tsx` to implement a premium, high-fidelity property details screen. The implementation will use real data from Supabase and strictly adhere to the visual and structural guidance in `prd/resource/property_details_screen`.

**2. Functional Requirements**
- **Data Fetching:** Retrieve property details from Supabase using the dynamic `slug` parameter. Use `notFound()` if the property does not exist.
- **Modern Carousel Gallery:** Implement a sleek, full-width carousel for property images with a "View All Photos" action.
- **Premium Information Header:** Display the price, address, and key property attributes (beds, baths, sqft, type, status) with a clear, editorial-style hierarchy.
- **Detailed Content:** 
  - Render the property description with optimized typography for readability.
  - Display amenities in a structured grid layout with consistent iconography.
- **Location Block:** Implement a minimalist card for the address and location, providing a link to external maps if real-time map integration is unavailable.
- **Sticky Sidebar:** Build a persistent sidebar containing:
  - **Agent Profile:** Temporary fallback for agent information (photo, name, contact).
  - **Contact Form:** Integration of the existing `ContactForm` component.
  - **Quick Info Card:** A summary of the property's primary details for quick reference.

**3. Non-Functional Requirements**
- **Visual Fidelity:** 100% alignment with the design tokens and layout defined in `prd/resource/property_details_screen/code.html` and `screen.png`.
- **Performance:** Utilize `next/image` for image optimization and React Server Components (RSC) to minimize client-side JavaScript.
- **Responsiveness:** Ensure a seamless experience across mobile, tablet, and desktop devices, with the sidebar transitioning to the bottom on smaller screens.
- **Premium Aesthetic:** Use Tailwind CSS 4 to apply generous whitespace, refined shadows, and the project's specific color palette.

**4. Acceptance Criteria**
- The screen accurately reflects the PRD's premium visual design.
- All property data is correctly fetched and displayed from Supabase.
- The sidebar remains sticky during scroll on desktop.
- The gallery is interactive and supports multi-image browsing.
- No mock data is used for the property core attributes.

**5. Out of Scope**
- Real agent database relations (using a clearly encapsulated fallback).
- Full interactive map integration (using a minimalist link-based card instead).
