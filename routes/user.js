// const express = require('express')
// const router = express.Router()
const {Router} = require('express') // sama as upper two line

const userRoute = Router()

userRoute.post("/signup",function(req,res){ // no need of /user now
    res.json({
        message: "signup endpoint"
    })
})

userRoute.post("signin",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})

userRoute.get("/purchases",function(req,res){
    res.json({
        message: "user purchases endpoint"
    })
})

module.exports = {
    userRoute: userRoute
}

