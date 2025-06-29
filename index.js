const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { userRoute } = require('./routes/user')
const { courseRoute } = require('./routes/course')

const app = express()

app.use("/user",userRoute)
app.use("/course", courseRoute)


app.listen(3000)