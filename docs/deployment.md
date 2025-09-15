# Deployment Guide
This document describes how to deploy the Learning Platform Advanced project with Clerk authentication and configure environment variables.

---

## Deployment Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KDF25/nextjs-learning-platform.git
   cd learning-platform
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Copy the `.env` file template (or create a new `.env` file) in the project root.
   - Fill in all required secrets and connection strings (see [Environment Variables](#environment-variables) below).

4. **Run Database Setup**
   ```bash
   npm run prisma:push
   npm run prisma:generate
   ```

5. **Build the Project**
   ```bash
   npm run build
   ```

6. **Start the Application**
   ```bash
   npm start
   ```
   The app will be available at the URL specified in `NEXT_PUBLIC_APP_URL`.

---

## Environment Variables

All sensitive data and configuration are managed via the `.env` file in the project root.  
**Never commit your `.env` file to version control!**

| Variable Name                              | Description                                              |
|-------------------------------------------|----------------------------------------------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY         | Clerk publishable key for client-side authentication    |
| CLERK_SECRET_KEY                          | Clerk secret key for server-side operations             |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL             | URL path for sign-in page                               |
| NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL | Redirect URL after sign-in                        |
| NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL | Redirect URL after sign-up                        |
| DATABASE_URL                              | PostgreSQL connection string (used by Prisma)           |
| UPLOADTHING_TOKEN                         | Token for file uploads (UploadThing)                   |
| MUX_TOKEN_ID                              | Mux API token ID for video processing                  |
| MUX_TOKEN_SECRET                          | Mux API token secret                                    |
| STRIPE_SECRET_KEY                         | Stripe API secret key                                   |
| STRIPE_WEBHOOK_SECRET                     | Stripe webhook signing secret                           |
| NEXT_PUBLIC_APP_URL                       | Public URL of your deployed application                |

**Example `.env` configuration:**

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# File Upload
UPLOADTHING_TOKEN=your_uploadthing_token

# Video Processing
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret

# Payment Processing
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## Security Notes

- **Development Keys**: Current configuration uses test/development keys
- **Production Deployment**: Replace all test keys with production keys before deploying
- **Database Security**: Connection uses SSL mode for secure communication
- **Webhook Security**: Stripe webhook secret ensures request authenticity

---

## Production Considerations

- Replace test Stripe keys with live keys
- Update Clerk to production environment
- Use production database instance
- Configure proper CORS settings
- Set up monitoring and logging
- Enable HTTPS for all endpoints

---

## Notes

- **Production:**  
  - Always use secure, unique secrets and production database credentials.
  - Set `NEXT_PUBLIC_APP_URL` to your real production domain.
  - Ensure your database and all third-party services are accessible from your deployment environment.

- **PWA & HTTPS:**  
  - For PWA features and service workers to work, your app must be served over HTTPS (except on localhost).

- **Migrations:**  
  - Run migrations after each schema change to keep your database up to date.


## Useful Links

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Clerk Documentation](https://clerk.com/docs)
- [Prisma Deployment Guide](https://www.prisma.io/docs/guides/deployment)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [UploadThing Documentation](https://docs.uploadthing.com/)
- [Mux Documentation](https://docs.mux.com/)