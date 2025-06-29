const {Router} = require('express')

courseRoute = Router()
courseRoute.post("/purchase",function(req,res){
    res.json({
        message: "courses endpoint"
    })
})

courseRoute.get("/preview",function(req,res){
    res.json({
        message: "course previes endpoint"
    })
})

module.exports = {
    courseRoute:courseRoute
}