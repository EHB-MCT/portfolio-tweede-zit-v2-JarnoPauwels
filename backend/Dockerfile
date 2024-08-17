# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt to ensure it's built for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Expose the port the app runs on (you can change this if needed)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
