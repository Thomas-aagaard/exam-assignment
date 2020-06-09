import React, {Component} from "react";


export default class addSignature extends Component {

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            input: "",
        };
    }
    onChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    onSubmit(event) {
        this.props.AddSignature(this.props.id, this.state.input);
    }
    async GetData() {
        let url = `${this.API_URL}/suggestions`; // URL of the API.

        let result = await fetch(url); // Get the data
        let json = await result.json(); // Turn it into json
        return this.setState({ // Set it in the state
            suggestions: json
        })
    }

    render() {
        return(
            <>
                <label htmlFor="add-Signature">
                    Create you signature to the suggestion
                </label>
                <input id="add-Signature" name="input" onChange={event => this.onChange(event)} type="text"/>
                <button onClick={_ => this.onSubmit()}>Post signature</button>
            </>
        );
    }
}