const {Router} = require('express')
const adminRouter = Router()
const {adminModel, courseModel} = require('../db')
const jwt = require("jsonwebtoken")
const { adminMiddleware } = require('../middleware/admin')
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
    const adminId = req.userId
    
    const {title, description, imageUrl, price} = req.body
    const course = await courseModel.create({
        title, description, imageUrl, price, creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId : course._id
    })
})
adminRouter.put("/course",adminMiddleware,  async function(req,res){

    const adminId = req.userId
    
    const {title, description, imageUrl, price, courseId} = req.body
    const course = await courseModel.updateOne({
       _id: courseId,
       creatorId : adminId
    }, {
        title, description, imageUrl, price
    })

    res.json({
        message: "Course updated",
        courseId : course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware, async function(req,res){
    const adminId = req.userId
    
    const courses = await courseModel.findOne({
       creatorId : adminId
    })
    res.json({
        message: "Course updated",
        courses: courses
    })
})

module.exports = {
    adminRouter: adminRouter
}