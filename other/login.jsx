// login.js (login, logout, signup, verify, forget, reset)

let base_url = "http://localhost:3000";

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
            // routing differnt classes
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
            if(data.state == 2){ // login succees
                // EXIT AND REDIRECT
                window.location.href = base_url;
                return null;
            }else if(data.state == 1){ // not verify
                this.props.parent.setState({display_page: 3});
                default_email = email.value;
            }else{ // login fail
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
                <br></br>
                <h1 style={{"color": "darkslategrey", "font-size": "55px", "letter-spacing": "3px"}}>SamLamZuKeJan</h1>
                <div class="form_outer">
                    <div class="form_inner">
                        <br></br>
                        <h1>Account Login</h1>
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="email">Email</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="email" id="email" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="password">Password</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="password" id="password" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div>
                                    <button type="submit" class="btn btn-primary">Login</button>
                                </div>
                            </div>
                            <div class="form-group row form_link">
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleSignup()}>create account</a>
                                </div>
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleForget()}>forget password</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
            if(data.state){ // signup success
                let verifycode = data.verifycode;
                console.log(verifycode); // message (test only)
                Email.send({ // recieve verify code and send email
                    Host : "smtp.gmail.com",
                    Username : "csci3100c7@gmail.com",
                    Password : "cuhk2022",
                    From : "csci3100c7@gmail.com",
                    To : email.value,
                    Subject : "Account Verification",
                    Body : "Your verify code is " + verifycode + "."
                });
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
                <br></br>
                <h1 style={{"color": "darkslategrey", "font-size": "55px", "letter-spacing": "3px"}}>SamLamZuKeJan</h1>
                <div class="form_outer">
                    <div class="form_inner">
                        <br></br>
                        <h1>Account Signup</h1>
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="name">Name</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="name" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="email">Email</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="email" id="email" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="password">Password</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="password" id="password" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div>
                                    <button type="submit" class="btn btn-primary">Signup</button>
                                </div>
                            </div>
                            <div class="form-group row form_link">
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleReturn()}>return to login page</a>
                                </div>
                                <div class="col-sm-6">
                                    <></>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
            if(data.state){ // verify success and set account as "verified"
                fetch(base_url + "/modify", {
                    method: "POST",
                    body: new URLSearchParams({
                        source_email: email.value,
                        permission: "user"
                    })
                })
                .then(res2 => res2.json())
                .then(data2 => {
                    if(data2.state){ // modify success
                        this.props.parent.setState({display_page: 1});
                    }else{ // modify fail
                        alert(data2.message);
                    }
                })
                .catch(err2 => {
                    alert(err2);
                });
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
                <br></br>
                <h1 style={{"color": "darkslategrey", "font-size": "55px", "letter-spacing": "3px"}}>SamLamZuKeJan</h1>
                <div class="form_outer">
                    <div class="form_inner">
                        <br></br>
                        <h1>Account Verify</h1>
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="email">Email</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="email" id="email" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="verifycode">Verifycode</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="verifycode" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div>
                                    <button type="submit" class="btn btn-primary">Verify</button>
                                </div>
                            </div>
                            <div class="form-group row form_link">
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleReturn()}>return to login page</a>
                                </div>
                                <div class="col-sm-6">
                                    <></>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
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
            if(data.state){ // request success(re-generate verify code)
                let verifycode = data.verifycode;
                console.log(verifycode); // message (test only)
                Email.send({ // recieve verify code and send email
                    Host : "smtp.gmail.com",
                    Username : "csci3100c7@gmail.com",
                    Password : "cuhk2022",
                    From : "csci3100c7@gmail.com",
                    To : email.value,
                    Subject : "Account Verification",
                    Body : "Your verify code is " + verifycode + "."
                });
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
            if(data.state){ // verify success
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
                <br></br>
                <h1 style={{"color": "darkslategrey", "font-size": "55px", "letter-spacing": "3px"}}>SamLamZuKeJan</h1>
                <div class="form_outer">
                    <div class="form_inner">
                        <br></br>
                        <h1>Account Verify</h1>
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="email">Email</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="email" id="email" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="verifycode">Verifycode</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="text" id="verifycode" required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-4">
                                    <></>
                                </div>
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-outline-primary" onClick={() => this.handleSend()}>Send Verification Code</button>
                                </div>
                                <div class="col-sm-2">
                                    <button type="submit" class="btn btn-primary">Verify</button>
                                </div>
                            </div>
                            <div class="form-group row form_link">
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleReturn()}>return to login page</a>
                                </div>
                                <div class="col-sm-6">
                                    <></>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


class Reset extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleCheck(){
        // match two passwords
        let password = document.getElementById("password");
        let re_password = document.getElementById("re_password");
        if(password.value != re_password.value){
            re_password.setCustomValidity("Unmatched passwords");
        }else{
            re_password.setCustomValidity("");
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
            if(data.state){ // modify success
                alert("Reset password successfully");
                this.props.parent.setState({display_page: 1});
            }else{ // modify fail
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
                <br></br>
                <h1 style={{"color": "darkslategrey", "font-size": "55px", "letter-spacing": "3px"}}>SamLamZuKeJan</h1>
                <div class="form_outer">
                    <div class="form_inner">
                        <br></br>
                        <h1>Reset Password</h1>
                        <br></br>
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="password">Password</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="password" id="password" onChange={() => this.handleCheck()} required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label" for="re_password">Confirm Password</label>
                                <div class="col-sm-9">
                                    <input class="form-control" type="password" id="re_password" onKeyUp={() => this.handleCheck()} required />
                                </div>
                            </div>
                            <div class="form-group row">
                                <div>
                                    <button type="submit" class="btn btn-primary">Reset</button>
                                </div>
                            </div>
                            <div class="form-group row form_link">
                                <div class="col-sm-6">
                                    <a href="#" onClick={() => this.handleReturn()}>return to login page</a>
                                </div>
                                <div class="col-sm-6">
                                    <></>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


ReactDOM.render(<App/>, document.getElementById("app"));
