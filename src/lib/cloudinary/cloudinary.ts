// ── Cloudinary Image Upload Utility ──────────────────────────────────────────
// Uploads a File to Cloudinary and returns the secure_url.
// Returns null silently on any failure so the calling flow can continue
// without the image rather than blocking the entire submission.

const CLOUD_NAME = 'dt76k7htg';
const UPLOAD_PRESET = 'animal_upload';

/**
 * Upload an image file to Cloudinary.
 *
 * @returns secure_url string on success, or null on failure
 */
export const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!res.ok) {
      console.log('[Cloudinary] Upload failed – HTTP', res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return (data.secure_url as string) ?? null;
  } catch (err) {
    console.log('[Cloudinary] Upload error:', err);
    return null;
  }
};
