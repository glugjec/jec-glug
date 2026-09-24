const isDefaultCreds = !import.meta.env.VITE_ADMIN_USERNAME || !import.meta.env.VITE_ADMIN_PASSWORD;

if (import.meta.env.DEV && isDefaultCreds) {
  console.warn('[JEC-GLUG Auth] Using default fallback admin credentials. Please define VITE_ADMIN_USERNAME and VITE_ADMIN_PASSWORD in .env');
}

const AUTH_CONFIG = {
  ADMIN_USERNAME: import.meta.env.VITE_ADMIN_USERNAME || 'defaultAdmin',
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'jecglug123'
};

export default AUTH_CONFIG;
