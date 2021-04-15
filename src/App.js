import axios from 'axios'
import {useState} from 'react'
import LandingPage from "./Components/LandingPage/LandingPage";
import LoginPage from "./Components/LoginPage/LoginPage"
import './App.css';

function App() {


  const [viewState, setViewState] = useState('landing-page')


  function renderViews(){

    if(viewState === 'landing-page'){
      return(<LandingPage changeView={setViewState}/>)
    }
    else if(viewState === 'login-page'){
      return(<LoginPage changeView={setViewState}/>)
    }

  }









 


  return (
    <div className="App">


      {renderViews()}



    





    </div>





     










  );
}

export default App;
