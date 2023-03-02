const mongoose = require('mongoose')


const reviewsModel = new mongoose.Schema({
    rating:{
        type:Number,
        unique:true,

    },
    order:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }

},{timestamps:true})


module.exports= mongoose.model('Reviews',reviewsModel)