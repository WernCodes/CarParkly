import React from 'react';
import Button from 'antd/es/button';
import './carparkVideoSearch.css'

function CarparkVideoSearch(props) {
    function showVideoSearchClicked(carparkName) {
        window.open("https://www.google.com/search?q="+carparkName+"+carpark+video" );
    }

    return (
        <div className="button">
            <Button type = "primary" size = "large" block = "false" onClick={() =>showVideoSearchClicked(props.carparkName)}>{props.value}</Button>
        </div>
    );
}


export default CarparkVideoSearch;
