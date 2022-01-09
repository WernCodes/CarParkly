import React from 'react';
import Button from 'antd/es/button';
import './button.css'
import {useHistory} from "react-router-dom";

function NaviButtonWithParamsFunction(props) {
    const history = useHistory();
    function HandleClick(navigationRoute, stateValues) {

        console.log("CLICKED with params!")
        console.log(navigationRoute)
        console.log("pushing these values:", stateValues)
        history.push({
            pathname: '/'+navigationRoute,
            state: stateValues,
        });
    }

    return (
        <div className="button">
            <Button style={{ background: "#9F32B2", borderColor: "#9F32B2"  }} type = "primary" size = "large" block = "false" onClick={() => HandleClick(props.navigate, props.state)}>{props.value}</Button>
        </div>
    );
}


export default NaviButtonWithParamsFunction;
