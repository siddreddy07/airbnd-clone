const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },

    property:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place',
    },
    checkin:{
        type:Date,
        required:true,
    },
    checkout:{
        type:Date,
        required:true,
    },
    guests:{
        type:Number,
        required:true,
    },

},{timestamps:true})

const BookingModel = mongoose.model("Booking",BookingSchema)
module.exports = BookingModel;