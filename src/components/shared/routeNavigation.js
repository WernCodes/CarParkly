import React from 'react';
import './button.css'
import {useHistory} from "react-router-dom";

// function to route a web page
function RouteNavigation(route) {
        const history = useHistory();
        console.log("Routing!")
        console.log(route)
        history.push("/"+route);
}


export default RouteNavigation;
