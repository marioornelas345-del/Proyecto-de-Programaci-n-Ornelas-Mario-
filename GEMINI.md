# LuxeEstate - Premium Real Estate Platform

## Project Overview
LuxeEstate is a high-end real estate platform built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS 4**. The project aims to provide a premium user experience for buying, renting, and selling properties.

### Key Technologies
- **Framework:** Next.js 16.1.7 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.x
- **Icons:** Material Icons & Material Symbols Outlined
- **Fonts:** Geist (Default) and Inter (Design reference)

## Directory Structure
- `app/`: Main application code, including routes, layouts, and components.
- `prd/resource/`: **Critical Reference Material.** Contains design specifications, reference HTML/CSS, and screenshots for various screens:
    - `home_discover_screen/`
    - `property_details_screen/`
    - `property_management_dashboard/`
    - `search_filters_screen/`
    - `add_edit_property_form/`
    - `admin_user_directory_cards/`
    - `social_login_and_registration/`
- `public/`: Static assets.
- `.agents/skills/`: Specialized AI agent skills for codebase management and development.

## Building and Running
| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server at `http://localhost:3000`. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint for code quality checks. |

## Design System (Inferred from PRD)
When implementing new components or pages, strictly adhere to the following design tokens found in `prd/resource/**/code.html`:

### Colors
- **Primary:** `#06f9d0`
- **Mosque (Active/Accent):** `#006655`
- **Background Light:** `#EEF6F6` (Clear Day)
- **Background Dark:** `#0f231f`
- **Nordic Dark (Text):** `#19322F`
- **Nordic Muted:** `#5C706D`

### Typography
- **Primary Font:** Inter
- **Display:** "Inter", sans-serif

### Components & Layout
- **Border Radius:** `DEFAULT: 0.5rem`, `lg: 1rem`, `xl: 1.5rem`
- **Shadows:** `soft` and `card` (as defined in Tailwind config in PRD resources)

## Development Conventions
1. **App Router:** Use Next.js App Router conventions (layouts, templates, loading, error states).
2. **Server Components:** Default to React Server Components (RSC) unless interactivity is required (`'use client'`).
3. **Tailwind CSS:** Use utility-first styling. Avoid custom CSS unless necessary (refer to `globals.css`).
4. **Icons:** Use Material Icons for UI elements as seen in the PRD resources.
5. **PRD Alignment:** Before implementing a feature, consult the corresponding folder in `prd/resource/` for visual and structural guidance.
