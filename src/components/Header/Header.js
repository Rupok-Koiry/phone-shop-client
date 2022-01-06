import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../store/auth-context";
import logo from "../../images/logo.png";
import "./Header.css";
const Header = () => {
  const history = useHistory();
  const { user, logout, admin } = useContext(AuthContext);
  return (
    <header className="header sticky-top">
      <Navbar expand="lg" className="navbar-dark py-1">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              height="68"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link exact as={NavLink} to="/" className="me-2">
                Home
              </Nav.Link>

              <Nav.Link exact as={NavLink} to="/smartphones" className="me-2">
                Smartphones
              </Nav.Link>

              {user.email ? (
                <>
                  <Nav.Link
                    exact
                    as={NavLink}
                    to={`/dashboard/${admin ? "all-orders" : "my-orders"}`}
                    className="me-2"
                  >
                    Dashboard
                  </Nav.Link>

                  <button
                    className="btn-style btn-style-primary ms-3"
                    onClick={logout}
                  >
                    {user.displayName} Logout
                  </button>
                </>
              ) : (
                <button
                  className="btn-style btn-style-primary ms-3"
                  onClick={() => history.push("/login")}
                >
                  Login
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
