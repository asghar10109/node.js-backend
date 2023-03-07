const orderModel = require('../Models/order')
const productModel = require('../Models/product')
const createOrders = async(req,res,next)=>{
    try{

        const newOrder = new orderModel({
            cart:req.body.cart,
            user:req.body.user,
            quantity:req.body.quantity,
            totalprice:req.body.totalprice,
            status: req.body.status || "pending"
           
    
        })
        const data = await newOrder.save()
        
        res.send({
            message: "new order is created",
            status : 201,
            data :data 
        })
        
        
    }
    catch(err){
        res.send({
            message:"new order is not created successfully",
            status:404,
             
    
        })
    }
        
}


const getAll = async(req,res,next) => {

    try{
    
        const data = await orderModel.find().populate({path:'user'}).populate({path:'cart',populate:{path:'category',select:'name'}})

        res.send({
            message:'get order successfully ',
            status:200,
            data : data 
        })
    }
    catch(err){
        res.send({
            message:'not get order successfully ',
            status:404,
            data : data 
        })
    }
} 

const getOrderById = async(req,res,next)=>{
    const _id = req.params._id
    try{

        
        console.log(_id)
        const data = await orderModel.findById(_id)
        res.send({
            message:'get specific order by its id ',
            status: 201,
            data :data 
        })
    }
    catch(err){
        res.send({
            message:'not get specific order ',
            status:404,
            data : data 
        })
    }
    
}

const deleteOrder = async(req,res,next)=>{
    const _id = req.params._id
    try{

        
        console.log(_id)
        const data = await orderModel.findByIdAndDelete(_id)
        res.send({
            message:'delete order successfully',
            status: 201,
            data :data 
        })
    }
    catch(err){
        res.send({
            message:'not delete order successfully ',
            status:404,
            data : data 
        })
    }
}


const statusChangers = async(req,res,next) => {
    try{

        const orderID = req.params._id
        const data = await orderModel.findOne({ _id : orderID})
        
        if(data.status == "pending" && data.totalprice >= 2000 )
        {
        
        updateStatus = await orderModel.findOneAndUpdate(data._id,{$set:{status:"inprocess"}}) 
        res.send({
            message:"status changed into in process",
            status:201,
            data :updateStatus
            
        })
        
        }
        else if(data.totalprice < 2000 ){
            res.send({
                message:"your order is not greater than 2000",
                status:400
                
                
            })
        }
        else if (data.status == "inprocess"){
            updateStatus = await orderModel.findOneAndUpdate(data._id,{$set:{status:"deliver"}}) 
        res.send({
            message:"status changed into in deliver",
            status:201,
            data :updateStatus
            
        })
        }
        
        
    }
    catch(err){
        console.log("invalid")
    }
    
} 

module.exports= { 
    createOrders,
    getAll,
    getOrderById,
    statusChangers,
    deleteOrder
}