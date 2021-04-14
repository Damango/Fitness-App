import axios from 'axios'
import {useState} from 'react'
import './App.css';

function App() {


  const [userData, setUserData] = useState()



  function getInputs(){
    let username = document.querySelector('.username').value
    let password = document.querySelector('.password').value

    axios.post('http://localhost:5000/user/login', 
    {name: username, password:password})
    .then((res) => {
        console.log(res)
        setUserData(res.data)
      
     })
  }

  function renderInfo(){
    if(userData != null){

      let theBool = new Boolean(userData.premium)

      return(
        <div className="info-wrapper">
          
          <span>Name: {userData.name}</span>
          <span>email: {userData.email}</span>
          <span>premium: {theBool.toString()}</span>
        </div>)
    }
  }


  return (
    <div className="App">






    <button onClick={() => {axios.post('http://localhost:5000/user/login', {name: "Justin Kessler", password:"chippy123"}).then((res) => {
        console.log(res)
     })}}>LOGIN</button>

<button onClick={() => {axios.post('http://localhost:5000/user/register', {name: "Busters", email: "redcoderhd1@gmail.com", password:"chippy123"}).then((res) => {
        console.log(res)
     })}}>POST</button>


     <button onClick={() => {fetch('http://localhost:5000/api/').then((res) => {
        console.log(res)
     })}}>PRESS ME</button>





<div className="user-info-container">
     <input placeholder="username" className="username"/>
     <input placeholder="password" className="password"/>
   
     <button onClick={getInputs}>LOGIN</button>
     
     {renderInfo()}


</div>
    </div>





     










  );
}

export default App;
