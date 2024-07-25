const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    title:String,
    address:String,
    description:String,
    photo:[String],
    perks:[String],
    extra:String,
    checkin:Number,
    checkout:Number,
    maxguests:Number,
    price:Number,
})

const PlaceModel = mongoose.model("Place",PlaceSchema);
module.exports = PlaceModel;