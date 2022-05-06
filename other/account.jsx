// account.js (account, accountall, accountone)

let base_url = "http://localhost:3000";
let game_url = "http://localhost:3005";

const {useMatch, useParams, useLocation} = ReactRouterDOM;
const {BrowserRouter, Routes, Route, Link} = ReactRouterDOM;

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            display_page: 1,
            profile: {},
            account_one: {},
            account_all: []
        };
    }

    handleGame(){
        // EXIT AND REDIRECT
        window.location.href = game_url;
        return null;
    }
    
    handleLogout(){
        fetch(base_url + "/logout", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            // EXIT AND REDIRECT
            window.location.href = base_url;
            return null;
        })
        .catch(err => {
            alert(err);
        });
    }

    handleViewAC(){
        this.setState({display_page: 1});
    }

    handleEditAC(){
        this.setState({display_page: 2});
    }

    handleManager(){
        this.setState({display_page: 3});
    }

    handleMenu(){
        // open / close the pop-up menu
        let menu = document.getElementById("menu");
        let icon = document.getElementById("icon");
        if(menu.style.display == "none"){
            menu.style.display = "block";
            icon.style.transform = "rotate(180deg)";
        }else{
            menu.style.display = "none";
            icon.style.transform = "rotate(0deg)";
        }

    }

    render(){
        return(
            <>
                <aside>
                    <div class="menu" id="menu">
                        <div class="menu_item" onClick={() => this.handleGame()}>
                            <div style={{"margin": "5px 15px 5px 15px"}}>Play Game</div>
                        </div>
                        <div class="menu_item" onClick={() => this.handleViewAC()}>
                            <div style={{"margin": "5px 15px 5px 15px"}}>View Profile</div>
                        </div>
                        <div class="menu_item" onClick={() => this.handleEditAC()}>
                            <div style={{"margin": "5px 15px 5px 15px"}}>Edit Profile</div>
                        </div>
                        {this.state.profile.permission == "admin" ? 
                            <div class="menu_item" onClick={() => this.handleManager()}>
                                <div style={{"margin": "5px 15px 5px 15px"}}>Manage Account</div>
                            </div> : 
                            <></>}
                        <div class="menu_item" onClick={() => this.handleLogout()}>
                            <div style={{"margin": "5px 15px 5px 15px"}}>Logout</div>
                        </div>
                    </div>
                </aside>
                <aside class="menu menu_outer" style={this.state.profile.permission == "admin" ? 
                        {"height": "447px"} : {"height": "358px"}} onClick={() => this.handleMenu()}>
                    <span class="material-symbols-outlined" id="icon">double_arrow</span>
                </aside>
                <article>
                    {this.state.display_page == 1 ? <View_AC parent={this} /> : <></>}
                    {this.state.display_page == 2 ? <Edit_AC parent={this} /> : <></>}
                    {this.state.display_page == 3 ? <Manage parent={this} /> : <></>}
                    {this.state.display_page == 4 ? <Inspect parent={this} /> : <></>}
                </article>
            </>
        );
    }
}


