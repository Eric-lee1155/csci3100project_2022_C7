import { useState } from "react";
import styles from './index.module.css';

const Rereset = () => {
    
        const [AC, SetAC] = useState({});

        const handleChange = (event)=>{
            const name = event.target.name;
            const value = event.target.value;
            SetAC(values => ({...values,[name]:value}))
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(AC);
            if(AC.password==AC.confirmPassword){
            window.location.assign("./")
            }
            else{
                window.location.assign("./rereset")
            }

            fetch("http://119.246.79.200:8080/login", {
            method:'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                // 'email': AC.email,
                'password': AC.password}
            )
            })
            .then (response => response.json())
            // .then(data => data);
            .then(data => SetAC(data));

        }
    
        return (
            <>
                <form onSubmit={handleSubmit} method="post"> 
                    
                    <label className={styles.form_label}>Enter your password:<br></br>
                    <input 
                        type="password"
                        className={styles.form_box}
                        name="password"
                        value={AC.password || ""}
                        onChange={handleChange}
                        required 
                    /><br></br>
                    </label>

                    <label className={styles.form_label}>Enter your password again:<br></br>
                    <input 
                        type="password" 
                        className={styles.form_box}
                        name="confirmPassword"
                        value={AC.confirmPassword || ""}
                        onChange={handleChange}
                        required 
                    />
                    <br></br>
                    </label>
                    <input className={styles.submit_butn} type="submit" value="Submit"/>
                </form>
                
                <br></br>
                <p><b>Both two password are not the same.</b></p>
                <p><b>Please enter again</b></p>
            </>
        )
    
}

export default Rereset;