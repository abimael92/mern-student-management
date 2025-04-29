import mongoose from 'mongoose';

// Set strictQuery to false to avoid the deprecation warning
mongoose.set('strictQuery', false);

const uri = 'mongodb+srv://admin:passw0rd@recipeblog.jkhvn.mongodb.net/schoolManagement?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        mongoose.connection.close();  // Close the connection after testing
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB:', err);
    });
