#!/bin/bash
set -e

echo "Starting setup..."

# 1. Environment Setup
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env
else
  echo ".env file already exists."
fi

# 2. Docker Setup
echo "Starting Docker containers..."
make docker-up

echo "Waiting for services to be ready..."
# Simple wait loop for the health endpoint
MAX_RETRIES=30
COUNT=0
while [ $COUNT -lt $MAX_RETRIES ]; do
  if curl -s http://localhost:9000/health > /dev/null; then
    echo "App is healthy!"
    break
  fi
  echo "Waiting for app (attempt $((COUNT+1))/$MAX_RETRIES)..."
  sleep 2
  COUNT=$((COUNT+1))
done

if [ $COUNT -eq $MAX_RETRIES ]; then
  echo "Error: App failed to become ready."
  exit 1
fi

# 3. Database Seeding
echo "Seeding database..."
# Run seed inside the container to use internal network
docker-compose exec app npm run seed

echo "Setup complete! You can access the services at:"
echo "   App: http://localhost:9000"
echo "   DB UI: http://localhost:8081"
