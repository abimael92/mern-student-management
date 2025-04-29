export const getPublicUrl = (s3Path) => {
    if (!s3Path || typeof s3Path !== 'string') return ''; // Ensure s3Path is a string
    if (s3Path.startsWith('https://') || s3Path.startsWith('http://')) {
        return s3Path;
    }
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Path.replace('s3://', '')}`;
};
