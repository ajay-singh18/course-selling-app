const {Router} = require('express')
const adminRouter = Router()
const {adminModel, courseModel} = require('../db')
const jwt = require("jsonwebtoken")
const { adminMiddleware } = require('../miiddleware/admin')
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD
adminRouter.post("/signup",async function(req,res){ // no need of /user now
     const { email, password, firstName, lastName } = req.body; // Todo -> zod validation
  // hash the password
  // put in try catch block
  await adminModel.create({
    email,
    password,
    firstName,
    lastName,
  });

  res.json({
    message: "signup succeeded",
  });
})

adminRouter.post("/signin", async function(req,res){
     const { email,password } = req.body
    const admin = await adminModel.findOne({
        email,
        password
    })
    if(admin){
        const token = jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD)
       // do cookie ligic
        res.json({
          token:token
        })
    }else{
        res.status(403).json({
            message: "Incorrect Credientials"
        })
    }
})

adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminId = req.useId
    
    const {title, description, imageUrl, price} = req.body
    await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
        message: "Couser created",
        courseId : course._id
    })
})
adminRouter.put("/course",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})
adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}