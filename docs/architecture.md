# Project Technical Architecture

## Framework and Core Technologies

- **Framework:** Next.js (App Router, React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, CSS
- **State Management:** Zustand
- **API:** RESTful endpoints, Next.js API routes
- **ORM/DB:** Prisma (see `shared/database/prisma`)

---

## Project Architecture

The project follows the **Feature-Sliced Design (FSD)** methodology, which organizes code by features and layers for scalability and maintainability.

- **app/** — Application entry, routing, layouts, providers, and API endpoints.
- **entities/** — Business entities (course, chapter, attachment, etc.) with their logic, API, hooks, and UI.
- **features/** — Isolated user scenarios (e.g., add-new-chapter, sign-in) composed from entities.
- **shared/** — Reusable code: UI components, hooks, config, database, utilities, styles.
- **widgets/** — Composite UI blocks, aggregating features/entities for specific pages.
- **page/** — Page-level components and logic, organized by user role and route.

---

## Navigation and Routing

- **Routing:** Next.js App Router (`app/` directory)
- **Dynamic Routes:** Supported via `[param]` folders (e.g., `[locale]`, `[slug]`)
- **Nested Layouts:** Used for role-based and locale-based layouts
- **API Routes:** Located in `app/api/`

---

## State Management & API

- **Local State:** Managed via React hooks and context
- **Server State:** Fetched via React Query, SWR, or custom hooks (see `entities/*/hooks`)
- **API Communication:** RESTful endpoints, Next.js API routes, and server actions
- **Authentication:** Handled via API endpoints and middleware

---

## Forms and Validation

- **Forms:** Built with React and controlled components
- **Validation:** Typically handled with libraries like Zod or Yup (check `features/*` and `entities/*/ui`)
- **Form Libraries:** May use React Hook Form or similar for complex forms

---

## SSR / SSG / CSR

- **SSR (Server-Side Rendering):** Used for dynamic pages and authentication
- **SSG (Static Site Generation):** Used for public/static pages (where possible)
- **CSR (Client-Side Rendering):** Used for interactive features and dashboards

---

## Data Storage and Caching

- **Database:** PostgreSQL (via Prisma ORM)
- **Caching:** React Query/SWR for client-side cache; Next.js built-in caching for SSR/SSG
- **Local Storage:** Used for persisting user preferences (e.g., theme, language)
- **Session Management:** Via cookies or JWT (see `middleware.ts` and API routes)

---

## Useful Links

- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma ORM](https://www.prisma.io/docs)