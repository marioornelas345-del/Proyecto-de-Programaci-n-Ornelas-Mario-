# Track Specification: Dynamic Home Screen Data Fetching (`fetch_home_data`)

## 1. Overview
Implement dynamic data integration from Supabase into the Home Screen (`app/page.tsx`). This replaces static/mock data in the "Featured Collections" and "New in Market" sections with live property listings, ensuring a premium, high-performance user experience.

## 2. Functional Requirements
- **Featured Collections Integration**:
    - Fetch 2 properties from the `properties` table.
    - **Logic**: Random selection performed on the server (SSR) at request time.
    - **UI**: Render each property using the `PropertyCard` component.
- **New in Market Integration**:
    - Fetch properties ordered by `created_at` in descending order.
    - **Pagination**: Implement a "Load More" button to fetch additional properties in batches of 8.
    - **Logic**: Server-side pagination via query parameters or a server action for subsequent pages.
- **Data Source**:
    - Strictly use the Supabase client (configured via `.env.local`).
    - No mock or hardcoded property data allowed in the final implementation.

## 3. Non-Functional Requirements
- **Performance**: Use React Server Components (RSC) for the initial data fetch to optimize SEO and Time to Interactive.
- **Image Optimization**: Use the `next/image` component with a defined Time-to-Live (TTL) and optimized `deviceSizes` to minimize bandwidth and latency.
- **UI/UX Excellence**: 
    - Adhere to the design reference at `prd/resource/home_discover_screen/screen.png`.
    - Use **Shadcn Skeleton** for loading states.
    - Use **Shadcn Toast** for error feedback during data fetching.
    - Use **Shadcn Pagination** elements (integrated with the 'Load More' logic where applicable).

## 4. Acceptance Criteria
- [ ] "Featured Collections" section displays 2 different random properties on every page refresh.
- [ ] "New in Market" section displays the first 8 properties on initial load.
- [ ] Clicking "Load More" correctly appends the next 8 properties to the list.
- [ ] All property data (titles, prices, images, etc.) is accurately pulled from the Supabase `properties` table.
- [ ] Images are cached and optimized via Next.js standard mechanisms.
- [ ] No layout shifts occur when loading additional properties (using Skeleton states).

## 5. Out of Scope
- Detailed property view pages (handled in other tracks).
- Advanced search filters (handled in other tracks).
- User favorites/authentication integration (handled in other tracks).
