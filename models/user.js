const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: false
    },
    organisation: {
        type: String,
        required: false
    },
    type: {
        //Number or String depending if we are using enum
        type: Number,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);