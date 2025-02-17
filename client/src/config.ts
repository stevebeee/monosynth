// Configuration for different environments
export const config = {
  // Base path for the application
  basePath: process.env.NODE_ENV === 'production' || import.meta.env.PROD ? '/monosynth' : '',

  // Function to get the correct asset path
  getAssetPath: (path: string) => {
    // In production, always use /monosynth base path
    const base = process.env.NODE_ENV === 'production' || import.meta.env.PROD ? '/monosynth' : '';
    // Remove any leading slashes and combine with base
    const cleanPath = path.replace(/^\/+/, '');
    return `${base}/${cleanPath}`;
  },

  // Function to get the correct route path
  getRoutePath: (path: string) => {
    // In production, always use /monosynth base path
    const base = process.env.NODE_ENV === 'production' || import.meta.env.PROD ? '/monosynth' : '';
    // Remove any leading slashes and combine with base
    const cleanPath = path.replace(/^\/+/, '');
    return `${base}/${cleanPath}`;
  }
};