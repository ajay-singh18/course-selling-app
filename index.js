const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_URL


const { userRoute } = require('./routes/user')
const { courseRoute } = require('./routes/course')
const { adminRouter } = require('./routes/admin')

const app = express()

app.use("/user",userRoute)
app.use("/course", courseRoute)
app.use("/admin",adminRouter)

async function main(){
   await mongoose.connect(uri)
   console.log('URL is : ', uri);
    app.listen(3000)
console.log("listening in port 3000") 
}
main()