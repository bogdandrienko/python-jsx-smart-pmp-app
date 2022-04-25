// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Message {
  // @ts-ignore
  static Danger({ children }) {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div
        className={
          "container-fluid container text-center row justify-content-center m-0 p-0"
        }
      >
        <div
          className={
            "card bg-light w-50 text-center border border-1 border-danger m-0 p-0"
          }
        >
          <div
            className={
              "card-header bg-danger bg-opacity-25 lead text-danger m-0 p-1"
            }
          >
            внимание!
          </div>
          <div className={"card-body bg-danger bg-opacity-10 m-0 p-0"}>
            {children}
          </div>
        </div>
      </div>
    );
  }
  // @ts-ignore
  static Secondary({ children }) {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div
        className={
          "container-fluid container text-center row justify-content-center m-0 p-0"
        }
      >
        <div
          className={
            "card bg-light w-50 text-center border border-1 border-secondary m-0 p-0"
          }
        >
          <div
            className={
              "card-header bg-secondary bg-opacity-25 lead text-secondary m-0 p-1"
            }
          >
            внимание!
          </div>
          <div className={"card-body bg-secondary bg-opacity-10 m-0 p-0"}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
