//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const getWorkout = async (req,res,data) =>{


   

    User.findOne({name:req.body.name}).then( (user) => {

      //  console.log(user.workouts)
        res.json(user.workouts)
       //res.json(workouts)
    })
}


module.exports = {
   getWorkout
}