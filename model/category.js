const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        // _id: Schema.Types.ObjectId,
        name: String
    }
);
module.exports = mongoose.model('Category', schema);
