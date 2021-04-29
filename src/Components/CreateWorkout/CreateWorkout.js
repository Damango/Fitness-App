import React, {useState} from 'react';
import { useSpring, animated } from 'react-spring'
import "./CreateWorkout.css"


const CreateWorkout = (props) => {

    const createWorkout = useSpring({from: {opacity: 0, marginTop: -50}, to:{opacity:1, marginTop: 0}})



    function getWorkoutInformation(){
        let newObject;
        newObject = {
            title: document.querySelector('.create-workout-title-input').value,
            exercises:[]
        }
        return newObject;
    }







    return ( <animated.div style={createWorkout} className="create-workout-container">
        <div className="create-workout-overlay"></div>
        <input placeholder="Workout Title" className="create-workout-title-input"/>
        <button className="create-workout-button" onClick={() => {props.addWorkout(getWorkoutInformation()); props.closeWorkoutView('off')}}>Create Workout +</button>
        <button className="cancel-workout-button" onClick={() => {props.closeWorkoutView('off')}}>Cancel</button>



    </animated.div> );
}
 
export default CreateWorkout;