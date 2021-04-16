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

    return ( <div className="login-page-container">

        <div className="login-credentials-container">

        <input placeholder="username" className="username"/>
     <input placeholder="password" className="password"/>
   
     <button onClick={getInputs}>LOGIN</button>
     
     {renderInfo()}  

        </div>
      

    </div> );
}
 
export default LoginPage;