import React, {useEffect, useState} from "react";
import './carparkDetails.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import Details from "./details/details";
import { useLocation } from 'react-router-dom';
import ReviewsList from "./reviews/reviews";
import {UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { Avatar } from 'antd';
import 'antd/dist/antd.css';
import ButtonFunction from "../shared/button";
import NaviLinkFunction from "../shared/navi_link";
import Animate from "rc-animate";
import Texty from "rc-texty";
import CarparkStreetView from "./streetView/carparkStreetView";
import Linkify from "react-linkify";

const CarparkDetails = () =>{
    const [isLoading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loginMessage, setLoginMessage] = useState();
    const [availableLots, setAvailableLots] = useState(null);
    const [totalLots, setTotalLots] = useState(null);
    const [classification, setClassification] = useState("Open") // this refers to the availability classification. Based on the number of available lots.
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [user, setUser] = useState(null);
    const [rates, setRates] = useState(null);
    const location = useLocation();
    let login = null;
    let ratesSection;
    const hdbMessage = "For details on HDB Rates, please visit https://www.hdb.gov.sg/car-parks/shortterm-parking/short-term-parking-charges"

    const state = {
        carparkId: location.state.Id,
        name: location.state.Name,
        agency: location.state.Agency,
    };

    const storeUserFields = () => {
        handleLogInClick(username, password);
    };
    // when component loads, check if there is already a user logged in browser storage. Retrieve relevant data from api call to load page
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(loggedInUser);
        }
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, agency: state.agency})
        };
        // used to measure time performance of API
        var t0 = performance.now();
        // API call to retrieve car park details
        fetch(process.env.REACT_APP_API_URL+"/api/carpark", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json);
                const pos = json['result']['Carpark']['Location'];
                const values = pos.split(" ");
                setAvailableLots(json['result']['LotData']['AvailableLots']);
                setTotalLots(json['result']['LotData']['TotalLots']);
                setClassification(json['result']['LotData']['AvailabilityClassification'])
                setLat(parseFloat(values[0]));
                setLng(parseFloat(values[1]));
            })
            .catch(err => {
                console.log(err);
            });
        // API call to retrieve rates for the car park
        fetch(process.env.REACT_APP_API_URL+"/api/rates", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json['result']);
                setRates(json['result']);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
        // used to measure time performance of API
        var t1 = performance.now();
        console.log("Call to fetch car park details " + (t1 - t0) + " milliseconds.");
        setLoading(false);
    },[state.agency, state.carparkId]);

    if (isLoading) {
        return <div className="carparkDetails">
            <TitleCard  text = "Loading..."/>
        </div>;
    }

    // if there is no valid carparkId
    if(!state.carparkId){
        console.log("going home");
        RouteNavigation("")
    }

    // This section is to determine what to load at the top right of the page, a login prompt or logged in message
    // if a user is already logged in
    if (user){
        login = (
            <div className="carparkDetailsavatar">
                <Avatar
                    style={{
                        backgroundColor: '#ffA500',
                        verticalAlign: 'middle',
                    }}
                    size="large"
                    gap = '4'
                >
                    {user.charAt(0)}
                </Avatar>
                <ButtonFunction value = {"Logout"} handleClick={handleLogOutClick}/>
            </div>
        )
    }else{
        login =(
            <div className="carparkDetailslogin">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={storeUserFields}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                               onChange={e=> setUsername(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={e=> setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{ background: "#9F32B2", borderColor: "#9F32B2"  }} >
                            Log in
                        </Button> <div style={{color: "#dddddd"}}>Or</div> <NaviLinkFunction value = {"Register"} navigate={"register"} />
                        {loginMessage && (
                            <Texty
                                type={"mask-top"}
                                mode={"sync"}
                                style={{color:"red"}}>
                                {loginMessage}
                            </Texty>
                        )}
                    </Form.Item>
                </Form>
            </div>
        )

    }
    // This section determines how to render the rates of the car park based on the agency
    if(rates) {
        if (state.agency === 'HDB') {
            ratesSection = (<div className='CarParkSingleRate'>
                    {Object.keys(rates).map((key, index) => (
                        <p key={index}>{key} : {rates[key]}</p>
                    ))}
                    <Linkify properties={{target: '_blank', style: {color: '#000000'}}} key={hdbMessage}>Message
                        : {hdbMessage}</Linkify>
                </div>
            )
        } else if (state.agency === 'URA') {
            ratesSection = rates.map((rate) => {
                    return <div className="CarParkSingleRate">
                        {Object.keys(rate).map((key, index) => (
                            <p key={index}>{key} : {rate[key]}</p>
                        ))}
                    </div>
                }
            )
        } else if (state.agency === 'LTA') {
            ratesSection = rates.map((rate) => {
                    return <div className="CarParkSingleRate">
                        {Object.keys(rate).map((key, index) => (
                            <p key={index}>{key} : {rate[key]}</p>
                        ))}
                    </div>
                }
            )
        }
    }

    // API call for log in function
    async function handleLogInClick(username, password){
        setLoginMessage(null)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})
        };
        await fetch(process.env.REACT_APP_API_URL+"/api/loginUser", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                if(json['status']==="success"){
                    console.log("login success:", json)
                    localStorage.clear()
                    setUser(json['result']['Username'])
                    // store the user in localStorage
                    localStorage.setItem('user', json['result']['Username'])
                }else{
                    console.log(json);
                    console.log("login failed");
                    setLoginMessage(json['error']);
                }

            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleLogOutClick(){
        setUser(null);
        setUsername(null);
        setPassword(null);
        localStorage.clear();
    }

    return (
        <div className="carparkDetails">
            <div className="carparkDetailsHeader">
                <div className="dummy"/>
                <div className='carparkDetailstitle'>
                    <TitleCard  text = {state.name}/>
                </div>
                {login}
            </div>
            <Animate
                transitionName="fade"
                component  = "span"
                transitionAppear ={true}
            >
            <div className="detailsAndStreet" key = "1">
                <div className="detailsAndLinks">
                    <Details values ={state} lotClassification ={classification} availableLots = {availableLots} totalLots ={totalLots} lat = {lat} lng = {lng}/>
                </div>
                <div className="streetView">
                    <CarparkStreetView lat={lat} lng = {lng}/>
                </div>
            </div>
            <div className="ratesTable" key = "2">
                <div className="ratesText">Rates</div>
                {ratesSection}
            </div>

            <div className='communityReviews' key = "3">
                <ReviewsList key={user} values = {state} loggedIn = {user}/>
            </div>
            </Animate>
        </div>
    );
}
export default CarparkDetails;
