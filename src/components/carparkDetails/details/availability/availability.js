import React from 'react';
import './availability.css'
import {Statistic} from "antd";

function Availability(props) {
    //var result = await retrieveCarparkAvailability(props.carparkId, props.agency);
    // console.log(result);
    let availabilityClass;
    switch (props.lotClassification) {
        case 'Open':
            availabilityClass = 'open';
            break;
        case 'Limited':
            availabilityClass = 'limited';
            break;
        case 'Restricted':
            availabilityClass = 'restricted';
            break;
        default:
            availabilityClass = 'open';
            break;
    }

    //if(result['Availability'] === 'Open'){
    if(props.availableLots && props.totalLots) {
        return (
            <div id="availability" className={availabilityClass}>
                <Statistic title="Availability" value={props.availableLots} suffix={"/ " + props.totalLots}/>
            </div>
        );
    }else{
        return (
            <div className="availabilityCard">

            </div>
        );
    }


}

export default Availability;
