import express from 'express';
import multer from 'multer';
import s3 from '../config/s3.js';

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), async (req, res) => {
    const file = req.file;
    // console.log('Recibí un archivo:', file);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `students/${Date.now()}_${file.originalname}`,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        const data = await s3.upload(params).promise();
        res.json({ url: data.Location });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading file');
    }
});

export default router; // This is key!
