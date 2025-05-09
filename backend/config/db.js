import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectDB = async () => {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        console.error('MongoDB URI is undefined in .env');
        process.exit(1);
    }

    try {
        const start = Date.now();
        const conn = await mongoose.connect(uri);
        const timeTaken = Date.now() - start;

        console.log(`MongoDB connected to: ${conn.connection.name}`);
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Connection time: ${timeTaken}ms`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;
