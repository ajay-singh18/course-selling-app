const mongoose = require('mongoose')
console.log("connected to");

// mongoose.connect('mongodb+srv://ajaykrsingh:ajay%402006@cluster0.evrwcfz.mongodb.net/Coursera-app')
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
    email: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String 
})
const adminSchema = new Schema({
    email: {type: String, unique:true},
    password: String,
    firstName: String,
    lastName: String 
})
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId:ObjectId
})

const userModel = mongoose.model("user",userSchema)
const adminModel = mongoose.model("admin",adminSchema)
const courseModel = mongoose.model("course",courseSchema)
const purchaseModel = mongoose.model("purchase",purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}