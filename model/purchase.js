const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        date: Date,
        item: {type: Schema.Types.ObjectId, ref: 'Item'},
        buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    }
);
module.exports = mongoose.model('Purchase', schema);
