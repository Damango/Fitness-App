import React, {useState} from 'react';
import axios from 'axios'
import "./LandingPage.css"

const LandingPage = (props) => {



    //console.log(props.userData)
  


    return ( <div className="landing-page-container">

    
   
        <button>Workouts</button>
        <button>Nutrition</button>
        <button>Analytics</button>
       

        <button onClick={() => {axios.post('http://localhost:5000/user/addworkout', props.userData)
        .then(res =>{

            let oldData = props.userData;
            let newData = oldData;
            newData.workouts = res.data

         props.setUserData(newData);
            console.log(newData);


            });  } }>
            CLICK ME</button>


    </div> );
}
 
export default LandingPage;