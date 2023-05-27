const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        MinLength: 6,
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
    verified_at: {
        type: Date,
    },
    verify_token: {
        type: String,
    },
    verify_token_expires: {
        type: String,
    },
    password_changed_at: {
        type: Date,
    },
    reset_password_token: {
        type: String,
    },
    reset_password_token_expires: {
        type: String,
    },
});

module.exports = mongoose.model('User', userSchema);