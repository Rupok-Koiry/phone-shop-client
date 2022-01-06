import React, { useContext, useState } from "react";
import {
  Alert,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../store/auth-context";
import "./AddReview.css";
const AddReview = () => {
  const [success, setSuccess] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //Form submit handler
  const onSubmit = async (data, event) => {
    const reviewData = { ...data, email: user.email, image: user.photoURL };
    const response = await fetch(
      "https://guarded-hamlet-19613.herokuapp.com/reviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    );
    const responseData = await response.json();
    if (responseData.acknowledged) {
      setSuccess(true);
    }
    event.target.reset();
  };
  //Add new review page
  return (
    <section className="addNewService">
      <h2 className="section-heading display-4 m-0">Give us Feedback</h2>
      <div className="separator-2"></div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6} md={10} className="mx-auto">
              <FloatingLabel label="Your Name" className="label mb-3">
                <Form.Control
                  placeholder="Your Name"
                  className="input"
                  {...register("name", { required: true })}
                  defaultValue={user.displayName}
                />
                {errors.name && (
                  <small className="error">*Your Name is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Rating Number" className="label mb-3">
                <Form.Control
                  placeholder="Rating Number"
                  className="input"
                  type="number"
                  mun="0"
                  step="any"
                  max="5"
                  {...register("rating", { required: true })}
                />
                {errors.rating && (
                  <small className="error">*Rating Number is required!</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Description" className="label mb-3">
                <Form.Control
                  placeholder="Description"
                  className="textArea"
                  as="textarea"
                  rows={3}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <small className="error">*Description is required!</small>
                )}
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={8} sm={10} className="mx-auto mt-3">
              <button className="btn-style btn-style-primary" type="submit">
                Submit
              </button>
            </Col>
          </Row>
          {success && (
            <Alert
              variant="success"
              onClose={() => setSuccess(false)}
              dismissible
              className="w-50 mx-auto my-3"
            >
              <p className="m-0">Thanks for your feedback!</p>
            </Alert>
          )}
        </Form>
      </Container>
    </section>
  );
};
export default AddReview;
