import React from 'react';
import Button from 'antd/es/button';
import './button.css'

function ButtonFunction(props) {
    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false">{props.value}</Button>
        </div>
    );
}

export default ButtonFunction;
