# deepfake-detection-ai/frontend/Dockerfile
# --- 1. Builder Stage ---
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    RUN corepack enable && corepack prepare pnpm@latest --activate
    
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    COPY . .
    
    # --- THIS IS THE CRITICAL MISSING SECTION ---
    # 1. Declare the build arguments we expect to receive from Docker Compose.
    ARG NEXT_PUBLIC_SUPABASE_URL
    ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
    ARG NEXT_PUBLIC_API_URL
    
    # 2. Set these as environment variables so `pnpm build` can access them.
    ENV NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
    ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
    # --- END OF CRITICAL SECTION ---
    
    # Build the Next.js application
    RUN pnpm build
    
    
    # --- 2. Runner Stage ---
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    RUN addgroup -S appgroup && adduser -S appuser -G appgroup
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    
    RUN chown -R appuser:appgroup /app
    USER appuser
    
    EXPOSE 3000
    ENV PORT 3000
    
    CMD ["node", "server.js"]