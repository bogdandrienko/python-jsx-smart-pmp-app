import React from "react";
import { Alert } from "react-bootstrap";

function ErrorComponent({ children }) {
  return <Alert variant={"danger"}>{children}</Alert>;
}

export default ErrorComponent;
