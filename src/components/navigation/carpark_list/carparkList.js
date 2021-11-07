import React from 'react';
import './carparkList.css';
import CarparkCard from "./carpark_card/carparkCard";

class CarparkList extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const carparkA = {
            Id: 'A',
            Name: "Simei Carpark",
            AvailableLots: 20,
            Location: "1111 1111"
        }
        const carparkB = {
            Id: 'B',
            Name: "Tampines Carpark",
            AvailableLots: 50,
            Location: "2222 2222"
        }
        const Carparks = [carparkA, carparkB];
        let itemList=Carparks.map((carpark,index) =>
                <CarparkCard carparkId = {carpark.Id} name = {carpark.Name} availableLots = {carpark.AvailableLots} location = {carpark.Location}/>
            )
        return(
            <div className="box">
                {itemList}
            </div>
        );
    }
}

export default CarparkList;

