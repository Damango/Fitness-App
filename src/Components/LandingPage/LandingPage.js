import React, {useState} from 'react';
import axios from 'axios'
import WorkoutsPage from "../WorkoutsPage/WorkoutsPage"
import "./LandingPage.css"

const LandingPage = (props) => {

    const [viewState, setViewState] = useState('workouts-page')
    const [userData, setUserData] = useState(props.userData)

    function renderViews(){

        if(viewState === 'workouts-page'){
          return(<WorkoutsPage data={userData} setUserData={setUserData} workouts={userData.workouts} changeView={setViewState}/>)
        }
       
    
      }

    //console.log(props.userData)
  


    return ( <div className="landing-page-container">

<div className="nav-bar-container">
        <div className="nav-link">Workouts</div>
        <div className="nav-link">Nutrition</div>
        <div className="nav-link">Analytics</div>
        <div className="nav-link">Account</div>
      </div>


    
   
       


           { renderViews()}


    </div> );
}
 
export default LandingPage;