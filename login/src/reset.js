import { useState } from "react";

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
                    
                    <label>Enter your password:<br></br>
                    <input 
                        type="password"
                        style={{margin: "10px"}} 
                        name="password"
                        value={AC.password || ""}
                        onChange={handleChange}
                        required 
                    /><br></br>
                    </label>

                    <label>Enter your password again:<br></br>
                    <input 
                        type="password" 
                        style={{margin: "10px"}}
                        name="confirmPassword"
                        value={AC.confirmPassword || ""}
                        onChange={handleChange}
                        required 
                    />
                    <br></br>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
                
                {/* <br></br>
                <p><b>After you enter your email,you will receive a confirmation email.</b></p> */}
            </>
        )
    
}

export default Reset;