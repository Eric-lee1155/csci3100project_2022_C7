import { useState } from "react";
import React from 'react';
// import ReactDOM from 'react-dom';


const Forget = () => {
    const [AC, SetAC] = useState({});
    // var isfill = 1;

    const handleChange = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        SetAC(values => ({...values,[name]:value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(AC);

        // if(AC.email.length!=0){
            window.location.assign("./reset");
        // }
        // else{
            
            // isfill=0;
            
        // }


        
        
    }

    
    //if(isfill==1){
        return(
            <>
            <form onSubmit={handleSubmit}> 
                <label>Enter your email:<br></br>
                <input 
                    style={{margin: "10px"}}
                    type="email" 
                    name="email"
                    value={AC.email || ""}
                    onChange={handleChange}
                    required 
                />
                <br></br>
                </label>
                
                <input type="submit" value="Submit"/>
            </form>
            <br></br>
            <p><b>After you enter your email,you will receive email to reset your password.</b></p>
            </>
            
        )
    // }
    //else {
        // return(
        //     <>
        //     <form onSubmit={handleSubmit}> 
        //         <label>Enter your email:<br></br>
        //         <input 
        //             style={{margin: "10px"}}
        //             type="email" 
        //             name="email"
        //             value={AC.email || ""}
        //             onChange={handleChange}
        //         />
        //         <br></br>
        //         </label>
                
        //         <input type="submit" value="Submit"/>
        //     </form>
            
        //     <h2>Please fill in all field!</h2>
        //     </>
            
        // )
    //}
    
}

export default Forget;