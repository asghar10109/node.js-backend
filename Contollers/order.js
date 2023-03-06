const orderModel = require('../Models/order')

const createOrders = async(req,res,next)=>{
    try{

        const newOrder = new orderModel({
            cart:req.body.cart,
            user:req.body.user,
            status: req.body.status || "pending"
    
        })
        const data = await newOrder.save()
        res.send({
            message:"new order created successfully",
            status:201,
            data:data 
    
        })
    }
    catch(err){
        res.send({
            message:"new order created successfully",
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
         
        data.status == "pending" ? 
        updateStatus = await orderModel.findOneAndUpdate(data._id,{$set:{status:"inprocess"}}) 
        (!updateStatus.acknowledged
        ? (res.send({ message: "order is in process",status:201 }))
        : (res.send({ message: "order is not updated",status:201 }))) 
        
        : 
        updateStatus = await orderModel.findOneAndUpdate(data._id,{$set:{status:"inprocess"}}) 
        (!updateStatus.acknowledged 
        ? (res.send({ message: "order is in deliver",status:201 }))
        : (res.send({ message: "order is not updated",status:201 })));
       

        
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