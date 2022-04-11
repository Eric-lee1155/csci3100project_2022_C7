import { useState } from "react";
import React from 'react';
import styles from './index.module.css';
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

        
            window.location.assign("./reset");
        


        
        
    }

    
    
        return(
            <>
            <form onSubmit={handleSubmit}> 
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
                
                <input className={styles.submit_butn} type="submit" value="Submit"/>
            </form>
            <br></br>
            <p><b>After you enter your email,you will receive email to reset your password.</b></p>
            </>
            
        )
    
}

export default Forget;