// import { useState } from "react";
// import {React} from 'react';
import React from 'react';
import {StrictMode} from 'react';
// const React = require('react');
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
// const ReactDOM = require('react-dom');


import Fail from "./fail.js";
import Sucess from "./sucess.js";
import Notfound from "./notfound.js";
import Login from "./login.js";

import Reg from "./reg.js";
import Forget from "./forget.js";

import Reset from "./reset.js";
import Rereset from "./rereset.js";

import './index.css';
import styles from './index.module.css';



// function JsContent(){
//     return(
//         <react-router-dom.BrowserRouter>
//             <react-router-dom.Routes>                
//                 <react-router-dom.Route index element={<login />} />
//                 <react-router-dom.Route path="fail" element={<fail />} />
//                 <react-router-dom.Route path="sucess" element={<sucess />} />
//                 <react-router-dom.Route path="*" element={<notfound />} />                
//             </react-router-dom.Routes>
//         </react-router-dom.BrowserRouter>
//     )
//   }

function JsContent(){
    return(
        // <React.StrictMode>
            <StrictMode>
            <h1 className={styles.Title}>Samlamzukejan</h1>
                <BrowserRouter>
                    <Routes>                
                        <Route path="/" index element={<Login />} />
                        <Route path="/fail" element={<Fail />} />
                        <Route path="/sucess" element={<Sucess />} />
                        <Route path="*" element={<Notfound />} />
                        <Route path="/forget" element={<Forget />} />
                        <Route path="/Reg" element={<Reg />} />
                        <Route path="/Reset" element={<Reset />} />
                        <Route path="/Rereset" element={<Rereset />} />
                    </Routes>
                </BrowserRouter>
            </StrictMode>
        // </React.StrictMode>
    )
}



ReactDOM.render(<JsContent/>, document.getElementById('root'));