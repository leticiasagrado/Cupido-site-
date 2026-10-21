import { photoLimits } from '@/data/network-application';

export type PreparedPhoto = {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
};

export type PhotoValidationError = {
  file: string;
  message: string;
};

/**
 * Reads an image file, auto-corrects its orientation using the browser's
 * `createImageBitmap({ imageOrientation: 'from-image' })`, redraws it onto a
 * canvas and re-encodes it. This genuinely strips EXIF metadata (including
 * GPS location data) and produces a clean image without embedded metadata.
 *
 * Falls back to the original file when the browser cannot decode the image
 * (e.g. unsupported format) so submission is never silently blocked.
 */
async function stripExifAndOrient(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const canvas = document.createElement('canvas');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0);
    bitmap.close();

    const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputType, 0.92),
    );
    if (!blob) return file;

    const baseName = file.name.replace(/\.[^.]+$/, '');
    const extension = outputType === 'image/png' ? 'png' : 'jpg';
    // Do not embed personal data in the filename — use a neutral name.
    return new File([blob], `photo.${extension}`, { type: outputType });
  } catch {
    return file;
  }
}

function readDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const dims = { width: img.naturalWidth, height: img.naturalHeight };
      URL.revokeObjectURL(url);
      resolve(dims);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ width: 0, height: 0 });
    };
    img.src = url;
  });
}

export function validatePhotoFile(file: File): string | null {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.type)) {
    return 'Formato não permitido. Use JPG, PNG ou WebP.';
  }
  if (file.size > photoLimits.maxBytes) {
    return 'Ficheiro demasiado grande. O limite é 5 MB por fotografia.';
  }
  return null;
}

export async function preparePhoto(file: File): Promise<{ photo: PreparedPhoto; error: null } | { photo: null; error: string }> {
  const validationError = validatePhotoFile(file);
  if (validationError) return { photo: null, error: validationError };

  const cleaned = await stripExifAndOrient(file);
  const dims = await readDimensions(cleaned);
  const previewUrl = URL.createObjectURL(cleaned);

  return {
    photo: { file: cleaned, previewUrl, width: dims.width, height: dims.height },
    error: null,
  };
}
