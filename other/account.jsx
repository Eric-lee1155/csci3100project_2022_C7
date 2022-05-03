// account.js (account, accountall, accountone)

let base_url = "http://119.246.79.200:8080";
let game_url = "http://119.246.79.200:8080";

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

    handleGame(){
        // EXIT AND REDIRECT
        window.location.href = game_url;
        return null;
    }

    handleFetch(){
        fetch(base_url + "/account", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            if(data.state){
                this.setState({profile: data});
            }
        })
        .catch(err => {
            alert(err);
        });
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleLogout()}>Logout</button>
                <button onClick={() => this.handleGame()}>Play Game</button>
                <button onClick={() => this.handleFetch()}>Fetch Data</button>
                <h1>Hello, account.html</h1>
                {this.state.display_page == 1 ? <Profile parent={this} /> : <></>}
                {this.state.display_page == 2 ? <Manage parent={this} /> : <></>}
                {this.state.display_page == 3 ? <Inspect parent={this} /> : <></>}
            </>
            
        );
    }
}


class Profile extends React.Component{
    handleManager(){
        this.props.parent.setState({display_page: 2});
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleManager()}>Manager Page</button>
                <h1>Profile Page</h1>
                <div>{this.props.parent.state.profile.name}</div>
                <div>{this.props.parent.state.profile.email}</div>
                <div>{this.props.parent.state.profile.password}</div>
                <div>{this.props.parent.state.profile.win_record}</div>
            </>
        );
    }
}


class Manage extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleAccountAll(){
        let element = document.getElementById("target_p");
        fetch(base_url + "/account_all", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            element.innerHTML = data;
            this.props.parent.setState({account_all: data});
            console.log(this.props.parent.state.account_all);
        })
        .catch(err => {
            alert(err);
        });
    }

    handleInspect(){
        this.props.parent.setState({display_page: 3});
    }

    render(){
        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Profile Page</button>
                <button onClick={() => this.handleAccountAll()}>List all account</button>
                <button onClick={() => this.handleInspect()}>Inspect Page</button>
                <h1>Manager Page</h1>
                <div id="target_p">Empty record</div>
                <main className="container">
                    <div>record</div>
                    {this.props.parent.state.account_all.map((value,
                        index) => <Record record={this.props.parent.state.account_all[index]} parent={this.props.parent} />)}
                </main>
            </>
        );
    }
}


class Inspect extends React.Component{
    handleReturn(){
        this.props.parent.setState({display_page: 1});
    }

    handleBack(){
        this.props.parent.setState({display_page: 2});
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
            if(data.state){
                this.props.parent.setState({display_page: 2});
            }
        })
        .catch(err => {
            alert(err);
        });
        event.preventDefault();
    }

    render(){
        let record = this.props.parent.state.account_one;
        let permission = record.permission;

        return(
            <>
                <button onClick={() => this.handleReturn()}>Return to Profile Page</button>
                <button onClick={() => this.handleBack()}>Back</button>
                <h1>Inspect Page</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <label class="form-label" for="name">Name:</label>
                    <input class="form-control" type="text" id="name" placeholder={record.name} />
                    <label class="form-label" for="email">Email:</label>
                    <input class="form-control" type="email" id="email" placeholder={record.email} />
                    <label class="form-label" for="password">Password:</label>
                    <input class="form-control" type="text" id="password" placeholder={record.password} />
                    <label class="form-label" for="win_record">Winning Record:</label>
                    <input class="form-control" type="number" id="win_record" placeholder={record.win_record} />
                    <label for="permission">Permission:</label>
                    <select class="form-control" id="permission" placeholder={record.permission}>
                        {record.permission == "none" ? <option value="none" selected>None</option>
                            : <option value="none">None</option>}
                        {record.permission == "user" ? <option value="user" selected>user</option>
                            : <option value="user">user</option>}
                        {record.permission == "admin" ? <option value="admin" selected>Admin</option>
                            : <option value="admin">Admin</option>}
                    </select>
                    <input class="form-control" type="submit" value="Modify" />
                </form>
            </>
        );
    }
}


class Record extends React.Component{
    handleModify(){
        this.props.parent.setState({display_page: 3});
        this.props.parent.setState({account_one: this.props.record});
    }

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
                <a>{record.name} , {record.email}</a>
                <button onClick={() => this.handleModify()}>Modify</button>
                <button onClick={() => this.handleDelete()}>Delete</button>
            </>
        )
    }
}



ReactDOM.render(<App/>, document.getElementById("app"));