// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import * as components from "../../js/components";
import * as constants from "../../js/constants";
import * as actions from "../../js/actions";
import * as test from "../components/TestComponent";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const TestPage = () => {
  // TODO custom variables /////////////////////////////////////////////////////////////////////////////////////////////
  let number = 5; // изменяемая переменная
  const number2 = 5; // не изменяемая переменная

  // javascript:document.getElementsByClassName("video-stream html5-main-video")[0].playbackRate = 2.5;

  // alert(1)

  // TODO return page //////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="m-0 p-0">
      <components.HeaderComponent />
      <main>
        <div className="container text-center w-25 m-0 p-0">
          TestComponent1
          <test.TestComponent1 key={"TestComponent1"} />
        </div>
        <div className="container text-center w-25 m-0 p-0">
          TestComponent2
          <test.TestComponent2 key={"TestComponent2"} />
        </div>
      </main>
      <components.FooterComponent />
    </div>
  );
};
