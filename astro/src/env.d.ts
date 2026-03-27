/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />

/* eslint-disable @typescript-eslint/no-explicit-any */

interface ImportMetaEnv {
  readonly PUBLIC_BASE_URL: string;
  readonly PUBLIC_AXIOM_TOKEN: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_KEY: string;
  readonly PRIVATE_SUPABASE_KEY: string;
  readonly API_SECRET: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_CLIENT_SECRET: string;
  readonly RESEND_API_KEY: string;
  readonly CONTACT_EMAIL_RECIPIENTS: string;
  readonly PRESS_EMAIL_RECIPIENTS: string;
  readonly CALLMEBOT_PHONE: string;
  readonly CALLMEBOT_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "json-complete" {
  interface JsonComplete {
    encode: (value: any) => any;
    decode: (value: any) => any;
  }
  export = <JsonComplete>{};
}

declare namespace App {
  interface Locals {
    user:
      | (import("better-auth").User & {
          email: string;
          id: number;
          isAdmin: boolean;
          isAthlete: boolean;
          image?: string;
        })
      | null;
    session: import("better-auth").Session | null;
  }
}
