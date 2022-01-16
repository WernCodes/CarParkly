import React from 'react';
import './availability.css'
import {Statistic} from "antd";

function retrieveCarparkAvailability(carparkId, typeOfCarpark) {
    if(typeOfCarpark === 'HDB'){
        return new Promise(function (resolve, reject) {
            fetch(process.env.REACT_APP_API_URL+"/api/HDBLots", {
                method: "GET",
            })
                .then(response => response.json())
                .then(response => console.log(response)
                )
                .then(response => {
                    var result = response;
                    console.log(response);
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        });
    }
    else if(typeOfCarpark === 'URA'){
        return new Promise(function (resolve, reject) {
            fetch(process.env.REACT_APP_API_URL+"/api/URALots", {
                method: "GET",
            })
                .then(response => response.json())
                .then(response => console.log(response)
                )
                .then(response => {
                    var result = response;
                    console.log(response);
                    resolve(result)
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });

        });
    }

}
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
