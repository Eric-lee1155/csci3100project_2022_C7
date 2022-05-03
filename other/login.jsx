// login.js (login, logout, signup, verify, forget, reset)

let base_url = "http://119.246.79.200:8080";

const {useMatch, useParams, useLocation} = ReactRouterDOM;
const {BrowserRouter, Routes, Route, Link} = ReactRouterDOM;

let default_email = "";
let forget_email = "";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display_page: 1
        };
    }

    render(){
        return(
            <>
                {this.state.display_page == 1 ? <Login parent={this} /> : <></>}
                {this.state.display_page == 2 ? <Signup parent={this} /> : <></>}
                {this.state.display_page == 3 ? <Verify parent={this} /> : <></>}
                {this.state.display_page == 4 ? <Forget parent={this} /> : <></>}
                {this.state.display_page == 5 ? <Reset parent={this} /> : <></>}
            </>
            
        );
    }
}


class Login extends React.Component{
    handleSignup(){
        this.props.parent.setState({display_page: 2});
    }

    handleForget(){
        this.props.parent.setState({display_page: 4});
    }

    handleSubmit(event){
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        fetch(base_url + "/login", {
            method: "POST",
            body: new URLSearchParams({
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state == 2){
                // EXIT AND REDIRECT
                window.location.href = base_url;
                return null;
            }else if(data.state == 1){
                this.props.parent.setState({display_page: 3});
                default_email = email.value;
            }else{
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleSignup()}>Signup Page</button>
                <button onClick={() => this.handleForget()}>Forget Page</button>
                <h1>Login Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="email">Email:</label>
                    <input class="form-control" type="email" id="email" required />
                    <label class="form-label" for="password">Password: </label>
                    <input class="form-control" type="password" id="password" required />
                    <input class="form-control" type="submit" value="Submit" />
                </form>
            </>
        );
    }
}


class Signup extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleSubmit(event){
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        fetch(base_url + "/signup", {
            method: "POST",
            body: new URLSearchParams({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){
                let verifycode = data.verifycode;
                console.log(verifycode); // message (test only)
                /*Email.send({
                    Host : "smtp.gmail.com",
                    Username : "csci3100c7@gmail.com",
                    Password : "cuhk2022",
                    From : "csci3100c7@gmail.com",
                    To : email.value,
                    Subject : "Account Verification",
                    Body : "Your verify code is " + verifycode + "."
                });*/
                this.props.parent.setState({display_page: 3});
                default_email = email.value;
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Login Page</button>
                <h1>Signup Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="name">Name:</label>
                    <input class="form-control" type="text" id="name" required />
                    <label class="form-label" for="email">Email:</label>
                    <input class="form-control" type="email" id="email" required />
                    <label class="form-label" for="password">Password:</label>
                    <input class="form-control" type="password" id="password" required />
                    <input class="form-control" type="submit" value="Submit" />
                </form>
            </>
        );
    }
}


class Verify extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleSubmit(event){
        let email = document.getElementById("email");
        let verifycode = document.getElementById("verifycode");
        fetch(base_url + "/verify", {
            method: "POST",
            body: new URLSearchParams({
                email: email.value,
                verifycode: verifycode.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){
                this.props.parent.setState({display_page: 1});
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Login Page</button>
                <h1>Verify Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="email">Email:</label>
                    <input class="form-control" type="email" id="email" required />
                    <label class="form-label" for="verifycode">Verifycode:</label>
                    <input class="form-control" type="text" id="verifycode" required />
                    <input class="form-control" type="submit" value="Submit" />
                </form>
            </>
        );
    }
}


class Forget extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleSend(){
        let email = document.getElementById("email");
        fetch(base_url + "/forget", {
            method: "POST",
            body: new URLSearchParams({
                email: email.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){
                let verifycode = data.verifycode;
                console.log(verifycode); // message (test only)
                /*Email.send({
                    Host : "smtp.gmail.com",
                    Username : "csci3100c7@gmail.com",
                    Password : "cuhk2022",
                    From : "csci3100c7@gmail.com",
                    To : email.value,
                    Subject : "Account Verification",
                    Body : "Your verify code is " + verifycode + "."
                });*/
            }
        })
        .catch(err => {
            alert(err);
        });
    }

    handleSubmit(event){
        let email = document.getElementById("email");
        let verifycode = document.getElementById("verifycode");
        fetch(base_url + "/verify", {
            method: "POST",
            body: new URLSearchParams({
                email: email.value,
                verifycode: verifycode.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){
                this.props.parent.setState({display_page: 5});
                forget_email = email.value;
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Login Page</button>
                <h1>Forget Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="email">Email:</label>
                    <input class="form-control" type="email" id="email" required />
                    <button onClick={() => this.handleSend()}>Send verifycode</button>
                    <label class="form-label" for="verifycode">Verifycode:</label>
                    <input class="form-control" type="text" id="verifycode" required />
                    <input class="form-control" type="submit" value="Submit" />
                </form>
            </>
        );
    }
}


class Reset extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleCheck(){
        let password = document.getElementById("password");
        let re_password = document.getElementById("re_password");
        if(password.value != re_password.value){
            re_password.setCustomValidity("Unmatched passwords");
        }else{
            re_password.setCustomValidity('');
        }
    }

    handleSubmit(event){
        let password = document.getElementById("password");
        fetch(base_url + "/modify", {
            method: "POST",
            body: new URLSearchParams({
                source_email: forget_email,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.state){
                alert("Reset password successfully");
                this.props.parent.setState({display_page: 1});
            }else{
                alert(data.message);
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Login Page</button>
                <h1>Reset Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="password">Password:</label>
                    <input class="form-control" type="password" id="password" onChange={() => this.handleCheck()} required />
                    <label class="form-label" for="re_password">RE_Password:</label>
                    <input class="form-control" type="password" id="re_password" onKeyUp={() => this.handleCheck()} required />
                    <input class="form-control" type="submit" value="Submit" />
                </form>
            </>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("app"));



// tool list
// boot // <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
// cdn //<script src='https://unpkg.com/react-router-dom@5.0.0/umd/react-router-dom.min.js'></script>
// refresh page
/*
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const refreshPage = () => {
    navigate(0);
}*/
