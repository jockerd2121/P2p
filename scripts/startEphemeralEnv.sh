#!/bin/bash
set -e
cd deploy
# Build and start services
docker compose up -d --build

echo "Services started. Access the demo at http://localhost:8080"