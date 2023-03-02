const express = require('express')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')

app.use(express.json());
app.use(cors())
dotenv.config()

const category_Router = require('./Routes/category')
const order_Router = require('./Routes/order')
const product_Router = require('./Routes/product')
const users_Router = require('./Routes/users')
const reviews_Router = require('./Routes/reviews')

 
app.use('/demo/category/',category_Router)
app.use('/demo/order/',order_Router)
app.use('/demo/product/',product_Router)
app.use('/demo/user/',users_Router)
app.use('/demo/',reviews_Router)


mongoose.connect(process.env.Db).then((res)=>{
    console.log(`database is connect successfully`)
})
.catch(err=>{
    console.log(`database is not connect successfully`)
})


app.listen(process.env.Port, ()=>{
    console.log(`server is running is on port ${process.env.Port}`)
})