import React from "react";
import { Alert } from "react-bootstrap";

function MessageComponent({ variant, children }) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default MessageComponent;
