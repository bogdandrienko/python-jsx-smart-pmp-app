import * as utils from "./utils";

import React from "react";
// @ts-ignore
import { Spinner, Alert } from "react-bootstrap";

export const StoreStatusComponent = ({
  // @ts-ignore
  storeStatus,
  keyStatus = "StoreStatus",
  consoleLog = false,
  showLoad = true,
  loadText = "",
  showData = true,
  dataText = "",
  showError = true,
  errorText = "",
  showFail = true,
  failText = "",
}) => {
  /////////////////////////////////////////////////////////////////////////////////////////////////TODO react components
  const {
    load: loadStatus,
    data: dataStatus,
    error: errorStatus,
    fail: failStatus,
  } = storeStatus;
  if (consoleLog) {
    console.log(`${keyStatus}`, storeStatus);
  }
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div key={keyStatus} className="m-0 p-0">
      {showLoad && loadStatus && (
        <div className="row justify-content-center m-0 p-0">
          {loadText !== "" ? (
            <Alert variant={"secondary"} className="text-center m-0 p-1">
              {loadText}
            </Alert>
          ) : (
            <Spinner
              animation="border"
              role="status"
              style={{
                height: "50px",
                width: "50px",
                margin: "auto",
                display: "block",
              }}
              className="text-center m-0 p-0"
            >
              <small className="m-0 p-0">ждите</small>
              <span className="sr-only m-0 p-0" />
            </Spinner>
          )}
        </div>
      )}
      {showData && dataStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"success"} className="text-center m-0 p-1">
            {dataText !== "" ? dataText : dataStatus}
          </Alert>
        </div>
      )}
      {showError && errorStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"danger"} className="text-center m-0 p-1">
            {errorText !== "" ? errorText : errorStatus}
          </Alert>
        </div>
      )}
      {showFail && failStatus && (
        <div className="row justify-content-center m-0 p-0">
          <Alert variant={"warning"} className="text-center m-0 p-1">
            {failText !== "" ? failText : failStatus}
          </Alert>
        </div>
      )}
    </div>
  );
};

// @ts-ignore
export const MessageComponent = ({ variant, children }) => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="row justify-content-center m-0 p-1">
      <Alert variant={variant} className="text-center m-0 p-1">
        {children}
      </Alert>
    </div>
  );
};

export const LoaderComponent = () => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "50px",
        width: "50px",
        margin: "auto",
        display: "block",
      }}
    >
      ЖДИТЕ<span className="sr-only">ЖДИТЕ</span>
    </Spinner>
  );
};

export const AccordionComponent = ({
  // @ts-ignore
  key_target,
  isCollapse = true,
  // @ts-ignore
  title,
  text_style = "text-danger",
  header_style = "bg-danger bg-opacity-10",
  body_style = "bg-danger bg-opacity-10",
  // @ts-ignore
  children,
}) => {
  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-1">
      <div className="accordion m-0 p-0" id="accordionExample">
        <div className="accordion-item custom-background-transparent-middle m-0 p-0">
          <h2
            className="accordion-header custom-background-transparent-low m-0 p-0"
            id="accordion_heading_1"
          >
            <button
              className={`accordion-button m-0 p-0 ${header_style}`}
              type="button"
              data-bs-toggle=""
              data-bs-target={`#${key_target}`}
              aria-expanded="false"
              aria-controls={key_target}
              onClick={(e) => utils.ChangeAccordionCollapse([key_target])}
            >
              <h6 className={`lead m-0 p-3 ${text_style}`}>
                {title}{" "}
                <small className="text-muted m-0 p-0">
                  (нажмите сюда, для переключения)
                </small>
              </h6>
            </button>
          </h2>
          <div
            id={key_target}
            className={
              isCollapse
                ? "accordion-collapse collapse m-0 p-0"
                : "accordion-collapse m-0 p-0"
            }
            aria-labelledby={key_target}
            data-bs-parent="#accordionExample"
          >
            <div className={`accordion-body m-0 p-0 ${body_style}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
