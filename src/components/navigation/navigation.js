import TitleCard from "../shared/title";
import React from "react";
import './navigation.css';
import SearchFilters from "./search_filters/searchFilters";
import CarparkList from "./carpark_list/carparkList";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


import MapView from "./gMapsView/mapView";

class Navigation extends React.Component{
    carparkList;
    defaultSliderValue=250;
    constructor(props){
        super(props);
        this.state = {
            radius:this.defaultSliderValue,
            carparkList:[],
            carparkMarkers: [],
            lat: null,
            lng: null,
            sortKey: "Distance"
        }
        this.handleLocation= this.handleLocation.bind(this)
        this.handleRadiusChange= this.handleRadiusChange.bind(this)
        this.handleSort = this.handleSort.bind(this)
        this.distanceAPI= "http://192.168.0.115:8080/api/carparksByDistance"
        this.availabilityAPI= "http://192.168.0.115:8080/api/carparksByAvailability"


    }
    handleSearch(e){
        console.log(e);
    }

    handleSort = ({ key }) => {
        console.log(key)
        this.setState({
            sortKey: key
        })
        if(this.state.lat){
            this.refreshCarparks()
        }
    };

    async refreshCarparks() {
        console.log(this.state.lat,this.state.lng)
        await this.setState({carparkList:[], carparkMarkers: []})
        const radius = this.state.radius/1000;
        let apiUrl = null;
        // method body
        if(this.state.sortKey === "Distance")
            apiUrl = this.distanceAPI;
        else if(this.state.sortKey === "Availability")
            apiUrl = this.availabilityAPI;

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
        const list = await getClosestCarparks(this.state.lat, this.state.lng, radius, apiUrl)
        this.setState({
            carparkList: list
        })
        const arr =this.state.carparkList.map((carpark,index) =>{
            const pos = carpark.Location;
            const values = pos.split(" ");
            return {
                lat: parseFloat(values[0]),
                lng: parseFloat(values[1]),
                name: carpark.Name
            }

        })
        this.setState({
            carparkMarkers: arr
        })
    }

    async handleRadiusChange(radius){
        console.log('radius', radius)
        await this.setState({radius: radius, carparkList:[], carparkMarkers: []});
        console.log("current State:", this.state)
        if(this.state.lat){
            const radius = this.state.radius/1000;
            let apiUrl = null;
            // method body
            if(this.state.sortKey === "Distance")
                apiUrl = this.distanceAPI;
            else if(this.state.sortKey === "Availability")
                apiUrl = this.availabilityAPI;
            async function getClosestCarparks(lat, lng, radius, url) {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // TODO change radius to be dynamic
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
            const list = await getClosestCarparks(this.state.lat, this.state.lng, radius, apiUrl)
            this.setState({
                carparkList: list
            })
            console.log(this.state.carparkList)
            const arr =this.state.carparkList.map((carpark,index) =>{
                const pos = carpark.Location;
                const values = pos.split(" ");
                return {
                    lat: parseFloat(values[0]),
                    lng: parseFloat(values[1]),
                    name: carpark.Name
                }

            })
            this.setState({
                carparkMarkers: arr
            })
        }
    }

    async handleLocation(lat,lng) {
        console.log(lat,lng)
        await this.setState({lat: lat, lng: lng, carparkList:[], carparkMarkers: []})
        const radius = this.state.radius/1000;
        let apiUrl = null;
        // method body
        if(this.state.sortKey === "Distance")
            apiUrl = this.distanceAPI;
        else if(this.state.sortKey === "Availability")
            apiUrl = this.availabilityAPI;

        async function getClosestCarparks(lat, lng, radius, url) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // TODO change radius to be dynamic
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
        const list = await getClosestCarparks(lat, lng, radius, apiUrl)
        this.setState({
            carparkList: list
        })
        const arr =this.state.carparkList.map((carpark,index) =>{
            const pos = carpark.Location;
            const values = pos.split(" ");
            return {
                lat: parseFloat(values[0]),
                lng: parseFloat(values[1]),
                name: carpark.Name
            }

        })
        this.setState({
            carparkMarkers: arr
        })
    }

    render() {
        const menu = (
            <Menu onClick={this.handleSort}>
                <Menu.Item className="menuItems"  key="Distance">Distance</Menu.Item>
                <Menu.Item className="menuItems" key="Availability">Availability</Menu.Item>
            </Menu>
        );
        return (
            <div className="navigationPage">
                <div className ="header">
                    <TitleCard  text = {"Navigate"}/>
                </div>
                <div className="pageBody">
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
                            <div className= "dropdown">
                                <Dropdown overlay={menu}>
                                    <a className="sortDropdown" onClick={e => e.preventDefault()}>
                                        Sort <DownOutlined />
                                    </a>
                                </Dropdown>
                            </div>
                            <div className="carparkBox">
                                <CarparkList carparkList = {this.state.carparkList}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
