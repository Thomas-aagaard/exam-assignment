import React, {Component} from 'react';
import {Link} from "@reach/router";
import AddSignature from "./addSignature";
///import Answer from "./Answer";


export default class Suggestion extends Component {


    onSubmit(user) {
        console.log(this.props.id);
        //    this.props.AddVoting(this.props.id, aid);
    }

    render() {
        // const id = this.props.id;
        //  const question = this.props.GetQuestion(id);
        const suggestion = this.props.GetSuggestion(this.props.id);
        let content = "Loading";
        let date = Date.now();
        let username = '';
        let signatures = 0;
        let showuser = [];

        // if question is empty then replace the question with "loading" see variable content above
        if (suggestion) {
            content = suggestion.suggestion;
            date = suggestion.date;
            username = suggestion.username;
            signatures = suggestion.signatures;
            showuser = suggestion.usersignature.map(a => <li key={a}><strong>{ "User: "} </strong>{ a.user} <strong>{" date: "}</strong>{ a.userdate}</li>);
            /*  usersignature = suggestion.usersignature.map(a => <li key={a}><strong> { "Answers: "}</strong>{a.text}<strong> { "Votes: "}</strong>
                  <button onClick={_ => this.onSubmit(a._id)}>GIVE A VOTE</button>{ a.user}</li>);*/
        }

        return (
            <>
                <h2>Suggestion: {content}</h2>
                <p>{"Date:" + date }</p><p>{"Username: " + username } </p>
                <p><strong>{"Signature: " }</strong>{signatures} </p>
                <p>{showuser}</p>

                <ul>


                </ul>
                <br/>
                {/* Form to add signature */}
                <AddSignature id={this.props.id} AddSignature={(id, user) => this.props.AddSignature(id, user)}/>

                <br/> <br/>


                <Link to="/">Go Back</Link>
                <br/>
            </>
        );
    }
} /// <Answer id={this.props.id} AddSignature={(id) => this.AddSignature(id)}/>