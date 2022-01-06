import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Reviews.css";
import Rating from "react-rating";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    //Load all user reviews
    const loadReviews = async () => {
      const response = await fetch(
        `https://guarded-hamlet-19613.herokuapp.com/reviews`
      );
      const responseData = await response.json();
      setReviews(responseData);
    };
    loadReviews();
  }, []);
  return (
    <section className="reviews">
      <Container>
        <h2 className="section-heading text-white">
          Explore the customer experience
        </h2>
        <Row className="gy-4">
          {reviews.map((review) => (
            <Col lg={3} md={6} key={review._id}>
              <div className="card">
                <div className="py-2">
                  <Rating
                    emptySymbol="far fa-star icon"
                    fullSymbol="fas fa-star icon"
                    className="active-star"
                    initialRating={review.rating}
                    readonly
                  />
                </div>
                <div className="testimonial">{review.description}</div>
                <div className="d-flex profile pt-4 mt-auto">
                  <img src={review.image} alt="user" className="img-fluid" />
                  <div className="ps-2">
                    <div className="name">{review.name}</div>
                    <p className="text-muted designation">{review.email}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Reviews;
