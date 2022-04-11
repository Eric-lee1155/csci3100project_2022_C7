import { useState } from "react";
import {React} from 'react';
// const React = require('react');
// import ReactDOM from "react-dom";
// const ReactDOM = require('react-dom');
// import { BrowserRouter, Routes, Route } from "react-router-dom";




function Login(){

    const handleForget = (event)=>{
        window.location.assign("./forget")
        //nothing yet
    }
    const handleRes = (event)=>{
        window.location.assign("./reg")
        //nothing yet
    }
    const [AC, SetAC] = useState({});

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        SetAC(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(AC);

        if(AC.userName==="Moskva" && AC.password==="Putin"){
            window.location.assign("./sucess")
            console.log("Y");
        }
        
        else {
            console.log("N");
            window.location.assign("./fail")
        }
    }
    
    return <>

        <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt={"pic"} />
        <form onSubmit={handleSubmit}> 
            <label >Enter your name:<br></br>
            <input 
                style={{margin: "10px"}}
                type="text" 
                name="userName"
                value={AC.userName || ""}
                onChange={handleChange}
                required 
            />
            <br></br>
            </label>
            <label style={{padding: "10px"}}>Enter your password:<br></br>
            <input 
                style={{margin: "10px"}}
                type="password" 
                name="password"
                value={AC.password || ""}
                onChange={handleChange}
                required 
            /><br></br>
            </label>
            <input style={{margin: "10px"}} type="submit" value="Submit"/>
        </form>
        <button style={{margin: "10px"}} onClick={handleForget}>Forget Password?</button>
        <button style={{margin: "10px"}} onClick={handleRes}>New Player?</button>
    </>
}
export default Login;
