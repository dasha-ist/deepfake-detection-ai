# deepfake-detection-ai/frontend/Dockerfile.frontend
# === Builder Stage ===
FROM node:20-alpine AS builder

WORKDIR /app

# Enable and install PNPM (as root)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml from the current directory (which is the frontend directory)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including devDependencies needed for build)
RUN pnpm install --frozen-lockfile

# Copy the rest of the frontend application code from the current directory
COPY . ./

# Build Next.js app
RUN pnpm build

# === Runner Stage ===
FROM node:20-alpine AS runner

# Create a non-root user and group for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Enable PNPM globally (as root) so the 'pnpm' command is available later for appuser
RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Create the /app directory and set its ownership AS ROOT ---
RUN mkdir -p /app && chown appuser:appgroup /app

# --- Set the WORKDIR. Now subsequent commands run here ---
WORKDIR /app

# Copy necessary files from the builder stage into /app
COPY --from=builder --chown=appuser:appgroup /app/.next ./.next
COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/package.json ./package.json
COPY --from=builder --chown=appuser:appgroup /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder --chown=appuser:appgroup /app/next.config.mjs ./next.config.mjs

# --- Switch to the non-root user ---
USER appuser

# Install only production dependencies using the globally available pnpm.
RUN pnpm install --prod --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the Next.js production server
CMD ["node_modules/.bin/next", "start"]
#
# Alternative CMD if your package.json has a "start": "next start" script:
# CMD ["pnpm", "run", "start"]