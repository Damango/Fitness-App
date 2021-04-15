import React, {useState} from 'react';
import axios from 'axios'
import "./LandingPage.css"

const LandingPage = (props) => {


  


    return ( <div className="landing-page-container">


        <button onClick={() => {props.changeView('login-page')}}>Login</button>
        <button>Workouts</button>
        <button>Nutrition</button>
        <button>Analytics</button>




    </div> );
}
 
export default LandingPage;