const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
    cart:
        [
          {  product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
        
            }}
        ],
    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'

    },
    status:{
        type:String,
        enum:['pending','deliver','inprocess']
    },
    quantity:{
        type:Number,
        required : true
    },
    
    totalprice:{
        type:Number
    }
},
{timestamps:true}
) 

module.exports = mongoose.model('Order',orderModel)