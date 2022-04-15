import React from 'react';
import Button from 'antd/es/button';
import './button.css'

// Reusable button component
function ButtonFunction(props) {
    return (
        <div className="button">
            <Button style={{ background: "#9F32B2" , borderColor: "#9F32B2" }} disabled={props.disabled} type = "primary" size = "large" block = "false" onClick={(e) => props.handleClick(e)}>{props.value}</Button>
        </div>
    );
}
ButtonFunction.defaultProps = {
    disabled: false
}


export default ButtonFunction;
