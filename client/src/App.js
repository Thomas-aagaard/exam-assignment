import React, {Component} from 'react';
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";
import Login from "./Login";
import AddSuggestion from "./AddSuggestion";
import {Router} from "@reach/router";
import AuthService from './AuthService';
import { Link } from "@reach/router";
///const jwt = require('jsonwebtoken');


class App extends Component {

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
   // API_URL = 'http://localhost:8080/api';

    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        // Initialize the auth service with the path of the API authentication route.
        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
        this.state = {
            suggestions: []

    };
    }

    componentDidMount() {
        //this.GetData();
        this.GetData().then(() => console.log("Suggestions gotten!"));
    }

    async CreateSuggestion(title, description, suggestion, username) {
        // fetching data from the https link below
        let url = `${this.API_URL}/suggestion`;
        // using the token to be set in the localstorage in the browser. See inspect - application - localhost:3000.
        let userToken  = localStorage.getItem("username");

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` // defining that I am using Bearer as my authorization.
            },
            // Defining what method should be used
            method: 'POST',
            // Clarifying what the data should be.
            body: JSON.stringify({
                title:title,
                description:description,
                suggestion: suggestion,
                username:username,
                usersignature:[{user:"", userdate:""}]
            })
        });
        const data = await response.json();
        console.log("Printing the response:", data);
        await this.GetData();
    }

    async GetData() {
        let url = `${this.API_URL}/suggestions`; // URL of the API.
        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            suggestions: json
        })
    }
    async logout() {
        this.setState({
            userCredentials :
            {
                username: "",
                password: ""
            }
        });
        this.logout();
    }

    async AddSignature(id, user) {
        console.log("AddSignature", 'id:' + id, ' user:' + user);
        const url = `${this.API_URL}/suggestions/${id}/signatures`;

        // using the token to be set in the localstorage in the browser. See inspect - application - localhost:3000.
        let userToken  = localStorage.getItem("username");

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` // defining that I am using Bearer as my authorization.
            },
            method: 'POST',

            body: JSON.stringify({
               user: user
            })
        });
        const json = await response.json();

        console.log("Printing the response:", json);
        await this.GetData();
    }


    GetSuggestion(_id) {
        return this.state.suggestions.find(k => k._id === _id);
    }
    async login(username, password) {
        try {
            const resp = await this.Auth.login(username, password);
            console.log("Authentication:", resp.msg);
            this.GetData();
        } catch (e) {
            console.log("Login", e);
        }
    }


// Render is used for showing all data. In the render you are defining what the render should return, (what to show).
    render() {
        return (
            <>
                <h2>Exam assignment</h2>
                <Router>
                    <Suggestions path="/" data={this.state.suggestions}></Suggestions>
                    <Suggestion path="/suggestions/:id" GetSuggestion={(_id) => this.GetSuggestion(_id)} AddSignature={(id, user) => this.AddSignature(id, user)}></Suggestion>
                    <Login path="/login" login={(username, password) => this.login(username, password)}></Login>
                    <AddSuggestion path="/suggestion" CreateSuggestion={(title, description, suggestion, username) => this.CreateSuggestion(title, description, suggestion, username)} ></AddSuggestion>
                </Router>

                <Link to={"/suggestion"}>AddSuggestion</Link>
                <div>
                    <Link to={"/login"}>Loginpage</Link>
                </div>
                </>

        );
    }
}
export default App;

