const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

router.post('/addProduct', ProductController.addProduct);
router.get('/viewOneProduct/:id', ProductController.viewOneProduct);
router.get('/listAllProducts', ProductController.listAllProducts);
router.put('/updateProduct', ProductController.updateProduct);
router.delete('/deleteProduct/:id', ProductController.deleteProduct);
router.get('/searchProducts', ProductController.searchProduct);

module.exports = router;