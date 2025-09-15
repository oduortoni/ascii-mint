# ---- backend (Go) ----
FROM golang:1.23 AS backend

WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN go build -o meme-api

# ---- frontend (Next.js) ----
FROM node:20 AS frontend

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ---- final Stage ----
FROM node:20-slim

WORKDIR /app

# Copy Go API
COPY --from=backend /app/meme-api ./meme-api

# Copy Next.js build
COPY --from=frontend /app/.next ./frontend/.next
COPY --from=frontend /app/public ./frontend/public
COPY --from=frontend /app/node_modules ./frontend/node_modules
COPY --from=frontend /app/package.json ./frontend/package.json
COPY --from=frontend /app/next.config.ts ./frontend/next.config.ts

# Create startup script
RUN echo '#!/bin/bash\n./meme-api &\ncd frontend && npm start' > start.sh && chmod +x start.sh

# Expose port
EXPOSE 9000

CMD ["./start.sh"]
