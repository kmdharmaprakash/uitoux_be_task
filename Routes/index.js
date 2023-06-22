const express 	= require('express');
const router 	= express.Router();
const UserRouter = require('../Routes/UserRoutes');
const ProductRouter = require('../Routes/ProductRoutes');
const RatingRouter = require("../Routes/RatingRoutes");
const CartRouter = require("../Routes/CartRoutes");

router.use('/user', UserRouter)
router.use('/product', ProductRouter);
router.use('/rating', RatingRouter);
router.use('/cart', CartRouter);

module.exports = router;