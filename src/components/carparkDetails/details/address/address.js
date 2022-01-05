import React from 'react';
import Button from 'antd/es/button';
import './address.css'

function Address(props) {
    function showInMapClicked(lat, long) {
        window.open("https://www.google.com/maps/dir/?api=1&destination="+lat+"%2C"+long );
    }

    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={() =>showInMapClicked(props.lat, props.lng)}>{props.value}</Button>
        </div>
    );
}


export default Address;
