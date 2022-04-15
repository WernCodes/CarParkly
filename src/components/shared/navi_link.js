import React from 'react';
import {useHistory} from "react-router-dom";

// Text link to navigate web page
function NaviLinkFunction(props) {
    const history = useHistory();
    function HandleClick(navigationRoute) {

        console.log("CLICKED!")
        console.log(navigationRoute)
        history.push("/"+navigationRoute);
    }

    return (
        <div className="link">
            <a href="" onClick={() => HandleClick(props.navigate)}>{props.value}</a>
        </div>
    );
}


export default NaviLinkFunction;
