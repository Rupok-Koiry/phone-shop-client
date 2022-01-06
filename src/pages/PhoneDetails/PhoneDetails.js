import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import classes from "./PhoneDetails.module.css";
import { AuthContext } from "../../store/auth-context";
import { useHistory } from "react-router";
import Loader from "../../components/Loader/Loader";
//Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("*Name is required!"),
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  address: yup.string().required("*Address is required!"),
  phone: yup.string().required("*Phone Number is required!"),
});
const PhoneDetails = () => {
  const [phone, setPhone] = useState({});
  const { phoneID } = useParams();

  useEffect(() => {
    //Load single which was clicked by user
    const loadSingleProduct = async () => {
      const response = await fetch(
        `https://guarded-hamlet-19613.herokuapp.com/phones/${phoneID}`
      );
      const responseData = await response.json();
      setPhone(responseData);
    };
    loadSingleProduct();
  }, [phoneID]);

  const { user } = useContext(AuthContext);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Form submit handler
  const onSubmit = async (formData) => {
    const userOrder = {
      userName: user.displayName,
      email: user.email,
      userImage: user.photoURL,
      status: "pending",
      ...formData,
      ...phone,
    };
    delete userOrder._id;
    await fetch("https://guarded-hamlet-19613.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userOrder),
    });
    history.push("/dashboard/my-orders");
  };
  //Image
  const image = phone?.imageCover?.startsWith("phone-")
    ? `/images/${phone.imageCover}`
    : phone.imageCover;
  return (
    <section className={classes.description}>
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className={classes["description-content"]}>
              <h2 className="section-heading-sm">Quick fact</h2>
              {phone.name ? (
                <>
                  <img
                    src={image}
                    alt={phone.name}
                    className="img-fluid mb-4 rounded-lg"
                    style={{
                      filter: "drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.2))",
                    }}
                    width="150px"
                  />
                  <ul>
                    <li>
                      <span>NAME : </span> {phone.name}
                    </li>
                    <li className={classes.price}>
                      <span>PRICE : </span> ${phone.price}
                    </li>
                    <li>
                      <span>PROCESSOR : </span> {phone.processor} People
                    </li>
                    <li>
                      <span>SCREEN SIZE : </span> {phone.screenSize}
                    </li>
                    <li>
                      <span>BATTERY : </span> {phone.battery} mah
                    </li>
                    <li>
                      <span>RATING : </span> {phone.ratingsAverage} / 5
                    </li>

                    <li>
                      <span>Description : </span> {phone.description}
                    </li>
                  </ul>
                </>
              ) : (
                <Loader style={{ justifyContent: "space-between" }} />
              )}
            </div>
          </Col>
          <Col lg={6}>
            <div className={classes.bookForm}>
              <Form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 className="section-heading-sm">Order Now</h2>
                <FloatingLabel label="Name" className={`${classes.label} mb-3`}>
                  <Form.Control
                    placeholder="Name"
                    className={classes.input}
                    {...register("name")}
                    defaultValue={user.displayName}
                  />
                  {errors.name?.message && (
                    <small className="error">{errors.name.message}</small>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  label="Email"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Email"
                    className={classes.input}
                    {...register("email")}
                    defaultValue={user.email}
                  />
                  {errors.email?.message && (
                    <small className="error">{errors.email.message}</small>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  label="Address"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Address"
                    className={classes.input}
                    {...register("address")}
                  />
                  {errors.address?.message && (
                    <small className="error">{errors.address.message}</small>
                  )}
                </FloatingLabel>{" "}
                <FloatingLabel
                  label="Phone Number"
                  className={`${classes.label} mb-3`}
                >
                  <Form.Control
                    placeholder="Phone Number"
                    className={classes.input}
                    {...register("phone")}
                  />
                  {errors.phone?.message && (
                    <small className="error">{errors.phone.message}</small>
                  )}
                </FloatingLabel>
                <button type="submit" className="btn-style">
                  Buy
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PhoneDetails;
