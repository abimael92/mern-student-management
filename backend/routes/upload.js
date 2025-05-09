import express from 'express';
import multer from 'multer';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3 from '../config/s3.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const { originalname, buffer, mimetype } = req.file;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `students/${Date.now()}_${originalname}`,
        Body: buffer,
        ContentType: mimetype,
    };

    try {
        // Use the send method for v3 SDK
        const data = await s3.send(new PutObjectCommand(params));
        res.status(200).json({ url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}` });
    } catch (error) {
        console.error('S3 Upload Error:', error);
        res.status(500).json({ message: 'Error uploading file', error: error.message });
    }
});

export default router;
