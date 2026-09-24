import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredXapiSession,
  getStoredXapiKey,
  saveXapiSession,
  clearXapiSession,
  isXapiSessionActive,
  buildXapiHeaders
} from './xapiSession';

describe('xapiSession utility', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('saves session and retrieves stored key', () => {
    saveXapiSession('test-api-key-123');
    expect(getStoredXapiKey()).toBe('test-api-key-123');
    expect(isXapiSessionActive()).toBe(true);
  });

  it('clears session properly', () => {
    saveXapiSession('test-api-key-123');
    clearXapiSession();
    expect(getStoredXapiSession()).toBeNull();
    expect(getStoredXapiKey()).toBe('');
    expect(isXapiSessionActive()).toBe(false);
  });

  it('handles expired session correctly', () => {
    const expiredSession = {
      key: 'expired-key',
      expiry: Date.now() - 1000
    };
    sessionStorage.setItem('xapi_session', JSON.stringify(expiredSession));
    expect(isXapiSessionActive()).toBe(false);
  });

  it('builds headers with passed key or stored key', () => {
    saveXapiSession('stored-key');
    
    // Using stored key
    expect(buildXapiHeaders()).toEqual({ 'x-api-key': 'stored-key' });
    
    // Explicit key override
    expect(buildXapiHeaders('override-key')).toEqual({ 'x-api-key': 'override-key' });
    
    // Multipart header flag
    expect(buildXapiHeaders('override-key', true)).toEqual({
      'x-api-key': 'override-key',
      'Content-Type': 'multipart/form-data'
    });
  });

  it('throws error when no key is available', () => {
    clearXapiSession();
    expect(() => buildXapiHeaders()).toThrow('X-API key is required');
  });
});
