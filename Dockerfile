# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package.json ./

# Install dependencies
RUN npm install -g expo-cli
RUN npm install --force

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 19000 for the Expo server
EXPOSE 19000

# Start the Expo server
CMD ["npm", "start"]
