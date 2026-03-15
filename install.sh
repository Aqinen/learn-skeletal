#!/bin/bash

echo "Setting up Next.js project..."

# Fix npm permissions (you may need to enter your password)
echo "Fixing npm cache permissions..."
sudo chown -R $(whoami) ~/.npm

# Clean npm cache
echo "Cleaning npm cache..."
npm cache clean --force

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Setup complete! Run 'npm run dev' to start the development server."
