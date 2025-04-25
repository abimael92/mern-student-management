import mongoose from 'mongoose';
import logger from './logger.js';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;
let connectionAttempts = 0;

const connectDB = async () => {

    if (!process.env.MONGO_URI) {
        console.error('MongoDB URI is undefined in .env');
        process.exit(1); // Force exit if URI is missing
    }


    try {
        // const conn = await mongoose.connect(process.env.MONGO_URI, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected:', conn.connection.host);
    } catch (error) {
        console.error('DB Error:', error);
        process.exit(1);  // Exit process with failure
    }
};

export default connectDB;