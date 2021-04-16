//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const addWorkout = async (req,res,data) =>{




    if(User.findOne({name:req.body.name})){

        let workouts = req.body.workouts;
        console.log(req.body.workouts)
   

        let workout = {
            title: 'SUP DAY Day',
            sets: [Math.random() * 500]
         }


       workouts.push(workout)

         

       
        await User.updateOne({
            name: req.body.name
        },{
            workouts:workouts
        })
        
        res.json(workouts)
         
        console.log("Workout Added")


     
         /*user.save().then(user => {
             res.json(user)
         }).catch(error => {
             res.json({
                 message: "Error creating user"
             })
         })*/
       
    }


}


module.exports = {
   addWorkout
}