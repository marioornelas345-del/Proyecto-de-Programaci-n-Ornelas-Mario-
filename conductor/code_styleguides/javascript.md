# JavaScript Style Guide

**Note:** This project primarily uses TypeScript. This guide applies to configuration files or legacy `.js` files if present.

## General
- **ESNext Features**: Use modern ESNext syntax (destructuring, spread, arrow functions, template literals).
- **Strict Mode**: Assume `'use strict'` behavior in modules (ESM).
- **Avoid Global Scope**: Encapsulate code in modules or functions.
- **Prefer `const`**: Use `const` for all variable declarations by default. Use `let` only if reassignment is necessary. Never use `var`.

## Naming Conventions
- **PascalCase**: Classes, React Components.
- **camelCase**: Variables, Functions, Properties, Object Keys.
- **UPPER_CASE**: Constants.
- **Boolean Prefixes**: Use `is`, `has`, `should`, or `can` for booleans (e.g., `isloading`, `hasError`).

## Functions
- **Arrow Functions**: Prefer arrow functions for callbacks and anonymous functions.
- **Default Parameters**: Use default parameters instead of manual checks inside the function body.
- **Pure Functions**: Strive for pure functions (deterministic output, no side effects) whenever possible.

## Objects & Arrays
- **Destructuring**: Use destructuring for extracting multiple properties.
- **Spread Operator**: Use the spread operator (`...`) for copying or merging objects/arrays instead of `Object.assign` or `concat`.
- **Property Shorthand**: Use property shorthand when key and value variable names match (e.g., `{ name, age }` instead of `{ name: name, age: age }`).

## Formatting
- **Prettier**: Use Prettier for consistent formatting (indentation, semicolons, quotes).
- **Trailing Commas**: Use trailing commas in multi-line object/array literals to reduce diff noise.
