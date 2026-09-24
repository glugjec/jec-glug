export const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const DEFAULT_ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml'
];

/**
 * Validates a list or array of File objects.
 * @param {FileList|File[]|File} files - File or list of files to validate.
 * @param {Object} options
 * @param {number} [options.maxSizeBytes=5242880] - Maximum allowed size per file in bytes (default 5MB).
 * @param {string[]} [options.allowedTypes] - Allowed MIME types.
 * @returns {{ valid: boolean, error: string | null }}
 */
export const validateImageFiles = (
  files,
  {
    maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
    allowedTypes = DEFAULT_ALLOWED_IMAGE_TYPES
  } = {}
) => {
  if (!files) {
    return { valid: true, error: null };
  }

  const fileArray = Array.isArray(files)
    ? files
    : files instanceof FileList
      ? Array.from(files)
      : [files];

  for (const file of fileArray) {
    if (!(file instanceof File)) continue;

    // Check MIME type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File "${file.name}" has an unsupported format (${file.type || 'unknown'}). Allowed formats: JPG, PNG, WebP, GIF, SVG.`
      };
    }

    // Check size limit
    if (file.size > maxSizeBytes) {
      const maxMb = (maxSizeBytes / (1024 * 1024)).toFixed(1);
      const fileMb = (file.size / (1024 * 1024)).toFixed(1);
      return {
        valid: false,
        error: `File "${file.name}" exceeds the maximum size limit of ${maxMb}MB (${fileMb}MB).`
      };
    }
  }

  return { valid: true, error: null };
};
