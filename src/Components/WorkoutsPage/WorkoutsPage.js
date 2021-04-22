import React, {useState, useEffect} from 'react';
import "./WorkoutsPage.css"
import Workout from "../Workout/Workout"
import WorkoutView from '../WorkoutView/WorkoutView'
import LineChart from "../LineChart/LineChart"
import { ResponsiveLine } from '@nivo/line'
import axios from 'axios';
import {Bar, Line} from 'react-chartjs-2'
const WorkoutsPage = (props) => {


    const [workouts, setWorkouts] = useState(props.data.workouts);
    const [counter,setCounter] = useState(0)

    const [workoutView,setWorkoutView] = useState('off')
    const [workoutViewData, setWorkoutViewData] = useState()

    const [chartData, setChartData] = useState()

    const [totalVolume, setTotalVolume] = useState()

    useEffect(() => {
        updateChart()
    }, [])


    

    function updateChart(sentData){
        let data = []

        if(sentData == null){
            data = workouts;
        }
        else{
            data = sentData
        }
   
        console.log(workouts)

        let dataObject = [{
            id: "Volume",
            color: "hsl(111, 70%, 50%)",
            data: []
           
        }]

        let i,j, k;
        let totalVolume = 0;
        for(i = 0; i < data.length; i++){

            let theVolume = 0
    
            for(j = 0; j < data[i].exercises.length; j++){       
                for(k = 0; k < data[i].exercises[j].sets.length; k++){
                    theVolume += (data[i].exercises[j].sets[k].reps * data[i].exercises[j].sets[k].weight);
                    totalVolume += (data[i].exercises[j].sets[k].reps * data[i].exercises[j].sets[k].weight);  
                }
            }
            dataObject[0].data.push({
                x: data[i].dateCreated,
                y: theVolume
            })

            
        }   

        setTotalVolume(totalVolume)
        setChartData(dataObject)
    }






    function updateWorkouts(newWorkout){

        let theWorkouts = workouts;
        theWorkouts.push(newWorkout);
        setWorkouts(theWorkouts)
        updateChart()
        //alert("FUCK")
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
            updateChart(res.data)
        })
       
        
        //updateWorkouts()
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
            return(<WorkoutView data={workoutViewData} theName={props.data.name} closeWorkoutView={setWorkoutView} deleteWorkout={deleteWorkout} updateChart={updateChart}/>)
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
        <div className="statistics-section">
            <div className="statistics-container">
             
            <div className="stats-info-container">
                <div className="stat-category-changer">
                    Volume
                </div>
                <div className="stat-category-description">
                    Last 10 Workouts
                </div>
                <div className="total-volume">{totalVolume}</div>
            </div>

         
        
            <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        curve='linear'
        axisBottom={{
            orient: 'bottom',
            tickSize: 35,
            tickPadding: 25,
            tickRotation: 5,
            legend: 'Day',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Volume',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        fill={'#e74c3c'}
        colors={'#e74c3c'}
        enableArea={true}
        areaOpacity={0.5}
        areaBaselineValue={2000}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'square',
                symbolBorderColor: 'red',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />








            </div>
        </div>
        <div className="workout-templates-container"></div>


    </div> );
}
 
export default WorkoutsPage;


//<LineChart workoutData={workouts} chartData={chartData}/>