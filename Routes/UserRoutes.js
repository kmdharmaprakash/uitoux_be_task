const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.post('/registerUser', UserController.registerUser);
router.post('/loginUser', UserController.loginUser);

module.exports = router;