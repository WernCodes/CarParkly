import React from 'react';
import './carparkCard.css';
import ButtonFunction from "../../../shared/button";
import NaviButtonWithParamsFunction from "../../../shared/navi_button_with_params";

// component that loads a car park card within the list of car parks
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

    // open a new browser tab for google maps navigation
    handleNavigateClick(){
        const values = this.state.Location.split(" ");
        window.open("https://www.google.com/maps/dir/?api=1&destination="+values[0]+"%2C"+values[1] );
    }


    render(){
        return(
            <div className="card">
                <div className="name_and_lots">
                    <div className="carparkName">{this.state.Name}</div>
                    <div className="availableLots">Available lots: {(Object.is(this.state.AvailableLots, undefined)||Object.is(this.state.AvailableLots, null))?"Info not available":this.state.AvailableLots}</div>
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

