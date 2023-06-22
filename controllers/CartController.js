const express = require("express");
const Cart = require("../models/CartModel");

const CartController = () => {
  //This api will add the Product items to the cart
  const addToCart = async (req, res) => {
    try {
      let userInput = req.body;
      //Condition to check the cart is empty or not
      const existingCart = await Cart.find({ userId: userInput.userId });
      //In the cart if some of the items are there, this condition will update the cart
      if (existingCart.length > 0) {
        const editedData = await Cart.updateOne({userId: userInput.userId}, {$set: userInput}, {new: true});
            res.status(200).json({
            message: "Cart updated successfully",
            data: editedData,
          });
      } else {
        let addToCart = await Cart.create(userInput);
        res.status(200).json({
          message: "Cart added successfully",
          data: addToCart,
        });
      }
    } catch (err) {
      res.status(400).json({
        message: "Error on add to cart",
      });
    }
  };

  //This api will give the list of the products in the list
  const listCartOfTheUser = async (req, res) => {
    try {
      const list = await Cart.findOne({ userId: req.params.userId }).populate({
        path: "productsInCart",
        populate: { path: "productId", model: "Products" },
      });
      res.status(200).json({
        message: "Cart List fetched successfully",
        data: list,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error on add to cart",
      });
    }
  };

  return {
    addToCart,
    listCartOfTheUser,
  };
};

module.exports = CartController();
