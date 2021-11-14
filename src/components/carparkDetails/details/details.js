import React from "react";
import './details.css';
import Address from "./address/address";
import Availability from "./availability/availability";
import CostCalculator from "./costCalculator/costCalculator";



class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = props.values
    }

    render() {
        return (
            <div className="details">
                <Address lat = {this.state.lat} long = {this.state.long} value = {"Open location in Google Maps"}/>
                <Availability/>
                <CostCalculator/>
            </div>
        );
    }
}
export default Details;
