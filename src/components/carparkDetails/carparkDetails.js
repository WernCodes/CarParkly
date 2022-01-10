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

const CarparkDetails = () =>{
    const [isLoading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [availableLots, setAvailableLots] = useState(null);
    const [totalLots, setTotalLots] = useState(null);
    const [classification, setClassification] = useState("Open")
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [user, setUser] = useState(null);
    const location = useLocation();
    let login = null;
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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: state.carparkId, agency: state.agency})
        };
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
        setLoading(false);
    },[state.agency, state.carparkId]);

    if (isLoading) {
        return <div className="carparkDetails">
            <TitleCard  text = "Loading..."/>
        </div>;
    }

    if(!state.carparkId){
        console.log("going home");
        RouteNavigation("")
    }

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
                        </Button> Or <NaviLinkFunction value = {"Register"} navigate={"register"} />

                    </Form.Item>
                </Form>
            </div>
        )

    }

    // log in function
    async function handleLogInClick(username, password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})
        };
        await fetch(process.env.REACT_APP_API_URL+"/api/loginUser", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                if(json['status']!==400){
                    console.log("login success:", json)
                    localStorage.clear()
                    setUser(json['result']['Username'])
                    // store the user in localStorage
                    localStorage.setItem('user', json['result']['Username'])
                }else{
                    console.log("login failed")
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
            <div className="detailsAndYT" key = "1">
                <div className="detailsAndLinks">
                    <Details values ={state} lotClassification ={classification} availableLots = {availableLots} totalLots ={totalLots} lat = {lat} lng = {lng}/>
                    {/* TODO add in YT function */}
                </div>
                <div className = "YT">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/onOY6tg3y24"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            </div>

            <div className='communityReviews' key = "2">
                <ReviewsList key={user} values = {state} loggedIn = {user}/>
            </div>
            </Animate>
        </div>
    );
}
export default CarparkDetails;
