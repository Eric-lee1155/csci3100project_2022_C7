import { useState } from "react";
import styles from './index.module.css';

const Reset = () => {
    
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
        }
    
        return (
            <>
                <form onSubmit={handleSubmit}> 
                    
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
                
                
            </>
        )
    
}

export default Reset;