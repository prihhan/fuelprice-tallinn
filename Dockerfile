# Multi-stage build for production

# Stage 1: Build client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Build server
FROM node:18-alpine AS server-build
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate

# Stage 3: Production
FROM node:18-alpine
WORKDIR /app

# Copy server dependencies and code
COPY --from=server-build /app/node_modules ./node_modules
COPY --from=server-build /app/prisma ./prisma
COPY package*.json ./
COPY server ./server

# Copy built client
COPY --from=client-build /app/client/dist ./client/dist

# Expose port
EXPOSE 3001

# Start server
CMD ["npm", "start"]
