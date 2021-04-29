import React, {useState} from 'react';
import axios from 'axios'
import WorkoutsPage from "../WorkoutsPage/WorkoutsPage"
import "./LandingPage.css"

const LandingPage = (props) => {

    const [viewState, setViewState] = useState('workouts-page')
    const [userData, setUserData] = useState(props.userData)

    function renderViews(){

        if(viewState === 'workouts-page'){
          return(<WorkoutsPage data={userData} setUserData={setUserData} workouts={userData.workouts} changeView={setViewState} connection={props.connection}/>)
        }
       
    
      }

    //console.log(props.userData)
  


    return ( <div className="landing-page-container">


    
   
       


           { renderViews()}


    </div> );
}
 
export default LandingPage;