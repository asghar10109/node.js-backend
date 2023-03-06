const OrderRouter = require('express').Router()
const Auth = require('../Middleware/Auth') 

const {
    createOrders,
    getAll,
    getOrderById,
    statusChangers,
    deleteOrder
} = require('../Contollers/order')

OrderRouter.post('/createOrder',Auth, createOrders)
OrderRouter.get('/getAll',Auth, getAll)
OrderRouter.get('/getOrderById/:_id',Auth,getOrderById)
OrderRouter.delete('/deleteOrder/:_id',Auth,deleteOrder)
OrderRouter.put('/statusChange/orderID/:_id',statusChangers)
module.exports = OrderRouter