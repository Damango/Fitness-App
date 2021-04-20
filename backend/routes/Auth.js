const express = require('express')
const router = express.Router()


const AuthController = require('../controllers/Auth')
const WorkoutController = require('../controllers/AddWorkout')
const getWorkoutController = require('../controllers/GetWorkouts')
const DeleteWorkoutController = require('../controllers/DeleteWorkout')
const AddExerciseController = require('../controllers/AddExercise');
const AddSetController = require('../controllers/AddSet');
const DeleteExerciseController = require('../controllers/DeleteExercise')



router.post('/deleteWorkout', DeleteWorkoutController.deleteWorkout)


router.post('/getWorkout', getWorkoutController.getWorkout)

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)

router.post('/addworkout', WorkoutController.addWorkout)
router.post('/addExercise', AddExerciseController.addExercise)
router.post('/addSet', AddSetController.addSet)


router.post('/deleteExercise', DeleteExerciseController.deleteExercise)




module.exports = router