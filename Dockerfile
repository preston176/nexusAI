# syntax=docker.io/docker/dockerfile:1

FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Required dependencies for Bun and general tooling
RUN apk add --no-cache bash libc6-compat unzip curl

# Install Bun and make it available system-wide
RUN curl -fsSL https://bun.sh/install | bash && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun

WORKDIR /app

# Copy lock/package files before installing
COPY package.json bun.lock* yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the detected lockfile
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f bun.lock ]; then bun install; \
  elif [ -f package-lock.json ]; then npm i --legacy-peer-deps; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Build stage
FROM base AS builder

WORKDIR /app

# Copy Bun from deps stage and add it to PATH
COPY --from=deps /root/.bun /root/.bun
ENV PATH="/root/.bun/bin:$PATH"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application using the correct package manager
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f bun.lock ]; then bun run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production runner stage
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Standalone optimized output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
