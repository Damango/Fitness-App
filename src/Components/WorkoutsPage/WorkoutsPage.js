import React from 'react';
import "./WorkoutsPage.css"
import Workout from "../Workout/Workout"
const WorkoutsPage = (props) => {



    function deleteWorkout(workoutID){




    }




    return ( <div className="workouts-page-container">

        <button onClick={ () => {props.changeView('landing-page')}}>HOME</button>

        <div className="workouts-list-container">

                {props.workouts.map((workout) => <Workout data={workout} deleteWorkout={deleteWorkout}/>)}



        </div>
        <div className="statistics-container"></div>
        <div className="workout-templates-container"></div>


    </div> );
}
 
export default WorkoutsPage;