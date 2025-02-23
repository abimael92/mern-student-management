import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import studentRoutes from './backend/routes/student.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(cors());
app.use('/students', studentRoutes);

// Use the environment variable for MongoDB URI
const CONNECTION_URL = process.env.MONGO_URI;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on ${PORT}`)
)).catch((err) => console.log(err));

mongoose.set('useFindAndModify', false);
