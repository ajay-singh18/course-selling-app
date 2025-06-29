const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { userRoute } = require('./routes/user')
const { courseRoute } = require('./routes/course')
const { adminRouter } = require('./routes/admin')

const app = express()

app.use("/user",userRoute)
app.use("/course", courseRoute)
app.use("/admin",adminRouter)


app.listen(3000)