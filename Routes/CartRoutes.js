const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");

router.post('/addToCart', CartController.addToCart);
router.get('/listCartOfTheUser/:userId', CartController.listCartOfTheUser);

module.exports = router;