import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import studentRoutes from './routes/student.js';

mongoose.set('strictQuery', false);

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
app.use(cors());

// Routes
app.use('/students', studentRoutes);

// MongoDB connection URI
const CONNECTION_URL = process.env.MONGO_URI;
console.log('Mongo URI:', process.env.MONGO_URI); // This will print the Mongo URI if loaded correctly


// Port for the backend server
const PORT = process.env.PORT || 5000;

// MongoDB connection and server startup
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Backend running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World');
});
