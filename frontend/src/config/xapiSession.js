const SESSION_KEY = 'xapi_session';
const SESSION_DURATION = 10 * 60 * 1000;

export const getStoredXapiSession = () => {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
};

export const getStoredXapiKey = () => getStoredXapiSession()?.key || '';

export const saveXapiSession = (key) => {
  const expiry = Date.now() + SESSION_DURATION;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ key, expiry }));
  return expiry;
};

export const clearXapiSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

export const isXapiSessionActive = () => {
  const session = getStoredXapiSession();
  return Boolean(session?.key && session?.expiry && Date.now() < session.expiry);
};

export const buildXapiHeaders = (xapiKey, includeMultipart = false) => {
  const key = xapiKey || getStoredXapiKey();

  if (!key) {
    throw new Error('X-API key is required');
  }

  return {
    'x-api-key': key,
    ...(includeMultipart ? { 'Content-Type': 'multipart/form-data' } : {})
  };
};
