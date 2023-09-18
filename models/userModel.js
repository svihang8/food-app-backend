/*
File contains code for :
--> user schema in mongodb database.
--> user schema methods for resetting password.
*/
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
const db_link='mongodb+srv://svihang8:infernape@cluster0.zhfaggz.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('user db connected');
})
.catch(function(err){
  console.log(err);
});

/**
 * User schema contains following fields.
 * name --> user name required
 * email --> user email validated required
 * password --> user password required with minimum length 8 required
 * confirmPassword --> confirm password validated == password required
 * role --> user role set from predefined values default is 'user'
 * profileImage --> user profile stored as string value default is usericon.png
 * resetToken --> user token to reset password, a string.
 */
const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    validate:function(){
      return emailValidator.validate(this.email);
    }
  },
  password:{
    type:String,
    required:true,
    minLength:8
  },
  confirmPassword:{
    type:String,
    required:true,
    minLength:8,
    validate:function(){
      return this.confirmPassword==this.password
    }
  },
  role:{
    type:String,
    enum:['admin','user','restaurantowner','deliveryboy'],
    default:'user'
  },
  profileImage:{
    type:String,
    default:'../Images/UserIcon.png'
  },
  resetToken:String
});

//remove - explore on own

/**
 * executed before save() i.e. pre hook
 * sets confirmPassword to undefined
 */
userSchema.pre('save',function(){
  this.confirmPassword=undefined;
});

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString=await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
// })

/**
 * Function that creates random reset token 
 */
userSchema.methods.createResetToken=function(){
  //creating unique token using npm i crypto
  const resetToken=crypto.randomBytes(32).toString("hex");
  this.resetToken=resetToken;
  return resetToken;
}

/** 
 * Function sets password and confirmPassword to parameter values
 * sets resetToken to undefined.
*/
userSchema.methods.resetPasswordHandler=function(password,confirmPassword){
  this.password=password;
  this.confirmPassword=confirmPassword;
  this.resetToken=undefined;
}

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;