import React from 'react';
import "./Workout.css"

const Workout = (props) => {
    return ( <div className="workout-container">
        <div className="workout-title">  {props.data.title}</div>
        <button className="delete-workout-button" onClick={props.deleteWorkout}>Delete</button>
      
    </div> );
}
 
export default Workout;