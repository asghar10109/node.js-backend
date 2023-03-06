const reviewsModel = require('../Models/reviews') 

const OrderModel = require('../Models/order')
const productModel = require('../Models/product')
const categoryModel = require('../Models/category')

const createReviews = async(req,res,next)=>{
    const UserID = req.id;
    const OrderID = req.params.oid
    try{

        const order = await OrderModel.findById(OrderID)
        const Order_UserId = order.user.toString();
        
        if(Order_UserId === UserID && order.status === "deliver"){
            const reviews = new reviewsModel({
                order : req.body.order,
                rating : req.body.rating,
                status : req.body.status
            })
    
            const data = await reviews.save();
            res.send({
                message:"Order get Reviews",
                status:201,
                data: data
            })
        }else{
            res.send({
                message:"User Not Matched",
                status:404
            })
        }
    }catch(err){
        res.send({
            message:"Server not working!",
            status:503
        })
    }
}

const getReviews = async(req,res,next)=>{
    try{
        const data = await reviewsModel.find().populate({path:'order', select:'_id'})
        res.send({
            message: "get all review"  ,
            status : 200 ,
            data : data 
        })
    }
    catch(err){
        res.send({
            message: "not get all review"  ,
            status : 404 
             
        })
    }
}
const getReviewByID = async(req,res,next)=>{
    try{

        const _id = req.params._id
        const data = await reviewsModel.findById({_id}).populate({path:'order', select:'_id'})
        res.send({
            message:'get Reviews by id',
            status:200,
            data:data
    
        })
    }
    catch(err){

        res.send({
            message: "not get Reviews by id"  ,
            status : 404 
           
        })
    }
    
}
const deleteReviews = async(req,res,next)=>{
    try{

        const _id = req.params._id
        console.log(_id) 
        const data = await reviewsModel.findByIdAndDelete(_id)
        res.send({
            message: "deleted review successfully ",
            status:201,
            data:data 
        })
    }
    catch(err){
        res.send({
            message: "not deleted review successfully"  ,
            status : 404 
            
        })
    }
}
const updateReviews = async(req,res,body)=>{
    try{

        const _id = req.params._id
        console.log(_id)
        const data = await reviewsModel.findByIdAndUpdate(_id,{$set:{rating:req.body.rating}}) 
        res.send({
            message: "updated review successfully ",
            status:201,
            data:data
    
        })
    }
    catch(err){
        res.send({
            message: "not updated review successfully"  ,
            status : 404 
            
        })
    }
}
module.exports= { 
    createReviews,
    getReviews,
    getReviewByID,
    updateReviews,
    deleteReviews
}