import React from 'react';
import './carparkList.css';
import CarparkCard from "./carpark_card/carparkCard";
import QueueAnim from 'rc-queue-anim';
class CarparkList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };

    }
    onClick = () => {
        this.setState({
            show: !this.state.show
        });
    }
    render(){
        const Carparks = this.props.carparkList;
        console.log(Carparks)
        let itemList=Carparks.map((carpark, index) =>
                <CarparkCard key = {carpark.CarParkID+index} carparkId = {carpark.CarParkID} name = {carpark.Name} availableLots = {carpark.AvailableLots} location = {carpark.Location} agency = {carpark.Agency} cost = {carpark.TempCost}/>
            )
        if (Carparks.length === 0){
            return(
                <div/>
            )
        }
        return(
            <div>
                <div className="disclaimer">*Cost is based on 1 hour stay from current time</div>
                <div className="carparkList">
                    <QueueAnim delay={50} className="queue-simple">
                        {this.state.show ? itemList : null}
                    </QueueAnim>

                </div>
            </div>
        );
    }
}

export default CarparkList;

