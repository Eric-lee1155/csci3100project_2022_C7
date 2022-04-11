const Fail = () =>{
    
    setTimeout(Back, 3000);

    function Back(){
        window.location.assign("./")
    }
    
    return (
    <>
    <h1>Login Fail!</h1>
    <h2>Please log in again.</h2>
    <h3>You will be redirected soon.</h3>
    </>
    )
}

export default Fail;