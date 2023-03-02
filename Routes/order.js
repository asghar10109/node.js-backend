const Orderrouter = require('express').Router()
const Auth = require('../Middleware/Auth') 

const {
    createOrders,
    getAll,
    getOrderById,
    deleteOrder
} = require('../Contollers/order')

Orderrouter.post('/createOrder',Auth, createOrders)
Orderrouter.get('/getAll',Auth, getAll)
Orderrouter.get('/getOrderById/:_id',Auth,getOrderById)
Orderrouter.delete('/deleteOrder/:_id',Auth,deleteOrder)

module.exports = Orderrouter