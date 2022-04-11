import {React} from 'react';
import {ReactDOM} from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
React = require('react');

ReactDOM = require('react-dom');

// export default function JsContent(){
//     return(
//         <react-router-dom.BrowserRouter>
//             <react-router-dom.Routes>                
//                 <react-router-dom.Route index element={<login />} />
//                 <react-router-dom.Route path="fail" element={<fail />} />
//                 <react-router-dom.Route path="sucess" element={<sucess />} />
//                 <react-router-dom.Route path="*" element={<NoPage />} />                
//             </react-router-dom.Routes>
//         </react-router-dom.BrowserRouter>
//     )
// }

export default function JsContent(){
    return(
        <BrowserRouter>
            <Routes>                
                <Route index element={<login />} />
                <Route path="fail" element={<fail />} />
                <Route path="sucess" element={<sucess />} />
                <Route path="*" element={<Notfound />} />                
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(<JsContent/>, document.getElementById('Content'));