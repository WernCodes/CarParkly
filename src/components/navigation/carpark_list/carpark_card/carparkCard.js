import React from 'react';
import './carparkCard.css';
import ButtonFunction from "../../../shared/button";
import NaviButtonWithParamsFunction from "../../../shared/navi_button_with_params";

class CarparkCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Id: this.props.carparkId,
            Name: this.props.name,
            AvailableLots: this.props.availableLots,
            Location: this.props.location
        }
    }

    handleNavigateClick(){
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


    render(){
        return(
            <div className="card">
                <div className="name_and_lots">
                    <div>{this.state.Name}</div>
                    <div>Available lots: {this.state.AvailableLots}</div>
                </div>
                <div className="view" >
                    <NaviButtonWithParamsFunction value = {"View"} navigate={"carpark"} state = {this.state}/>
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

