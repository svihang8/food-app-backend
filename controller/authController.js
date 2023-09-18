const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utility/nodemailer");
const { JWT_KEY } = require("../secrets");

/**
Function recieves user signup data from HTTP request body.
signup data is stored as MongoDB Document in User Collection.
mail is send to user to confirm signup.
*/
module.exports.signup = async function signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    sendMail("signup",user);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
    // console.log('backend',user);
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};


/**
Function recieves user login data from HTTP request body.
user data is verified as existing MongoDB Document in User Collection.
if valid, login cookie is stored with jwt web token.
*/
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypt -> compare
        if (user.password == data.password) {
          let uid = user["_id"]; //uid
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          // res.cookie('isLoggedIn',true);
          return res.json({
            message: "User has logged in",
            data: user, // userDetails:data,
          });
        } else {
          return res.json({
            message: "wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "User not found",
        });
      }
    } else {
      return res.json({
        message: "Empty field found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

/** 
Middleware function that checks if user role is contained in roles.
Assuming role is contained, next function / middleware is executed.
If role is not contained, response is given with status 401 and unauthorised error.
*/
module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operation not allowed",
      });
    }
  };
};

/** 
Middleware function that checks if login cookie exists.
Assuming cookie exists, next function / middleware is executed.
If cookie does not exist, response is to redirect to login page.
*/
module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      console.log(req.cookies);
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        console.log("payload token", payload);
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        console.log(req.role, req.id);
        next();
      } else {
        return res.json({
          message: "please login again",
        });
      }
    } else {
      //browser
      const client=req.get('User-Agent');
      if(client.includes("Mozilla")==true){
        return res.redirect('/login');
      }
      //postman
      res.json({
        message: "please login",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

/**
Function recieves user email from HTTP request body.
reset password token is created and reset password URL is created.
mail is sent to user containing reset password URL.
*/
module.exports.forgetpassword = async function forgetpassword(req, res) {
  let { email } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      //createResetToken is used to create a new token
      const resetToken = user.createResetToken();
      // http://abc.com/resetpassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to the user
      //nodemailer
      let obj={
        resetPasswordLink:resetPasswordLink,
        email:email
      }
      sendMail("resetpassword",obj);
      return res.json({
        mesage: "reset password link sent",
        data:resetPasswordLink
      });
    } else {
      return res.json({
        mesage: "please signup",
      });
    }
  } catch (err) {
    res.status(500).json({
      mesage: err.message,
    });
  }
};

/**
Function recieves reset password token from HTTP request params.
Function recieves new password from HTTP request body.
password is reset.
*/
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.parmas.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPasswordHandler will update user's password in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: "password changed succesfully, please login again",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

/**
 * login cookie is set to "".
*/
module.exports.logout=function logout(req,res){
  res.cookie('login',' ',{maxAge:1});
  res.json({
    message:"user logged out succesfully"
  });
}
