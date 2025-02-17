## Create a production build
npm run build

## Create docs directory if it doesn't exist
mkdir -p docs

## Copy the contents of dist/public to docs folder
cp -r dist/public/* docs/

## Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch docs/.nojekyll

## Configure GitHub Pages:
   - Go to your repository's Settings
   - Navigate to Pages section
   - Under "Source", select your main branch
   - Choose the `/docs` folder as the source
   - Click Save

# Verify deployment:
   - Your site will be available at: `https://<your-username>.github.io/monosynth/`
   - Check that all assets are loading correctly in the browser's developer tools
   - Ensure the application routing works for all pages

## Common Issues

If you see 404 errors for assets:
1. Make sure all files were copied to the docs folder
2. Verify the .nojekyll file exists in the docs folder
3. Check that GitHub Pages is configured to serve from the docs folder
4. Clear your browser cache and reload the page

## Local Development

1. Clone the repository:
```
git clone [your-repository-url]
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```