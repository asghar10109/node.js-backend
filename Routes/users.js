const Userrouter = require('express').Router()
const UserImage = require('../Middleware/UserImage');
const Auth = require('../Middleware/Auth')
const {
    createUser,
    LoginUser,
    Profile,
    updateUsers,
    deleteUsers
} = require('../Contollers/users')

Userrouter.post('/createUsers', UserImage.upload , createUser)

Userrouter.post('/login',   LoginUser)

Userrouter.post('/profile', Auth , Profile)

Userrouter.put('/updateUsers', Auth, updateUsers)

Userrouter.delete('/deleteUsers',Auth,deleteUsers)


module.exports = Userrouter