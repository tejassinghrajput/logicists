export const APP_CONFIG = {
  // Controls whether the app syncs with the browser URL (History API)
  // or runs in "Memory Mode" (SPA behavior without URL changes).
  // FORCED TO FALSE: This ensures MemoryRouter is used regardless of .env settings.
  ENABLE_ROUTING: false
};