const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        public_date: Date,
        name: String,
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        description: String,
        price: Number,
        seller: { type: Schema.Types.ObjectId, ref: 'User' },
        image_url: String
    }
);
module.exports = mongoose.model('Item', schema);
