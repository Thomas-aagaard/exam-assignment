import React,{Component} from 'react';

class Answer extends Component{

    // API url from the file '.env' OR the file '.env.development'.
    // The first file is only used in production.
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props){
        super(props);
        this.state = {
            votes : this.props.votes
        }
    }


    onSubmit() {
        this.props.AddVoting(this.props.id, this.props.aid);
    }


    render(){
        return(
            <>
                <ul>{}</ul>


            </>
        );
    }
}
export default Answer;