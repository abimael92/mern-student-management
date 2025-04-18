import mongoose from 'mongoose';
import logger from './logger.js';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;
let connectionAttempts = 0;

const connectDB = async () => {
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority'
    };

    try {
        await mongoose.connect(process.env.MONGO_URI, connectionOptions);

        mongoose.connection.on('connected', () => {
            logger.info('MongoDB connection established');
        });

        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected');
        });

        // Close the Mongoose connection when the Node process ends
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed through app termination');
            process.exit(0);
        });

        return mongoose.connection;
    } catch (err) {
        connectionAttempts++;
        logger.error(`MongoDB connection failed (attempt ${connectionAttempts}):`, err.message);

        if (connectionAttempts < MAX_RETRY_ATTEMPTS) {
            logger.info(`Retrying connection in ${RETRY_DELAY_MS / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            return connectDB();
        }

        logger.error('Maximum connection attempts reached. Exiting...');
        process.exit(1);
    }
};

export default connectDB;