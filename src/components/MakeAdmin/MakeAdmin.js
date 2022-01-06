import React, { useState } from "react";
import {
  Alert,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [success, setSuccess] = useState(false);

  //Form submit handler
  const onSubmit = async (data, event) => {
    const response = await fetch(
      "https://guarded-hamlet-19613.herokuapp.com/users/admin",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const responseData = await response.json();
    if (responseData.modifiedCount) {
      setSuccess(true);
    }
    event.target.reset();
  };

  //Add new admin
  return (
    <section className="addNewService">
      <h2 className="section-heading display-4 m-0">Make an Admin</h2>
      <div className="separator-2"></div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col lg={6} md={10} className="mx-auto">
              <FloatingLabel label="Email" className="label mb-3">
                <Form.Control
                  placeholder="Email"
                  className="input"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <small className="error">*Email is required!</small>
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
        </Form>
        {success && (
          <Alert
            variant="success"
            onClose={() => setSuccess(false)}
            dismissible
            className="w-50 mx-auto my-3"
          >
            <p className="m-0">Admin created successfully!</p>
          </Alert>
        )}
      </Container>
    </section>
  );
};
export default MakeAdmin;
