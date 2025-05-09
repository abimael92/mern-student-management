export const getPublicUrl = (s3Path) => {
    if (!s3Path || typeof s3Path !== 'string') return ''; // Ensure s3Path is a string

    // If s3Path is already a URL, return it directly
    if (s3Path.startsWith('https://') || s3Path.startsWith('http://')) {
        return s3Path;
    }

    // If the s3Path starts with 's3://', remove it
    const sanitizedPath = s3Path.replace(/^s3:\/\//, '').trim();

    // Construct the public URL for the file
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${sanitizedPath}`;
};
