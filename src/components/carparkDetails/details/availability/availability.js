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

    //if(result['Availability'] === 'Open'){
    if(props.availableLots && props.totalLots) {
        return (
            <div className="greenCard">
                <Statistic title="Availability" value={props.availableLots} suffix={"/" + props.totalLots}
                           valueStyle={{color: '#3f8600'}}/>
            </div>
        );
    }else{
        return (
            <div className="greenCard">

            </div>
        );
    }


}

export default Availability;
