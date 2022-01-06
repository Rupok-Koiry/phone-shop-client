import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../store/auth-context";
import "./SocialLogin.css";
const SocialLogin = ({ redirectPath }) => {
  const history = useHistory();
  const { signInUsingGoogle, signInUsingFacebook, saveUser } =
    useContext(AuthContext);

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInUsingGoogle();
      saveUser(user.email, user.displayName, "PUT");
      history.push(redirectPath.pathname);
    } catch (error) {}
  };

  const handleFacebookLogin = async () => {
    try {
      const { user } = await signInUsingFacebook();
      saveUser(user.email, user.displayName, "PUT");
      history.push(redirectPath.pathname);
    } catch (error) {}
  };
  return (
    <>
      <div className="separator">
        <b>Or</b>
      </div>
      <div className="wrapper">
        <div className="button" onClick={handleGoogleLogin}>
          <div className="icon">
            <i className="fab fa-google"></i>
          </div>
          <span>Login With Google</span>
        </div>
        <div className="button" onClick={handleFacebookLogin}>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
          </div>
          <span>Login With Facebook</span>
        </div>

        <div className="button">
          <div className="icon">
            <i className="fab fa-instagram"></i>
          </div>
          <span>Login With Instagram</span>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
