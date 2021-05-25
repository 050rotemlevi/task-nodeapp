# Set node:latest as the builder.
FROM node:latest as builder

# Setting the work diractory.
WORKDIR /usr/src/app

# Copy the relevant metadata for the project dependencies.
COPY package*.json ./

# Install required Node dependencies.
RUN npm install

# Copy source file from host to container.
COPY . .

# Expose the deafult port for Node.
EXPOSE 3000

# Commend line to run the application.
CMD ["npm", "start"]
