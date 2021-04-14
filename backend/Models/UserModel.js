const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },
    dateJoined: {
        type: Date,
        required: true,
        default: Date.now
    },

    premium: {
        type: Boolean,
        required: true,
        default: false
    },

    
})


const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    
    id: {
        type: Number,
        required: true,
        default: Math.floor(Math.random() * 100000)
    },


})



module.exports = mongoose.model('User', userSchema)






















/*class Student {
    constructor(name, age, id, level, problemsSolved) {
        this.name = name;
        this.age = age;
        this.id = id;
        this.level = level;
        this.problemsSolved = problemsSolved;
    }



    solvingProblem() {
        this.problemsSolved += 1;
        this.level += 0.21;
    }
}


module.exports = Student*/