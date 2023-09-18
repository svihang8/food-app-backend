/*
File contains code for :
--> routing of plans
*/
const express = require("express");
const planRouter = express.Router();
const{protectRoute, isAuthorised}=require('../controller/authController');
const{getPlan,getAllPlans,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController');

/** to get all plans */
planRouter.route('/allPlans')
.get(getAllPlans)

/** to get top 3 plans by rating average */
planRouter.route('/top3').get(top3Plans)

/** 
Router checks if route is protected (user is logged in).
If protected, router gets plan with id.
*/
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan);


/**
Router checks if route is authorised (logged in user has allowed roles)
If authorised, post plan using plan data.
*/
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crudPlan')
.post(createPlan);

/**
If authorised, update/delete plan with id using plan data
*/
planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)

module.exports=planRouter;