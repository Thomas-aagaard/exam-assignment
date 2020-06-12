import React, {Component} from 'react';
import {Link} from "@reach/router";
import AddSignature from "./addSignature";


export default class Suggestion extends Component {

    render() {
        // const id = this.props.id;
        //  const question = this.props.GetQuestion(id);
        const suggestion = this.props.GetSuggestion(this.props.id);
        let title = "";
        let description ="";
        let content = "Loading";
        let date = Date.now();
        let username = '';
        let signatures = 0;
        let showuser = [];

        // if question is empty then replace the question with "loading" see variable content above
        if (suggestion) {
            title = suggestion.title;
            description = suggestion.description;
            content = suggestion.suggestion;
            date = suggestion.date;
            username = suggestion.username;
            signatures = suggestion.signatures;
            showuser = suggestion.usersignature.map(a => <li key={a}><strong>{ "User: "} </strong>{ a.user} <strong>{" date: "}</strong>{ a.userdate}</li>);
        }
        return (
            <>
                <h2>{title} Suggestion: {content}</h2>
                <p>Description:  {description}</p>
                <p>{"Date:" + date }</p><p>{"Username: " + username } </p>
                <p><strong>{"Signature: " }</strong>{signatures} </p>
                <p>{showuser}</p>

                <br/>
                {/* Form to add signature */}
                <AddSignature id={this.props.id} AddSignature={(id, user) => this.props.AddSignature(id, user)}/>

                <br/> <br/>


                <Link to="/">Go Back</Link>
                <br/>
            </>
        );
    }
}