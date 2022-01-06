import React, { useState } from 'react';
import 'antd/dist/antd.css';
import './register.css'
import { Form, Input, Button } from 'antd';
import {LockOutlined, MailOutlined} from '@ant-design/icons';
import {UserOutlined} from "@ant-design/icons";
import TitleCard from "../shared/title";
import NaviButtonFunction from "../shared/navi_button";

const Register = () => {
    const [form] = Form.useForm();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [password, setPassword] = useState();
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState(null)
    const [registerFailMessage, setRegisterFailMessage] = useState(null)
    const [registerFailed, setRegisterFailed] = useState(false)

    let messageSection = null
    const storeUserFields = () => {
        handleRegisterClick(username, email, firstName, lastName, password);
    };

    // register function
    async function handleRegisterClick(username, email, firstName, lastName, password){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, first_name: firstName, last_name: lastName, password: password})
        };
        await fetch("http://192.168.0.115:8080/api/registerUser", requestOptions)
            .then(response => response.json())
            .then(json => {
                // body
                if(json['status']!==400){
                    console.log("register success:", json)
                    setRegisterFailed(false)
                    setRegisterFailMessage(null)
                    setRegisterSuccessMessage("Registration successful!")
                    localStorage.clear()
                    // store the user in localStorage
                    localStorage.setItem('user', json['result']['Username'])
                }else{
                    console.log(json)
                    setRegisterFailed(true)
                    setRegisterSuccessMessage(null)
                    setRegisterFailMessage(json['error'])
                }

            })
            .catch(err => {
                console.log(err);
            });
    }
    if(registerFailed){
        if(registerFailMessage){
            messageSection = (
                <div className="registerMessage">
                    Sorry, failed registration: {registerFailMessage}
                </div>
            )
        }
    }else{
        if (registerSuccessMessage){
            messageSection = (
                <div className="registerMessage">
                    {registerSuccessMessage}
                    <div className="goHomeButton">
                        <NaviButtonFunction navigate = {""} value = {'Home'}/>
                    </div>
                </div>
            )
        }
    }
    return (
        <div className="registerPage">
            <div className ="header">
                <TitleCard  text = {"Register Account"}/>
            </div>
            <div className='registerForm'>
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={storeUserFields}
                    scrollToFirstError
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
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"
                               onChange={e=> setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your First Name!',
                            },
                        ]}
                    >
                        <Input  placeholder="First Name"
                               onChange={e=> setFirstName(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Last Name!',
                            },
                        ]}
                    >
                        <Input  placeholder="Last Name"
                               onChange={e=> setLastName(e.target.value)}
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
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
            </div>
            {messageSection}
        </div>
    );
};

export default Register;
