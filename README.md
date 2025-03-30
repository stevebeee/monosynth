# Monosynth - Web Synthesizer

A powerful monophonic synthesizer web application that enables intuitive sound design through an interactive and responsive interface. This application is built to run entirely in the browser with no backend requirements.

## Deployment to GitHub Pages

1. Build the application using the deployment script:
   ```bash
   # Make the script executable
   chmod +x deploy.sh
   # Run the script
   ./deploy.sh
   ```

2. Push changes to GitHub:
   ```bash
   git add docs
   git commit -m "Update GitHub Pages deployment"
   git push
   ```

3. Configure GitHub Pages:
   - Go to your repository's Settings
   - Navigate to Pages section
   - Under "Source", select your main branch
   - Choose the `/docs` folder as the source
   - Click Save

4. Important Configuration Notes:
   - The application is configured to run at `/monosynth` base path
   - All assets and routes are automatically prefixed with this path in production
   - If you're seeing 404 errors or missing styles:
     - Ensure your repository is named "monosynth"
     - Check that GitHub Pages is properly configured
     - Verify all assets are being loaded from the correct base path
     - Check browser console for any path-related errors
     - Clear your browser cache and reload the page

5. Verify deployment:
   - Your site will be available at: `https://<your-username>.github.io/monosynth/`
   - Check that all assets are loading correctly in the browser's developer tools
   - Ensure the application routing works for all pages

## Local Development

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd monosynth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The development server will start on port 5000 by default.

## Key Technologies Used

- React with Vite for frontend development
- Web Audio API for advanced sound generation
- TailwindCSS for responsive design
- TypeScript for type-safe development
- GitHub Pages deployment with production optimization

## Project Structure

- `/client`: Contains the React application
  - `/src`: Source code
    - `/components`: UI components
    - `/pages`: Application pages
    - `/store`: Redux store configuration
    - `/hooks`: Custom React hooks
  - `/public`: Static assets
- `/docs`: Generated deployment files for GitHub Pages

## Troubleshooting Deployment Issues

If you encounter issues with the GitHub Pages deployment:

1. Ensure correct base path:
   - The application is configured to run at `/monosynth/` base path
   - Check `client/vite.config.ts` to verify the base path setting

2. CSS not loading:
   - Check browser console for path issues
   - Verify the deployed `index.html` references CSS with the correct path (`/monosynth/assets/...`)
   - Run the deployment script again to fix path issues

3. SPA routing issues:
   - Ensure `404.html` is properly copied to the docs folder
   - Verify the routing configuration in `App.tsx` is using the correct base path

4. For additional help, check GitHub Pages documentation or create an issue in the repository.