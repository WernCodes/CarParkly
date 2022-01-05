import React from 'react';
import './availability.css'
import {Statistic} from "antd";

function retrieveCarparkAvailability(carparkId, typeOfCarpark) {
    if(typeOfCarpark === 'HDB'){
        return new Promise(function (resolve, reject) {
            fetch("http://192.168.0.120:8080/api/HDBLots", {
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
            fetch("http://192.168.0.120:8080/api/URALots", {
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
    let availabilityColor;
    switch (props.lotClassification) {
        case 'Open':
            availabilityColor = '#69B34C';
            break;
        case 'Limited':
            availabilityColor = '#FF8E15';
            break;
        case 'Restricted':
            availabilityColor = '#FF0D0D';
            break;
        default:
            availabilityColor = '#69B34C';
            break;
    }

    //if(result['Availability'] === 'Open'){
    if(props.availableLots && props.totalLots) {
        return (
            <div className="availabilityCard">
                <Statistic title="Availability" value={props.availableLots} suffix={"/ " + props.totalLots}
                           valueStyle={{color: availabilityColor}}/>
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
