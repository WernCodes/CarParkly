import TitleCard from "../shared/title";
import React from "react";
import './navigation.css';

function Navigation(props) {
    return (
        <div className="game" >
            <div className ="header">
                <TitleCard  text = {"Welcome to the second page!"}/>
            </div>
        </div>
    );
}

export default Navigation;
