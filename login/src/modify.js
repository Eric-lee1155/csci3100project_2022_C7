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

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(AC);
        
            window.location.assign("./Portfo")
        }
    
        // const onChange = (imageList, addUpdateIndex) => {
        //     // data for submit
        //     console.log(imageList, addUpdateIndex);
        //     SetAC.image(imageList);
        //   };


        return (
            <>
                <Para paraCon={"Profile pic:"}/>
                <br/>
                <img src={process.env.PUBLIC_URL + '/weegee.webp'} alt={"pic"} />
                <br/>

                
                {/* <ImageUploading
                multiple={false}
                value={AC.image}
                onChange={onChange}
                
                dataURLKey="data_url"
                ></ImageUploading> */}
                
                
                <br/>
                <form onSubmit={handleSubmit}> 
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