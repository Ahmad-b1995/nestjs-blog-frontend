# Build stage
FROM node:18-alpine as vite-app
WORKDIR /app

# # Define build arguments for environment variables
# ARG VITE_BASE_URL

# # Set environment variables during the build process
# ENV VITE_BASE_URL=$VITE_BASE_URL

COPY . .
RUN npm install
RUN npm run build

# Production stage
FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/

# Clean and set up new directory for production build
RUN rm -rf html
RUN mkdir html

# Configure nginx
COPY ./nginx.conf /etc/nginx
COPY --from=vite-app /app/dist /usr/share/nginx/html

# Copy and set permissions for the environment variable script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

ENTRYPOINT ["nginx", "-g", "daemon off;"]
