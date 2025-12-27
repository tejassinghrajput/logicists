// Safely access environment variables
const getEnv = (key: string) => {
  try {
    // @ts-ignore
    return import.meta.env[key];
  } catch {
    return undefined;
  }
};

const FORCE_MEMORY_MODE = false; 
const routingEnv = getEnv('VITE_ENABLE_ROUTING');
const apiEnv = getEnv('VITE_API_URL');

const isRoutingEnabled = !FORCE_MEMORY_MODE && String(routingEnv).toLowerCase() === 'true';

export const APP_CONFIG = {
  ENABLE_ROUTING: isRoutingEnabled,
  API_URL: apiEnv || '', // Leave empty to trigger mock mode in services
  IS_MOCK: !apiEnv
};