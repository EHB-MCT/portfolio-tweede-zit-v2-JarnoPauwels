# Use an official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy the built files from the previous stage to the nginx web server's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port on which the server will run
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
