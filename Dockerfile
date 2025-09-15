# ---- backend (Go) ----
FROM golang:1.22 AS backend

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
FROM debian:bookworm-slim

WORKDIR /app

# Copy Go API
COPY --from=backend /app/meme-api ./meme-api

# Copy Next.js output (static export)
COPY --from=frontend /app/.next ./frontend/.next
COPY --from=frontend /app/public ./frontend/public
COPY --from=frontend /app/node_modules ./frontend/node_modules
COPY --from=frontend /app/package.json ./frontend/package.json

# Install node for serving frontend
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Expose ports
EXPOSE 8080

CMD ./meme-api &
