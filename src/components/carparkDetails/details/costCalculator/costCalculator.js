import React from 'react';
import Button from 'antd/es/button';
import './costCalculator.css'

function CostCalculator(props) {
    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={(e) => props.handleClick(e)}>{props.value}</Button>
        </div>
    );
}


export default CostCalculator;
