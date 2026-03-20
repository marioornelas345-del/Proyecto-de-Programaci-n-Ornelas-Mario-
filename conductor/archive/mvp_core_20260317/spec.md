# Track Specification: Build MVP Core

## Objective
The primary objective of this track is to implement the core MVP features of LuxeEstate, enabling users to browse high-end property listings, view detailed information, and authenticate using a mock backend. This foundation will serve as the base for future enhancements.

## Scope
### In Scope
-   **Landing Page**: Hero section, featured listings, search bar.
-   **Property Details Page**: Dynamic route for property details, image gallery, specs, contact form.
-   **Authentication**: Basic login/signup UI with mock authentication logic.
-   **User Dashboard**: Simple dashboard to view favorite listings.
-   **Mock Data**: Local JSON data for properties and users.
-   **Styling**: Full implementation of the design system using Tailwind CSS 4.

### Out of Scope
-   Real backend integration (Supabase/Postgres).
-   Payment processing.
-   Advanced search filters (beyond basic keyword search).
-   Admin panel for property management.

## Technical Requirements
-   **Framework**: Next.js 16.1.7 (App Router).
-   **Rendering**: React Server Components (RSC) for listing pages; Client Components for interactive elements (search, auth forms).
-   **Styling**: Tailwind CSS 4.x with custom configuration for fonts and colors.
-   **State Management**: React Context/Hooks for auth state (simulated).
-   **Data Fetching**: Server-side data fetching from local JSON files.

## Detailed Features

### 1. Landing Page (`/`)
-   **Hero Section**: Full-width background image/video with overlay text and CTA.
-   **Search Bar**: Prominent search input with "Search" button.
-   **Featured Listings**: Grid of 3-6 high-quality property cards.

### 2. Property Details (`/property/[id]`)
-   **Gallery**: Carousel or grid of high-res images.
-   **Info**: Price, address, bed/bath count, square footage.
-   **Description**: Rich text description of the property.
-   **Contact Agent**: Form to inquire about the property.

### 3. Authentication (`/auth/login`, `/auth/signup`)
-   **Login Form**: Email/password fields.
-   **Signup Form**: Name, email, password fields.
-   **Mock Auth**: Simulate success/failure states and store session in local storage/cookie.

### 4. User Dashboard (`/dashboard`)
-   **Profile**: Display user name and email.
-   **Favorites**: List of saved properties.

## Success Criteria
-   All pages load in < 1.5 seconds.
-   UI matches the PRD design specifications (fonts, colors, spacing).
-   Responsive design works seamlessly on mobile and desktop.
-   Mock authentication flow works correctly (login -> dashboard).
