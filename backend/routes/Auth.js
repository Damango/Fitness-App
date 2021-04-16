const express = require('express')
const router = express.Router()


const AuthController = require('../controllers/Auth')
const WorkoutController = require('../controllers/AddWorkout')

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/addworkout', WorkoutController.addWorkout)




module.exports = router