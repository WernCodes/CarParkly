import React from 'react';
import './reviewCard.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

class ReviewCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            CarparkId: this.props.carparkId,
            CommentId: this.props.commentId,
            User: this.props.user,
            Rating: this.props.rating,
            Review: this.props.reviewText,
            Date: this.props.date,
            Voted: false,
        }
        this.vote = this.vote.bind(this);
    }

    vote(commentId, num){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentId: commentId, userId: "1", num: num })
        };
        fetch("http://192.168.0.120:8080/api/students", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response)
            )
            .catch(err => {
                console.log(err);
            });
        this.setState({
            Voted: true
        });
    }


    render(){

        return(
            <div className="reviewCard">
                <div className="user">
                    <div className="icon"><Avatar size="large" icon={<UserOutlined />} /></div>
                    <div className="name">{this.state.User}</div>
                </div>
                <div className="rating">
                    <Rating name="read-only" value={this.state.Rating} readOnly />
                    <Typography component="legend">{this.state.Date}</Typography>
                    <div className="vote-buttons">
                        <button disabled = {this.state.Voted} className={this.state.Voted?"disabledUpvote":"upvote"} onClick={() => this.vote(this.state.commentId, 1)}>
                            Upvote
                        </button>
                        <button disabled = {this.state.Voted} className={this.state.Voted?"disabledDownvote":"downvote"} onClick={() => this.vote(this.state.commentId, -1)}>
                            Downvote
                        </button>
                    </div>
                </div>
                <div className="reviewText">{this.state.Review}</div>
            </div>
        );
    }
}

export default ReviewCard;

