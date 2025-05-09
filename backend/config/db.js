import mongoose from 'mongoose';

mongoose.set('strictQuery', true);


const connectDB = async () => {

    if (!process.env.MONGO_URI) {
        console.error('MongoDB URI is undefined in .env');
        process.exit(1);
    }


    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('DB Error:', error);
        process.exit(1);
    }
};

export default connectDB;