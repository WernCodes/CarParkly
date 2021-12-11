import React from "react";
import './details.css';
import Address from "./address/address";
import Availability from "./availability/availability";
import NaviButtonWithParamsFunction from "../../shared/navi_button_with_params";



class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = props.values
    }

    render() {
        return (
            <div className="details">
                <div className="address"> <Address lat = {this.state.lat} long = {this.state.long} value = {"Open location in Google Maps"}/> </div>
                <div className="availability"> <Availability carparkId = {this.state.carparkId} agency = {this.state.agency}/> </div>
                <div className="costCalculator"> <NaviButtonWithParamsFunction value = {"Cost Calculator"} navigate={"costCalculator"} state = {this.state}/> </div>
            </div>
        );
    }
}
export default Details;
