const Sucess = () =>{
    
    setTimeout(Game, 3000);

    // function Back(){
    //     window.location.assign("./")
    // }
    function Game(){
            // window.location.assign(process.env.PUBLIC_URL + "/game.html");
            window.location.assign("./Portfo")
            
        }
    
    return (
    <>
    <h1>Login Sucess!</h1>
    <h2>Wellcome to this game!</h2>
    <h3>You will be redirected soon.</h3>
    </>
    )
}

export default Sucess;