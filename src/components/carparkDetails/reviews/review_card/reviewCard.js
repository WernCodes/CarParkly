import React from 'react';
import './reviewCard.css';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import {Avatar} from 'antd';
import { UserOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';

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
            Votes: this.props.votes,
            Upvoted: false,
            Downvoted: false,
            LoggedIn: this.props.loggedIn,
            VotedBefore: this.props.votedBefore
        }
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
        this.sendVote = this.sendVote.bind(this);
    }
    sendVote(num, neutral){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: this.state.CarparkId, commentId: this.state.CommentId, username: this.state.LoggedIn,  num: num, neutral:neutral })
        };
        fetch(process.env.REACT_APP_API_URL+"/api/editVotes", requestOptions)
            .then(response => response.json())
            .then(response => console.log(response)
            )
            .catch(err => {
                console.log(err);
            });
    }
    upvote(){
        if(this.state.Downvoted){
            this.setState({
                Downvoted: false,
                Upvoted: true
            });
            this.sendVote(2, false);
        }else if(this.state.Upvoted){
            this.setState({
                Upvoted: false
            });
            this.sendVote(-1, true);
        } else{
            this.setState({
                Upvoted: true
            });
            this.sendVote(1, false);
        }
    }

    downvote(){
        if(this.state.Upvoted){
            this.setState({
                Upvoted: false,
                Downvoted: true
            });
            this.sendVote(-2, false);
        }else if(this.state.Downvoted){
            this.setState({
                Downvoted: false
            });
            this.sendVote(1, true);
        } else{
            this.setState({
                Downvoted: true
            });
            this.sendVote(-1, false);
        }
    }

    render(){
        let disableUpVote =  !this.state.LoggedIn || this.state.VotedBefore;
        let disableDownVote =  !this.state.LoggedIn || this.state.VotedBefore;
        return(
            <div className="reviewCard">
                <div className="user">
                    <div className="icon"><Avatar size="large" icon={<UserOutlined />} /></div>
                    <div className="name">{this.state.User}</div>
                </div>
                <div className="rating">
                    <Rating name="read-only" value={this.state.Rating} readOnly />
                    <Typography component="legend" style={{color: "#dddddd"}}>{this.state.Date}</Typography>
                    <div className="voteButtonsAndNumbers">
                        <div className="voteButtons">
                            <Button style={disableUpVote || this.state.Downvoted?{background: "#999999", color: "#dddddd"}:{background: "#FF4500", color: "#dddddd" }} size = "large" block = "false" shape="circle" disabled = {disableUpVote} onClick={() => this.upvote()} icon={<ArrowUpOutlined />}/>
                            <Button style={disableDownVote|| this.state.Upvoted?{background: "#999999", color: "#dddddd"}:{background: "#9494FF", color: "#dddddd" }} size = "large" block = "false" shape="circle" disabled = {disableDownVote} onClick={() => this.downvote()} icon={<ArrowDownOutlined />}/>
                        </div>
                        <div className="numVotes">
                            <Typography component="legend" style={{color: "#dddddd"}}>{this.state.Votes}</Typography>
                        </div>
                    </div>
                </div>
                <div className="reviewText">{this.state.Review}</div>
            </div>
        );
    }
}

export default ReviewCard;

