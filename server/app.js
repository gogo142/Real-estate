const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json())
const cors = require("cors")
app.use(cors())
const bcrypt = require("bcryptjs");

const mongoUrl="mongodb+srv://georgemanazz:familj00@cluster0.c8jcwzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
})
.then(() => {
    console.log("Connected to database");
})
.catch((e) => console.log(e))

require("./userDetails")

const User = mongoose.model("UserInfo")
app.post("/register",async(req, res) => {
    const { fname, lname, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await User.findOne({ email });

        if(oldUser) {
           return res.send({ error: "User Exists" })
        }
        await User.create({
            fname,
            lname,
            email,
            password: encryptedPassword,
        })
        res.send({ status: "ok" })
    }catch (error) {
        res.send({ status: "error" })
    }
})

app.listen(5000,()=>{
    console.log('Server Started');
})
