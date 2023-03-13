const userModel = require('../Models/users')
const CryptoJS = require("crypto-js");
const Login_Token_Authentication = require('../Middleware/loginJwt')

const createUser = async (req,res,next) => {
try{
    const filename = req.file.path;
    const files = `${filename}`.replace("public","")

        const newUser = new userModel({
            username: req.body.username,
            address: req.body.address,
            email: req.body.email,
            password:  CryptoJS.AES.encrypt(req.body.password, process.env.Secret_password ).toString(),
            phone: req.body.phone,
            avator: `${files}`?.replace(/\\/g, "/"),
        });
        const datas = await newUser.save();
        res.send({
            message:"Customer created successfully",
            status:201,
            data : datas
        })
}catch(err){
    res.send({
        message:"Customer Not found",
        status:404
    })
}
}
const LoginUser = async (req,res,next) => {
    
    const type_email = req.body.email
    const type_password = req.body.password

    const data = await userModel.findOne({ email : type_email });
    const show_password = CryptoJS.AES.decrypt(data?.password,  process?.env?.Secret_password);
    const original_password = show_password.toString(CryptoJS.enc.Utf8);
    type_email == data?.email && type_password == original_password  ?
    res.send( {message:"token generated", status:201 ,data :  Login_Token_Authentication(data , '1d') })   :
    res.send( {message:"token not found",status:404} )
}
const Profile = async (req,res,next) => {
    const Id = req.id
    try{
        const data = await userModel
                            .findOne({ _id : Id })
                            .select('_id username address email phone avator');
        res.send({
            message:"Data found",
            status:200,
            data : data
        })
    }catch(err){
        res.send({
            message:"Data not found",
            status:404
        }) 
    }
}
const updateUsers = async (req,res,next)=>{
    const Id = req.id
    try{
        
        
        const data = await userModel.updateOne({_id: Id},{$set:{username:req.body.username}})
        data.acknowledged === true ?
        (
            res.send({
                message: "User updated",
                status:201,
            })
        ) :
        (
            res.send({
                message: "User not updated",
                status:204,
            })  
        )
    }
    catch(err){
        res.send({
            message: "server Error",
            status:503
        }) 
    }
    
}
const deleteUsers = async(req,res,next)=>{
    const ID = req.id
    try{

        
        const data = await userModel.deleteOne({_id:ID})
        res.send({
            message:'deleted user',
            status:201,
            data : data 
        })
    }
    catch(err){
        res.send({
            message:'not deleted user',
            status:404,
             
        })
    }
}

module.exports= { 
    createUser,
    LoginUser,
    Profile,
    updateUsers,
    deleteUsers
}