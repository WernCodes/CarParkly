import React from "react";
import './carparkDetails.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import Details from "./details/details";


class CarparkDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Id: this.props.carparkId,
            Name: this.props.name,
            Address: null,
            AvailableLots: 0,
            Video: false,
            VideoLink: null
        }
    }
    componentDidMount(){
        fetch("http://192.168.0.120:8080/api/students", {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => console.log(response)
            )
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        if(!this.state.id){
            RouteNavigation("")
        }
        return (
            <div className="carparkDetails">
                <TitleCard  text = {this.state.Name}/>
                <Details/>
                {/* TODO add in YT function */}
                <iframe width="560" height="315" src="https://www.youtube.com/embed/HProPpW1E-8"
                title="YouTube video player" frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen/>
                {/* TODO add in Community function */}
            </div>
        );
    }
}
export default CarparkDetails;
