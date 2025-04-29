import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,   // (ponlo en .env)
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // (ponlo en .env)
    region: process.env.AWS_REGION
});

export default s3;
