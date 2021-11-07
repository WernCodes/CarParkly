import React from 'react';
import './carparkCard.css';
import NaviButtonFunction from "../../../shared/navi_button";
import ButtonFunction from "../../../shared/button";

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


    render(){
        return(
            <div className="card">
                <div className="name_and_lots">
                    <div>{this.state.Name}</div>
                    <div>Available lots: {this.state.AvailableLots}</div>
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

