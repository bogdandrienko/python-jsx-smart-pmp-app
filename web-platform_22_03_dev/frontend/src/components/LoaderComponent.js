import React from "react";
import { Spinner } from "react-bootstrap";

const LoaderComponent = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "60px",
        width: "60px",
        margin: "auto",
        display: "block",
      }}
    >
      ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
    </Spinner>
  );
};

export default LoaderComponent;
