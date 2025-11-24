# Multi-stage build for Lokus Website (Next.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . ./

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
