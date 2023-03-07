const CategoryRouter = require('express').Router()
const Auth = require('../Middleware/Auth')

const {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    changeStatus
} = require('../Contollers/category')

CategoryRouter.post('/createCategory', Auth ,createCategory)

CategoryRouter.get('/getCategory/:_id',Auth,getCategory)

CategoryRouter.put('/updateCategory/:_id',Auth,updateCategory)

CategoryRouter.delete('/deleteCategory/:_id',Auth,deleteCategory)

CategoryRouter.put('/changeStatus/:_id',Auth,changeStatus)

module.exports = CategoryRouter