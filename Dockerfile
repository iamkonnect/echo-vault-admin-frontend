# Stage 1: Build React Admin Frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY index.html vite.config.js ./
COPY src ./src

# Build React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built React app to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
