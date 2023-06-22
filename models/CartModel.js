const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }
})
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    productsInCart: [productsSchema]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;