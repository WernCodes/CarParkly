import React from 'react';
import './carparkCard.css';
import NaviButtonFunction from "../../../shared/navi_button";
import ButtonFunction from "../../../shared/button";

class CarparkCard extends React.Component{
    constructor(props) {
        super(props);
    }

    handleNavigateClick(e){
        fetch("http://192.168.0.120:8080/api/students", {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => console.log(response)
            )
            .catch(err => {
                console.log(err);
            });
    }

    apiCall(){

    }
    render(){
        return(
            <div className="card">
                <div className="name_and_lots">
                    <div>Carpark Name</div>
                    <div>Available lots: 20</div>
                </div>
                <div className="view" >
                    <NaviButtonFunction value = {"View"} navigate={"carparkID"}/>
                </div>
                <div className="navigate" >
                    {/* TODO add in button function */}
                    <ButtonFunction value = {"Navigate"} handleClick={this.handleNavigateClick}/>
                </div>
            </div>
        );
    }
}

export default CarparkCard;

