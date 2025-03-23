# Use official Node.js image
FROM node:18-alpine
 
# Set the working directory inside the container
WORKDIR /app
 
# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install
 
# Copy all the application files
COPY . .
 
# Expose port 8080
EXPOSE 8080
 
# Start the application
CMD ["node", "index.js"]