import axios from 'axios';
import "./Exercise.css"
import Category from "../Exercise/Category/Category"
import { useSpring, animated } from 'react-spring'
import React, {useState} from 'react';

const Exercise = (props) => {

    const exerciseStyle = useSpring({from: {opacity: 0}, to:{opacity : 1}, delay:(props.index * 150) + 200})

    const [addSetRender, setAddSetRender] = useState('+')
    const [setList, setSetList] = useState(props.data.sets);
    const [counter, setCounter] = useState(0)


    console.log()


    function setRender(){
        if(addSetRender === '-'){
            return(<div className="set-inputs-container">
                <input className={"weight-input weight-input-" + props.exerciseID} placeholder="Weight"/>
                <input className={"reps-input reps-input-"+props.exerciseID} placeholder="Reps"/>
                <button className="submit-reps-button" onClick={() => {addSet()}}>Submit</button>
            </div>)
        }
        else{
            return('')
        }

    }

    function deleteExercise(){

    }


    function addSet(){

        let oldList = setList;
        let newList;
        let theWeight = document.querySelector('.weight-input-' + props.exerciseID).value;
        let theReps = document.querySelector('.reps-input-' + props.exerciseID).value

        let newSet = {
            weight: theWeight,
            reps: theReps

        }

        let postObject = {
            name: props.theName,
            workouts: props.workouts,
            workoutID:props.workoutID,
            exerciseID: props.exerciseID,
            newSet: newSet
        }

        oldList.push(newSet);

        newList = oldList;

        axios.post('http://194.195.215.144:5000/user/addSet', postObject).then( res =>{

            console.log(res)
        })

        setSetList(newList)
        props.updateChart()
        setCounter(counter + 1)
        

    }








    return ( <animated.div style={exerciseStyle} className="exercise-container">
        <button className="delete-exercise-button" onClick={() => {props.deleteExercise(props.data.ID)}}>DELETE</button>
    <div className="exercise-title">{props.data.title}</div>
    <div className="exercise-categories">{props.data.categories.map((cat) => <Category category={cat}/>)}</div>
    <div className="exercise-volume"></div>
    <div className="exercise-sets-container">
        {setList.map((set) => <div className="set-number-container">{set.weight + ' x '+ set.reps}</div>)}
        <button className="add-set-button" onClick={() => {if(addSetRender == '+'){setAddSetRender('-')} else{setAddSetRender('+')} }}>{addSetRender}</button>
        {setRender()}
    </div>
    <div className="exercise-input-container">
    
    </div>
   
</animated.div> );
}
 
export default Exercise;