const express = require("express");
const Product = require("../models/ProductsModel");

const ProductController = () => {
    const addProduct = async (req, res) => {
        try {
            let userInput = req.body;
            let saveProduct = await Product.create(userInput);
            res.status(200).json({
                message: "Product added successfully",
                data: saveProduct
            })
        }
        catch(err) {
            res.status(400).json({
                message: "Error on Product Controller"
            })
        }
    }
    const viewOneProduct = async (req, res) => {
        try {
            let id = req.params.id;
            console.log("id", id)
            let viewProduct = await Product.findOne({_id: id});
            res.status(200).json({
                message: "Product listed successfully",
                data: viewProduct
            })
        } 
        catch(err) {
            res.status(400).json({
                message: "Error on Product Controller"
            })
        }
    }
    const listAllProducts = async (req, res) => {
        try {
            let listProducts = await Product.find({});
            res.status(200).json({
                message: "Product listed successfully",
                data: listProducts
            })
        }
        catch(err) {
            res.status(400).json({
                message: "Error on Product Controller"
            })
        }
    }
    const updateProduct = async (req, res) => {
        try {
            const userInput = req.body;
            const editedData = await Product.updateOne({_id: userInput.id}, {$set: userInput}, {new: true});
            res.status(200).json({
                message: "Product Updated successfully",
                data: editedData
            })
        }
        catch(err) {
            res.status(400).json({
                message: "Error on Product Controller"
            })
        }
    }
    const deleteProduct = async (req, res) => {
        try {
            let id = req.params.id;
            let removeProduct = await Product.findOneAndDelete({_id: id});
            res.status(200).json({
                message: "Product Deleted successfully",
                data: removeProduct
            })
        }
        catch(err) {
            res.status(400).json({
                message: "Error on Product Controller"
            })
        }
    }
    //This api is for search bar at the top - search using part number vehicle brand
    const searchProduct = async (req, res) => {
        try {
        const searchDetails = await Product.find({
            $or: [{productName: {$in: req.body.keyword}}, {brandName : {$in: req.body.keyword}}, 
                {sparePartType: {$in: req.body.keyword}}]
        });
        res.status(200).json({
            message: "The Products are",
            data: searchDetails
        })
    }
        catch(err) {
            res.status(400).json({
                message: "Error on Search Controller"
            })
        }
    }
    return {
        addProduct,
        viewOneProduct,
        listAllProducts,
        updateProduct,
        deleteProduct,
        searchProduct
    };
  };
  
  module.exports = ProductController();