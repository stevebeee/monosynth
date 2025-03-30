#!/bin/bash

# Clean existing docs directory and create it fresh
rm -rf docs
mkdir -p docs

# Navigate to client directory
cd client

# Create production env file to ensure correct environment settings
echo "VITE_ENV=production" > .env.production

# Ensure files are in ESM format to fix build errors
if [ -f "postcss.config.js" ]; then
  if grep -q "module.exports" postcss.config.js; then
    echo "Converting postcss.config.js to ESM format..."
    sed -i 's/module.exports = {/export default {/' postcss.config.js
  fi
fi

if [ -f "tailwind.config.js" ]; then
  if grep -q "module.exports" tailwind.config.js; then
    echo "Converting tailwind.config.js to ESM format..."
    sed -i 's/module.exports = {/import tailwindcssAnimate from "tailwindcss-animate";\nimport tailwindcssTypography from "@tailwindcss\/typography";\n\nexport default {/' tailwind.config.js
    sed -i 's/plugins: \[require("tailwindcss-animate"), require("@tailwindcss\/typography")\],/plugins: [tailwindcssAnimate, tailwindcssTypography],/' tailwind.config.js
  fi
fi

# Install dependencies if needed and build
echo "Installing dependencies..."
npm install

echo "Building for production..."
npm run build

# Create GitHub Pages specific files
echo "Creating GitHub Pages special files..."
touch ../docs/.nojekyll
cp 404.html ../docs/404.html
echo "/* /index.html 200" > ../docs/_redirects

# Verify built files
echo "Built files in docs/:"
ls -la ../docs/
echo "Assets in docs/assets/:"
ls -la ../docs/assets/

# Fix paths in index.html to ensure correct asset loading
if [ -f "../docs/index.html" ]; then
  echo "Checking index.html for path issues..."
  # Ensure all asset paths have the correct base
  sed -i 's|src="/assets/|src="/monosynth/assets/|g' ../docs/index.html
  sed -i 's|href="/assets/|href="/monosynth/assets/|g' ../docs/index.html
  
  # Add force production mode script if not present
  if ! grep -q "window.env = { PROD: true }" ../docs/index.html; then
    echo "Adding production mode script..."
    sed -i '/<\/head>/ i \    <script>\n      // Force production mode\n      window.env = { PROD: true };\n    </script>' ../docs/index.html
  fi
fi

echo "Deploy files prepared in docs/ directory"
echo "Now you can:"
echo "1. git add docs"
echo "2. git commit -m 'Update GitHub Pages deployment'"
echo "3. git push"