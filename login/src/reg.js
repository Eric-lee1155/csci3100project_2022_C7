import { useState } from "react";
import styles from './index.module.css';
const Reg = () => {
    
        const [AC, SetAC] = useState({});

        const handleChange = (event)=>{
            const name = event.target.name;
            const value = event.target.value;
            SetAC(values => ({...values,[name]:value}))
        }

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(AC);
        
            window.location.assign("./")
        }
    
        return (
            <>
                <form onSubmit={handleSubmit}> 
                    <label className={styles.form_label}>Enter your name:<br></br>
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

                    <label className={styles.form_label}>Enter your email:<br></br>
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
                
                <br></br>
                <p><b>After you enter your email,you will receive a confirmation email.</b></p>
            </>
        )
    
}

export default Reg;