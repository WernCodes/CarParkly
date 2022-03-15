import TitleCard from "../shared/title";
import React from "react";
import './navigation.css';
import SearchFilters from "./search_filters/searchFilters";
import CarparkList from "./carpark_list/carparkList";
import { Radio } from 'antd';



import MapView from "./gMapsView/mapView";
import Animate from "rc-animate";

class Navigation extends React.Component{
    carparkList;
    defaultSliderValue=250;
    pauseTime = 1000;
    constructor(props){
        super(props);
        this.state = {
            radius:this.defaultSliderValue,
            carparkList:[],
            carparkMarkers: [],
            lat: null,
            lng: null,
            sortKey: "Distance",
            showList: false
        }
        this.handleLocation= this.handleLocation.bind(this)
        this.handleRadiusChange= this.handleRadiusChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.distanceAPI= process.env.REACT_APP_API_URL+"/api/carparksByDistance"
        this.availabilityAPI= process.env.REACT_APP_API_URL+"/api/carparksByAvailability"
        this.costAPI= process.env.REACT_APP_API_URL+"/api/carparksByCost"
    }
    handleSearch(e){
        console.log(e);
    }

    handleSort = e => {
        console.log(e.target.value)
        this.setState({
            sortKey: e.target.value
        })
        if(this.state.lat){
            this.refreshCarparks(e.target.value)
        }
    };
    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    async refreshCarparks(sortKey) {
        console.log(this.state.lat,this.state.lng)
        await this.setState({showList: false, carparkList: []})
        const radius = this.state.radius/1000;
        let apiUrl = null;
        // method body
        if(sortKey === "Distance")
            apiUrl = this.distanceAPI;
        else if(sortKey === "Availability")
            apiUrl = this.availabilityAPI;
        else if(sortKey === "Cost")
            apiUrl = this.costAPI;
        await this.sleep(this.pauseTime);

        async function getClosestCarparks(lat, lng, radius, url) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ maxDistanceToLocation: radius, locationLat: lat, locationLon: lng })
            };
            let response = null;
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // body
                    console.log(json);
                    response = json;
                });
            return response['result'];

        }
        const list = await getClosestCarparks(this.state.lat, this.state.lng, radius, apiUrl)
        const arr =list.map((carpark) =>{
            const pos = carpark.Location;
            const values = pos.split(" ");
            return {
                lat: parseFloat(values[0]),
                lng: parseFloat(values[1]),
                name: carpark.Name
            }

        })
        this.setState({
            carparkList: list,
            carparkMarkers: arr,
            sortKey: sortKey
        })
        this.setState({
            showList:true
        })
    }

    async handleRadiusChange(radius){
        console.log('radius', radius)
        await this.setState({showList:false, carparkList: []});
        console.log("current State:", this.state)
        await this.sleep(this.pauseTime);
        if(this.state.lat){
            const newRadius = radius/1000;
            let apiUrl = null;
            // method body
            if(this.state.sortKey === "Distance")
                apiUrl = this.distanceAPI;
            else if(this.state.sortKey === "Availability")
                apiUrl = this.availabilityAPI;
            else if(this.state.sortKey === "Cost")
                apiUrl = this.costAPI;
            async function getClosestCarparks(lat, lng, radius, url) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ maxDistanceToLocation: radius, locationLat: lat, locationLon: lng })
                };
                let response = null;
                await fetch(url, requestOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        // body
                        console.log(json);
                        response = json;
                    });
                console.log("Completed");
                return response['result'];

            }
            const list = await getClosestCarparks(this.state.lat, this.state.lng, newRadius, apiUrl)
            const arr =list.map((carpark) =>{
                const pos = carpark.Location;
                const values = pos.split(" ");
                return {
                    lat: parseFloat(values[0]),
                    lng: parseFloat(values[1]),
                    name: carpark.Name
                }

            })
            this.setState({
                carparkList: list,
                carparkMarkers: arr,
                radius: radius,
                showList: true
            })
        }
    }

    async handleLocation(lat,lng) {
        console.log(lat,lng)
        console.log(this.distanceAPI);
        console.log(this.availabilityAPI);
        console.log(this.costAPI);

        await this.setState({lat: lat, lng: lng, showList: false, carparkList: []})
        await this.sleep(this.pauseTime);
        const radius = this.state.radius/1000;
        let apiUrl = null;
        // method body
        if(this.state.sortKey === "Distance")
            apiUrl = this.distanceAPI;
        else if(this.state.sortKey === "Availability")
            apiUrl = this.availabilityAPI;
        else if(this.state.sortKey === "Cost")
            apiUrl = this.costAPI;

        async function getClosestCarparks(lat, lng, radius, url) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ maxDistanceToLocation: radius, locationLat: lat, locationLon: lng })
            };
            let response = null;
            var t0 = performance.now();
            await fetch(url, requestOptions)
                .then((response) => response.json())
                .then((json) => {
                    // body
                    console.log(json);
                    response = json;
                });
            var t1 = performance.now();
            console.log("Call to fetch car parks API " + (t1 - t0) + " milliseconds.");
            return response['result'];

        }
        const list = await getClosestCarparks(lat, lng, radius, apiUrl)
        const arr =list.map((carpark) =>{
            const pos = carpark.Location;
            const values = pos.split(" ");
            return {
                lat: parseFloat(values[0]),
                lng: parseFloat(values[1]),
                name: carpark.Name
            }

        })
        this.setState({
            carparkList: list,
            carparkMarkers: arr,
            showList:true
        })

    }

    render() {
        const menu = (
            <Radio.Group onChange={this.handleSort} value={this.state.sortKey} optionType="button" buttonStyle="solid" size="middle">
                <Radio.Button value={"Distance"}>Distance</Radio.Button>
                <Radio.Button value={"Availability"}>Availability</Radio.Button>
                <Radio.Button value={"Cost"}>Cost</Radio.Button>
            </Radio.Group>
        );
        return (
            <div className="navigationPage">
                <div className ="header">
                    <TitleCard  text = {"CarParkly"}/>
                </div>
                <Animate
                    transitionName="fade"
                    component  = "span"
                    transitionAppear ={true}
                >
                <div className="pageBody" key ="1">
                    <div className="searchSection">
                        <div className="searchFilters">
                            <SearchFilters onRadiusChange={this.handleRadiusChange} defaultValue ={this.defaultSliderValue}/>
                        </div>
                    </div>
                    <div className="carparkSection">
                        <div className="gMaps">
                            <MapView onLocationChange = {this.handleLocation} markers = {this.state.carparkMarkers}/>
                        </div>
                        <div className="carparks">
                            <div className= "sortBox">
                                <div className="sortText">Sort:</div>
                                {menu}
                            </div>
                            <div className="carparkBox">
                                <CarparkList carparkList = {this.state.carparkList} show = {this.state.showList}/>
                            </div>
                        </div>
                    </div>
                </div>
                </Animate>
            </div>
        );
    }
}

export default Navigation;
