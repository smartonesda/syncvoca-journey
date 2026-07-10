# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable

# Install dependencies (including devDependencies for building)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY . .

# Generate Prisma engine and compile TypeScript
RUN pnpm prisma generate
RUN pnpm build

# Prune devDependencies to keep only production node_modules
RUN pnpm prune --prod

# Stage 2: Production
FROM node:22-alpine AS production

WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

# Copy only the compiled dist folder, production node_modules, and Prisma schema from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./

# CRITICAL SECURITY: Switch to the built-in, unprivileged 'node' user
# NEVER run the production application as root to mitigate Remote Code Execution (RCE) escalation exploits
RUN chown -R node:node /app
USER node

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "dist/index.js"]
