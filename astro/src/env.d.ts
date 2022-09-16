/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />
/* eslint-disable @typescript-eslint/no-explicit-any */

interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'json-complete' {
  interface JsonComplete {
    encode: (value: any) => any;
    decode: (value: any) => any;
  }
  export = <JsonComplete>{};
}

declare module 'jsonwebtoken' {
  interface JwtPayload {
    user: {
      readonly name: string;
      readonly email: string;
      readonly image: string;
    };
  }
}
