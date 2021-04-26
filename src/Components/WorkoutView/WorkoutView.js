import React, {useState, useEffect} from 'react';
import Exercise from "../Exercise/Exercise"
import { useSpring, animated } from 'react-spring'
import axios from 'axios'


import BarChart from "../BarChart/BarChart"


import "./WorkoutView.css"

const WorkoutView = (props) => {

//Create state change when switching from new to valid workout
    const workoutViewStyle =useSpring({from: {opacity: 0, marginLeft: -50}, to:{opacity:1, marginLeft: 0}})

   

    const workoutTitleStyle = useSpring({from: {opacity: 0, marginLeft: -50}, to:{opacity:1, marginLeft: 0}, delay: 200})

    const [addExerciseRender, setAddExerciseRender] = useState('off')


  
    const [exercises, setExercises] = useState(props.data.exercises);



    const [counter, setCounter] = useState(0);

    const [totalVolume, setTotalVolume] = useState(0)
    const volumeCount = useSpring({from:{val : 0} ,to:{val: totalVolume}, delay: 200})

    
    const exerciseCount = useSpring({from:{val : 0} ,to:{val:(exercises ? exercises.length : 0)}})

    const [barChartData, setBarChartData] = useState(props.templateData)






    useEffect(() => {

       
        if(exercises != null){
            calculateVolume()

        }
   

    }, [])


   

    function calculateVolume(){

        let exerciseList = props.data.exercises;
        let volume = 0;
        let i,j;
        
        for(i = 0; i < exerciseList.length; i++){
           
            for(j = 0; j < exerciseList[i].sets.length; j++){
                volume += (exerciseList[i].sets[j].reps * exerciseList[i].sets[j].weight );
                
            }
            
        }
        //console.log(volume)
        setTotalVolume(volume)

        //console.log(totalVolume)


        
    }


    function getWorkoutInformation(){
        let newObject;
        newObject = {
            title: document.querySelector('.new-workout-title').value,
            exercises:[]
        }
        return newObject;
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

    function createTemplateFromWorkout(){
        let theExercises;

        

        

        axios.post('http://localhost:5000/user/getWorkout', {name:props.theName}).then((res) => {

        let i;
        for(i = 0; i < res.data.length; i++){
            if(res.data[i]._id === props.data._id){
                theExercises = res.data[i]
            }
        }


        let j;
        let postObject;
       
       let workoutInfo = {
            data: theExercises,
            date: props.data.dateCreated
        }
        let templateData = workoutInfo
        let templateSkeleton = templateData.data;

        console.log(theExercises)

        for(j = 0; j < templateSkeleton.length; j++){

            templateSkeleton[j].sets = []

        }

        //console.log(templateData)


        postObject = {
            name: props.theName,
            title:props.data.title,
            templateData: [templateData],
            templateSkeleton: templateSkeleton
        }

        //console.log(postObject)
        axios.post('http://localhost:5000/user/addTemplate', postObject).then((res) => {
            console.log(res)
        })




            
          
        })


    

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
              <BarChart closeWorkoutView={props.closeWorkoutView} data={barChartData} workoutTitle={props.data.title}/>
              <button onClick={createTemplateFromWorkout} className="make-template-button">Make Template</button>
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

                            <Exercise  index={index} data={exercise} workouts={props.data} theName={props.theName} exerciseID={exercise.ID} workoutID={props.data._id} deleteExercise={deleteExercise} updateChart={props.updateChart}/>
                            
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