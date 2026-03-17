# LuxeEstate Product Guidelines

## Brand Voice & Content Strategy
LuxeEstate's voice is sophisticated, elite, and professional. It communicates with high-end buyers and sellers through:
- **High-End Professionalism**: Using refined, precise, and authoritative language that commands respect.
- **Curated Lifestyle Focus**: Evoking the dream and exclusivity of luxury living, focusing on experience rather than just features.
- **Elite Efficiency**: Providing clear, direct, and factual information that respects the time of busy high-profile individuals.

## UI/UX Principles
The interface must reflect the quality of the properties it showcases.
- **Minimalist Luxury UI**: Prioritize generous whitespace, large high-quality photography, and subtle typography. Avoid visual clutter and "noisy" UI patterns.
- **Immersive-First Interaction**: High-resolution imagery (4K) and video tours should be the centerpiece of every listing page.
- **Boutique Performance Design**: Ensure a smooth, high-performance experience with subtle, elegant animations that feel premium and intentional.

## Design System & Tokens
(Derived from Project Context)
### Colors
- **Primary**: `#06f9d0` (Luxe Mint)
- **Active/Accent (Mosque)**: `#006655`
- **Background Light**: `#EEF6F6` (Clear Day)
- **Background Dark**: `#0f231f` (Deep Forest)
- **Text (Nordic Dark)**: `#19322F`
- **Muted (Nordic Muted)**: `#5C706D`

### Typography
- **Primary Font**: Inter (Display and Body)
- **Scale**: Use a clear typographic hierarchy that emphasizes readability and elegance.

### Layout & Components
- **Border Radius**: Use `DEFAULT: 0.5rem`, `lg: 1rem`, `xl: 1.5rem` for a soft, modern feel.
- **Shadows**: Use `soft` and `card` shadows to create depth and hierarchy without harsh lines.
- **Premium Card Layouts**: Use card-based layouts with high-quality imagery and clean typography for listing cards and directory entries.
- **Elite Input Forms**: Design clean, high-performance forms with a focus on ease of use for complex data (e.g., add/edit property forms).
- **Advanced Luxury Filters**: Implement sophisticated filtering and sorting for luxury property amenities (infinity pools, home theaters, etc.).

## Technical & Performance Guidelines
- **App Router & RSC**: Use Next.js 16 App Router conventions. Default to React Server Components (RSC) for performance, using client components only when interactivity is required.
- **Tailwind CSS 4**: Use utility-first styling with Tailwind 4.x. Maintain consistency through common utility patterns.
- **Sub-Second Interaction Speed**: Optimize for ultra-fast, smooth performance. All interactions should feel instantaneous, even when handling heavy media.
- **Accessibility (WCAG Compliance)**: Ensure high contrast, readable typography, and full keyboard/screen reader support for all interactive elements.

## Development Conventions
1. **Material Symbols**: Use Material Symbols Outlined for UI icons.
2. **PRD Alignment**: Always refer to `prd/resource/` for visual and structural guidance before implementation.
3. **Component Modularity**: Build reusable, self-contained components that adhere to the established design tokens.
