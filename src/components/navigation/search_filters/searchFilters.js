import React from 'react';
import 'antd/dist/antd.css';
import './searchFilters.css';
import RadiusSlider from "./radius_slider/radius_slider";

class SearchFilters extends React.Component{

    constructor(props) {
        super(props);
        const defaultValue= this.props.defaultValue
        this.state = {
            sliderValue :defaultValue,
            defaultValue: defaultValue
        }
    }

    onChange(value) {
        this.props.onRadiusChange(value);
        this.setState({
            sliderValue : value
        })
    }

    render(){
        return(
            <div className="slider">
                <h3 className="sliderText">Radius of Car parks within your destination: {this.state.sliderValue}</h3>
                <RadiusSlider defaultValue ={this.state.defaultValue} max = {500} min = {1} disabled ={false} onAfterChange = {value => this.onChange(value)}/>
            </div>
        );
    }
}


export default SearchFilters;