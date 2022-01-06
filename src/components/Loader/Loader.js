import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = ({ style }) => {
  return (
    <div className="loader" style={{ ...style }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
