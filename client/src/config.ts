// Configuration for different environments
export const config = {
    // Base path for the application
    basePath: process.env.NODE_ENV === 'production' ? '/monosynth/' : '/',
    
    // Function to get the correct asset path
    getAssetPath: (path: string) => {
      const base = process.env.NODE_ENV === 'production' ? '/monosynth' : '';
      return `${base}${path}`;
    }
  };
  