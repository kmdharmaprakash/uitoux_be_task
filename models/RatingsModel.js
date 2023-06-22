const mongoose = require('mongoose');

const ratingsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    },
    review: {
        type: String
    },
    ratings: {
        type: Number
    }
});

const Ratings = mongoose.model("Ratings", ratingsSchema);
module.exports = Ratings;