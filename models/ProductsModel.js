const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    brandName: {
        type: String
    },
    sparePartType: {
        type: String
    }
})

const Product = mongoose.model("Products", productsSchema);
module.exports = Product;