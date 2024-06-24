# First stage
FROM node:22.2.0-alpine AS application

# Set the working directory
WORKDIR /app
COPY . .

# Install only production dependencies
RUN yarn && yarn build

# Expose the application port (adjust as necessary)
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

