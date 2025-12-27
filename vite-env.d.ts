// Reference to vite/client removed to resolve missing type definition error.
// Types are manually defined below.

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_ENABLE_ROUTING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}