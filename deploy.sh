#!/bin/bash

# Clean existing docs directory
rm -rf docs

# Build the project
npm run build

# Create docs directory if it doesn't exist
mkdir -p docs

# Copy all build files to docs
cp -r dist/* docs/

# Create .nojekyll file
touch docs/.nojekyll

echo "Deploy files prepared in docs/ directory"
echo "Now you can:"
echo "1. git add docs"
echo "2. git commit -m 'Update GitHub Pages deployment'"
echo "3. git push"
