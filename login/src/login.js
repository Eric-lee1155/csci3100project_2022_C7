import { useState } from "react";
import {React} from 'react';
import styles from './index.module.css';
import Para from './Compon.js';
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
        // window.location.assign("./reg")
        window.location.assign("./signup")
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

        fetch("http://119.246.79.200:8080/login", {
            method:'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                // 'Access-Control-Allow-Origin': '*',
                // 'mode' : 'no-cors'
            },
            body: new URLSearchParams({
                'email': AC.email,
                'password': AC.password}
            )
        })
        .then (response => response.json())
        // .then(data => data);
        .then(data => SetAC(data));
        

        if(AC.email==="Moskva@russia.com" && AC.password==="Putin"){
            //window.location.assign("./sucess")
            console.log("Y");
        }
        
        else {
            console.log("N");
            //window.location.assign("./fail")
        }
    }
    
    return <>

        <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt={"pic"} />
        <form onSubmit={handleSubmit} method="POST"> 
            <label className={styles.form_label}>Enter your email:<br></br>
            <input 
                className={styles.form_box}
                type="email" 
                name="email"
                value={AC.email || ""}
                onChange={handleChange}
                required 
            />
            <br></br>
            </label>
            <label className={styles.form_label}>Enter your password:<br></br>
            <input 
                className={styles.form_box}
                type="password" 
                name="password"
                value={AC.password || ""}
                onChange={handleChange}
                required 
            /><br></br>
            </label>
            <input className={styles.submit_butn} type="submit" value="Submit"/>
        </form>
        <button className={styles.forget_butn} onClick={handleForget}>Forget Password?</button>
        <button className={styles.reg_butn} onClick={handleRes}>New Player?</button>

        <Para paraCon={"AC:"+AC.email + AC.password}/>
    </>
}
export default Login;
