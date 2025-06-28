# 🎓 Learning Platform

A modern platform for creating, managing, and exploring educational courses.
Teachers can easily structure content with chapters and attachments, while students can enroll, follow their learning progress, and access course materials through a clear and user-friendly interface.

---

## 🧰 Tech Stack

- **Framework:** Next.js (React)
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Clerk
- **Payments:** Stripe
- **Media Uploads:** UploadThing, Mux
- **Styling:** Tailwind CSS
- **Other Libraries:**
  - Zod (validation)
  - Axios (HTTP requests)
  - React Hook Form (forms)
  - Zustand (state management)

---

## 🏗️ Architecture

The project follows the **Feature-Sliced Design (FSD)** methodology:

- **🗂️ App:** Entry point, global providers, and router config
- **🧩 Features:** Standalone features with logic, UI, and services
- **🔧 Widgets:** Composite UI blocks built from entities and features
- **🖥️ Pages:** Pages registered in Next Router (`app/`)
- **🏷️ Entities:** Business domain logic and UI
- **🔗 Shared:** Common components, hooks, assets, API clients, utils
---

## 👤 Main Features

### 📝 Course Management
- Create, edit, and publish courses
- Organize content into chapters and lessons
- Attach files and media to lessons

### 🎓 Student Experience
- Browse and enroll in courses
- Track learning progress
- Access course materials and videos

### 💳 Payments & Access
- Secure Stripe integration for paid courses
- Webhook support for payment events

### 📦 Media & Attachments
- Upload and stream video lessons (Mux)
- Attach documents and files (UploadThing)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KDF25/nextjs-learning-platform.git
cd  nextjs-learning-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory with the following content:

```properties
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

DATABASE_URL=your_postgres_connection_string

UPLOADTHING_TOKEN=your_uploadthing_token

MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

**_Never commit your real secret keys to public repositories!_**

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

---

## 📁 Environment Variables

| Variable                              | Description                              |
|----------------------------------------|------------------------------------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`    | Clerk public key for authentication      |
| `CLERK_SECRET_KEY`                     | Clerk secret key                         |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL`        | Clerk sign-in URL                        |
| `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL` | Clerk sign-in fallback redirect URL |
| `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL` | Clerk sign-up fallback redirect URL |
| `DATABASE_URL`                         | PostgreSQL connection string             |
| `UPLOADTHING_TOKEN`                    | UploadThing API token                    |
| `MUX_TOKEN_ID`                         | Mux API token ID                         |
| `MUX_TOKEN_SECRET`                     | Mux API token secret                     |
| `STRIPE_SECRET_KEY`                    | Stripe secret key for payments           |
| `NEXT_PUBLIC_APP_URL`                  | Base URL of the application              |
| `STRIPE_WEBHOOK_SECRET`                | Stripe webhook secret                    |

---

© 2025 Learning Platform.