const reviewRouter = require('express').Router()
const Auth = require('../Middleware/Auth')

const {
    createReviews
} = require('../Contollers/reviews')

reviewRouter.post('/createReview',Auth,createReviews)

module.exports = reviewRouter