# Specification: Property Management Form (Add/Edit)

---

## Overview
Implement a premium administrative interface for managing luxury property listings within the LuxeEstate backoffice. This feature includes both creation and editing capabilities, ensuring high-quality data entry with real-time validation and seamless integration with Supabase.

## Functional Requirements
1.  **Administrative Routes:**
    - `app/dashboard/properties/new/page.tsx`: Creation of new property listings.
    - `app/dashboard/properties/[id]/edit/page.tsx`: Modification of existing property listings with pre-loaded data.
2.  **Property Form Fields:**
    - **Basic Info:** `title`, `description` (simple rich text), and `slug` (auto-generated from title).
    - **Technical Details:** `price` (currency format), `address`, `beds`, `baths`, `sqft`, `type` (select), and `status` (select).
    - **Amenities Selector:** Multi-select interface (chips/tags) populated dynamically from existing database values.
    - **Media Management:** URL-based image inputs with a focus on simplicity and preparation for future storage integration.
    - **Publication Status:** Toggles for `is_featured`, `is_exclusive`, and `is_new_arrival`.
3.  **Data Persistence & Logic:**
    - **Server Actions:** Use idiomatic Next.js 16 Server Actions for database mutations.
    - **Validation:** Robust schema validation using **Zod** and **React Hook Form** for both client and server sides.
    - **Success Flow:** Redirect the user to the property management dashboard upon successful save.
4.  **Premium UI/UX:**
    - Adhere to the editorial, high-end design system (Clear Day background, Nordic Dark text, Luxe Green accents).
    - Provide clear validation feedback and error messaging.

## Non-Functional Requirements
- **Performance:** Optimized server actions and minimal client-side bundles.
- **Type Safety:** Strict TypeScript types shared between the form, validation schema, and database layer.
- **Accessibility:** ARIA-compliant form fields and clear labels for a professional backoffice experience.

## Acceptance Criteria
- [ ] Users can successfully create a new property listing that persists in the `properties` table.
- [ ] Users can edit an existing property, with all fields correctly pre-filled.
- [ ] The `slug` is automatically generated and validated to be unique.
- [ ] Forms provide immediate feedback for invalid inputs (e.g., missing title, negative price).
- [ ] After saving, the user is redirected to the dashboard list without errors.

## Out of Scope
- Direct file uploads to Supabase Storage (deferred to a future track).
- Advanced rich-text editor with image embedding.
- Complex map-based geolocation picker (address text input only for now).
