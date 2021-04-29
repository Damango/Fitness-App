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


  //'http://194.195.215.144:3000'

  const theConnection = 'http://194.195.215.144:3000'



  function renderViews(){

    if(viewState === 'landing-page' && userData != null){
      return(<LandingPage changeView={setViewState} setUserData={setUserData} userData={userData} connection={theConnection}/>)
    }
    else if(viewState === 'workouts-page'){
      return(<WorkoutsPage data={userData} fuck='fuck' setUserData={setUserData} workouts={userData.workouts} changeView={setViewState} theConnection={'http://localhost:5000'}/>)
    }
    else if(viewState === 'login-page'){
      return(<LoginPage changeView={setViewState} setUserData={setUserData} connection={theConnection}/>)
    }

  }

  return (
    <div className="App">
  
      {renderViews()}

    </div>


  );
}

export default App;
