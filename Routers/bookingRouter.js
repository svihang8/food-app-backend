const express=require('express');
const {protectRoute}=require('../controller/authController');
const {createSession}=require('../controller/bookingController');

const bookingRouter=express.Router();


bookingRouter.post('/createSession',protectRoute,createSession);

bookingRouter.get('/createSession',function(req,res){
    res.sendFile("/Users/vihangshah/Documents/GitHub/foodApp_backend/booking.html");
});

module.exports=bookingRouter;