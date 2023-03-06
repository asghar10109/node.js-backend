const jwt = require('jsonwebtoken');

const userTokenAuthentication = (req,res,next) => {

    const token = req.headers['authorization'].split(" ")[1];
    if(!token){
        return  res.send({ message:"token is expired you are still un-Authorized" })
    }
        try{
            const decoded =  jwt.verify(token , process.env.Secret_JWT)
            req.id = decoded.id
            next();
            
        }catch(err){
            res.status(400).send("Invalid token.");
        }
        return next

}
<<<<<<< HEAD
module.exports = userTokenAuthentication;
=======

module.exports = User_Token_Authentication;


>>>>>>> 473a045a946f9259843591d39a3fe0903ffb478b
