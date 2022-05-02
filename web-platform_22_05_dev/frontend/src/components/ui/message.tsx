// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export class Message {
  // @ts-ignore
  static Success({ children }) {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div
        className={
          "container-fluid container text-center row justify-content-center m-0 p-0"
        }
      >
        <div
          className={
            "card w-75 bg-light text-center border border-1 border-success m-0 p-0"
          }
        >
          <div
            className={
              "card-header bg-success bg-opacity-25 lead text-success m-0 p-1"
            }
          >
            успешно
          </div>
          <div className={"card-body bg-success bg-opacity-10 m-0 p-0"}>
            {children}
          </div>
        </div>
      </div>
    );
  }
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
            "card w-75 bg-light text-center border border-1 border-danger m-0 p-0"
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
  static Warning({ children }) {
    // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
      <div
        className={
          "container-fluid container text-center row justify-content-center m-0 p-0"
        }
      >
        <div
          className={
            "card w-75 bg-light text-center border border-1 bwarning m-0 p-0"
          }
        >
          <div
            className={
              "card-header bg-warning bg-opacity-25 lead text-warning m-0 p-1"
            }
          >
            внимание!
          </div>
          <div className={"card-body bg-warning bg-opacity-10 m-0 p-0"}>
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
            "card w-75 bg-light text-center border border-1 border-secondary m-0 p-0"
          }
        >
          <div
            className={
              "card-header bg-secondary bg-opacity-25 lead text-secondary m-0 p-1"
            }
          >
            информация
          </div>
          <div className={"card-body bg-secondary bg-opacity-10 m-0 p-0"}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
