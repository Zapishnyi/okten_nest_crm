interface ImportMetaEnv {
  readonly VITE_BACK_BASE_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// declare module 'vite/client' {
//   interface ImportMeta {
//     env: {
//       [key: string]: string;
//     };
//   }
// }
