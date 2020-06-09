import React, {Component} from 'react';
//import Question from "./Question";
import { Link } from "@reach/router";

class Suggestions extends Component {

    render() {


        const mapFunction = elm =>
            <li key={elm._id}>
                <Link to={`/suggestions/${elm._id}`}>{elm.suggestion } <p> { "signatures" + elm.signatures}</p></Link>
            </li>;

        let allquestions = this.props.data;
        let list = allquestions.map(mapFunction);
        return (
            <>
                <ul>
                    {list}
                </ul>
            </>
        );

    }
}
export default Suggestions