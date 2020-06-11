import React, {Component} from 'react';
import {Link} from "@reach/router";
import AuthService from "./AuthService";


 class Login extends Component {


     constructor(props) {
        super(props);
         // Initialize the auth service with the path of the API authentication route.
         this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
        this.state ={
                    username: "",
                    password: ""
        };
 }



handlechange(event) {
    this.setState({
        [event.target.name]:event.target.value
    });
}
handlelogin() {
    console.log("login", this.state.username, this.state.password);
    this.props.login(
        this.state.username,
        this.state.password
    );
    //let usertoken = localStorage.getItem("token");
  /*  useEffect => (() => {
        localStorage.setItem('Bearer', JSON.stringify(usertoken))
    });*/

}
    render() {
        return (
            <>
                <h3>Login</h3>
                <label htmlFor="user">
                    Username
                </label>
                <input id="user" name="username" placeholder="username" type="text" onChange={event => this.handlechange(event)}></input>
                <br/>
                <br/>
                <label htmlFor="pass">
                    Password
                </label>
                <input id="pass" name="password" placeholder="password" type="password" onChange={event => this.handlechange(event)}></input>
                <br/>
                <br/>
                <button onClick={_ => this.handlelogin()}>Login</button>

                {this.Auth.loggedIn() ? <p>Logged in</p> : <p>Not logged in</p>}
                <button onClick={_ => this.Auth.logout()}>Logout</button>

                <Link to="/">Go Back</Link>
            </>

        )

    }

}
export default Login;