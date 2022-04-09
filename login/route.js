import {React} from 'react';
React = require('react');
import {ReactDOM} from 'react-dom';
ReactDOM = require('react-dom');

export default function JsContent(){
    return(
        <react-router-dom.BrowserRouter>
            <react-router-dom.Routes>                
                <react-router-dom.Route index element={<login />} />
                <react-router-dom.Route path="fail" element={<fail />} />
                <react-router-dom.Route path="sucess" element={<sucess />} />
                <react-router-dom.Route path="*" element={<NoPage />} />                
            </react-router-dom.Routes>
        </react-router-dom.BrowserRouter>
    )
}

ReactDOM.render(<JsContent/>, document.getElementById('Content'));