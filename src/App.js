import axios from 'axios'
import {useState} from 'react'
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage"
import WorkoutsPage from "./Components/WorkoutsPage/WorkoutsPage"
import MainView from "./Components/MainView/MainView"
import './App.css';

function App() {


  const [viewState, setViewState] = useState('login-page')
  const [userData, setUserData] = useState()



  function renderViews(){

    if(viewState === 'landing-page' && userData != null){
      return(<LandingPage changeView={setViewState} setUserData={setUserData} userData={userData}/>)
    }
    else if(viewState === 'workouts-page'){
      return(<WorkoutsPage data={userData} setUserData={setUserData} workouts={userData.workouts} changeView={setViewState}/>)
    }
    else if(viewState === 'login-page'){
      return(<LoginPage changeView={setViewState} setUserData={setUserData}/>)
    }

  }









 


  return (
    <div className="App">
    

      {renderViews()}



    





    </div>





     










  );
}

export default App;
