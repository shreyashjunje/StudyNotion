const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    const options = { folder };
    if (height) {
        options.height = height;
    }
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";

    // Use the file's buffer directly if `tempFilePath` is not available
    return await cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) {
            console.error('Error uploading to Cloudinary:', error);
            throw new Error('Upload to Cloudinary failed');
        }
        return result;
    }).end(file.data);
}
