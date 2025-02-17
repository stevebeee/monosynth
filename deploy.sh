#!/bin/bash

# Clean existing docs directory and create it fresh
rm -rf docs
mkdir -p docs

# Navigate to client directory
cd client

# Create production env file if it doesn't exist
echo "VITE_ENV=production" > .env.production

# Install dependencies if needed and build
npm install
npm run build

# Create GitHub Pages specific files
touch ../docs/.nojekyll
cp 404.html ../docs/404.html
echo "/* /index.html 200" > ../docs/_redirects

echo "Deploy files prepared in docs/ directory"
echo "Now you can:"
echo "1. git add docs"
echo "2. git commit -m 'Update GitHub Pages deployment'"
echo "3. git push"