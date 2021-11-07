import React from 'react';
import Button from 'antd/es/button';
import './address.css'

function Address(props) {
    const showInMapClicked = () => {
        window.open("https://maps.google.com?q="+props.lat+","+props.long );
    };
    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={(e) => props.handleClick(e)}>{props.value}</Button>
        </div>
    );
}


export default Address;
