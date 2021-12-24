import React, {useEffect, useState} from "react";
import './carparkDetails.css';
import TitleCard from "../shared/title";
import RouteNavigation from "../shared/routeNavigation";
import Details from "./details/details";
import {useLocation} from 'react-router-dom';
import ReviewsList from "./reviews/reviews";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons';
import { Avatar, Input } from 'antd';
import 'antd/dist/antd.css';
import ButtonFunction from "../shared/button";

const CarparkDetails = () =>{
    //TODO set to true when implementing API
    const [isLoading, setLoading] = useState(true);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [availableLots, setAvailableLots] = useState(null);
    const [totalLots, setTotalLots] = useState(null);
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
        fetch("http://192.168.0.115:8080/api/carpark", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                console.log(json);
                const pos = json['result']['Carpark']['Location'];
                const values = pos.split(" ");

                setAvailableLots(json['result']['LotData']['AvailableLots']);
                setTotalLots(json['result']['LotData']['TotalLots']);
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
                <Input
                    placeholder="Enter your username"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <Input.Password
                    placeholder="input password"
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    onChange={e => setPassword(e.target.value)}
                />
                <ButtonFunction value = {"Log In"} handleClick={handleLogInClick}/>
            </div>
        )

    }
    async function handleLogInClick(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})
        };
        await fetch("http://192.168.0.115:8080/api/loginUser", requestOptions)
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
            <div className="detailsAndYT">
                <div className="detailsAndLinks">
                    <Details values ={state} availableLots = {availableLots} totalLots ={totalLots} lat = {lat} lng = {lng}/>
                    {/* TODO add in YT function */}
                </div>
                <div className = "YT">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/onOY6tg3y24"
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen/>
                </div>
            </div>

            <div className='communityReviews'>
                <ReviewsList key={!!user} values = {state} loggedIn = {!!user}/>
            </div>
        </div>
    );
}
export default CarparkDetails;
