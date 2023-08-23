####################################
# First stage: build the react app #
####################################

# Use an official Node runtime as a build environment
# By naming this stage "build", we can later reference it in a later stage
FROM node:18 as build

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container at the current directory (/app)
COPY package*.json ./

# Install the React app's dependencies inside the container
RUN npm install

# Copy the rest of the application code into the container at the current directory (/app)
COPY . .

# Build the React app
RUN npm run build

####################################################
# Second stage: Use Nginx to serve the build files #
####################################################

# Use an official Nginx runtime as the parent image
FROM nginx:alpine

# Copy the build files from the build environment to the Nginx container
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the host
EXPOSE 80

# Start Nginx
# `daemon off` ensures that Nginx runs in the foreground instead of as a background
# process. This is important in a Docker container because Docker containers are designed
# to run a foreground process, and when this process ends, the container stops.
CMD ["nginx", "-g", "daemon off;"]
