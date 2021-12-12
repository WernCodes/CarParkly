import React, {useEffect, useState} from "react";
import './costCalculator.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import {useLocation} from 'react-router-dom';
import {TimePicker} from "antd";
import ButtonFunction from "../shared/button";

const CostCalculator = () =>{
    //TODO set to true when implementing API
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();
    const state = {
        carparkId: location.state.carparkId,
        name: location.state.name,
        rates: null,
        address: null,
        totalCost: null,
        calculated: false
    };

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const [startTime, setStartValue] = useState(null);
    const onChangeStartTime = time => {
        setStartValue(time);
    };
    const [endTime, setEndValue] = useState(null);
    const onChangeEndTime = time => {
        setEndValue(time);
    };

    useEffect(() => {
        fetch("http://192.168.0.120:8080/api/students", {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => console.log(response))
            .then(response => setLoading(true))
            .catch(err => {
                console.log(err);
            });
    },[]);

    if (isLoading) {
        return <div className="costCalculator">
            <TitleCard  text = "Loading..."/>
        </div>;
    }

    if(!state.carparkId){
        console.log("going home");
        return (RouteNavigation(""))
    }

    function onCalculateClicked() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: "A", date: date, startTime: startTime, endTime: endTime })
        };
        fetch("http://192.168.0.120:8080/api/students", requestOptions)
            .then(response => response.json())
            .then(response => {
                    console.log(response);
                    // TODO add backend data
                    state.totalCost = response['results'];
                    state.calculated = true;
                }
            )
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <div className="costCalculator">
            <TitleCard  text = {"Cost Calculator"}/>
            <div className="addressTimeRates">
                <div className="addressAndTime">
                    <div className="addressText">
                        {state.name + ": "+ state.address}
                    </div>
                    <div className="time">
                        <TimePicker placeholder="Start Time" format="HH:mm" value={startTime} onChange={onChangeStartTime} />
                        <TimePicker placeholder="End Time" format="HH:mm" value={endTime} onChange={onChangeEndTime} />
                        <ButtonFunction value = {"Calculate!"} handleClick = {onCalculateClicked}/>
                    </div>

                </div>
                <div className="rates">
                {/* TODO style rates */}
                 </div>
            </div>

            <div className='totalCost'>
                {state.totalCost}
            </div>

        </div>
    );
}
export default CostCalculator;
