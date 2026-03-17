# TypeScript Style Guide

## General
- **Use TypeScript strict mode**: Enabled by default in `tsconfig.json`.
- **Prefer interfaces**: Use `interface` over `type` for defining object shapes, unless specific type features (like unions or mapped types) are needed.
- **Explicit Return Types**: Explicitly define return types for all exported functions and complex internal functions.

## Naming Conventions
- **PascalCase**: Classes, Interfaces, Types, Enums, Components (React).
- **camelCase**: Variables, Functions, Methods, Properties.
- **UPPER_CASE**: Constants (only if truly constant and global).

## Type Safety
- **Avoid `any`**: Do not use `any`. Use `unknown` if the type is truly not known yet, or build a proper type definition.
- **Avoid non-null assertions (`!`)**: Handle null/undefined checks explicitly using optional chaining (`?.`) or nullish coalescing (`??`).
- **Use Discriminated Unions**: For complex state management or API responses, use discriminated unions to narrow types safely.

## React Specifics
- **Props Interface**: Define a `Props` interface for each component (e.g., `interface ButtonProps { ... }`).
- **Functional Components**: Use `React.FC` or explicitly type `props` and return type `JSX.Element`.
- **Hooks**: Custom hooks should start with `use`.

## Imports
- **Absolute Imports**: Prefer absolute imports (configured in `tsconfig.json` paths) over relative imports (e.g., `@/components/Button` vs `../../components/Button`).
- **Group Imports**: Group imports: external libraries first, then internal modules, then local files.

## async/await
- **Prefer async/await**: Use `async/await` over raw `.then()` chains for asynchronous operations.
- **Error Handling**: Always wrap async calls in `try/catch` blocks or handle rejections explicitly.
