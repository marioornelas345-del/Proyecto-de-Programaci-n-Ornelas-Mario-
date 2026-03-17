# Project Workflow

## Overview
This document outlines the development workflow for the LuxeEstate project. It is designed to ensure code quality, consistency, and efficient collaboration.

## Phases
Development is organized into **Tracks**, which are broken down into **Phases**.
- **Plan**: Define the track's objectives, requirements, and technical approach.
- **Implementation**: Execute the plan in logical steps.
- **Review**: Validate the implementation against requirements.
- **Checkpoint**: Save the state of the project.

## Development Cycle (TDD-Lite)
For each task in a plan, follow this cycle:
1.  **Red**: Write a failing test case (or a placeholder test if full TDD is not applicable).
2.  **Green**: Write the minimal code to pass the test.
3.  **Refactor**: Improve the code quality without changing behavior.
4.  **Commit**: Commit the changes with a descriptive message.

## Commit Protocol
- **Frequency**: Commit after every completed task or significant logical unit.
- **Format**: Use [Conventional Commits](https://www.conventionalcommits.org/):
    - `feat: ...` for new features
    - `fix: ...` for bug fixes
    - `docs: ...` for documentation changes
    - `style: ...` for formatting changes
    - `refactor: ...` for code restructuring
    - `test: ...` for adding tests
    - `chore: ...` for maintenance tasks

## Testing Standards
- **Framework**: Jest / React Testing Library (or project default).
- **Coverage Goal**: >80% code coverage for critical paths.
- **Unit Tests**: Required for all utility functions and complex logic.
- **Integration Tests**: Required for API endpoints and critical user flows.

## Code Review
- **Self-Review**: Review your own code before marking a task as complete.
- **Automated Checks**: Ensure linting (`npm run lint`) and tests pass before committing.

## Phase Completion Verification
At the end of each phase, perform a "User Manual Verification":
1.  Review the phase objectives.
2.  Verify that all deliverables are met.
3.  Update documentation if necessary.
4.  Commit with a message like `chore(phase): complete phase <Phase Name>`.
