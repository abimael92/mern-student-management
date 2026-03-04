import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { apiLimiter } from './middleware/rateLimit.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import booksRoutes from './routes/books.route.js';
import attendanceRoutes from './modules/attendance/attendance.routes.js';
import studentRoutes from './modules/students/student.routes.js';
import teacherRoutes from './modules/teachers/teacher.routes.js';
import subjectRoutes from './modules/subject/subject.routes.js';
import courseRoutes from './modules/course/course.routes.js';
import classRoutes from './modules/classes/class.routes.js';
import roomRoutes from './modules/rooms/room.routes.js';
import uploadRoutes from './routes/upload.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load .env from backend directory
const envPath = path.join(__dirname, '.env');
console.log('Loading .env from:', envPath);
console.log('File exists:', fs.existsSync(envPath));

const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error('❌ Failed to load .env:', result.error);
  process.exit(1);
} else {
  console.log('✅ .env loaded successfully');
}

// Verify JWT_SECRET is loaded
console.log('JWT_SECRET loaded:', process.env.JWT_SECRET ? '✅ Yes' : '❌ No');
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is still missing after loading .env!');
  process.exit(1);
}

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Security sanitization
app.use(mongoSanitize());
app.use(xss());

// Rate limiting
app.use('/api', apiLimiter);

// ========== API ROUTES (These come FIRST) ==========
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/library', booksRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/upload', uploadRoutes);

// ========== STATIC FILES (These come AFTER API routes) ==========
const frontendPath = path.join(__dirname, '../frontend/dist');

// Serve static files
app.use(express.static(frontendPath));

// This catch-all should ONLY serve the frontend for non-API routes
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ========== ERROR HANDLERS (These come LAST) ==========
app.use(notFound);
app.use(errorHandler);

// Database connection and server start
connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
});