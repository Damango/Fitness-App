import React from 'react';
import "./Workout.css"

const Workout = (props) => {


    function convertDate(){
        let newDate;
        let longDate = String(props.data.dateCreated);
        newDate = longDate.slice(0, 10)
     
        return(newDate)
      
    }


    
    return ( <div className="workout-container" onClick={() => {props.setWorkoutViewData(props.data); props.openWorkoutView('on'); console.log(props.data)}}>
        <div className="workout-title">  {props.data.title}</div>
        <div className="workout-date">{convertDate()}</div>
        <div className="workout-set-count">{props.data.exercises.length}</div>
       
      
    </div> );
}
 
export default Workout;