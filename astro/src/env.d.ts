/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'json-complete' {
  interface JsonComplete {
    encode: (value: any) => any;
    decode: (value: any) => any;
  }

  export = <JsonComplete>{};
}
