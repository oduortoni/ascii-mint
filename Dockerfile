# ---- backend (Go) ----
FROM golang:1.23 AS backend

WORKDIR /app
COPY backend/go.mod ./
COPY backend/go.sum ./
RUN go mod download
COPY backend/ .
RUN go build -o meme-api

# ---- frontend (Next.js) ----
FROM node:20 AS frontend

WORKDIR /app
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
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
COPY --from=frontend /app/node_modules ./frontend/node_modules
COPY --from=frontend /app/package.json ./frontend/package.json
COPY --from=frontend /app/next.config.ts ./frontend/next.config.ts

# Copy public directory if it exists
COPY --from=frontend /app/public ./frontend/public/

# Create startup script
RUN <<EOF > start.sh
#!/bin/bash
./meme-api &
cd frontend && PORT=${NEXT_PORT:-3000} npm start
EOF
RUN chmod +x start.sh

# Expose ports
EXPOSE 9000
EXPOSE 3000

CMD ["./start.sh"]
