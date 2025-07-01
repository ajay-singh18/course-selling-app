// const express = require('express')
// const router = express.Router()
const { Router} = require("express"); // sama as upper two line
const userRoute = Router();
const { userModel, purchaseModel } = require("../db");
const jwt = require('jsonwebtoken');
const { userMiddleware } = require("../middleware/user");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD

userRoute.post("/signup", async function (req, res) { // no need of /user now
  const { email, password, firstName, lastName } = req.body; // Todo -> zod validation
  // hash the password
  // put in try catch block
  await userModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  res.json({
    message: "signup succeeded",
  });
});

userRoute.post("/signin", async function(req, res) {
    const { email,password } = req.body
    const user = await userModel.findOne({
        email,
        password
    })
    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD)
       // do cookie ligic
        res.json({
          token:token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credientials"
        })
    }
});
userRoute.get("/purchases",userMiddleware,async function (req, res) {
      const userId = req.userId
      const purchases = await purchaseModel.find({
        userId
      })
      res.json({
        purchases: purchases
      })
});

module.exports = {
  userRoute: userRoute,
};
