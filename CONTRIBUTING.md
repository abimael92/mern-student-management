# Contributing Guide – School Management System

Thank you for your interest in contributing to the School Management System. This document describes how to set up your environment, coding standards, and the pull request process.

---

## 1. Getting Started

### 1.1 Fork and Clone

1. Fork the repository on GitHub.
2. Clone your fork:

```bash
git clone https://github.com/<your-username>/school-management.git
cd school-management
```

### 1.2 Install Dependencies

From the project root:

```bash
npm run install-all
```

Or manually:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 1.3 Configure Environment

Create `.env` files from `.env.example`:

```bash
cp .env.example backend/.env
cp .env.example frontend/.env
```

Fill in:

- `MONGO_URI` (use a local or dev database).
- Dummy AWS credentials (or disable uploads in development).

### 1.4 Run Locally

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

---

## 2. Coding Standards

### 2.1 General

- Use **TypeScript-friendly** patterns when possible, even if the project is in JS (clear types, no implicit any patterns).
- Prefer **functional components** and hooks in React.
- Use **async/await** and `try/catch` or centralized error utilities for async code.

### 2.2 Backend

- Follow existing structure:
  - `models/` for Mongoose schemas.
  - `controllers/` for request handlers.
  - `routes/` for Express routers.
  - `middleware/` for cross-cutting concerns.
  - `utils/` for shared helpers.
- Do not access `req`/`res` from models or utilities.
- Always validate input using Joi schemas and `validate` middleware.
- Do not log secrets, tokens, or passwords.

### 2.3 Frontend

- Use:
  - `src/layouts` for per-role layouts.
  - `src/pages` for route-level components.
  - `src/components` for shared/presentational components.
  - `src/services` for API calls.
  - `src/store` (Redux Toolkit) for global state.
- Prefer MUI components with consistent styling and theme usage.
- Keep component logic small; break out hooks into `src/hooks` where needed.

### 2.4 Linting and Formatting

- Use ESLint and Prettier as configured.
- Before committing:

```bash
npm run lint
```

Fix issues or add pragmatic but minimal disables only when necessary.

---

## 3. Branching & Pull Requests

### 3.1 Branch Naming

- Feature branches:
  - `feature/<short-description>`
- Bug fix branches:
  - `fix/<short-description>`
- Hotfix branches:
  - `hotfix/<short-description>`

### 3.2 Commit Messages

- Use clear, descriptive messages:
  - `feat: add teacher attendance view`
  - `fix: correct JWT expiration handling`
  - `chore: update dependencies`

### 3.3 Pull Request Process

1. Pull the latest changes from `main`.
2. Rebase your branch if necessary.
3. Ensure:
   - Tests pass.
   - Linting passes.
   - No unused files or console logs remain (except deliberate debug in dev branches).
4. Open a PR with:
   - Clear title.
   - Description of changes (what/why).
   - Screenshots for UI changes when helpful.
5. Address code review feedback promptly.

---

## 4. Testing Requirements

Before submitting a PR:

- Backend:
  - Add or update unit tests for changed models/controllers.
  - Add API tests for new endpoints or behaviors.
- Frontend:
  - At minimum, manually test flows relevant to your change.
  - Add tests (Jest/RTL) for complex or critical components.

See `TESTING.md` for details on running tests and coverage.

---

## 5. Security & Privacy

- Never commit real credentials or secrets.
- Treat any user data as sensitive:
  - Avoid logging PII to console or logs.
  - Remove debugging endpoints before merging.
- If your change touches authentication, authorization, or data privacy:
  - Document it clearly.
  - Add tests that cover the new behavior.

Thank you for contributing! Your improvements help make this system more robust and useful for schools.***
