const mongoose = require('mongoose');

const textbookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    url: String,
});

const Books = mongoose.model('Books', textbookSchema);
export default Books;

