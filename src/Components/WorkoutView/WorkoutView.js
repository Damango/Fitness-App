import React, {useState} from 'react';
import Exercise from "../Exercise/Exercise"
import { useSpring, animated } from 'react-spring'
import axios from 'axios'


import "./WorkoutView.css"

const WorkoutView = (props) => {

//Create state change when switching from new to valid workout
    const workoutViewStyle =useSpring({from: {opacity: 0, marginLeft: -50}, to:{opacity:1, marginLeft: 0}})

    const exerciseCount = useSpring({from:{val : 0} ,to:{val: 6}})
    const volumeCount = useSpring({from:{val : 0} ,to:{val: 40520}, delay: 200})

    const workoutTitleStyle = useSpring({from: {opacity: 0, marginLeft: -50}, to:{opacity:1, marginLeft: 0}, delay: 200})

    const [addExerciseRender, setAddExerciseRender] = useState('off')
  
    const [exercises, setExercises] = useState(props.data.exercises);
    const [counter, setCounter] = useState(0)



    function getWorkoutInformation(){
        let newObject;
        newObject = {
            title: document.querySelector('.new-workout-title').value,
            exercises:[]
        }
        return newObject;
    }


    function submitExercise(){

        let oldExercises = exercises;
        let newExercises = oldExercises
        let exerciseTitle = document.querySelector('.exercise-title-input')
        let categories = ['Chest']
        let sets = [];


        let newExerciseObject = {
            title: exerciseTitle,
            categories: categories,
            sets: sets
        }

        newExercises.push(newExerciseObject)

    }


    function deleteExercise(exerciseID){


        let postObject;
        let exerciseList = exercises;
        let i;


        for(i = 0; i < exerciseList.length; i++){
            if(exerciseList[i].ID === exerciseID){
                exerciseList.splice(i , 1)
            }
        }
        postObject ={name: props.theName, workoutID: props.data._id, exerciseID:exerciseID}

        axios.post('http://localhost:5000/user/deleteExercise', postObject ).then( (res) => {
            setExercises(exerciseList)
            setCounter(counter + 1)
            })

    }


 function submitExercise(){

    let exerciseList = exercises;

    let exerciseTitle = document.querySelector('.exercise-title-input').value
        let categories = ['Chest']
        let sets = [];
        let exercise = 
            {
                title: exerciseTitle,
            categories: categories,
            sets: sets,
            ID: Math.floor(Math.random() * 5000) * Math.floor(Math.random() * 5000)
        }

        exerciseList.push(exercise)
        let postObject ={name: props.theName, workoutID: props.data._id, newExercise:exercise}
        axios.post('http://localhost:5000/user/addExercise', postObject ).then( (res) => {
        setExercises(exerciseList)
        })
        setCounter(counter + 1)

    }





    function exerciseRender(){
        if(addExerciseRender == 'on'){
            return(<div>
                <span>Exercise Name: <input className="exercise-title-input"/></span>
                <span>Categories:  <input className="weight-input"/></span>
                <button onClick={submitExercise}>Submit</button>
            </div>)
        }
        else{
            return('')
        }
    }




    if(props.new == true){

        return ( <animated.div className="workout-view-container">

            <div className="workout-view-wrapper">
                
                <animated.div style={workoutTitleStyle} className="workout-title"><input className="new-workout-title" placeholder="Enter Workout Title"/></animated.div>
                <button onClick={() => {props.addWorkout(getWorkoutInformation())}}>Submit</button> 
                <button className="delete-workout-button" onClick={ () => {props.deleteWorkout(props.data._id); props.closeWorkoutView('off')}}>Delete</button>
                
                <button className="close-workout-view" onClick={() => {props.closeWorkoutView('off')}}>X</button>
                </div> 
         </animated.div> );
    }

    else{
        return(
            <animated.div style={workoutViewStyle} className="workout-view-container">
                
              <div className="workout-chart-container">
              <button className="close-workout-view" onClick={() => {props.closeWorkoutView('off')}}>Back</button>
              <button className="edit-workout-button" onClick={() => {props.closeWorkoutView('off')}}>Edit</button>
                  <div className='bars-container'>
                  
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                     <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  <div className="bar-example example1"></div>
                  <div className="bar-example example2"></div>
                  </div>      
                        </div>

                        <div className="chart-selector-container">
                    <div className="chart-selector-button"><span className="selector-button-text">Exercises <animated.span style={exerciseCount} className="selector-number">{exerciseCount.val.interpolate(val => Math.floor(val))}</animated.span></span></div>
                    <div className="chart-selector-button"><span className="selector-button-text">Volume<animated.span style={volumeCount} className="selector-number">{volumeCount.val.interpolate(val => Math.floor(val))}</animated.span></span></div>
                    <div className="chart-selector-button"><span className="selector-button-text">Rest Time<animated.span className="selector-number">2:13</animated.span></span></div>
                    <div className="chart-selector-button"><span className="selector-button-text">Duration<animated.span className="selector-number">43:20</animated.span></span></div>
                </div>

                <div className="workout-view-wrapper">
                    
        
                        <animated.div style={workoutTitleStyle} className="workout-view-title">{props.data.title}</animated.div> 
                        <button className="delete-workout-button" onClick={ () => {props.deleteWorkout(props.data._id); props.closeWorkoutView('off')}}>Delete</button>
                       
                        <div className='exercises-container'>
                            {exercises.map((exercise, index) => 

                            <Exercise index={index} data={exercise} workouts={props.data} theName={props.theName} exerciseID={exercise.ID} workoutID={props.data._id} deleteExercise={deleteExercise} updateChart={props.updateChart}/>
                            
                            )}

                            {exerciseRender()}
                        </div>
                        
                        <button onClick={() => {setAddExerciseRender('on')}}>Add Exercise</button>
                </div>
         </animated.div>
        )
    }




  
}
 
export default WorkoutView;