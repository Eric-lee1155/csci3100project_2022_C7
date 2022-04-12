import Para from './Compon.js';
import styles from './index.module.css';

const Portfo = () =>{
    
    const Name = "Putin";
    const Email = "moskva@russia.com";
    const Password = "Moskva";
    const Permission = "User";
    const Win_record = 1;


    const handleModifly = (event)=>{
        window.location.assign("./Modify")
        //nothing yet
    }
    const handleGame = (event)=>{
        window.location.assign(process.env.PUBLIC_URL + "/game.html");
        //nothing yet
    }

    return (
    <>
        <Para paraCon={"Portfo"}/>
        <br/>
        <Para paraCon={"Profile pic:"}/>
        <br/>
        <img src={process.env.PUBLIC_URL + '/weegee.webp'} alt={"pic"} />
        <br/>
        <Para paraCon={"Name: "+Name}/>
        <br/>
        <Para paraCon={"Email: "+Email}/>
        <br/>
        <Para paraCon={"Password: "+Password}/>
        <br/>
        <Para paraCon={"Permission: "+Permission}/>
        <br/>
        <Para paraCon={"Win_record: "+Win_record}/>
        
        <button className={styles.Change} onClick={handleModifly}>Modify data</button>
        <button className={styles.reg_butn} onClick={handleGame}>Start Game</button>

    </>
    )
}

export default Portfo;