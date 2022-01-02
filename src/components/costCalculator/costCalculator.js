import React, {useEffect, useState} from "react";
import './costCalculator.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import {useLocation} from 'react-router-dom';
import {TimePicker} from "antd";
import ButtonFunction from "../shared/button";

const CostCalculator = () =>{
    let calculatedSection;
    let ratesSection;

    const [isLoading, setLoading] = useState(true);
    const [rates, setRates] = useState({});
    const [totalCost, setTotalCost] = useState();
    const [remarks, setRemarks] = useState('None');
    const [calculated, setCalculated] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [error, setError] = useState(null);
    const [timesSelected, setTimesSelected]= useState(false)


    const location = useLocation();
    const state = {
        carparkId: location.state.carparkId,
        name: location.state.name,
        agency: location.state.agency,
        address: null,
    };

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const onChangeStartTime = time => {
        setStartTime(time);
        if(endTime){
            setTimesSelected(true)
        }
    };
    const onChangeEndTime = time => {
        setEndTime(time);
        if(startTime){
            setTimesSelected(true)
        }
    };

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, agency: state.agency})
        };
        fetch("http://192.168.0.115:8080/api/carpark", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json['result']['Carpark']['Rates']);
                if (state.agency === 'HDB') {
                    setRates(json['result']['Carpark']['Rates']);
                }else if (state.agency === 'URA') {
                    setRates(json['result']['Carpark']['Rates']['Car']);
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });

    },[state.agency, state.carparkId]);

    // calculate cost function
    async function onCalculateClicked(){
        if (startTime>=endTime){
            setError('Start time must be before end time!')
            return
        }
        setError(null)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, timeIn: startTime.format("HH:mm"), timeOut: endTime.format("HH:mm")})
        };
        await fetch("http://192.168.0.115:8080/api/calculate", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json)
                setTotalCost(json['result']['Cost']);
                setRemarks(json['message']);
                setCalculated(true)

            })
            .catch(err => {
                console.log(err);
            });
    }

    if (isLoading) {
        return <div className="costCalculator">
            <TitleCard  text = "Loading..."/>
        </div>;
    }

    if(!state.carparkId){
        console.log("going home");
        return (RouteNavigation(""))
    }

    if(state.agency==='HDB'){
        ratesSection = (Object.keys(rates).map((key, index) => (
            <p key={index}> {key} : {rates[key]}</p>
        )))
    }else if (state.agency==='URA'){
        //TODO create a rates api to display rates of carpark nicer
    }

    if(calculated){
        if (remarks){
            calculatedSection =(
                <div className="calculatedCost">
                    <div className='totalCost'>
                        {"Total Cost: $"+totalCost}
                    </div>
                    <div className='remarks'>
                        {"Remarks: "+remarks}
                    </div>
                </div>
            )
        }else{
            calculatedSection =(
                <div className="calculatedCost">
                    <div className='totalCost'>
                        {"Total Cost: $"+totalCost}
                    </div>
                </div>
            )
        }

    }else if (error){
        calculatedSection =(
            <div className="error">
                {error}
            </div>
        )
    }else{
        calculatedSection =(
            <div>

            </div>
        )
    }

    return (
        <div className="costCalculator">
            <TitleCard  text = {"Cost Calculator"}/>
            <div className="addressTimeRates">
                <div className="addressAndTime">
                    <div className="addressText">
                        {state.name}
                    </div>
                    <div className="rates">
                        {
                            ratesSection
                        }
                    </div>
                    <div className="time">
                        <TimePicker placeholder="Start Time" format="HH:mm" value={startTime} onChange={onChangeStartTime} />
                        <TimePicker placeholder="End Time" format="HH:mm" value={endTime} onChange={onChangeEndTime} />
                        <ButtonFunction disabled={!timesSelected} value = {"Calculate!"} handleClick = {onCalculateClicked}/>
                    </div>
                </div>

            </div>
            {calculatedSection}
        </div>
    );
}
export default CostCalculator;
