const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new mongoose.Schema(
    {
        username: {type: String, required: true, max: [30, 'At most 30 characters for username']},
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            max: [30, 'At most 30 characters for email']
        },
        password: {
            type: String,
            required: true,
            min: [6, 'At least 6 characters for password'],
            max: [30, 'At most 30 characters for password']
        }
    }
);
module.exports = mongoose.model('User', schema);
