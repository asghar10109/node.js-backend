const jwt = require('jsonwebtoken');

const Login_Token_Authentication = (data,time) => {

    return jwt.sign(data , process.env.Secret_JWT , { expiresIn: `${time}` } )

}

module.exports = Login_Token_Authentication;