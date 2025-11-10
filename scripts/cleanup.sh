#!/bin/bash
set -e
cd deploy
docker compose down --volumes --remove-orphans

echo "Environment torn down." 