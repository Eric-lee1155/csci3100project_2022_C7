import { useState } from "react";
import {React} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Login(){

    const [AC, SetAC] = useState({});

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        SetAC(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(AC);

        if(AC.userName=="Moskva" && AC.password=="Putin"){
            //window.location.assign("./sucess")
            console.log("Y");
        }
        
        else {console.log("N");}
        //window.location.assign("./fail")
    }
    
    return <>
        <form onSubmit={handleSubmit}> 
            <label>Enter your name:<br></br>
            <input 
                type="text" 
                name="userName"
                value={AC.userName || ""}
                onChange={handleChange}
            />
            <br></br>
            </label>
            <label>Enter your password:<br></br>
            <input 
                type="password" 
                name="password"
                value={AC.password || ""}
                onChange={handleChange}
            /><br></br>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    </>
}
export default Login;
