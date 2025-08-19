# Use an official Node.js runtime as a parent image
FROM node:24-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application's code
COPY . .

# Make port 8787 available to the world outside this container
EXPOSE 8787

# Run the app when the container launches
CMD ["npm", "run", "dev"]
