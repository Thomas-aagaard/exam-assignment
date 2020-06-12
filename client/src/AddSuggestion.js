import React, {Component} from "react";
import {Link} from "@reach/router";


export default class AskQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            suggestion:'',
            username: ''
        };
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmit() {

        this.props.CreateSuggestion(this.setState.title, this.state.description, this.state.suggestion, this.state.username);
        console.log("Title: " + this.state.title + " Description: " + this.state.description + " Suggestion: " + this.state.suggestion + " Username: " + this.state.username);

    }

    render() {

        return(
            <>
                <br/>
                <label htmlFor="title">Title</label><br/>
                <input id="title" placeholder="Add title" name="title" onChange={event => this.handleChange(event)} type="text"/>
                <br/><br/>
                <label htmlFor="description">Description</label><br/>
                <input id="description" placeholder="Add description" name="description" onChange={event => this.handleChange(event)} type="text"/>
                <br/><br/>
                <label htmlFor="suggestion">Suggestion</label><br/>
                <input id="suggestion" placeholder="Add suggestion" name="suggestion" onChange={event => this.handleChange(event)} type="text" />
                <br/><br/>
                 <label htmlFor="username">Username</label><br/>
                <input id="username" placeholder="Add username" name="username" onChange={event => this.handleChange(event)} type="text" />
                <br/><br/>
                <button onClick={_ => this.onSubmit()}>Add suggestion</button>
                <br/><br/>
                <Link to="/">Go Back</Link>
                <br/><br/>
            </>
        );
    }

}



