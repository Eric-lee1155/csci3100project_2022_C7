import { useState } from "react";
import styles from './index.module.css';
import React from 'react';
import Para from './Compon.js';
// import ImageUploading from 'react-images-uploading';

const Modify = () => {
    
        const [AC, SetAC] = useState({});
        


        

        const handleChange = (event)=>{
            const name = event.target.name;
            const value = event.target.value;
            SetAC(values => ({...values,[name]:value}))
        }

        const handleChangePic = (event) => {
            event.preventDefault();
            
        
            window.location.assign("./Pic")

            // fetch("http://119.246.79.200:8080/login", {
            // method:'POST',
            // headers: {
            //     'content-type': 'application/x-www-form-urlencoded'
            // },
            // body: new URLSearchParams({
            //     'name' : AC.name,
            //     'email': AC.email,
            //     'password': AC.password}
            // )
            // })
            // .then (response => response.json())
            // // .then(data => data);
            // .then(data => SetAC(data));


        }


        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(AC);
        
            window.location.assign("./Portfo")

            fetch("http://119.246.79.200:8080/login", {
            method:'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'name' : AC.name,
                'email': AC.email,
                'password': AC.password}
            )
            })
            .then (response => response.json())
            // .then(data => data);
            .then(data => SetAC(data));


        }
    
        // const onChange = (imageList, addUpdateIndex) => {
        //     // data for submit
        //     console.log(imageList, addUpdateIndex);
        //     SetAC(imageList);
        //   };


        return (
            <>
                <Para paraCon={"Profile pic:"}/>
                <br/>
                <img src={process.env.PUBLIC_URL + '/weegee.webp'} alt={"pic"} />
                <br/>

                <button className={styles.ChangePic_butn} onClick={handleChangePic}>Change Profile Picture</button>
                
                
                
                <br/>
                <form onSubmit={handleSubmit} method="post"> 
                    <label className={styles.form_label}>Enter your new name:<br></br>
                    <input 
                        className={styles.form_box}
                        type="text" 
                        name="userName"
                        value={AC.userName || ""}
                        onChange={handleChange}
                        required 
                    />
                    <br></br>
                    </label>

                    <label className={styles.form_label}>Enter your new password:<br></br>
                    <input 
                        type="password"
                        className={styles.form_box}
                        name="password"
                        value={AC.password || ""}
                        onChange={handleChange}
                        required 
                    /><br></br>
                    </label>

                    <label className={styles.form_label}>Enter your new email:<br></br>
                    <input 
                        type="email" 
                        className={styles.form_box}
                        name="email"
                        value={AC.email || ""}
                        onChange={handleChange}
                        required 
                    />
                    <br></br>
                    </label>
                    <input className={styles.form_box} type="submit" value="Submit"/>
                </form>
                
                
            </>
        )
    
}

export default Modify;