class View_AC extends React.Component{
    componentDidMount(){ // onload event (load profile info)
        fetch(base_url + "/account", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if(data.state){
                this.props.parent.setState({profile: data._doc});
            }else{
                alert(data.message);
                this.props.parent.setState({profile: {}});
            }
        })
        .catch(err => {
            alert(err);
        });
    }

    handleGame(){
        // EXIT AND REDIRECT
        window.location.href = game_url;
        return null;
    }

    handleEditAC(){
        this.props.parent.setState({display_page: 2});
    }
    
    render(){
        return(
            <>
                <div class="form_head">
                    <h1>View Profile</h1>
                </div>
                <div class="form_outer">
                    <div class="form_inner">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="name">My Name</label>
                                <div class="col-sm-7" style={{"color": "darkslategray", "margin-top": "8px"}}>
                                    {this.props.parent.state.profile.name}
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="email">My Email</label>
                                <div class="col-sm-7" style={{"color": "darkslategray", "margin-top": "8px"}}>
                                    {this.props.parent.state.profile.email}
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="win_record">Winning Record</label>
                                <div class="col-sm-7" style={{"color": "darkslategray", "margin-top": "8px"}}>
                                    {this.props.parent.state.profile.win_record}
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-outline-success" onClick={() => this.handleGame()}>Play Game</button>
                                </div>
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-outline-primary" onClick={() => this.handleEditAC()}>Edit Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


class Edit_AC extends React.Component{
    componentDidMount(){ // onload event (load profile info)
        fetch(base_url + "/account", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if(data.state){
                this.setState({profile: data._doc});
            }else{
                alert(data.message);
                this.setState({profile: {}});
            }
        })
        .catch(err => {
            alert(err);
        });
    }

    handleCheck(){ // activate the field of "confirm password"
        let password = document.getElementById("password");
        let re_password = document.getElementById("re_password");
        let confirm = document.getElementById("confirm");

        if(password.value != null && password.value != ""){
            confirm.style.display = "flex";
            if(password.value != re_password.value){ // match two passwords
                re_password.setCustomValidity("Unmatched passwords");
            }else{
                re_password.setCustomValidity("");
            }
        }else{
            confirm.style.display = "none";
            re_password.value = "";
            re_password.setCustomValidity("");
        }

        
    }

    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleSubmit(event){
        let name = document.getElementById("name");
        let password = document.getElementById("password");
        fetch(base_url + "/modify", {
            method: "POST",
            body: new URLSearchParams({
                source_email: this.props.parent.state.profile.email,
                name: name.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){ // modify success
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
                <div class="form_head">
                    <h1>Edit Profile</h1>
                </div>
                <div class="form_outer">
                    <div class="form_inner">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="name">Name</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="text" id="name" placeholder={this.props.parent.state.profile.name} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="email">Email</label>
                                <div class="col-sm-7" style={{"color": "darkslategray", "margin-top": "8px"}}>
                                    {this.props.parent.state.profile.email}
                                    <span class="material-symbols-outlined" id="icon2">do_not_disturb_on</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="password">Password</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="password" id="password" 
                                        placeholder={this.props.parent.state.profile.password} onKeyUp={() => this.handleCheck()} />
                                </div>
                            </div>
                            <div class="form-group row" id="confirm" style={{"display": "none"}}>
                                <label class="col-sm-5 col-form-label" for="re_password">Confirm Password</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="password" id="re_password" onKeyUp={() => this.handleCheck()} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="win_record">Winning Record</label>
                                <div class="col-sm-7" style={{"color": "darkslategray", "margin-top": "8px"}}>
                                    {this.props.parent.state.profile.win_record}
                                    <span class="material-symbols-outlined" id="icon2">do_not_disturb_on</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-outline-primary" onClick={() => this.handleReturn()}>Back to Page</button>
                                </div>
                                <div class="col-sm-6">
                                    <input class="btn btn-primary" type="submit" value="Save Profile" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


class Manage extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    componentDidMount(){ // onload event (load all account info)
        fetch(base_url + "/account_all", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            this.props.parent.setState({account_all: data});
        })
        .catch(err => {
            alert(err);
        });
    }

    render(){
        return(
            <>
                <div class="form_head">
                    <h1>Manage Account</h1>
                </div>
                <div class="form_outer" style={{"width": "600px"}}>
                    <div class="form_inner form_spec">
                        <div class="form-group row">
                            <div class="col-sm-5" style={{"color": "darkslategray", "margin-top": "5px"}}>
                                Account List:
                            </div>
                            <div class="col-sm-7">
                                <button type="button" class="btn btn-outline-primary" onClick={() => this.handleReturn()}>Return to Profile Page</button>
                            </div>
                        </div>
                        <div>
                            {this.props.parent.state.account_all.map((value,
                                index) => <Record record={this.props.parent.state.account_all[index]} parent={this.props.parent} />)}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


class Inspect extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 3});
    }

    handleSubmit(event){
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let win_record = document.getElementById("win_record");
        let permission = document.getElementById("permission");

        fetch(base_url + "/modify", {
            method: "POST",
            body: new URLSearchParams({
                source_email: this.props.parent.state.account_one.email,
                name: name.value,
                email: email.value,
                password: password.value,
                win_record: win_record.value,
                permission: permission.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){ // modify success
                this.props.parent.setState({display_page: 3});
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        let record = this.props.parent.state.account_one;

        return(
            <>
                <div class="form_head">
                    <h1>Inspect Account</h1>
                </div>
                <div class="form_outer">
                    <div class="form_inner">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="name">Name</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="text" id="name" placeholder={record.name} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="email">Email</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="email" id="email" placeholder={record.email} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="password">Password</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="text" id="password" placeholder={record.password} />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="win_record">Winning Record</label>
                                <div class="col-sm-6">
                                    <input class="form-control" type="number" id="win_record" placeholder={record.win_record} min="0" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-5 col-form-label" for="permission">Permission</label>
                                <div class="col-sm-6">
                                    <select class="form-control" id="permission" placeholder={record.permission}>
                                        {record.permission == "none" ? <option value="none" selected>none</option>
                                            : <option value="none">none</option>}
                                        {record.permission == "user" ? <option value="user" selected>user</option>
                                            : <option value="user">user</option>}
                                        {record.permission == "admin" ? <option value="admin" selected>admin</option>
                                            : <option value="admin">admin</option>}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-outline-primary" onClick={() => this.handleReturn()}>Back to Page</button>
                                </div>
                                <div class="col-sm-6">
                                    <input class="btn btn-primary" type="submit" value="Modify" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}


class Record extends React.Component{
    // option "modify"
    handleModify(){
        this.props.parent.setState({display_page: 4});
        this.props.parent.setState({account_one: this.props.record});
    }

    // option "delete"
    handleDelete(){
        if(confirm("Are you sure to delete this account?")){
            fetch(base_url + "/delete", {
                method: "POST",
                body: new URLSearchParams({
                    email: this.props.record.email
                })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                if(data.state){ // delete success
                    fetch(base_url + "/account_all", {
                        method: "GET"
                    })
                    .then(res2 => res2.json())
                    .then(data2 => { // update all account info
                        this.props.parent.setState({account_all: data2});
                    })
                    .catch(err2 => {
                        alert(err2);
                    });
                }
            })
            .catch(err => {
                alert(err);
            });
        }
    }

    render() {
        let record = this.props.record;

        return (
            <>
                <div class="form-group row">
                    <div class="col-sm-3">
                        {record.name}
                    </div>
                    <div class="col-sm-4">
                        {record.email}
                    </div>
                    <div class="col-sm-5">
                        <div>
                            <button type="button" class="btn btn-danger" style={{"margin-left": "10px"}} onClick={() => this.handleDelete()}>Delete</button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" onClick={() => this.handleModify()}>Modify</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById("app"));
