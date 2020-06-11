import React, {Component} from "react";


export default class addSignature extends Component {



    constructor(props) {
        super(props);
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