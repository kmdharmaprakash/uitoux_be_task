const express = require("express");
const User = require("../models/UserModel");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt_secret_jbsva12jbsv2";

const UserController = () => {
  const registerUser = async (req, res) => {
    try {
      const signupData = req.body;
      if (!signupData.email || !signupData.password) {
        return res.status(400).json({
          errorMessage: "Please enter all the fields",
        });
      }
      const email = signupData.email;
      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res.status(400).json({
          errorMessage: "An account with this email already exists",
        });
      const passwordHash = await bcrypt.hash(signupData.password, 8);
      signupData.password = passwordHash;
      const newUser = new User(signupData);
      const savedUser = await newUser.save();
      return res.status(200).json({
        message: "User Registered successfully",
        data: newUser
      })
    } catch (err) {
        return res.status(400).json({
            message: "Error on register user",
            error: err
        })
    }
  };
  const loginUser = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let user = await User.findOne({email: email});
        if(!user) {
            res.status(400).json({
                message: "You not yet registered"
            })
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                  res.status(400).json({
                    err,
                    message: "Password didn't match",
                  });
                }
                if (result) {
                  let token = jwt.sign(
                    { _id: user._id },
                    JWT_SECRET,
                    {
                      expiresIn: '7d',
                    }
                  );
                  res.status(200).json({
                    message: "Logged In Successfully",
                    token,
                    data: user,
                  });
                } else {
                  res.status(400).json({
                    message: "Password Incorrect",
                  });
                }
              });
        }
    } catch (err) {
        res.status(400).json({
            message: "Error on login user"
        })
    }
  };

  return {
    registerUser,
    loginUser
  };
};

module.exports = UserController();
