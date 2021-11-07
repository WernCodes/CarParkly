import React from 'react';
import Button from 'antd/es/button';
import './availability.css'

function Availability(props) {
    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={(e) => props.handleClick(e)}>{props.value}</Button>
        </div>
    );
}


export default Availability;
