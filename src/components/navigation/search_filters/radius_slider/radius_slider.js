import React from 'react';

import 'antd/dist/antd.css';
import './radius_slider.css';
import {Slider} from 'antd';


function RadiusSlider(props) {

    return(
        <>
            <Slider defaultValue={props.defaultValue} disabled={props.disabled} max = {props.max} min = {props.min} onAfterChange={props.onAfterChange}/>
        </>
    );
}
export default RadiusSlider;
