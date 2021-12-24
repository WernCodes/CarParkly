import React from 'react';
import './reviews.css';
import ReviewCard from "./review_card/reviewCard";
import Typography from "@mui/material/Typography";
import ButtonFunction from "../../shared/button";
import { Input } from 'antd';
import Rating from '@mui/material/Rating';

class ReviewsList extends React.Component{
    reviews;
    displayReview;

    constructor(props) {
        super(props);
        this.state = {
            addReview: false,
            submitReview:false,
            input:null,
            rating: 0,
            loggedIn : props.loggedIn
        }
        this.onWriteReviewClicked = this.onWriteReviewClicked.bind(this);
        this.onSubmitReviewClicked = this.onSubmitReviewClicked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setRating = this.setRating.bind(this);
        this.retrieveReviews = this.retrieveReviews.bind(this);

    }

    componentDidMount() {
        this.retrieveReviews(this.props.carparkId);
    }

    async retrieveReviews(carparkId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id: carparkId })
        };
        //TODO change to post
        await fetch("http://192.168.0.120:8080/api/students", requestOptions)
            .then(response => response.json())
            .then(response => {
                    console.log(response);
                    // TODO add backend data
                    this.reviews = response['results'];
                }
            )
            .catch(err => {
                console.log(err);
            });
    }

    onWriteReviewClicked(e){
        this.setState({
            addReview: true
        });
    }

    handleInputChange(e){
        this.setState({
            input: e.target.value
        });
    }

    setRating(value){
        this.setState({
            rating: value
        });
    }
    onSubmitReviewClicked(e){
        console.log(this.state.input);
        console.log(this.state.rating);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carparkId: "A", userId: "1", review: this.state.input, rating: this.state.rating })
        };
        fetch("http://192.168.0.120:8080/api/students", requestOptions)
            .then(response => response.json())
            .then(response => {
                    console.log(response);
                    // TODO add backend data
                    this.reviews = response['results'];
                }
            )
            .catch(err => {
                console.log(err);
            });
        this.setState({
            submitReview: true
        });
    }

    render(){
        const reviewA = {
            CarparkId: 'A',
            CommentId: '123',
            User: "John",
            Rating: 4,
            ReviewText: "Carpark is spacious",
            Date: '11/12/2021'
        }
        const reviewB = {
            CarparkId: 'B',
            CommentId: '456',
            User: "Bob",
            Rating: 3,
            ReviewText: "Carpark is narrow",
            Date: '30/12/2021'
        }

        if (this.state.addReview) {
            if(!this.state.submitReview){
                const { TextArea } = Input;
                this.displayReview = (
                    <div className="writeReview">
                        <Rating
                            name="simple-controlled"
                            value={this.state.rating}
                            onChange={(event, newValue) => {
                                this.setRating(newValue);
                            }}
                        />
                        <TextArea rows={4} onChange={ this.handleInputChange }/>
                        <ButtonFunction value = {"Submit Review"} handleClick = {this.onSubmitReviewClicked}/>
                    </div>
                )
            }else{
                this.displayReview = (
                <div className="writeReview">
                    <Typography component="legend">Review Submitted!</Typography>
                </div>
                )
            }
        } else{
            if(this.state.loggedIn){
                this.displayReview = (
                    <div className="writeReview">
                        <Typography component="legend">Review this product</Typography>
                        <ButtonFunction value = {"Contribute a review"} handleClick = {this.onWriteReviewClicked}/>
                    </div>
                )
            } else{
                this.displayReview = (
                    <div className="writeReview">
                        <Typography component="legend">Please log in to write a review</Typography>
                    </div>
                )
            }

        }
        // TODO remove this line once api works
        this.reviews = [reviewA, reviewB];
        let itemList=this.reviews.map((review) =>
            <ReviewCard carparkId = {review.CarparkId} commentId = {review.CommentId} user = {review.User} rating = {review.Rating} reviewText = {review.ReviewText} date = {review.Date}/>
        )
        return(
            <div className="reviewSection">
                {this.displayReview}
                <div className="box">
                    {itemList}
                </div>
            </div>
        );
    }
}

export default ReviewsList;

