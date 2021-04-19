import React, {useState} from 'react';
import "./WorkoutView.css"

const WorkoutView = (props) => {


    const [addExerciseRender, setAddExerciseRender] = useState('off')

    //console.log(props)



    function getWorkoutInformation(){
        let newObject;
        newObject = {
            title: document.querySelector('.new-workout-title').value,
            exercises:[]
        }

        return newObject;
    }



    function addExercise(){


        let exercises = props.data.exercises;
        //exercises

    }

    function exerciseRender(){
        if(addExerciseRender == 'on'){
            return(<div>
                <span>Sets: <input className="sets-input"/></span>
                <span>Weight:  <input className="weight-input"/></span>
            </div>)
        }
        else{
            return('')
        }
    }


    if(props.new == true){

        return ( <div className="workout-view-container">

            <div className="workout-view-wrapper">
                
                <div className="workout-title"><input className="new-workout-title" placeholder="Enter Workout Title"/></div>
                <button onClick={() => {props.addWorkout(getWorkoutInformation())}}>Submit</button> 
                <button className="delete-workout-button" onClick={ () => {props.deleteWorkout(props.data._id); props.closeWorkoutView('off')}}>Delete</button>
                
                <button className="close-workout-view" onClick={() => {props.closeWorkoutView('off')}}>X</button>
                </div> 
         </div> );
    }

    else{
        return(
            <div className="workout-view-container">
              

                <div className="workout-view-wrapper">
        
                        <div className="workout-title">{props.data.title}</div> 
                        <button className="delete-workout-button" onClick={ () => {props.deleteWorkout(props.data._id); props.closeWorkoutView('off')}}>Delete</button>
                        <button className="close-workout-view" onClick={() => {props.closeWorkoutView('off')}}>X</button>
                        <div className='exercises-container'>
                            {props.data.exercises.map((exercise) => 

                            <div className="exercise-container">
                                <div className="exercise-title">{exercise.title}</div>
                                <div className="exercise-volume"></div>
                                <div className="exercise-sets-container">
                                    {exercise.sets.map((set) => <div className="set-number-container">{set.weight + ' x '+ set.reps}</div>)}
                                </div>
                                <div className="exercise-input-container">
                                {exerciseRender()}
                                </div>
                            </div>
                            
                            )}
                        </div>
                        
                        <button onClick={() => {setAddExerciseRender('on')}}>Add Exercise</button>
                </div>
         </div>
        )
    }




  
}
 
export default WorkoutView;