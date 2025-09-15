# Dockerfile.frontend - Deploy this as your frontend service on Render
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code
COPY . .

# Set default API URL for production
ENV NEXT_PUBLIC_API_URL=https://ascii-mint-api.onrender.com

# Build the application
RUN npm run build

# Final stage
FROM node:20-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy config files
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public/

# Create start script that binds to 0.0.0.0 and uses Render's PORT
RUN echo '#!/bin/sh' > start.sh && \
    echo 'exec npm start -- --hostname 0.0.0.0 --port ${PORT:-3000}' >> start.sh && \
    chmod +x start.sh && \
    chown nextjs:nodejs start.sh

# Switch to non-root user
USER nextjs

# Render will set PORT environment variable
CMD ["./start.sh"]
