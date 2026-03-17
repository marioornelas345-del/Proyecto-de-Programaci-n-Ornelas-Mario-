# General Coding Standards

## Project Structure
- **Next.js App Router**: Follow the Next.js 16 file conventions:
    - `app/layout.tsx`: Root layout.
    - `app/page.tsx`: Route entry points.
    - `app/loading.tsx` / `app/error.tsx`: Loading and error boundaries.
    - `app/api/...`: API route handlers (Route Handlers).
- **Component Colocation**: Keep components close to where they are used.
    - Shared components go in `components/`.
    - Feature-specific components can live inside the feature's directory (e.g., `app/dashboard/_components/`).

## Environment Variables
- **Secrets**: NEVER commit secrets or API keys. Use `.env.local` for local development.
- **Prefix**: Prefix public environment variables with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_API_URL`).
- **Validation**: Use strict validation (e.g., `zod`) for environment variables at startup.

## Git & Version Control
- **Conventional Commits**: Use descriptive commit messages (see Workflow).
- **Branching Strategy**:
    - `main`: Production-ready code.
    - `develop`: Integration branch (optional).
    - `feat/feature-name`: Feature branches.
    - `fix/bug-name`: Bug fix branches.
- **Pull Requests**:
    - Keep PRs small and focused.
    - Ensure CI checks pass before merging.
    - Request reviews from team members.

## Documentation
- **Comments**: Write self-documenting code. Use comments only to explain *why* something is done, not *what* (the code should say *what*).
- **JSDoc/TSDoc**: Use JSDoc/TSDoc for public APIs, exported functions, and complex algorithms.
- **README**: Maintain an up-to-date `README.md` with setup instructions and project overview.
