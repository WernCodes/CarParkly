
import React from 'react';
import './carparkList.css';
import CarparkCard from "./carpark_card/carparkCard";

class CarparkList extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const Carparks = this.props.carparkList;
        let itemList=Carparks.map((carpark) =>
                <CarparkCard carparkId = {carpark.CarParkID} name = {carpark.Name} availableLots = {carpark.AvailableLots} location = {carpark.Location} agency = {carpark.Agency}/>
            )
        return(
            <div className="box">
                {itemList}
            </div>
        );
    }
}

export default CarparkList;

