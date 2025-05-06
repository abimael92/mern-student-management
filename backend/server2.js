import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
// import mongoSanitize from 'express-mongo-sanitize';
// import hpp from 'hpp';
// import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/student.routes.js';
import teacherRoutes from './routes/teacher.routes.js';
// import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.js';
import connectDB from './config/db.js';
// import globalErrorHandler from './middlewares/error.middleware.js';

// Initialize app and config
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Security Middlewares
// app.use(helmet());
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
    credentials: true
}));
// app.use(cookieParser());

// Rate limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 200
// });
// app.use('/api', limiter);

// Body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization
// app.use(mongoSanitize());
// app.use(hpp());

// API Routes
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/teachers', teacherRoutes);

// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Static files in production
if (process.env.NODE_ENV === 'production') {
    const frontendPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(frontendPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

// Error handling
// app.use(globalErrorHandler);

// Database connection and server start
connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
});