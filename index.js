let express = require('express')
let mongoose = require('mongoose')
let UserModel = require("./models/user")

let app = express()

mongoose.connect('mongodb+srv://dd:avokado@cluster0.9m2g7.mongodb.net/f2021_comp3123_assign1?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

app.get("/", (req, res) =>{
    res.send("Deniz Dogan 101269485")
})

app.get("/users/all", async (req, res) => {
        const u = await (await UserModel.find({}, {projection: { id: 0}}).sort({username: 0}))
    try{
        res.send(u)
    }catch{
        console.log("Error: " + err)
        res.status(500).send(err)
    }
    
})

app.get("/user", async (req, res) => {
    const search = req.query.uid
    const u = await (await UserModel.find({}, "id username email address phone")).map(obj => {
            return {
                "id": obj.id,
                "username": obj.username,
                "email": obj.email,
                "address": obj.address.street+", "+obj.address.city+", "+obj.address.zipcode,
                "phone": obj.phone
            }
        }).filter(function (obj) { return obj.id == search})
        try{
            res.send(u.length>0?u:{"message":"User not found..."})
        }catch(err){
            console.log("Error: " + err)
            res.status(500).send(err)
        }
    }
)

app.listen(8089, () => {
    console.log("Server running at http://localhost:8089/")
})