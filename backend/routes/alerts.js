// routes/alerts.js
import express from 'express';
import Alert from '../models/alert.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const alert = new Alert(req.body);
        await alert.save();
        res.status(201).json(alert);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:studentId', async (req, res) => {
    try {
        const alerts = await Alert.find({ studentId: req.params.studentId });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
