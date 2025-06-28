
// Cloudinary configuration for media storage
export const cloudinaryConfig = {
  cloudName: 'dobktsnix',
  uploadPreset: 'hospital',
  apiKey: 'your-api-key', // Replace with your Cloudinary API key
};

export const uploadToCloudinary = async (file: File, folder: string = 'hospital') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  formData.append('folder', folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  // This would typically be done server-side for security
  console.log('Delete image with publicId:', publicId);
};

export const generateCloudinaryUrl = (publicId: string, transformations?: string) => {
  const baseUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload`;
  return transformations 
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`;
};
