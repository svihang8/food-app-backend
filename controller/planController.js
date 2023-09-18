const planModel = require("../models/planModel");

/**
Function responds with all existing plans.
*/
module.exports.getAllPlans = async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "all plans retrieved",
        data: plans,
      });
    } else {
      return res.json({
        message: "plans not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
Function recieves id from HTTP request parameters.
Function responds with plan with matching id.
*/
module.exports.getPlan = async function getPlan(req, res) {
  try {
    let id = req.params.id;
    console.log(id);
    let plan = await planModel.findById(id);
    if (plan) {
      console.log(plan);
      return res.json({
        message: "plan retrieved",
        data: plan,
      });
    } else {
      return res.json({
        message: "plan not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
Function recieves plan data from HTTP request body.
plan is created as MongoDB Document in Plan Collection.
*/
module.exports.createPlan = async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "plan created succesfully",
      data: createdPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
Function deletes plan with matching id recieved from HTTP request parameter.
*/
module.exports.deletePlan = async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "plan deleted succesfully",
      data: deletedPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
Function updates plan with matching id recieved from HTTP request parameter.
New plan data is receieved from HTTP request body.
*/
module.exports.updatePlan = async function (req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    console.log(id);
    console.log(dataToBeUpdated);
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    console.log(plan);
    //doc
    await plan.save();
    return res.json({
        message:'plan updated succesfully',
        data:plan
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/** 
Function gets 3 plans such that 3 plans have highest ratingsAverage value, from Plan Collection.
*/
module.exports.top3Plans=async function top3Plans(req,res){ 
    try{
        const plans=await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
        return res.json({
            message:'top3 plans',
            data:plans
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message,
          });
    }
}