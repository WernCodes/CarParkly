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
            Location: this.props.location,
            Agency: this.props.agency,
            Cost: this.props.cost
        }
        this.handleNavigateClick = this.handleNavigateClick.bind(this)
    }

    handleNavigateClick(){
        const values = this.state.Location.split(" ");
        window.open("https://www.google.com/maps/dir/?api=1&destination="+values[0]+"%2C"+values[1] );
    }


    render(){
        return(
            <div className="card">
                <div className="name_and_lots">
                    <div className="carparkName">{this.state.Name}</div>
                    <div className="availableLots">Available lots: {this.state.AvailableLots?this.state.AvailableLots:"Info not available"}</div>
                    <div className="costCard">Cost: {"Cost" in this.state.Cost?"$"+this.state.Cost['Cost']:this.state.Cost['Remarks']}</div>
                </div>
                <div className="view" >
                    <NaviButtonWithParamsFunction value = {"Details & Rates"} navigate={"carpark"} state = {this.state}/>
                </div>
                <div className="navigate" >
                    <ButtonFunction value = {"Navigate"} handleClick={this.handleNavigateClick}/>
                </div>
            </div>
        );
    }
}

export default CarparkCard;

