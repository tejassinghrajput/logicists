// Safely access environment variables
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return import.meta.env[key];
  } catch {
    return undefined;
  }
};

const routingEnv = getEnv('VITE_ENABLE_ROUTING');

// Logic:
// 1. If VITE_ENABLE_ROUTING is explicitly 'false', disable routing (use MemoryRouter).
// 2. If VITE_ENABLE_ROUTING is 'true' or undefined, enable routing (use BrowserRouter).
const isRoutingDisabled = String(routingEnv).toLowerCase() === 'false';

console.log('[App Config] Raw Env:', routingEnv);
console.log('[App Config] Routing Enabled:', !isRoutingDisabled);

export const APP_CONFIG = {
  // Controls whether the app syncs with the browser URL (History API)
  // or runs in "Memory Mode" (SPA behavior without URL changes).
  ENABLE_ROUTING: !isRoutingDisabled
};