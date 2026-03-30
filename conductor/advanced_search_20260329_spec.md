# Specification: Advanced Search and Filters Implementation

---

## Overview
Implement a premium, high-performance search and filter system for LuxeEstate. This feature will allow users to refine property searches based on a wide range of luxury criteria, ensuring that the results are always in sync with the URL for a seamless, shareable experience.

## Functional Requirements
1.  **URL-Driven State (Source of Truth):**
    - All search parameters (`q`, `location`, `type`, `status`, `minPrice`, `maxPrice`, `beds`, `baths`, `amenities`) MUST be synchronized with the browser's `searchParams`.
    - Loading a URL with these parameters must pre-populate the filters and trigger the correct search.
2.  **Advanced Filtering Logic (Supabase):**
    - **Text Search:** Implement case-insensitive search (`ilike`) on both `title` and `address` fields.
    - **Property Types & Status:** Exact match filtering.
    - **Numeric Ranges:** Price range using numeric inputs (`minPrice`, `maxPrice`), and minimum counts for `beds` and `baths`.
    - **Amenities (Array):** Filter properties by checking if their `amenities` array contains all selected values (e.g., `Pool`, `Home Theater`, `Private Dock`, `Gourmet Kitchen`).
3.  **Refined UI/UX:**
    - **Sidebar + Mobile Drawer:** A persistent sidebar for filters on desktop that collapses into an accessible bottom drawer or side sheet on mobile.
    - **Interactive Components:** Use `@shadcn` for high-quality, accessible UI elements.
    - **Empty State:** A sophisticated "No results" screen featuring:
        - "Reset All Filters" CTA.
        - "Browse All Listings" suggestion.
        - "Contact an Agent" for personalized assistance.
4.  **Performance & Transitions:**
    - Implementation of Skeleton loaders in the results grid while fetching data or switching filters.
    - Efficient querying to avoid overfetching and ensuring fast sub-second response times.

## Non-Functional Requirements
- **Type Safety:** Full TypeScript integration with Supabase generated types.
- **Styling:** Strict adherence to Tailwind CSS 4.x and the project's premium color palette (Nordic Dark, Mosque, Clear Day).
- **Responsive Design:** Optimized layout for all screen sizes from mobile to ultra-wide desktop.

## Acceptance Criteria
- [ ] Users can filter by all specified criteria, and results update within 500ms.
- [ ] The URL reflects all active filters in real-time.
- [ ] Refreshing the page with a filtered URL preserves the search state.
- [ ] The "Clear Filters" action resets the UI and the URL to the default search state.
- [ ] The results grid displays correctly with high-resolution property cards.

## Out of Scope
- Persistent "Saved Searches" for logged-in users.
- Map-based search or radius-based location filtering.
