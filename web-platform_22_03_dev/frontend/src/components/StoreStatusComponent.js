import React from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function StoreStatusComponent(
  StoreStatus,
  key = "StoreStatus",
  showSuccess = true,
  successText = null,
  consoleLog = false
) {
  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = StoreStatus;
  if (consoleLog) {
    console.log(`${key}`, StoreStatus);
  }

  return (
    <div key={key} className="m-1 p-0">
      {loadStatus && (
        <div className="m-0 p-0">
          <Spinner
            animation="border"
            role="status"
            style={{
              height: "60px",
              width: "60px",
              margin: "auto",
              display: "block",
            }}
            className="m-0 p-1"
          >
            ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
          </Spinner>
        </div>
      )}
      {dataStatus && showSuccess && (
        <div className="m-0 p-0">
          <Alert variant={"success"} className="m-0 p-1">
            {successText !== null && successText !== ""
              ? successText
              : dataStatus}
          </Alert>
        </div>
      )}
      {errorStatus && (
        <div className="m-0 p-0">
          <Alert variant={"danger"} className="m-0 p-1">
            {errorStatus}
          </Alert>
        </div>
      )}
      {failStatus && (
        <div className="m-0 p-0">
          <Alert variant={"warning"} className="m-0 p-1">
            {failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default StoreStatusComponent;
