import React, {Component} from "react";
import AuthService from "./AuthService";


export default class addSignature extends Component {

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
   // API_URL = process.env.REACT_APP_API_URL;
    API_URL = 'http://localhost:8080/api';

    constructor(props) {
        super(props);
        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
        this.state = {
            input: "",
        };
    }
    async GetData() {
        const resp = await this.Auth.fetch(`${this.API_URL}/suggestions`);
        // let url = `${this.API_URL}/suggestions`; // URL of the API.

        // let result = await fetch(url); // Get the data
        //  let json = await result.json(); // Turn it into json
        let json = await resp.json(); // Turn it into json
        return this.setState({ // Set it in the state
            suggestions: json
        })
    }

    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    onSubmit(event) {

        //const info = this.state.input;;
       // if ( info  === "svend"){

            this.props.AddSignature(this.props.id, this.state.input);

    //  }
      //  else {
        //    console.log("Did not work");
     //   }
    }

    render() {
        return(
            <>
                <label htmlFor="add-Signature">
                    Create you signature to the suggestion
                </label>
                <input id="add-Signature" name="input" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Add signature</button>


            </>
        );
    }
}