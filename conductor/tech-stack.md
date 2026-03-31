# LuxeEstate Tech Stack

## Core Framework & Language
- **Next.js 16.1.7 (App Router)**: The project uses the latest Next.js App Router for routing, server components, and optimized performance.
- **TypeScript 5.x**: Ensures type safety and improves developer experience.
- **React 19.2.3**: Leverages the latest React features, including enhanced support for Server Components and Actions.

## Styling & Design System
- **Tailwind CSS 4.x**: Utility-first styling with the latest Tailwind 4.x features, including optimized build times and modern CSS capabilities.
- **PostCSS 8.x**: Used for processing Tailwind and other CSS utilities.
- **Geist & Inter Fonts**: Geist is used for the default UI, with Inter as a design reference for a premium, readable look.

## Icons & UI Elements
- **Material Symbols Outlined**: Used for UI icons to maintain a clean, professional appearance.
- **Material Icons**: Complementary icons for broader UI needs.

## Development & Tooling
- **ESLint 9.x**: For maintaining code quality and adhering to Next.js best practices.
- **Vitest 4.x**: For running unit and component tests with a fast, Vite-native experience.
- **React Testing Library**: For testing React components from the user's perspective.
- **Node.js 20+**: The required runtime environment for the project.

## Architecture
- **App Router (RSC-First)**: The project is architected around React Server Components (RSC) to minimize client-side JavaScript and maximize performance.
- **Component-Driven Development**: Building reusable UI components based on the design system defined in `prd/resource/`.

## Backend & Authentication
- **Supabase Auth**: Complete authentication system supporting Email/Password and OAuth (Google, GitHub) providers.
- **PostgreSQL (Supabase)**: Relational database with Row Level Security (RLS) for secure data isolation and elite performance.
- **Database Type Safety**: Automatic TypeScript type generation using the Supabase CLI for error-free development.
