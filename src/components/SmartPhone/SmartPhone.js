import React from "react";
import { Card, Col } from "react-bootstrap";
import Rating from "react-rating";
import "./SmartPhone.css";
import { useHistory } from "react-router-dom";
const SmartPhone = ({ phone }) => {
  const {
    _id,
    name,
    ratingsAverage,
    price,
    description,
    imageCover,
    processor,
    inStock,
  } = phone;
  const history = useHistory();
  const image = imageCover?.startsWith("phone-")
    ? `images/${imageCover}`
    : imageCover;
  //Smartphone section
  return (
    <Col md={6} lg={4}>
      <Card>
        <Card.Img
          variant="top"
          src={image}
          className="img-fluid"
          style={{ height: "230px", objectFit: "contain" }}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <div className="d-flex justify-content-between info">
            <p>
              Price : <i className="fas fa-dollar-sign"></i>{" "}
              <span style={{ fontWeight: "600" }}>{price}</span>
            </p>
            <p>
              <i className="fas fa-microchip"></i> {processor}
            </p>
            {/* <p>
              <i className="fas fa-cubes"></i> {inStock} in stock
            </p> */}
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn-style btn-style-secondary"
              onClick={() => history.push(`/phone-details/${_id}`)}
            >
              Buy Now
            </button>
            <Rating
              emptySymbol="far fa-star icon"
              fullSymbol="fas fa-star icon"
              className="active-star"
              initialRating={ratingsAverage}
              readonly
            />
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SmartPhone;
