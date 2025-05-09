import { S3Client, HeadBucketCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const testS3Connection = async () => {
    try {
        const command = new HeadBucketCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
        });
        await s3.send(command);
        console.log('S3 connection successful');
    } catch (error) {
        console.error('S3 connection failed:', error);
    }
};

testS3Connection();

export default s3;
