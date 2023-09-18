/*
File contains code for :
--> plan schema in mongodb database. 
*/
const mongoose = require("mongoose");
const db_link = "mongodb+srv://svihang8:infernape@cluster0.zhfaggz.mongodb.net/?retryWrites=true&w=majority";
mongoose
.connect(db_link)
.then(function (db) {
  console.log("plan db connected");
})
.catch(function (err) {
  console.log(err);
});


/**
 * Plan collection contains following field.
 * name --> plan name required
 * duration --> plan duration is stored as Number
 * price --> plan price stored as number
 * ratingsAverage --> plan ratings
 * discount --> plan discount stored as number
 */
const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "plan name should not exceed more than 20 characters"],
  },
  duration: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: [true, "price not entered"],
  },
  ratingsAverage: {
    type: Number,
  },
  discount: {
    type: Number,
    validate: [
      function () {
        return this.discount < 100;
      },
      "dicount should not exceed price",
    ],
  },
});

// model
const planModel = mongoose.model("planModel", planSchema);

// (async function createPlan() {
//   let planObj = {
//     name: "SuperFood10",
//     duration: 30,
//     price: 1000,
//     ratingsAverage: 5,
//     discount: 20,
//   };
//   // let data= await planModel.create(planObj);
//   // console.log(data);
//   const doc = new planModel(planObj);
//   await doc.save();
// })();

module.exports = planModel;
