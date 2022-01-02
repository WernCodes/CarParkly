import React from 'react';
import Button from 'antd/es/button';
import './button.css'

function ButtonFunction(props) {
    return (
        <div className="button">
            <Button disabled={props.disabled} type = "primary" size = "large" block = "false" onClick={(e) => props.handleClick(e)}>{props.value}</Button>
        </div>
    );
}
ButtonFunction.defaultProps = {
    disabled: false
}


export default ButtonFunction;
