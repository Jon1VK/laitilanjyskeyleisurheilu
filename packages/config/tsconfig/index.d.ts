interface ImportMeta {
  readonly env: {
    readonly NODE_ENV: "development" | "production";
    readonly DEV: boolean;
    readonly PROD: boolean;
    readonly SSR: boolean;
    readonly MODE: string;
    readonly BASE_URL: string;
    readonly PUBLIC_BASE_URL: string;
    readonly PUBLIC_AXIOM_TOKEN: string;
    readonly PUBLIC_SUPABASE_URL: string;
    readonly PUBLIC_SUPABASE_KEY: string;
    readonly PRIVATE_SUPABASE_KEY?: string;
    readonly API_SECRET: string;
    readonly GOOGLE_CLIENT_ID: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly SENDGRID_API_KEY: string;
    readonly CONTACT_EMAIL_RECIPIENTS: string;
    readonly PRESS_EMAIL_RECIPIENTS: string;
    readonly CALLMEBOT_PHONE: string;
    readonly CALLMEBOT_API_KEY: string;
  };
}

declare module "json-complete" {
  interface JsonComplete {
    encode: (value: unknown) => unknown;
    decode: (value: unknown) => unknown;
  }
  export = {} as JsonComplete;
}
