import { useState } from "react";

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
                    <label>Enter your name:<br></br>
                    <input 
                        style={{margin: "10px"}}
                        type="text" 
                        name="userName"
                        value={AC.userName || ""}
                        onChange={handleChange}
                        required 
                    />
                    <br></br>
                    </label>

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

                    <label>Enter your email:<br></br>
                    <input 
                        type="email" 
                        style={{margin: "10px"}}
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
                <p><b>After you enter your email,you will receive a confirmation email.</b></p>
            </>
        )
    
}

export default Reg;