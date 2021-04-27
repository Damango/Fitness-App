//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const updateTemplate = async (req,res,data) =>{



    let templates = []

   

    

   User.findOne({name:req.body.name}, {templates: 1}).then(( User) =>{
        
        let templateExist = false;

        if(req.body.updateType === 'workout'){

        }
        else if(req.body.updateType === 'exercise'){

            let workoutID = req.body.workoutID;

            let i;

            let templates = User.templates;
            console.log(templates[0])
  




            
        }

        else if(req.body.updateType === 'set'){
            
        }



       /* templates = User.templates;
           User.updateOne({
                name: req.body.name
            },{
                templates:templates
            }).then(err =>{console.log(err)})
            
            res.json(templates)
             
            console.log("Template Added")*/
    
    })


}


module.exports = {
   updateTemplate
}