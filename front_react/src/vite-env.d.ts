interface ImportMetaEnv {
  readonly VITE_BACK_BASE_URL: string;
  readonly VITE_DEV: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

