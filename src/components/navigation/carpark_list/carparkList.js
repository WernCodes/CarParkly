import React from 'react';
import './carparkList.css';
import CarparkCard from "./carpark_card/carparkCard";

class CarparkList extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="box">
                <CarparkCard/>
            </div>
        );
    }
}

export default CarparkList;

