import TitleCard from "../shared/title";
import SearchBar from "../shared/searchBar";
import React from "react";
import NaviButtonFunction from "../shared/navi_button";
import './home.css';
import '../shared/fade.css';
import Animate from "rc-animate";

// component that loads a home page. It is not used any where in this app. It is here as a reference for future development
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
            <div className="homePage" >
                <div className ="header">
                    <TitleCard  text = {"Welcome to CarParkly!"}/>
                </div>
                <Animate
                    transitionName="fade"
                    component  = "span"
                    transitionAppear ={true}
                >
                    <div className = "searchBar" key = "1">
                        <SearchBar handleSearch = {this.handleSearch} placeholder = "Search Car Parks Or Destination" tooltip = "Key in Destination names or Car Park locations"/>
                    </div>
                    <div className= "buttonSection" key = "2">
                        <NaviButtonFunction value = {"Navigation"} navigate={"navigation"}/>
                    </div>
                </Animate>
            </div>

        );
    }
}

export default Home;
