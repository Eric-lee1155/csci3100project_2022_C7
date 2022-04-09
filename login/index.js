import { useState } from "react";
import {React} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Fail from "./fail";
import Sucess from "./sucess";
import Notfound from "./notfound";
import Login from "./login";



function JsContent(){
    return(
        <BrowserRouter>
            <Routes>                
                <Route path="/" index element={<Login />} />
                <Route path="fail" element={<Fail />} />
                <Route path="sucess" element={<Sucess />} />
                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    )
}



ReactDOM.render(<JsContent/>, document.getElementById('root'));
