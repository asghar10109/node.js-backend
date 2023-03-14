const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required: true
    },
    avator:{
        type:String,
        required: true
    }
},
{timestamps:true}
) 

module.exports = mongoose.model('User',userModel)