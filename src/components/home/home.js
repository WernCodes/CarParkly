import TitleCard from "../shared/title";
import SearchBar from "../shared/searchBar";
import React from "react";
import NaviButtonFunction from "../shared/navi_button";
import './home.css';


class Home extends React.Component{
    constructor(props){
        super(props);
    }

    handleClick(e){
        console.log('I am clicked!');
    }

    handleSearch(e){
        console.log(e);
    }

    render(){
        return (
            <div className="game" >
                <div className ="header">
                    <TitleCard  text = {"Welcome to CarParkly!"}/>
                </div>
                <div className = "searchBar">
                    <SearchBar handleSearch = {this.handleSearch} placeholder = "Search Car Parks Or Destination" tooltip = "Key in Destination names or Car Park locations"/>
                </div>
                <div className= "buttonSection">
                    <NaviButtonFunction value = {"Navigation"} navigate={"navigation"}/>
                </div>
            </div>
        );
    }
}

export default Home;
