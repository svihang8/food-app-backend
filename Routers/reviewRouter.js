const express = require("express");
const reviewRouter = express.Router();
const{protectRoute}=require('../controller/authController');
const{getAllReviews,top3reviews,getPlanReviews,createReview,updateReview,deleteReview}=require('../controller/reviewController');


/** Router gets all reviews */
reviewRouter
.route('/all')
.get(getAllReviews);

/** Router gets top 3 reviews */
reviewRouter
.route('/top3')
.get(top3reviews);

/** Router gets reviews by id */
reviewRouter
.route('/:id')
.get(getPlanReviews);

/**
Router checks if route is protected (user is logged in).
If protected, router post/update/delete review. 
*/
reviewRouter.use(protectRoute);
reviewRouter
.route('/crud/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview)

module.exports=reviewRouter;




