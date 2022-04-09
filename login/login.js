import { useState } from "react";
import {React} from 'react';
// const React = require('react');
import ReactDOM from "react-dom";
// const ReactDOM = require('react-dom');
import { BrowserRouter, Routes, Route } from "react-router-dom";


function WG(){
    return 
    <>
    <h1>WargamingSucks</h1>
    <p>No More Russian Bias</p>
    </>
}

// function ACControl(){
//     const [AC, SetAC] = usestate("");

//     const handleChange = (event)=>{
//         const name = event.target.name;
//         const value = event.target.value;
//         setInputs(values => ({...values,[name]:value}))
//     }
// }

// const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(AC);
// }
/*
function JsContent(){
    return(
        <react-router-dom.BrowserRouter>
            <react-router-dom.Routes>                
                <react-router-dom.Route index element={<login />} />
                <react-router-dom.Route path="fail" element={<fail />} />
                <react-router-dom.Route path="sucess" element={<sucess />} />
                <react-router-dom.Route path="*" element={<notfound />} />                
            </react-router-dom.Routes>
        </react-router-dom.BrowserRouter>
    )
}

*/

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
// ReactDOM.render(<WG/>,document.getElementById('Content'));	

// import React from 'react';
// import ReactDOM from 'react-dom';

// const myelement = (
//   <table>
//     <tr>
//       <th>Name</th>
//     </tr>
//     <tr>
//       <td>John</td>
//     </tr>
//     <tr>
//       <td>Elsa</td>
//     </tr>
//   </table>
// );
// ReactDOM.render(myelement, document.getElementById('Content'));
/*
const notfound = () =>{
    return(
        <p>404 not found!</p>
    )
}

const sucess = () =>{
    return (
    <>
    <h1>Login Sucess!</h1>
    <h2>Wellcome to this game!</h2>
    <h3>You will be redirected soon.</h3>
    </>
    )
}

const fail = () =>{
    return (
    <>
    <h1>Login Fail!</h1>
    <h2>Please log in again.</h2>
    <h3>You will be redirected soon.</h3>
    </>
    )
}



ReactDOM.render(<JsContent/>, document.getElementById('Content'));
*/