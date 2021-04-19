import React, {useState} from 'react';
import axios from 'axios'
import "./LoginPage.css"
const LoginPage = (props) => {



    const [userData, setUserData] = useState()


    function getInputs(){
        let username = document.querySelector('.username').value
        let password = document.querySelector('.password').value
    
        axios.post('http://localhost:5000/user/login', 
        {name: username, password:password})
        .then((res) => {
            console.log(res)
            if(res.data.error == null){
              props.changeView('landing-page')
              props.setUserData(res.data)
            }
            else{
              
            }
         })
    
      }


      function registerUser(){

        let username = document.querySelector('.username').value
        let password = document.querySelector('.password').value
        axios.post('http://localhost:5000/user/register', 
        {name: username, password:password})
        .then((res) => {
            console.log(res)
            if(res.data.error == null){
              //props.changeView('landing-page')
              //props.setUserData(res.data)
            }
            else{
              
            }
         })
        

      }


    return ( <div className="login-page-container">

        <div className="login-credentials-container">

        <input placeholder="username" className="username"/>
     <input placeholder="password" className="password"/>
   
     <button onClick={getInputs}>LOGIN</button>

     <button onClick={registerUser}>REGISTER</button>
     


        </div>
      

    </div> );
}
 
export default LoginPage;