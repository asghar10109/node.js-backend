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

UserRouter.post('/login', LoginUser)


UserRouter.post('/profile', Auth , Profile)

UserRouter.put('/updateUsers', Auth, updateUsers)

UserRouter.delete('/deleteUsers',Auth,deleteUsers)


module.exports = UserRouter