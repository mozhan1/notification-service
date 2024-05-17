# Use node:20.12.2- LETS-alpine as the base image
FROM node:20.12.2-alpine AS builder

# Set environment variables
ENV NODE_ENV=development
ENV YARN_VERSION=4.1.1

# Enable Corepack and prepare Yarn at the specified version
RUN corepack enable && corepack prepare yarn@${YARN_VERSION}

# Install curl for health checks
RUN apk add --no-cache curl

# Switch to the 'node' user for added security
USER node
WORKDIR /home/node

# Copy package.json, yarn.lock, and other relevant files
COPY --chown=node:node package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY --chown=node:node . .

# Generate Prisma client and build the project
RUN npx prisma generate && yarn build

# Expose the port your app runs on
EXPOSE 3010

### DEPLOYMENT INSTRUCTIONS, FOR LOCAL TESTING USE CMD ["node", "build/src/main.js"]
# Copy the entrypoint script into the image
COPY --chown=node:node entrypoint.sh ./

# Make the entrypoint script executable
RUN chmod +x ./entrypoint.sh

# Set the entrypoint script to be executed
ENTRYPOINT ["./entrypoint.sh"]
