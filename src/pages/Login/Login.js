import React, { useContext } from "react";
//React hook form & yup validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Form, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useHistory } from "react-router-dom";

import { AuthContext } from "../../store/auth-context";
import "../Form.css";
import registrationImg from "../../images/undraw_unlock_-24-mb.svg";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import toastCreator from "../../hooks/toastifyCreator";

//Form validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("*Email is invalid!")
    .required("*Email is required!"),
  password: yup.string().required("*Password is required!"),
});

const Login = () => {
  const { loginUser, setUser } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  //Redirect path
  const { from } = location.state || { from: { pathname: "/" } };

  //Form submit handler
  const onSubmit = async (formData) => {
    try {
      const userCredential = await loginUser(formData.email, formData.password);
      const user = userCredential.user;
      setUser(user);
      history.replace(from.pathname);
    } catch (error) {
      //Error handling
      if (
        error.message.includes("wrong-password") ||
        error.message.includes("user-not-found")
      ) {
        toastCreator("Email or Password is invalid!", "error");
      } else if (error.message.includes("too-many-requests")) {
        toastCreator("Too many invalid requests, try again later!", "error");
      } else {
        toastCreator("Something went wrong!", "error");
      }
    }
  };
  //Login Page
  return (
    <section className="formContainer d-flex justify-content-center align-items-center">
      <Container>
        <Row>
          <Col lg={6}>
            <img
              src={registrationImg}
              alt="registration"
              className="img-fluid"
            />
          </Col>

          <Col lg={6}>
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>
              <h2>Login</h2>

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

              <div className="my-4 d-sm-flex justify-content-between">
                <Form.Check
                  inline
                  label="Remember Me"
                  name="remember"
                  type="checkbox"
                  id="remember"
                  className="remember"
                />
                <a href="/" className="d-block  forgotPassword">
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn formSubmitBtn">
                Login
              </button>
              {/* Toggle register */}
              <p className="text-center haveAccount">
                Don't have an account ?{"  "}
                <Link to="/register" className="forgotPassword">
                  Create an account
                </Link>
              </p>
            </Form>
            {/* Social login */}
            <SocialLogin redirectPath={from} />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default Login;
