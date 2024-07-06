const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        name: String
    }
);
module.exports = mongoose.model('Category', schema);
