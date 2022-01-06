import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "./store/auth-context";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
//Pages Import
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import PhoneDetails from "./pages/PhoneDetails/PhoneDetails";
import Footer from "./components/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import AllPhones from "./pages/AllPhones/AllPhones";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {/* If user on the dashboard page then header & footer will not appear */}
      {!location.pathname.includes("dashboard") && <Header />}
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/smartphones">
            <AllPhones />
          </Route>
          <PrivateRoute path="/phone-details/:phoneID">
            <PhoneDetails />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          {/* Redirect user if user already login */}
          <Route path="/login">
            {user.email ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            {user.email ? <Redirect to="/" /> : <Register />}
          </Route>
          {/* Not found page */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
      {!location.pathname.includes("dashboard") && <Footer />}
    </>
  );
};

export default App;
