import TitleCard from "../shared/title";
import SearchBar from "../shared/searchBar";
import ButtonFunction from "../shared/button";
import React from "react";


class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="game" >
                <div className ="header">
                    <TitleCard  text = {"Welcome to CarParkly!"}/>
                </div>
                <div className = "searchBar">
                    <SearchBar/>
                </div>
                <div className= "buttonSection">
                    <ButtonFunction value = {"Navigation"} navigate={"navigation"}/>
                    <ButtonFunction value = {"Car Park Charge Calculator"}/>
                </div>
            </div>
        );
    }
}

export default Home;
