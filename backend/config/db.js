import mongoose from 'mongoose';
import logger from './logger.js';

const connectDB = async () => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 5000;
    const MONGO_URI = 'mongodb://localhost:27017/student-management';

    const options = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 30000,
        maxPoolSize: 10,
        retryWrites: true,
        retryReads: true,
        w: 'majority'
    };

    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
        logger.info(`✅ MongoDB connected to ${mongoose.connection.host}`);
    });

    mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
        logger.warn('⚠️ MongoDB disconnected');
    });

    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        logger.info('🛑 MongoDB connection closed via app termination');
        process.exit(0);
    });

    console.log('🔌 Attempting MongoDB connection...');

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            await mongoose.connect(MONGO_URI, options);
            return mongoose.connection;
        } catch (err) {
            logger.error(`❌ MongoDB connection attempt ${attempt} failed`);
            console.error(err);
            if (attempt < MAX_RETRIES) {
                logger.info(`⏳ Retrying in ${RETRY_DELAY / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            } else {
                logger.error('❗ Max connection attempts reached. Exiting...');
                throw err;
            }
        }
    }
};

export default connectDB;
