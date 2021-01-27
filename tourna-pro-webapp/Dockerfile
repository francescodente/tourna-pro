# build stage
FROM node:12.2.0-alpine as build-stage

# Take API url as an image build argument and set it as an environment variable
# to be read by the 'npm run build' command
ARG API_URL_BASE
ENV VUE_APP_API_URL_BASE=${API_URL_BASE}

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the app sources with minification
COPY . .
RUN npm run build

# production stage
FROM nginx:1.19.6-alpine as production-stage

# Copy build output from build-stage image
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Serve application on port 80 of the container
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]