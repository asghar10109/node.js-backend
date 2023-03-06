const UserRouter = require('express').Router()
const UserImage = require('../Middleware/UserImage');
const Auth = require('../Middleware/Auth');
const {
    createUser,
    LoginUser,
    Profile,
    updateUsers,
    deleteUsers
} = require('../Contollers/users')

UserRouter.post('/createUsers', UserImage.upload , createUser)

<<<<<<< HEAD
UserRouter.post('/login',   LoginUser)
=======
Userrouter.post('/login', LoginUser)
>>>>>>> 473a045a946f9259843591d39a3fe0903ffb478b

UserRouter.post('/profile', Auth , Profile)

UserRouter.put('/updateUsers', Auth, updateUsers)

UserRouter.delete('/deleteUsers',Auth,deleteUsers)


module.exports = UserRouter