const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors()) ;
app.use(express.static('public/build'));

const cookieParser=require('cookie-parser');
app.use(express.json());
const port= process.env.PORT || 3000;
app.listen(port,function(){
    console.log(`server listening on port ${port}`); 
});
app.use(cookieParser());

const userRouter = require('./Routers/userRouter');
const planRouter = require('./Routers/planRouter');
const reviewRouter = require('./Routers/reviewRouter');
const bookingRouter=require('./Routers/bookingRouter');

app.use("/user", userRouter);
app.use("/plans", planRouter);
app.use("/review", reviewRouter);
app.use('/booking',bookingRouter);




