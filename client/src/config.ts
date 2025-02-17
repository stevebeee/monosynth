// Configuration for different environments
export const config = {
  // Base path for the application
  basePath: import.meta.env.PROD ? '/monosynth' : '',

  // Function to get the correct asset path
  getAssetPath: (path: string) => {
    const base = import.meta.env.PROD ? '/monosynth' : '';
    return `${base}${path}`;
  }
};
  