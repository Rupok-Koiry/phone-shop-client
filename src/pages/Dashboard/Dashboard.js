import React, { useContext, useState } from "react";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import AddReview from "../../components/AddReview/AddReview";
import "./Dashboard.css";
import MyOrders from "../../components/Orders/MyOrders/MyOrders";
import AllOrders from "../../components/Orders/AllOrders/AllOrders";
import ManageProduct from "../../components/Orders/ManageProduct/ManageProduct";
import Pay from "../../components/Pay/Pay";
import MakeAdmin from "../../components/MakeAdmin/MakeAdmin";
import AddProduct from "../../components/AddProduct/AddProduct";
import { AuthContext } from "../../store/auth-context";
import AdminRoute from "../../components/AdminRoute";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);
  const { path, url } = useRouteMatch();
  const { admin } = useContext(AuthContext);
  const toggleSidebar = () => {
    setToggle(!toggle);
  };
  const toggleStyle1 = toggle ? { marginLeft: "0" } : { marginLeft: "-17rem" };
  const toggleStyle2 = toggle
    ? { width: "calc(100% - 17rem)", marginLeft: "17rem" }
    : { width: "100%", marginLeft: "0" };
  return (
    <>
      <div className="vertical-nav bg-white" id="sidebar" style={toggleStyle1}>
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="media d-flex align-items-center">
            <img
              loading="lazy"
              src={user.photoURL}
              alt={user.displayName}
              width="80"
              height="80"
              className="me-3 rounded-circle img-thumbnail shadow-sm"
            />
            <div className="media-body">
              <h4 className="m-0">{user.displayName}</h4>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
          Dashboard
        </p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              className="nav-link text-dark  dashlink"
              activeClassName="dashlink-active"
            >
              <i className="fas fa-home me-3 text-primary fa-fw"></i>
              Home
            </NavLink>
          </li>
          {!admin && (
            <>
              <li className="nav-item">
                <NavLink
                  to={`${url}/pay`}
                  className="nav-link text-dark  dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fab fa-cc-amazon-pay  me-3 text-primary fa-fw"></i>
                  Pay
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${url}/my-orders`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-cart-plus me-3 text-primary fa-fw"></i>
                  My Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${url}/review`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-comments me-3 text-primary fa-fw"></i>
                  Review
                </NavLink>
              </li>
            </>
          )}
          {admin && (
            <>
              <li className="nav-item">
                <NavLink
                  to={`${url}/all-orders`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-cart-plus me-3 text-primary fa-fw"></i>
                  All Orders
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${url}/manage-products`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-tasks me-3 text-primary fa-fw"></i>
                  Manage Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${url}/make-admin`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-user-plus  me-3 text-primary fa-fw"></i>
                  Make Admin
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`${url}/add-product`}
                  className="nav-link text-dark dashlink"
                  activeClassName="dashlink-active"
                >
                  <i className="fas fa-plus  me-3 text-primary fa-fw"></i>
                  Add A Product
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-item">
            <span
              onClick={() => logout()}
              className="nav-link text-dark dashlink"
              style={{ cursor: "pointer" }}
            >
              <i className="fas fa-sign-out-alt me-3 text-primary fa-fw"></i>{" "}
              Logout
            </span>
          </li>
        </ul>
      </div>

      <div className="page-content p-5" id="content" style={toggleStyle2}>
        <button
          id="sidebarCollapse"
          type="button"
          className="btn-style btn-style-secondary shadow-sm px-4 mb-4"
          onClick={toggleSidebar}
        >
          <i className="fa fa-bars me-2"></i>
          <small className="text-uppercase font-weight-bold">Toggle</small>
        </button>
        <Switch>
          <Route exact path={`${path}/review`}>
            <AddReview />
          </Route>
          <Route exact path={`${path}/pay`}>
            <Pay />
          </Route>
          <Route exact path={`${path}/my-orders`}>
            <MyOrders />
          </Route>
          <AdminRoute exact path={`${path}/all-orders`}>
            <AllOrders />
          </AdminRoute>
          <AdminRoute exact path={`${path}/make-admin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute exact path={`${path}/manage-products`}>
            <ManageProduct />
          </AdminRoute>
          <AdminRoute exact path={`${path}/add-product`}>
            <AddProduct />
          </AdminRoute>
        </Switch>
      </div>
    </>
  );
};

export default Dashboard;
