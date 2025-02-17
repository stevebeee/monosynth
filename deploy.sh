#!/bin/bash

# Clean existing docs directory
rm -rf docs

# Build the project
npm run build

# Create docs directory
mkdir -p docs

# Copy all build files to docs
cp -r dist/* docs/

# Create .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch docs/.nojekyll

# Create _redirects file for client-side routing
echo "/* /index.html 200" > docs/_redirects

# Create a copy of index.html as 404.html for client-side routing
cp docs/index.html docs/404.html

# Add CNAME file if you have a custom domain
# echo "your-domain.com" > docs/CNAME

echo "Deploy files prepared in docs/ directory"
echo "Now you can:"
echo "1. git add docs"
echo "2. git commit -m 'Update GitHub Pages deployment'"
echo "3. git push"