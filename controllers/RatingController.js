const express = require("express");
const Rating = require("../models/RatingsModel");
const Product = require("../models/ProductsModel");

const RatingController = () => {
  const addRating = async (req, res) => {
    try {
      const userInput = req.body;
      let saveRating = await Rating.create(userInput);
      res.status(200).json({
        message: "Rating added successfully",
        data: saveRating,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error on Add Rating",
      });
    }
  };

  //Product with ratings and reviews - we can use this api for single product view by selecting one
  const productWithRatings = async (req, res) => {
    try {
      //Product name, price, total reviews count, ratings calculation
      let productDetails = await Rating.find({
        productId: req.params.productId,
      }).populate({ path: "productId", select: "productName price" });
      let aboutProduct = {};
      productDetails.find((d) => {
        (aboutProduct.productName = d.productId.productName),
          (aboutProduct.price = d.productId.price);
      });
      let reviewCount = await Rating.find({}).count({
        productId: req.params.productId,
      });
      let count = 0;
      let avgRating = productDetails.reduce((d) => {
        return (count += d.ratings);
      });
      Math.round(avgRating);
      let newArr = [];
      let obj = {
        productName: aboutProduct.productName,
        price: aboutProduct.price,
        reviews: reviewCount,
        ratings: avgRating,
      };
      newArr.push(obj);
      res.status(200).json({
        message: "Products list fetched succesfully",
        data: newArr,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error on productWithRatings",
      });
    }
  };

  //list of products with ratings and reviews (For EX: featured lists in UI)
  const productsListWithRatings = async (req, res) => {
    try {
      //ALL - Product name, price, total reviews count, ratings calculation
      const productsList = await Product.find({});
      res.status(200).json({
        message: "Products list fetched succesfully",
        data: productsList,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error on productWithRatings",
      });
    }
  };

  //
  //list of all ratings and reviews with products
  const productsWithRatingAndReviews = async (req, res) => {
    try {
      const productsWithRatings = await Rating.find({}).populate({
        path: "productId",
        select: "productName price",
      });
      res.status(200).json({
        message: "Products list fetched succesfully",
        data: productsWithRatings,
      });
    } catch (err) {
      res.status(400).json({
        message: "Error on productsWithRatingAndReviews",
      });
    }
  };

  return {
    addRating,
    productWithRatings,
    productsListWithRatings,
    productsWithRatingAndReviews,
  };
};

module.exports = RatingController();
