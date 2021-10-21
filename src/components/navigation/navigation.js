import TitleCard from "../shared/title";
import React from "react";
import './navigation.css';
import SearchBar from "../shared/searchBar";
import SearchFilters from "./search_filters/searchFilters";
import CarparkList from "./carpark_list/carparkList";
import MapContainer from "./gMapsView/gMapsView";

class Navigation extends React.Component{
    constructor(props){
        super(props);
    }
    handleSearch(e){
        console.log(e);
    }
    render() {
        return (
            <div className="navigationPage">
                <div className ="header">
                    <TitleCard  text = {"Navigate"}/>
                </div>
                <div className="pageBody">
                    <div className="searchSection">
                        <div className="destinationBar">
                            <div className = "destinationInput">
                                <SearchBar handleSearch = {this.handleSearch} placeholder = "Destination" tooltip = "Key in your desired destination"/>
                            </div>
                        </div>
                        <div className="searchFilters">
                            <SearchFilters/>
                        </div>
                    </div>
                    <div className="carparkSection">
                        <div className="carparks">
                            <CarparkList/>
                        </div>
                        <div className="gMaps">
                            <MapContainer/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
