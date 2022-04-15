import React from 'react';
import './availability.css'
import {Statistic} from "antd";

// This component loads the availability of the car park. Depending on the classification, it will be color coded accordingly.
function Availability(props) {
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

    if(!(Object.is(props.availableLots, undefined)||Object.is(props.availableLots, null)) && !(Object.is(props.totalLots, undefined)||Object.is(props.totalLots, null))) {
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
