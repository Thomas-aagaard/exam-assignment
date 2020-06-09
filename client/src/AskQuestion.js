import React, {Component} from "react";


export default class AskQuestion extends Component {

constructor(props) {
    super(props);

    this.state = {
        input: ""
    };
}
handleChange(event) {
    this.setState({
        input: event.target.value
    });
}
onSubmit(event) {
    this.props.addQuestion(this.state.input);
    console.log(this.state.input);

}




render() {

    return(
        <>
            <br/>
            <label htmlFor="Ask-question">
                Ask question
            </label><br/>
            <input id="Ask-question" name="question" onChange={event => this.handleChange(event)} type="text" value={this.state.text}/>
            <button onClick={(event) => this.onSubmit(event)}>Ask question</button>



        </>
    );
}

}
