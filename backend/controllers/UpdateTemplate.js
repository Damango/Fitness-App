//const Workout = require('../Models/UserModel')
const { Mongoose } = require('mongoose')
const User = require('../Models/UserModel')
const Workout = require('../Models/UserModel')


const updateTemplate = async (req,res,data) =>{



    let templates = []

   

    

   User.findOne({name:req.body.name}, {templates: 1}).then(( User) =>{
        

        let templateExist = false;



        templates = User.templates;


   

           User.updateOne({
                name: req.body.name
            },{
                templates:templates
            }).then(err =>{console.log(err)})
            
            res.json(templates)
             
            console.log("Template Added")
        
      
        

    })


}


module.exports = {
   updateTemplate
}