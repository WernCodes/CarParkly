import React from "react";
import './details.css';
import Address from "./address/address";
import Availability from "./availability/availability";
import NaviButtonWithParamsFunction from "../../shared/navi_button_with_params";
import CarparkVideoSearch from "./carparkVideoSearch/carparkVideoSearch";



class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = props.values
    }

    render() {
        return (
            <div className="details">
                <div className="address"> <Address lat = {this.props.lat} lng = {this.props.lng} value = {"Open location in Google Maps"}/> </div>
                <div className="carparkVideoSearch"> <CarparkVideoSearch carparkName = {this.state.name} value = {"Search Car Park Video"}/> </div>
                <div className="availability"> <Availability lotClassification = {this.props.lotClassification} availableLots = {this.props.availableLots} totalLots = {this.props.totalLots}/> </div>
                <div className="costCalculator"> <NaviButtonWithParamsFunction value = {"Cost Calculator"} navigate={"costCalculator"} state = {this.state}/> </div>
            </div>
        );
    }
}
export default Details;
