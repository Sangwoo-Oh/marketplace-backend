const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        // _id: Schema.Types.ObjectId,
        public_date: Date,
        name: String,
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        description: String,
        price: Number,
        image_url: String
    }
);
module.exports = mongoose.model('Item', schema);
