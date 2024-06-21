const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        public_date: Date,
        name: String,
        category: String,
        description: String,
        price: Number,
        image_url: String
    }
);
module.exports = mongoose.model('Item', schema);
