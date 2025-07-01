const {Router} = require('express')
const { userMiddleware } = require('../middleware/user')
const { purchaseModel, courseModel } = require('../db')

courseRoute = Router()
courseRoute.post("/purchase",userMiddleware, async function(req,res){
    const userId = req.body.userId
    const courseId = req.body.courseId
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have successfully purchased"
    })
})

courseRoute.get("/preview",async function(req,res){
    const courses = await courseModel.findOne({})
    res.json({
        courses
    })
})

module.exports = {
    courseRoute:courseRoute
}