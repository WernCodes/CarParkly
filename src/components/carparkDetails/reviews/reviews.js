import React from 'react';
import './reviews.css';
import ReviewCard from "./review_card/reviewCard";

class ReviewsList extends React.Component{
    reviews;
    constructor(props) {
        super(props);
        this.state = props.values;
    }

    componentDidMount() {
        this.retrieveReviews(this.state.carparkId);
    }

    retrieveReviews(carparkId) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Id: carparkId })
        };
        //TODO change to post
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
    }


    render(){
        const reviewA = {
            CarparkId: 'A',
            User: "John",
            Rating: 4,
            ReviewText: "Carpark is spacious",
            Date: '11/12/2021'
        }
        const reviewB = {
            CarparkId: 'B',
            User: "Bob",
            Rating: 3,
            ReviewText: "Carpark is narrow",
            Date: '30/12/2021'
        }
        // TODO remove this line once api works
        this.reviews = [reviewA, reviewB];
        let itemList=this.reviews.map((review,index) =>
            <ReviewCard carparkId = {review.CarparkId} user = {review.User} rating = {review.Rating} reviewText = {review.ReviewText} date = {review.Date}/>
        )
        return(
            <div className="box">
                {itemList}
            </div>
        );
    }
}

export default ReviewsList;

