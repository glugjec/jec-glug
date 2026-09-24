import { describe, it, expect } from 'vitest';
import { validateImageFiles } from './fileValidation';

describe('validateImageFiles utility', () => {
  it('returns valid for null or empty file lists', () => {
    expect(validateImageFiles(null)).toEqual({ valid: true, error: null });
    expect(validateImageFiles([])).toEqual({ valid: true, error: null });
  });

  it('validates supported image types within size limit', () => {
    const validFile = new File(['dummy-content'], 'photo.png', { type: 'image/png' });
    const result = validateImageFiles([validFile]);
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });

  it('rejects unsupported MIME types', () => {
    const invalidFile = new File(['text-content'], 'document.pdf', { type: 'application/pdf' });
    const result = validateImageFiles([invalidFile]);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('unsupported format');
  });

  it('rejects files exceeding size limit', () => {
    // 6MB content
    const largeContent = new Uint8Array(6 * 1024 * 1024);
    const largeFile = new File([largeContent], 'big.jpg', { type: 'image/jpeg' });
    const result = validateImageFiles([largeFile], { maxSizeBytes: 5 * 1024 * 1024 });

    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the maximum size limit');
  });
});
