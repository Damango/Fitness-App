import React, {useState} from 'react';
import "./WorkoutsPage.css"
import Workout from "../Workout/Workout"
import WorkoutView from '../WorkoutView/WorkoutView'
import axios from 'axios';
const WorkoutsPage = (props) => {


    const [workouts, setWorkouts] = useState(props.data.workouts);
    const [counter,setCounter] = useState(0)

    const [workoutView,setWorkoutView] = useState('off')
    const [workoutViewData, setWorkoutViewData] = useState()


    function updateWorkouts(newWorkout){

        let theWorkouts = workouts;
        theWorkouts.push(newWorkout);
        setWorkouts(theWorkouts)
        setCounter(counter + 1)
    }

    function deleteWorkout(workoutID){

        let userData = props.data

        

        axios.post('http://localhost:5000/user/deleteWorkout', {name: props.data.name, workoutID: workoutID}).then( (res) => {
            //console.log(workoutID)
            userData.workouts = res.data
            props.setUserData(userData)
            setWorkouts(res.data)
            setCounter(counter + 1)
            console.log(res)
        })

    }


    function addWorkout(data){

        let workoutTitle = data.title;
        //let exercises = data.exercises
        let exercises = []

        let postObject ={name: props.data.name, workouts: props.data.workouts, title: workoutTitle, exercises: exercises}
        
        axios.post('http://localhost:5000/user/addWorkout', postObject ).then( (res) => {


        axios.post('http://localhost:5000/user/getWorkout', {name:props.data.name}).then( res =>{
            updateWorkouts(
                res.data[res.data.length - 1]
              )
        })
            //console.log(workoutID)
            
         
            console.log(res)
        })
    }


   

    function renderWorkoutView(){

        if(workoutView === 'off'){
            return('')
        }

     

        else if(workoutView === 'on' && workoutViewData == 'new'){
            return(<WorkoutView data={workoutViewData} theName={props.data.name} closeWorkoutView={setWorkoutView} deleteWorkout={deleteWorkout} new={true} addWorkout={addWorkout}/>)
        }

        else if(workoutView === 'on'){
            return(<WorkoutView data={workoutViewData} theName={props.data.name} closeWorkoutView={setWorkoutView} deleteWorkout={deleteWorkout}/>)
        }
        
    }



    return ( <div className="workouts-page-container">

        {renderWorkoutView()}


        
        <div className="portal-button"></div>
        <div className="workouts-section">
            <div>Workouts</div>
            <button onClick={() => {setWorkoutViewData('new'); setWorkoutView('on')}}>ADD WORKOUT</button>
        <div className="workouts-list-container">
      

                {workouts.map((workout) => <Workout data={workout} deleteWorkout={deleteWorkout} setWorkoutViewData={setWorkoutViewData} openWorkoutView={setWorkoutView}/>)}



        </div>
        </div>
        <div className="statistics-container"></div>
        <div className="workout-templates-container"></div>


    </div> );
}
 
export default WorkoutsPage;