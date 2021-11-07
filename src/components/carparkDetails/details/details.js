import React from "react";
import './details.css';
import Address from "./address/address";
import Availability from "./availability/availability";
import CostCalculator from "./costCalculator/costCalculator";



class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Address: null,
            AvailableLots: 0
        }
    }

    render() {
        return (
            <div className="details">
                <Address/>
                <Availability/>
                <CostCalculator/>
            </div>
        );
    }
}
export default Details;
