import React from 'react';
import './reviewCard.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

class ReviewCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            CarparkId: this.props.carparkId,
            User: this.props.user,
            Rating: this.props.rating,
            Review: this.props.reviewText,
            Date: this.props.date
        }
    }

    handleNavigateClick(){
        fetch("http://192.168.0.120:8080/api/students", {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => console.log(response)
            )
            .catch(err => {
                console.log(err);
            });
    }


    render(){
        return(
            <div className="card">
                <div className="user">
                    <div className="icon"><Avatar size="large" icon={<UserOutlined />} /></div>
                    <div className="name">{this.state.User}</div>
                </div>
                <div className="rating">
                    <Rating name="read-only" value={this.state.Rating} readOnly />
                    <Typography component="legend">{this.state.Date}</Typography>
                </div>
                <div className="reviewText">{this.state.Review}</div>
            </div>
        );
    }
}

export default ReviewCard;

