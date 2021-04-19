const express = require('express')
const router = express.Router()


const AuthController = require('../controllers/Auth')
const WorkoutController = require('../controllers/AddWorkout')
const getWorkoutController = require('../controllers/GetWorkouts')
const DeleteWorkoutController = require('../controllers/DeleteWorkout')



router.post('/deleteWorkout', DeleteWorkoutController.deleteWorkout)


router.post('/getWorkout', getWorkoutController.getWorkout)

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/addworkout', WorkoutController.addWorkout)




module.exports = router