# HTML & CSS Style Guide

## HTML / JSX Structure
- **Semantic HTML**: Use semantic elements (`<header>`, `<main>`, `<article>`, `<footer>`, `<nav>`, `<aside>`) instead of generic `div`s whenever possible.
- **Accessibility**:
    - Always provide `alt` text for images.
    - Ensure form controls have associated `label` elements.
    - Use `role` and `aria-*` attributes only when native HTML elements cannot provide the semantic meaning.
- **Self-Closing Tags**: Use self-closing tags (`<img />`, `<br />`) for void elements.
- **Attribute Order**:
    1.  `key` / `ref` (React-specific)
    2.  `id` / `className`
    3.  Critical attributes (`src`, `href`, `type`)
    4.  Accessibility attributes (`alt`, `aria-*`)
    5.  Event handlers (`onClick`, `onChange`)

## Tailwind CSS
- **Utility-First**: Use Tailwind utility classes directly in `className` for styling.
- **Avoid Custom CSS**: Only write custom CSS in `globals.css` if absolutely necessary (e.g., complex animations, specific browser hacks, or integrating with legacy libraries).
- **Responsive Prefixes**: Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`) to build mobile-first designs. Start with base styles (mobile), then add breakpoints.
- **Grouping**: Group related utilities logically (e.g., layout -> spacing -> typography -> colors -> effects).
    - Example: `flex items-center justify-between p-4 text-lg font-bold text-gray-900 hover:text-blue-500`

## CSS Variables (Custom Properties)
- **Theme Config**: Define global theme values (colors, fonts, spacing) in `tailwind.config.ts` or `globals.css` using CSS variables (e.g., `--foreground-rgb`, `--background-start-rgb`).
- **Dynamic Values**: Use CSS variables for values that might change at runtime or based on user preference (e.g., dark mode toggles).

## Preprocessors
- **PostCSS**: This project uses PostCSS for processing Tailwind and autoprefixing. Avoid adding unnecessary plugins unless required.
