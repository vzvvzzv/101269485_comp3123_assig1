let mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id: Number,
    name: String,
    username: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo:{
            lat: String,
            lng: String,
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String,
    }



})

const User  = mongoose.model("user", UserSchema)
module.exports = User