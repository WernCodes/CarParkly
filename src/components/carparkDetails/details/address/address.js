import React from 'react';
import Button from 'antd/es/button';
import './address.css'

// This component loads a button with the text of the address passed in. Clicking on this button will open a google maps window using the lat long values.
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
