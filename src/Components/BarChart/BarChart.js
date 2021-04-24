import React, {useState, useEffect} from 'react';
import "./BarChart.css"

const BarChart = (props) => {

    const [chartData, setChartData] = useState()


    useEffect(() => {

        let i;
        for(i = 0; i< props.data.length; i++){
            if(props.data[i].title === props.workoutTitle){
                setChartData(props.data[i])
            }
        }



    }
    ,[])

    console.log(chartData)
    return (  <div className="bar-chart-container">
        <button onClick={() => {props.closeWorkoutView('off')}}>Back</button>


    <div className="y-legend-container"></div>
    <div className="bar-chart-bars-container">
     
      
    </div>
    <div className="x-legend-container"></div>

    </div>);
}
 
export default BarChart;