const jwt=require('jsonwebtoken');

/** 
JWT_KEY is required from secrets file.
*/
const {JWT_KEY}=require('../secrets');



module.exports=protectRoute;