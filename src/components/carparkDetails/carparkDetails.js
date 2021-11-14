import React, {useEffect, useState} from "react";
import './carparkDetails.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import Details from "./details/details";
import {useLocation} from 'react-router-dom';

const CarparkDetails = () =>{
    //TODO set to true when implementing API
    const [isLoading, setLoading] = useState(false);
    const location = useLocation();
    const state = {
        carparkId: location.state.Id,
        name: location.state.Name,
        availableLots: null,
        totalLots:null,
        lat: null,
        long: null
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
        return <div className="carparkDetails">
            <TitleCard  text = "Loading..."/>
        </div>;
    }

    if(!state.carparkId){
        console.log("going home");
        return (RouteNavigation(""))
    }

    return (
        <div className="carparkDetails">
            <TitleCard  text = {state.name}/>
            <div className="detailsAndYT">
                <div className="detailsAndLinks">
                    <Details values ={state}/>
                    {/* TODO add in YT function */}
                </div>
                <div className = "YT">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/onOY6tg3y24"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            </div>

            {/* TODO add in Community function */}
        </div>
    );
}
export default CarparkDetails;
