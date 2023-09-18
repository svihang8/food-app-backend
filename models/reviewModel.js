/*
File contains following code :
--> review schema in mongodb.
*/

const mongoose=require('mongoose');
const db_link='mongodb+srv://svihang8:infernape@cluster0.zhfaggz.mongodb.net/?retryWrites=true&w=majority';
mongoose
.connect(db_link)
.then(function(db){
  console.log('review db connected');
})
.catch(function(err){
  console.log(err);
});

/** 
 * Fields in Review Schema
 * review --> content of review
 * rating --> review rating from 1 - 10
 * createdAt --> review data created default as date of creation
 * user --> user who sets review references User Collection
 * plan --> plan for which review is set references Plan Collection
*/
const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
});

/**
 * Function runs before findbyid or findbyone
 * 
 */
reviewSchema.pre(/^find/, function (next) {
    this.populate({
      path: "user",
      select: "name profileImage"
    }).populate("plan");
    next();
  });


const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;