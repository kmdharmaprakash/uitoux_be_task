const express = require("express");
const router = express.Router();
const RatingController = require("../controllers/RatingController");

router.post('/addRating', RatingController.addRating);
router.get('/productsWithRatingAndReviews', RatingController.productsWithRatingAndReviews);
router.get('/productWithRatings/:productId', RatingController.productWithRatings);
router.get('/productslistWithRatings', RatingController.productsListWithRatings);

module.exports = router;