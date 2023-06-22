const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    date: {
        type: Date,
        default: new Date(),
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;