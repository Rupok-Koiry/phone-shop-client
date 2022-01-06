import React, { useContext } from "react";
//React hook form & yup validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import loginImg from "../../images/undraw_secure_login_pdn4.svg";

import { AuthContext } from "../../store/auth-context";
import "../Form.css";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
//Form validation schema
const schema = yup.object().shape({
  name: yup.string().required("*Name is required!"),
  image: yup.string().required("*Image link is required!"),
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup
    .string()
    .required("*Password is required!")
    .min(6, "Password must have at least 6 characters"),
  confirmPassword: yup
    .string()
    .required("*Confirm Password is required!")
    .oneOf([yup.ref("password")], "*Passwords must match!"),
});
const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Form submit handler
  const onSubmit = (formData) => {
    registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.image
    );
  };
  //Register page
  return (
    <section className="formContainer d-flex justify-content-center align-items-center">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Create an account</h2>
              <FloatingLabel label="Name" className="label mb-3">
                <Form.Control
                  placeholder="Name"
                  className="input"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <small className="error">{errors.name.message}</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Image" className="label mb-3">
                <Form.Control
                  placeholder="Image"
                  className="input"
                  {...register("image")}
                />
                {errors.image?.message && (
                  <small className="error">{errors.image.message}</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Email" className="label mb-3">
                <Form.Control
                  placeholder="Email"
                  className="input"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <small className="error">{errors.email.message}</small>
                )}
              </FloatingLabel>
              <FloatingLabel label="Password" className="label mb-3">
                <Form.Control
                  placeholder="Password"
                  className="input"
                  {...register("password")}
                />
                {errors.password?.message && (
                  <small className="error">{errors.password.message}</small>
                )}
              </FloatingLabel>

              <FloatingLabel label="Confirm Password" className="label mb-3">
                <Form.Control
                  placeholder="Confirm Password"
                  className="input"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword?.message && (
                  <small className="error">
                    {errors.confirmPassword.message}
                  </small>
                )}
              </FloatingLabel>

              <button type="submit" className="btn formSubmitBtn">
                Create an account
              </button>
              {/* Toggle login */}
              <p className="text-center haveAccount">
                Already have an account?{" "}
                <Link to="/login" className="forgotPassword">
                  Login
                </Link>
              </p>
            </Form>
            {/* Social login */}
            <SocialLogin />
          </Col>
          <Col lg={6}>
            <img src={loginImg} alt="login" className="img-fluid" />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default Register;
