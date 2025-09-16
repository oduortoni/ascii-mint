# Dockerfile.backend - Deploy this as your backend service on Render
FROM golang:1.24-alpine AS builder
WORKDIR /app

# Install git for go mod download
RUN apk add --no-cache git

# Copy go mod files and download dependencies
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy source code and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o meme-api .

# Final stage
FROM alpine:latest
WORKDIR /app

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Create non-root user
RUN adduser -D -s /bin/sh appuser

# Copy binary
COPY --from=builder /app/meme-api .
RUN chmod +x ./meme-api

# Switch to non-root user
USER appuser

# Expose port (Render will override with PORT env var)
EXPOSE 9000

# Render will set PORT environment variable
CMD ["./meme-api"]