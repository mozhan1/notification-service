#!/bin/sh

# Use Node.js to URL-encode the DATABASE_PASSWORD
ENCODED_DATABASE_PASSWORD=$(node -e "console.log(encodeURIComponent(process.argv[1]))" "${DATABASE_PASSWORD}")

# Dynamically construct DATABASE_URL from environment variables provided by ECS task definition
export DATABASE_URL="postgresql://${DATABASE_USER}:${ENCODED_DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?schema=${DATABASE_SCHEMA}"

# Exit script in case of error
set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

#echo "Seeding the database..."
#yarn seed

echo "Starting the application..."
exec yarn start
