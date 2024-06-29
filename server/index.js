const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const UserModel = require("./models/User");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const PORT = 8000;
const JWT_SECRET = 'jadbn476ahklj41jae1fnfk'

app.use(express.json());
app.use(cors({
    credentials:true,
    origin :"http://localhost:5173",
}));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
console.log("Db connected")

app.get("/test",(req,res)=>{
    res.json("testOk");
})

app.post("/signup",async(req,res)=>{
    const {name,email,password}  = req.body

    try {
        const hash = bcrypt.hashSync(password, 10);
    
        const user = await UserModel.create({
            name,
            email,
            password:hash,
        });
    
        await user.save();
        res.json("User Registered !!")
        
    } catch (error) {
        res.status(422).json("Already Exits/Server Error")
    }

})


app.post("/login",async(req,res)=>{
    const {email,password} = req.body;

    const user = await UserModel.findOne({email})
        if(user){
 
            const passOk = bcrypt.compareSync(password,user.password)
            if(passOk){
                const token = jwt.sign({email:user.email,id:user._id,name:user.name},JWT_SECRET)
                res.cookie('token',token)
                res.json(user)
            }
            else{
                res.json("pass not ok")
            }

        }
        else{
            res.json("not found")
        }

})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,JWT_SECRET,{},(err,userdata)=>{
            if(err) throw err;
            UserModel.findById()
            res.json(userdata)
        })
    }
    else{
        res.json(null);
    }
})

app.post("/logout",(req,res)=>{
    res.cookie('token','').json(true)
})

app.listen(PORT,
    console.log("Server Running")
)