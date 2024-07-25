const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config()
const { mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const UserModel = require("./models/User");
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const cookieParser = require('cookie-parser')
const multer  = require('multer');
const razorpay = require('razorpay');
const PlaceModel = require('./models/Place')
const path = require("path");
const BookingModel = require("./models/Bookings");
const PORT = 8000;
const JWT_SECRET = 'jadbn476ahklj41jae1fnfk'

app.use(express.json());
app.use("/uploads",express.static(__dirname + "/uploads/"))
app.use(express.urlencoded({extended:true}))

app.use(cors({
    credentials:true,
    origin :"http://localhost:5173",
}));
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URL)
console.log("Db connected")

var instance = new razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
     crypto.randomBytes(12,function(err,bytes){
        const fn = bytes.toString('hex') + path.extname(file.originalname)
         cb(null,fn)
     })
    }
  })
  
const upload = multer({ storage: storage })


app.get("/test",(req,res)=>{
    res.json("testOk");
})

app.post("/checkout",async(req,res)=>{

    const options = {
        amount:Number(req.body.amount*100),
        currency:"INR",
    };
    try {
        
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success:true,order
        })
    } catch (error) {
        console.log("checkout error")
    }

})

app.post("/paymentverify",async(req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;

        try {
            console.log(razorpay_payment_id)
            if(razorpay_payment_id){
                res.status(200).redirect('http://localhost:5173/account/bookings')
            }
            
        } catch (error) {
            console.log(error.message)
            res.status(400).json({success:false});
            
        }
    
 })


app.get("/getkey",(req,res)=>{
    return res.status(200).json({key:process.env.KEY_ID})
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
                    res.status(200).cookie('token',token).json(user);
                }
                else{
                    res.status(500).json("pass not ok")
                }
    
            }

            else{
                console.log("No user Found")
                res.status(401).json("No user")
            }


})

app.get('/profile',(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,JWT_SECRET,{},(err,userdata)=>{
            if(err) throw err;
            UserModel.findById(userdata.id)
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




app.post('/upload', upload.array('photos', 12), function (req, res, next) {
    const uploadedpics = [];
    for(let i= 0 ; i<req.files.length ;i++){
        const {path} = req.files[i]
        uploadedpics.push(path)
    }
    res.json(uploadedpics)
  })


app.post("/places",(req,res)=>{

    const {token} = req.cookies
    const {
        title,
        address,photo,
        description,perks,extra,
        checkin,checkout,maxguests,price} = req.body

           jwt.verify(token,JWT_SECRET,{},async(err,userdata)=>{
            if(err) throw err;
                const placedoc = await PlaceModel.create({
                     user:userdata.id,
                     title,
                     address,
                     description,
                     photo,
                     perks,
                     extra,
                     checkin,
                     checkout,
                     maxguests,
                     price
                })
            await placedoc.save()
            res.status(200).json(placedoc)                

        })
})  

app.get("/user-places",(req,res)=>{

    const {token} = req.cookies
    jwt.verify(token,JWT_SECRET,{},async(err,userdata)=>{
        if(err) throw err;
        const {id} = userdata
    const place = await PlaceModel.find({user:id})
    res.json(place)

    })

})

app.get("/places/new/:id",(req,res)=>{

    const {token} = req.cookies
    const {id} = req.params
    jwt.verify(token,JWT_SECRET,{},async(err,userdata)=>{
        if(err) throw err;
        const place = await PlaceModel.findById(id)
        res.json(place)
    })

})

app.put("/place",(req,res)=>{

    const {token} = req.cookies
    const {id,address,photo,
        description,perks,extra,
        checkin,checkout,maxguests,price} = req.body
    jwt.verify(token,JWT_SECRET,{},async(err,userdata)=>{
        if(err) throw err;
        const place = await PlaceModel.findById(id)
        if(userdata.id === place.user.toString()){
            place.set({
                address,photo,
        description,perks,extra,
        checkin,checkout,maxguests,price
            })
            await place.save()
            res.json("ok");
        }
    })

})


app.get("/places",async(req,res)=>{


    const place = await PlaceModel.find()
    res.json(place)


})

app.get("/place/:id",async(req,res)=>{
    const {id} = req.params
    const place = await PlaceModel.findById(id)
                                .populate('user')
    res.json(place)
})

app.post("/check/:id",async(req,res)=>{
    const {id} = req.params
    const {CheckinDate,CheckoutDate,guests} = req.body;

    try {
        
        const existing = BookingModel.find({
            property:id,
            $or:[{checkin:{$lt:new Date(CheckoutDate),$gte:new Date(CheckinDate)}},{checkout:{$gt:new Date(CheckinDate),$lte:new Date(CheckoutDate)}},
                {$and:[{checkin:{$lt:new Date(CheckinDate)}},{checkout:{$gt:new Date(CheckoutDate)}}]}
            ]
        });
        console.log(existing.length>0)

        if((await existing).length>0){
            return res.status(201).json("Not Available")
        }
        console.log(existing)
    
        res.status(200).json("Available")

    } catch (error) {
        return res.status(400).json(error.message)
    }

})


app.post("/booking/:id",async(req,res)=>{
    const {id} = req.params
    const {data1,CheckinDate,CheckoutDate,guests} = req.body;

    try {
        const bookdata = await BookingModel.create({
            user:id,
            property:data1._id,
            checkin:new Date(CheckinDate),
            checkout:new Date(CheckoutDate),
            guests:guests

        })
        await bookdata.save();
        console.log("Booking Saved")
        res.status(200).json(bookdata)
        
    } catch (error) {
        res.status(400).json(error.message)
        console.log("Not booked")
    }
    

})



 
    app.get('/booking/:uid',(req,res)=>{
        const {token} = req.cookies
        if(token){
            jwt.verify(token,JWT_SECRET,{},async(err,userdata)=>{
                if(err) throw err;
               const Booking = await BookingModel.find({user:userdata.id})
                            .populate('property')
                res.json(Booking);
            })
        }
        else{
            res.json(null);
        }
    })    



    app.post("/search",async(req,res)=>{
        const{query} = req.body;
        console.log(query);
        PlaceModel.collection.createIndex({address:"text"})
        const data = await PlaceModel.find({$text:{$search:query}});
         try {
             if(data){
                console.log(data)
                 res.status(200).json(data)
             }
             else{
                 console.log("Not available");
             }
            
         } catch (error) {
            console.log("error:",error.message)
         }
    })


app.listen(PORT,
    console.log("Server Running")
    
)