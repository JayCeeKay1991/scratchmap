/// <reference types="vite/client" />

declare module "vite/client" {
  // Declare types for HMR (`Hot Module Replacement`)
  interface ImportMetaVite {
    /**
     * Accept the HMR update for the current module.
     */
    accept(callback?: (mod: any) => void): void;

    /**
     * Accept the HMR update with dependencies.
     */
    accept(deps: ReadonlyArray<string>, callback: (mod: any) => void): void;

    /**
     * Invalidate the module, forcing reloading the whole page if the HMR update cannot be handled.
     */
    invalidate(): void;

    /**
     * Decline the HMR update for the current module.
     */
    decline(): void;

    /**
     * Get the URL for a static asset.
     * @param path Relative path to the public directory
     */
    asset(path: string): string;
  }

  // Extend the existing `ImportMeta` interface with Vite-specific properties
  interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly hot?: ImportMetaVite;
  }

  // Interface for `import.meta.env` variables
  interface ImportMetaEnv {
    readonly BASE_URL: string;
    readonly MODE: string;
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly VITE_CLOUDINARY_CONFIG: {
      cloud_name: string;
      api_key: string;
      api_secret: string;
    };
    readonly VITE_CLOUDINARY_CLOUDNAME: string;
    readonly VITE_SERVER: string;
    // More env variables can be added here, depending on your `.env` file
    // e.g., readonly VITE_SOME_API_KEY: string;
    [key: string]: string | boolean | undefined | {};
  }
}
