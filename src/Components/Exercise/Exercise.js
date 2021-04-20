import axios from 'axios';
import "./Exercise.css"
import Category from "../Exercise/Category/Category"
import React, {useState} from 'react';

const Exercise = (props) => {

    const [addSetRender, setAddSetRender] = useState('off')
    const [setList, setSetList] = useState(props.data.sets);
    const [counter, setCounter] = useState(0)


    console.log()


    function setRender(){
        if(addSetRender === 'on'){
            return(<div className="set-inputs-container">
                <input className={"weight-input-" + props.exerciseID} placeholder="Weight"/>
                <input className={"reps-input-"+props.exerciseID} placeholder="Reps"/>
                <button onClick={() => {addSet()}}>Submit</button>
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

        axios.post('http://localhost:5000/user/addSet', postObject).then( res =>{

            console.log(res)
        })

        setSetList(newList)
        setCounter(counter + 1)
        

    }








    return ( <div className="exercise-container">
        <button className="delete-exercise-button" onClick={() => {props.deleteExercise(props.data.ID)}}>DELETE</button>
    <div className="exercise-title">{props.data.title}</div>
    <div className="exercise-categories">{props.data.categories.map((cat) => <Category category={cat}/>)}</div>
    <div className="exercise-volume"></div>
    <div className="exercise-sets-container">
        {setList.map((set) => <div className="set-number-container">{set.weight + ' x '+ set.reps}</div>)}
        <button className="add-set-button" onClick={() => setAddSetRender('on')}>+</button>
        {setRender()}
    </div>
    <div className="exercise-input-container">
    
    </div>
   
</div> );
}
 
export default Exercise;