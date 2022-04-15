import React, {useEffect, useState} from "react";
import './costCalculator.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import {useLocation} from 'react-router-dom';
import {TimePicker} from "antd";
import ButtonFunction from "../shared/button";
import Linkify from 'react-linkify';
import Animate from "rc-animate";
import moment from "moment";

// component that loads the cost calculator page
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
    const hdbMessage = "For details on HDB Rates, please visit https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges"


    const location = useLocation();
    const state = {
        carparkId: location.state.carparkId,
        name: location.state.name,
        agency: location.state.agency,
        address: null,
    };

    // whenever input time is changed, make sure timeIn<timeOut, else disable button
    const onChangeStartTime = time => {
        setStartTime(time);
        if(endTime){
            if(time<endTime) {
                setTimesSelected(true)
            }
        }
    };
    const onChangeEndTime = time => {
        setEndTime(time);
        if(startTime){
            if(startTime<time) {
                setTimesSelected(true)
            }
        }
    };

    // retrieve the rates of the car park for display
    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, agency: state.agency})
        };
        fetch(process.env.REACT_APP_API_URL+"/api/rates", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json['result']);
                setRates(json['result']);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });

    },[state.agency, state.carparkId]);

    // calculate cost function
    async function onCalculateClicked(){
        await setCalculated(false)
        const duration = moment.duration(endTime.diff(startTime));
        var mins = Math.round(duration.asMinutes());
        if (mins===0){
            console.log("in here")
            setError('Start time must be before end time!')
            return
        }
        setError(null)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, timeIn: startTime.format("HH:mm"), timeOut: endTime.format("HH:mm")})
        };
        var t0 = performance.now();
        await fetch(process.env.REACT_APP_API_URL+"/api/calculate", requestOptions)
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
        var t1 = performance.now();
        console.log("Call to fetch calculate API " + (t1 - t0) + " milliseconds.");
    }

    if (isLoading) {
        return <div className="costCalculator">
        </div>;
    }

    if(!state.carparkId){
        console.log("going home");
        return (RouteNavigation(""))
    }

    if(state.agency==='HDB'){
        ratesSection = (<div className='CarParkSingleRate'>
                {Object.keys(rates).map((key, index) => (
                    <p key={index}>{key} : {rates[key]}</p>
                ))}
            <Linkify properties={{ target: '_blank', style: { color: '#000000' } }} key = {hdbMessage}>Message : {hdbMessage}</Linkify>
        </div>
        )
    }else if (state.agency==='URA'){
        ratesSection =rates.map((rate) => {
             return <div className="CarParkSingleRate">
                {Object.keys(rate).map((key, index) => (
                    <p key={index}>{key} : {rate[key]}</p>
                ))}
                </div>
            }
        )
    }else if (state.agency==='LTA'){
        ratesSection =rates.map((rate) => {
                return <div className="CarParkSingleRate">
                    {Object.keys(rate).map((key, index) => (
                        <p key={index}>{key} : {rate[key]}</p>
                    ))}
                </div>
            }
        )
    }

    // if the cost has been calculated and returned from the API call
    if(calculated){
        // if there are remarks from the API response
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
            <Animate
                transitionName="fade"
                component  = "span"
                transitionAppear ={true}
            >
            <div className="addressTimeRates" key ="1">
                <div className="addressAndTime">
                    <div className="addressText">
                        {state.name}
                    </div>
                    {state.agency!=='LTA'?<div className="time">
                        <TimePicker placeholder="Start Time" format="HH:mm" value={startTime}
                                    onChange={onChangeStartTime}/>
                        <TimePicker placeholder="End Time" format="HH:mm" value={endTime} onChange={onChangeEndTime}/>
                        <ButtonFunction disabled={!timesSelected} value={"Calculate!"}
                                        handleClick={onCalculateClicked}/>
                    </div>:null}
                </div>
                <div className="rates">
                    {
                        ratesSection
                    }
                </div>
            </div>
            </Animate>
            {calculatedSection}
        </div>
    );
}
export default CostCalculator;
