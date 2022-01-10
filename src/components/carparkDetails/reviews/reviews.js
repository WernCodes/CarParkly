import React from 'react';
import './reviews.css';
import ReviewCard from "./review_card/reviewCard";
import Typography from "@mui/material/Typography";
import ButtonFunction from "../../shared/button";
import { Input } from 'antd';
import Rating from '@mui/material/Rating';
import TitleCard from "../../shared/title";

// Component that renders the list of reviews in a table form
class ReviewsList extends React.Component{
    displayReview;

    constructor(props) {
        super(props);
        this.state = {
            carparkId: this.props.values['carparkId'],
            addReview: false,
            submitReview:false,
            input:null,
            rating: 0,
            loggedIn : props.loggedIn,
            reviews: null,
            isLoading:true
        }
        this.onWriteReviewClicked = this.onWriteReviewClicked.bind(this);
        this.onSubmitReviewClicked = this.onSubmitReviewClicked.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setRating = this.setRating.bind(this);
        this.retrieveReviews = this.retrieveReviews.bind(this);

    }

    componentDidMount() {
        this.retrieveReviews(this.state.carparkId, this.state.loggedIn);
    }

    async retrieveReviews(carparkId, username) {
        await fetch(process.env.REACT_APP_API_URL+"/api/getReviews?carparkId="+carparkId+"&username="+username, {method: 'GET'})
            .then(response => response.json())
            .then(response => {
                    console.log(response);
                    // TODO add backend data
                    this.setState({
                        isLoading:false,
                        reviews: response['result']
                    });
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
                body: JSON.stringify({ carparkId: this.state.carparkId, username: this.state.loggedIn, review: this.state.input, rating: this.state.rating })
        };
        fetch(process.env.REACT_APP_API_URL+"/api/addReview", requestOptions)
            .then(response => response.json())
            .then(response => {
                    console.log(response);
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
                        <Typography component="legend"style={{color: "#dddddd"}}>Review this product</Typography>
                        <ButtonFunction value = {"Contribute a review"} handleClick = {this.onWriteReviewClicked}/>
                    </div>
                )
            } else{
                this.displayReview = (
                    <div className="writeReview">
                        <Typography component="legend" style={{color: "#dddddd"}}>Please log in to write a review</Typography>
                    </div>
                )
            }

        }
        if (this.state.isLoading) {
            return <div className="reviewSection">
                <TitleCard  text = "Loading..."/>
            </div>;
        }

        let itemList;
        let reviewSection;
        if(this.state.reviews.length===0){
            reviewSection= (
                <TitleCard  text = "There are currently no reviews"/>
            )

        }else {
            itemList = this.state.reviews.map((review) =>
                <ReviewCard carparkId={review['CarParkID']} commentId={review['CommentID']} user={review['Username']}
                            rating={review['Rating']} reviewText={review['Review']} date={review['Date']} votes={review['Votes']} loggedIn = {this.state.loggedIn} votedBefore = {review['Voted']}/>
            )
            reviewSection = (
                <div className="box">
                    {itemList}
                </div>
            )
        }
        return(
            <div className="reviewSection">
                {this.displayReview}
                {reviewSection}
            </div>
        );
    }
}

export default ReviewsList;

