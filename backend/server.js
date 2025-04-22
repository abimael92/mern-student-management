import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import logger from './config/logger.js';

const PORT = 5000;
const ENVIRONMENT = 'development';

const startServer = async () => {
    try {
        logger.info('🔄 Connecting to MongoDB...');
        await connectDB();
        logger.info('✅ MongoDB connected');

        const server = app.listen(PORT, () => {
            logger.info(`🚀 Server running on port ${PORT}`);
            logger.info(`🌍 Environment: ${ENVIRONMENT}`);
        });

        process.on('unhandledRejection', (err) => {
            logger.error('💥 UNHANDLED REJECTION! Shutting down...');
            logger.error(err.name, err.message);
            server.close(() => process.exit(1));
        });

        process.on('SIGTERM', () => {
            logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
            server.close(() => {
                logger.info('💥 Process terminated!');
            });
        });
    } catch (err) {
        logger.error('❌ Failed to start server:');
        console.error(err);
        process.exit(1);
    }
};

startServer();
