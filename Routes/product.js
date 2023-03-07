const productRouter = require('express').Router()
const Auth = require('../Middleware/Auth') 

const {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProduct
} = require('../Contollers/product')

productRouter.post('/createProduct',Auth,createProduct)

productRouter.get('/getProduct/:_id',Auth,getProduct)

productRouter.put('/updateProduct/:_id',Auth,updateProduct)

productRouter.delete('/deleteProduct/:_id',Auth,deleteProduct)

productRouter.get('/searchProduct/:name',Auth,searchProduct)

module.exports = productRouter

