// Add window interface extension for env property
declare global {
  interface Window {
    env?: {
      PROD?: boolean;
    };
  }
}


// Configuration for different environments
export const config = {
  // Base path for the application - use /monosynth for GitHub Pages, or / for development
  basePath: import.meta.env.DEV ? '/' : '/monosynth',

  // Function to get the correct asset path
  getAssetPath: (path: string) => {
    // Remove any leading slashes and combine with base
    const cleanPath = path.replace(/^\/+/, '');
    return import.meta.env.DEV 
      ? `/${cleanPath}` 
      : `/monosynth/${cleanPath}`;
  },

  // Function to get the correct route path
  getRoutePath: (path: string) => {
    // Remove any leading slashes and combine with base
    const cleanPath = path.replace(/^\/+/, '');
    return import.meta.env.DEV 
      ? `/${cleanPath}` 
      : `/monosynth/${cleanPath}`;
  },
  
  // Is the app running in production?
  isProduction: !import.meta.env.DEV || 
    (typeof window !== 'undefined' && window.env?.PROD === true)
};