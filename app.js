const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const mongoUrl = "mongodb+srv://niladariya:8QnJRJmLNSc3pJaA@niladariya.fnv7s.mongodb.net/?retryWrites=true&w=majority&appName=NILADARIYA"

mongoose.connect(mongoUrl).then(() => {
    console.log('DATABASE CONNECTED');
    })
    .catch((e) => {
        console.log(e);
    });
require('./UserDetails')

const User = mongoose.model("UserInfo");

app.get("/",(req,res) => {
    res.send({status:"Started"})
})

app.post("/register", async (req, res) => {
    const {name,email,mobile,password} = req.body;

    const oldUser = await User.findOne({email:email});

    if (oldUser){
        return res.send({data: 'User already exists!!'});
    }

    try{
        await User.create({
            name:name,
            email:email,
            mobile,
            password,
        });
        res.send({status:"OK", data:"User Created"});
    }catch(error){
        res.send({status:"error", data: error});
    }
})

app.listen(4000, () => {
   console.log("Local server Started");
});

