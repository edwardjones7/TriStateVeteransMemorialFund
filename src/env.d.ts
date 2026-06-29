/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_WEB3FORMS_KEY?: string;
  readonly PUBLIC_MAILERLITE_ACCOUNT?: string;
  readonly PUBLIC_MAILERLITE_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  /** Google Analytics 4 (gtag.js). Optional — undefined when analytics is disabled. */
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
}
