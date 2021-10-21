import React from 'react';
import Button from 'antd/es/button';
import './button.css'
import {useHistory} from "react-router-dom";

function NaviButtonFunction(props) {
        const history = useHistory();
    function HandleClick(navigationRoute) {

        console.log("CLICKED!")
        console.log(navigationRoute)
        history.push("/"+navigationRoute);
    }

    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={() => HandleClick(props.navigate)}>{props.value}</Button>
        </div>
    );
}


export default NaviButtonFunction;
