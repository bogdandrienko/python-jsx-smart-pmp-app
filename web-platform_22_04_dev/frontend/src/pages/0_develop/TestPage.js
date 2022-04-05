// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TestPage = () => {
    let number = 5; // изменяемая
    const number2 = 5; // не изменяемая

    // alert(1)


  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <div className="card m-0 p-0">
          Body123
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
