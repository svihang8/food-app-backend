/*
File contains code for :
--> routing for signup, login, password reset, logout, profile upload
*/

const express = require("express");
const userRouter = express.Router();
const multer=require('multer');
// const protectRoute=require('./authHelper');
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage}=require('../controller/userController');
const{signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout}=require('../controller/authController');

/** to update/delete user with given id. */
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)

/** to post user using signup function */
userRouter
.route('/signup')
.post(signup)

/** to post user using login function (existing user) */
userRouter
.route('/login')
.post(login)

/** to initialise post password reset function */
userRouter
.route('/forgetpassword')
.post(forgetpassword)

/** to post password reset function (through assigned token) */
userRouter
.route('/resetpassword/:token')
.post(resetpassword)

/** to get logout function */
userRouter
.route('/logout')
.get(logout)


//multer for fileupload

// upload-> storage , filter
const multerStorage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/images')
    },
    filename:function(req,file,cb){
        cb(null,`user-${Date.now()}.jpeg`)
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true)
    } else {
      cb(new Error("Not an Image! Please upload an image"), false)
    }
  }

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
  });

  userRouter.post("/ProfileImage", upload.single('photo') ,updateProfileImage);
  //get request
  userRouter.get('/ProfileImage',(req,res)=>{
      res.sendFile("/Users/vihangshah/Documents/GitHub/foodApp_backend/multer.html");
  });

/** 
Router checks if route is protected (user is logged in).
If protected, router responds with user profile.
*/
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

/**
Router checks if route is authorised (logged in user has allowed roles).
If authorised, router responds with all user profiles.
*/
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)

module.exports=userRouter;